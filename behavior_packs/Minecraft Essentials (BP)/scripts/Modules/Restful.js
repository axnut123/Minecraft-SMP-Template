import { system, world } from "@minecraft/server"

/**
 * @typedef {Object} RequestData
 * @property {string} requestId
 * @property {string} method
 * @property {any} [body]
 * @property {Object.<string, any>} [extra]
 */

/**
 * @typedef {Object} ResponseData
 * @property {string} requestId
 * @property {number} statusCode
 * @property {any} [body]
 */

/**
 * @callback RequestCallback
 * @param {RequestData} data
 * @returns {any|Promise<any>}
 */

/**
 * @typedef {Object} RestfulAPI
 * @property {(path: string, opts: { method?: string, callback: RequestCallback }) => void} listen
 * @property {(path: string, opts?: { method?: string, body?: any, timeout?: number }) => Promise<ResponseData>} request
 */

const routeHandlers = {}
const pendingRequests = new Map()
const MAX_MESSAGE_SIZE = 1900 // keep under 2048 after JSON overhead

const sendChunkedResponse = (requestId, response) => {
  const responseString = JSON.stringify(response ?? {})
  const chunks = []
  for (let i = 0; i < responseString.length; i += MAX_MESSAGE_SIZE) {
    chunks.push(responseString.slice(i, i + MAX_MESSAGE_SIZE))
  }

  // Send metadata first
  system.sendScriptEvent(`answer-get:${requestId}`, JSON.stringify({ requestId, statusCode: 200,chunks: chunks.length }))

  // Send chunks
  chunks.forEach((chunk, index) => {
    system.sendScriptEvent(`answer-get:${requestId}`, JSON.stringify({ requestId, chunkIndex: index, chunkData: chunk }))
  })
}

/** @type {RestfulAPI} */
const restful = {
  listen: (path, { method = "GET", callback }) => {
    if (!routeHandlers[path]) routeHandlers[path] = {}
    routeHandlers[path][method.toUpperCase()] = callback
  },

  request: (path, { method = "GET", body = {}, timeout = 10 } = {}) => {
    const requestId = `${path}|${Date.now()}${Math.random().toString(36).slice(2)}`
    const requestData = { method: method.toUpperCase(), body }

    return new Promise((resolve) => {
      pendingRequests.set(requestId, { resolve, chunks: [], expectedChunks: 0 })

      system.runTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId)
          resolve({ requestId, statusCode: 408, body: { message: "Request Timeout" } })
        }
      }, 20 * timeout)

      system.run(() => {
        system.sendScriptEvent(`get:${requestId}`, JSON.stringify(requestData))
      })
    })
  }
}

system.afterEvents.scriptEventReceive.subscribe(async ({ id, message, sourceType }) => {
  if (sourceType !== "Server") return

  // Incoming request
  if (id.startsWith("get:")) {
    const requestId = id.slice(4)
    const path = requestId.split("|")[0]

    try {
      const requestData = message ? JSON.parse(message) : {}
      const method = requestData.method?.toUpperCase() || "GET"
      const callback = routeHandlers[path]?.[method]
      if (!callback) return

      const response = await callback(requestData)
      sendChunkedResponse(requestId, response)
    } catch (err) {
      sendChunkedResponse(requestId, 500, { error: err instanceof Error ? err.message : String(err) })
    }
    return
  }

  // Incoming response
  if (id.startsWith("answer-get:")) {
    const [path, requestId] = id.slice(11).split("|")
    const data = message ? JSON.parse(message) : {}
    const { chunks, chunkIndex, chunkData, statusCode } = data

    const pending = pendingRequests.get(requestId)
    if (!pending) return

    if (typeof chunks === "number") {
      pending.expectedChunks = chunks
    } else if (typeof chunkIndex === "number") {
      pending.chunks[chunkIndex] = chunkData
      if (pending.chunks.filter(Boolean).length === pending.expectedChunks) {
        try {
          const body = JSON.parse(pending.chunks.join(""))
          pending.resolve({ requestId, statusCode: statusCode ?? 200, body })
        } catch {
          pending.resolve({ requestId, statusCode: 500, body: { error: "Invalid JSON chunk data" } })
        }
        pendingRequests.delete(requestId)
      }
    }
  }
})

export default restful
