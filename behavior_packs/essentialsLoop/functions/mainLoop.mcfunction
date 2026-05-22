tag @a[m=creative,tag=killit] add creativemode
gamemode survival @a[tag=creativemode,tag=killit]
kill @a[tag=killit]
tag @a[tag=!killit] add announce
tellraw @a[tag=killit] {"rawtext":[{"text":"§cYou were killed by §4moderator or console."}]}
execute as @a[tag=killit] run tellraw @a[tag=!killit] {"rawtext":[{"text":"§cPlayer §4"},{"selector":"@s"},{"text":"§c was eliminated by §4LEGION."}]}
tag @a[tag=announce] remove announce
gamemode creative @a[tag=creativemode,tag=killit]
tag @a[tag=creativemode,tag=killit] remove creativemode
tag @a[tag=killit] remove killit

#kicker
execute as @a[tag=kickit] run tellraw @a[tag=!kickit] {"rawtext":[{"text":"§cPlayer §4"},{"selector":"@s"},{"text":"§c was swallowed by the VOID!"}]} 
tellraw @a[tag=kickit] {"rawtext":[{"text":"§cYou were kicked by §4moderator or console."}]}
kick @a[tag=kickit] "You were kicked by moderator or console. There is no way to cancel your punishment."

#clear
clear @a[tag=clearit]
execute as @a[tag=clearit] run tellraw @a[tag=!clearit] {"rawtext":[{"text":"§cPlayer §4"},{"selector":"@s"},{"text":"§c's items were swallowed by the VOID!"}]} 
tellraw @a[tag=clearit] {"rawtext":[{"text":"§cItems cleared by moderator or console!"}]}
tag @a[tag=clearit] remove clearit

#essentials tick
effect @a[tag=vanish] invisibility infinite 1 true
effect @a[tag=vanish] weakness infinite 255 true
effect @a[tag=godmode] resistance infinite 255 true
effect @a[tag=godmode] instant_health infinite 255 true
effect @a[tag=godmode] weakness infinite 255 true

#redstone restriction
clear @a[tag=!redstoner] redstone
clear @a[tag=!redstoner] redstone_block
clear @a[tag=!redstoner] redstone_torch
clear @a[tag=!redstoner] repeater
clear @a[tag=!redstoner] comparator
clear @a[tag=!redstoner] daylight_detector
clear @a[tag=!redstoner] observer
clear @a[tag=!redstoner] hopper
clear @a[tag=!redstoner] dropper
clear @a[tag=!redstoner] dispenser
clear @a[tag=!redstoner] piston
clear @a[tag=!redstoner] sticky_piston
clear @a[tag=!redstoner] slime
clear @a[tag=!redstoner] crafter

#other restrictions
clear @a[tag=!tntallow] tnt
clear @a[tag=!tntallow] tnt_minecart
clear @a[tag=!tntallow] end_crystal
clear @a[tag=!admin] command_block
clear @a[tag=!admin] barrier
clear @a[tag=!admin] structure_block
clear @a[tag=!admin] jigsaw
clear @a[tag=!admin] repeating_command_block
clear @a[tag=!admin] chain_command_block
clear @a[tag=!admin] command_block_minecart
clear @a[tag=!admin] structure_void
clear @a[tag=!admin] bedrock
clear @a[tag=!admin] end_portal_frame
clear @a[tag=!admin] mob_spawner

#entity killer
kill @e[type=creeper,name=!"ВВ"]
kill @e[type=phantom,name=!"СС"]
kill @e[type=armor_stand,name=!"АА"]