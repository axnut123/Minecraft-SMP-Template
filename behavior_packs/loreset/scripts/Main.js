import { system } from "@minecraft/server";

system.afterEvents.scriptEventReceive.subscribe(data => {
  if (data.sourceType !== "Entity") return;
  if (data.sourceEntity.typeId !== "minecraft:player") return;
  const player = data.sourceEntity;
  
  if (data.id === "sla:setlore") {
    const inventory = player.getComponent("inventory").container;
    const selectedItem = inventory.getItem(player.selectedSlotIndex);
    if (!selectedItem) {
      player.sendMessage("§c未手持物品!");
      return;
    }
    if (!data.message) {
      player.sendMessage("§c使用方法: /scriptevent sla:setlore 内容");
      return;
    }
    const loreList = data.message.split("\\n");
    if (loreList.length > 20) {
      player.sendMessage("§c行数超出限制。最多20行");
      return;
    }
    for (const lore of loreList) {
      if (lore.length > 50) {
        player.sendMessage("§c字数太多，最多50字。");
        return;
      }
    }
    
    try {
      selectedItem.setLore(loreList);
      inventory.setItem(player.selectedSlotIndex, selectedItem);
      player.sendMessage("§aLore设置完成!");
    } catch(e) {
      player.sendMessage(`§c发生错误，无法设置!\n${e}`);
    }
    return;
  }
  
  if (data.id === "sla:clearlore") {
    const inventory = player.getComponent("inventory").container;
    const selectedItem = inventory.getItem(player.selectedSlotIndex);
    if (!selectedItem) {
      player.sendMessage("§c未手持物品!");
      return;
    }

    try {
      selectedItem.setLore();
      inventory.setItem(player.selectedSlotIndex, selectedItem);
      player.sendMessage("§aLore设置完成!");
    } catch(e) {
      player.sendMessage(`§c发生错误，无法设置!\n${e}`);
    }
    return;
  }
}, {namespaces: ["sla"]})