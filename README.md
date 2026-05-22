# SMP Server template
## by: Gyk Zty, Alex_Nute

You can build your own SMP server using this template. It includes a basic setup for a Minecraft server, along with some useful addons, mcfunction files and configurations to get you started.

## used projects:
- [Essentials] https://paostudio.xyz/download/minecraft-essentials (Some of the codes are changed to fit the server)
- [SetLoreAddon] https://github.com/axnut123/ItemLoreSetter
- [HiddenItemGiver] https://github.com/axnut123/HiddenItemGiver
- Plus the other addon, resource pack and mcfunction files that are included in this template.
**Thanks to these projects for providing useful features and functionalities that are included in this template.**

## How to use:
1. Download the template and extract it to your desired location.
2. Open the `server.properties` file and customize the settings according to your preferences (e.g., server name, game mode, difficulty, etc.).
3. Once you enter the game, use /tag @s add admin and /op <player> to grant yourself owner rank.
4. Read the boards that are placed around the spawn area to learn about the server.
5. Replacing all of the texts such as <NameHere> to your desired name, and changing the spawn area to your liking.
6. Any other customizations you want to make, such as adding new features, changing the configurations, etc.

## Permission groups:
- G.Owner: Full access to all commands and permissions.(internal name: admin)
- Staff: Access to most commands and permissions, including most owner-only commands. Do not include vanilla operator permissions.(internal name: staff)
- G.Admin: Access to most commands and permissions, excluding owner-only commands. Do not include vanilla operator permissions.(internal name: gadmin)
- G.Moderator: Access to moderation commands and permissions, cannot edit other players' rank. Do not include vanilla operator permissions. We recommend you to grant this rank to trusted moderators.(internal name: moderator)
- C.Moderator: Access to less moderation commands and permissions, cannot edit other players' rank. Do not include vanilla operator permissions. This rank is for the community moderators.(internal name: moder)
- OP: Access to some simple commands. And do not have access to moderator commands. This rank is a preset for rank purchasing.(internal name: op)
- Premium: a premium rank. Nothing to explain.(internal name: premium)
- Vip: a vip rank. Nothing to explain.(internal name: vip)
- ati: an user custom rank. No permissions.
- Default: the default rank for new players. No permissions.

**Use /tag <player> add <rank> to grant a player a rank, and /tag <player> remove <rank> to remove a rank from a player.**

## Additional custom functions:
- /function vanishon - turn on vanish mode.
- /function vanishoff - turn off vanish mode.
- /function godon - turn on godmode.
- /function godoff - turn off godmode.
- /function setsb - init scoreboard.
- /function create_as - create an armor stand with white list name.
- /function create_cp - create a creeper with white list name.
- /function create_ltcp - create a charged creeper with white list name.
- /function create_pt - create a phantom with white list name.
- /function removeentity - remove nearby armor stands, creepers and phantoms that have white list names (range = 1).
- /function mainLoop - main loop of main function. (No need to recall manually, it will be automatically called every tick.)
- /tag <player> add killit - kill a player, even in creative mode.
- /tag <player> add kickit - kick a player forever.
- /tag <player> add clearit - clear a player's inventory.
- /tag <player> add redstoner - allow a player to use all redstone items.
- /tag <player> add admin - grant a player admin permissions.
- /tag <player> add tntallow - allow a player to use tnt.
- /scoreboard players add <player> add warns <int(1-2)> - warn a player.
- /scoreboard players add <player> set warns <int(0)> - unwarn a player.
- /scriptevent sla:setlore <lore> - set the lore of an item in the player's main hand to the specified lore.
- /scriptevent sla:clearlore - clear the lore of an item in the player's main hand.

## Notes:
- Turn on online-mode.
- Use https.
- Do not grant any other players admin, staff and operator permissions.

## You are allowed to:
- Modify the server as you like, including but not limited to: changing the spawn area, adding new features, customizing the configurations, etc.
- Use the server template for your own SMP server, whether it's for personal use or public use.
- Hosting the server template.
- Share the server template with others, as long as you give credit to the original creators (Gyk Zty and Alex_Nute) and do not claim it as your own work.
- Selling the template that you have modified, but you must give credit to the original creators (Gyk Zty and Alex_Nute) and clearly state that it is a modified version of the original template. (if EULA allows)
- Making videos, medias or any other content using this template, but you must give credit to the original creators (Gyk Zty and Alex_Nute) and clearly state that it is based on the original template.

## You are not allowed to:
- Claim the server template as your own work without giving credit to the original creators (Gyk Zty and Alex_Nute).
- Distribute the server template without permission from the original creators.
- Selling the template that you have not modified, or selling the original template without giving credit to the original creators (Gyk Zty and Alex_Nute).
- Other actions that EULA does not allow.

## Credits:
- Gyk Zty: Dev.
- Alex_Nute: Same person as Gyk Zty, but with a different name.
- axnut123: Same person as Gyk Zty, my github user name.

**Thank you for choosing my template. Meow!**