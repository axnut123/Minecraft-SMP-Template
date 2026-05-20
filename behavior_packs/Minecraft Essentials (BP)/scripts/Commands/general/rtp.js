import { system, world, Vector3, Dimension } from "@minecraft/server"
import Utility from "../../Modules/Utility"
import { getCooldown, setCooldown } from "../../Modules/Cooldown"
import Config from "../../Configuration"

/**
 * @param {import("../../main").default} Server
 */
const rtp = (Server) => {
  Server.Commands.register({
    name: "rtp",
    description: "mce.command.rtp.description",
    usage: "tps",
    category: "General"
  }, async (data, player, args) => {
    if (Server.RTPDB.has(player.id)) return player.sendMessage({ translate: "mce.command.rtp.inprogress" })
    if (player.isCombat()) return player.sendMessage({ translate: "mce.player.incombat" })
    if (getCooldown("rtp", player) > 0)
      return player.sendMessage({ translate: "mce.player.command.oncooldown.specific", with: ["rtp", `${getCooldown("rtp", player)}`] })
    let rtpCost = player.getPermission("rtp.cost")
    if (rtpCost > 0 && player.getMoney() < rtpCost && !player.isAdmin())
      return player.sendMessage({ translate: "mce.teleport.insufficientfunds", with: [Utility.formatMoney(rtpCost)] })
    if (!player.isAdmin()) player.setMoney(player.getMoney() - rtpCost)
    let rtpCD = player.getPermission("rtp.cooldown")
    setCooldown("rtp", player, rtpCD)
    let rtpCountdown = player.getPermission("rtp.countdown")
    if (rtpCountdown > 0 && !player.isAdmin()) {
      player.sendMessage({ translate: "mce.teleport.waitfor.chat", with: [`${rtpCountdown}`] })
      let playerPosition = player.location
      let cancel = false
      let canceled = false
      let countdown = rtpCountdown
      for (let i = 0; i < rtpCountdown; i++) {
        if (player.isCombat() || player.location.x != playerPosition.x || player.location.y != playerPosition.y || player.location.z != playerPosition.z) cancel = true
        if (cancel) {
          if (!canceled) player.sendMessage({ translate: "mce.command.canceled" })
          canceled = true
          return;
        }
        player.onScreenDisplay.setActionBar({ translate: "mce.teleport.waitfor.actionbar", with: [`${countdown}`] })
        countdown--
        await Server.sleep(1000)
        player.onScreenDisplay.setActionBar({ translate: "mce.teleport.waitfor.actionbar", with: [`${countdown}`] })
      }
    }
    player.sendMessage({ translate: "mce.teleport.teleporting" })

    let done = false
    let location = generateRandomLocation(player)
    const dimension = player.dimension
    const y = dimension.heightRange.max

    Server.RTPDB.set(player.id, {
      initialLocation: player.location,
      initialDimension: player.dimension.id,
    })

    const runId = system.runInterval(() => {
      if (player.isValid && !done) {
        player.addEffect("resistance", 200, { showParticles: false, amplifier: 255 })

        player.teleport({ x: location.x, y: y, z: location.z }, { dimension })
        if (dimension.getBlock({ x: location.x, y: 0, z: location.z }) != undefined) {
          player.onScreenDisplay.setActionBar({ translate: "mce.command.rtp.safelocation" })

          const top = getTopmostBlock(dimension, location)
          if (top != undefined) {
            if (top.typeId == "minecraft:bedrock") return location = generateRandomLocation(player)

            const above = top.above()
            if (!top.isAir && !top.isLiquid && above != undefined && above.isAir) {
              const center = top.center()
              const teleported = player.tryTeleport({ x: center.x, y: center.y + 1, z: center.z }, { dimension, checkForBlocks: true })
              if (!teleported) return location = generateRandomLocation(player)

              player.sendMessage({ translate: "mce.teleport.teleported" })
              player.onScreenDisplay.setActionBar({ translate: "mce.command.rtp.teleported" })

              return done = true
            } else {
              location = generateRandomLocation(player)
            }
          } else location = generateRandomLocation(player)
        } else player.onScreenDisplay.setActionBar({ translate: "mce.command.rtp.loadingchunks" })
      } else {
        if (player.isValid) {
          // player.removeEffect("resistance")
        }

        Server.RTPDB.delete(player.id)
        return system.clearRun(runId)
      }
    })
  })

  const generateRandomLocation = (player) => {
    const range = (Server.Setting.get("RTPRange") ?? Config.RTPRange) / 2
    const location = {
      x: Math.floor(player.location.x + Utility.random(-Math.abs(range), Math.abs(range))),
      z: Math.floor(player.location.z + Utility.random(-Math.abs(range), Math.abs(range)))
    }

    return location
  }

  /**
   * @param {Dimension} dimension
   * @param {{x: number, z: number}} location
   */
  const getTopmostBlock = (dimension, location) => {
    if (dimension.id == "minecraft:nether") {
      for (let y = dimension.heightRange.max; y >= dimension.heightRange.min; y--) {
        try {
          const block = dimension.getBlock({ x: location.x, y, z: location.z })
          if (!block || block.typeId == "minecraft:bedrock") continue

          const above = block.above()
          if (!above || above.typeId == "minecraft:bedrock") continue

          if (!block.isAir && !block.isLiquid && above.isAir)
            return block
        } catch {
          continue
        }
      }

      return undefined
    } else return dimension.getTopmostBlock(location)
  }

  const tpBack = (player) => {
    const data = Server.RTPDB.get(player.id)
    player.teleport(data.initialLocation, { dimension: world.getDimension(data.initialDimension) })

    Server.RTPDB.delete(player.id)
  }
  world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
    if (initialSpawn && Server.RTPDB.has(player.id)) tpBack(player)
  })

  world.getAllPlayers().filter(p => Server.RTPDB.has(p.id)).forEach(tpBack)
}

export default rtp

const Credit = "Void(0)"