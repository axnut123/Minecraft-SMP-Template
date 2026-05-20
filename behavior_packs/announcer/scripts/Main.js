import { world, system } from "@minecraft/server"

// 定期公告系统配置
const ANNOUNCER_CONFIG = {
  // 是否启用公告系统
  enabled: true,
  // 公告发送间隔（秒）
  interval: 120, //
  // 公告内容列表
  announcements: [
    "§fJoin our §b<Tеxt here>§f group for the latest news and updates! §e<url here>",
    "§fJoin our §b<Tеxt here>§f channel for updates and announcements! §e<url here>",
    "§fDo not know hоw to issue command? Use §b!help§f to get a list of available commands!",
    "§fNot sure how tо protect your base? Use §b!land§f to learn about protection commands and tips!",
    "§cRank purchasing is currently unavailable! Please wait for further informations."
  ]
}

// 公告系统状态
const announcerState = {
  currentIndex: 0,
  tickCounter: 0,
  isRunning: false
}

/**
 * 发送公告到所有玩家
 * @param {string} message - 公告内容
 */
function broadcastAnnouncement(message) {
  try {
    for (const player of world.getPlayers()) {
    player.onScreenDisplay.setActionBar(message)}
    world.sendMessage(message)
  } catch (error) {
    console.warn("Failed to send announcement:", error)
  }
}

/**
 * 获取下一条公告
 * @returns {string} 公告内容
 */
function getNextAnnouncement() {
  if (ANNOUNCER_CONFIG.announcements.length === 0) {
    return "§6[Announcer] §fThere is no announcement configured."
  }
  
  const message = ANNOUNCER_CONFIG.announcements[announcerState.currentIndex]
  announcerState.currentIndex = (announcerState.currentIndex + 1) % ANNOUNCER_CONFIG.announcements.length
  return message
}

/**
 * 启动定期公告系统
 */
function startAnnouncer() {
  if (announcerState.isRunning) return
  
  announcerState.isRunning = true
  console.log("Annouccer system started with interval:", ANNOUNCER_CONFIG.interval, "seconds")
  
  // 立即发送第一条公告
  if (ANNOUNCER_CONFIG.enabled) {
    broadcastAnnouncement(getNextAnnouncement())
  }
  
  // 设置定期发送（每tick检查一次）
  const intervalTicks = Math.max(1, ANNOUNCER_CONFIG.interval * 20) // 转换为tick（1秒=20tick）
  
  system.runInterval(() => {
    if (!ANNOUNCER_CONFIG.enabled || !announcerState.isRunning) return
    
    announcerState.tickCounter++
    
    if (announcerState.tickCounter >= intervalTicks) {
      announcerState.tickCounter = 0
      broadcastAnnouncement(getNextAnnouncement())
    }
  }, 1)
}

/**
 * 停止定期公告系统
 */
function stopAnnouncer() {
  announcerState.isRunning = false
  console.log("Announcer system stopped")
}

/**
 * 手动发送公告
 * @param {string} message - 公告内容
 */
function sendCustomAnnouncement(message) {
  broadcastAnnouncement(message)
}

/**
 * 重载配置
 * @param {object} newConfig - 新配置对象
 */
function reloadConfig(newConfig) {
  if (newConfig.enabled !== undefined) ANNOUNCER_CONFIG.enabled = newConfig.enabled
  if (newConfig.interval !== undefined) ANNOUNCER_CONFIG.interval = Math.max(1, newConfig.interval)
  if (newConfig.announcements !== undefined && Array.isArray(newConfig.announcements)) {
    ANNOUNCER_CONFIG.announcements = newConfig.announcements
  }
  console.log("Announcer configuration updated:", ANNOUNCER_CONFIG)
}

/**
 * 世界初始化时启动公告系统
 */
world.afterEvents.worldInitialize.subscribe(({ dimension }) => {
  console.log("World initialized, starting announcer system...")
  startAnnouncer()
})


// 导出函数供其他模块使用
export {
  startAnnouncer,
  stopAnnouncer,
  sendCustomAnnouncement,
  reloadConfig,
  ANNOUNCER_CONFIG
}
