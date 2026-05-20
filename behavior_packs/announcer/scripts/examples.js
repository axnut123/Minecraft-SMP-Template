/**
 * 高级使用示例
 * 展示如何在其他模块中使用公告系统
 */

import {
  startAnnouncer,
  stopAnnouncer,
  sendCustomAnnouncement,
  reloadConfig,
  ANNOUNCER_CONFIG
} from "./Main.js"

import { world, system } from "@minecraft/server"

world.afterEvents.chatSend.subscribe((event) => {
  const message = event.message.trim()
  
  if (message.startsWith("?la ")) {
    const args = message.substring(4).split(" ")
    const command = args[0]
    
    switch (command) {
      case "start":
        startAnnouncer()
        event.sender.sendMessage("§aAnnouncer system started")
        break
        
      case "stop":
        stopAnnouncer()
        event.sender.sendMessage("§cAnnouncer system stopped")
        break
        
      case "status":
        const statusMsg = `
§6=== 公告系统状态 ===
§f启用状态: ${ANNOUNCER_CONFIG.enabled ? "§aenabled" : "§cdisabled"}
§f发送间隔: §e${ANNOUNCER_CONFIG.interval}§f seconds
§f公告数量: §e${ANNOUNCER_CONFIG.announcements.length}§f lines
§f当前索引: §e${announcerState.currentIndex}
§f=============================`
        event.sender.sendMessage(statusMsg)
        break
        
      case "announce":
        if (args.length > 1) {
          const customMsg = args.slice(1).join(" ")
          sendCustomAnnouncement(`§d[Announcement] §f${customMsg}`)
          event.sender.sendMessage("§aAnnouncement sent")
        } else {
          event.sender.sendMessage("§cUsage: announcer announce <message>")
        }
        break
        
      default:
        event.sender.sendMessage(
          "§cUsage:\n" +
          "§e  ?la start §f- Start the system\n" +
          "§e  ?la stop §f- Stop the system\n" +
          "§e  ?la status §f- Check the status\n" +
          "§e  ?la announce <message> §f- Send a custom announcement"
        )
    }
  }
})

/**
 * 示例4: 定时任务 - 特定时间发送特殊公告
 * 这里使用游戏时间（一天=24000 ticks）来判断
 */
system.runInterval(() => {
  const daytime = world.getDimension("overworld").getWeather()
  // 可以在这里添加特殊的定时公告逻辑
}, 200) // 每10秒检查一次

/**
 * 示例5: 动态更新配置
 */
function updateAnnouncerConfig(newAnnouncements) {
  reloadConfig({
    enabled: true,
    interval: 300,
    announcements: newAnnouncements
  })
  console.log("Announcer configuration updated")
}

// 导出示例函数
export {
  updateAnnouncerConfig
}
