tag @a[m=creative,tag=killit] add creativemode
gamemode survival @a[tag=creativemode,tag=killit]
execute at @a[tag=killit] run summon lightning_bolt ~ ~ ~
damage @a[tag=killit] 99999 lightning
gamerule keepInventory false
kill @a[tag=killit]
gamerule keepInventory true
tag @a[tag=!killit] add announce
tellraw @a[tag=killit] {"rawtext":[{"text":"§cYou were killed by §4moderator or console."}]}
execute as @a[tag=killit] run tellraw @a[tag=!killit] {"rawtext":[{"text":"§cPlayer §4"},{"selector":"@s"},{"text":"§c was terminated by §4§l§oLEGION."}]}
tag @a[tag=announce] remove announce
gamemode creative @a[tag=creativemode,tag=killit]
tag @a[tag=creativemode,tag=killit] remove creativemode
tag @a[tag=killit] remove killit

#kicker
execute as @a[tag=kickit] run tellraw @a[tag=!kickit] {"rawtext":[{"text":"§cPlayer §4"},{"selector":"@s"},{"text":"§c was swallowed by the §4§l§oVOID!"}]} 
tellraw @a[tag=kickit] {"rawtext":[{"text":"§cYou were kicked by §4moderator or console."}]}
execute as @a[tag=kickit] run tag @s add shock
execute at @a[tag=shock,tag=kickit] run summon lightning_bolt ~ ~ ~
execute as @a[tag=kickit,tag=shock] run tag @s remove shock
kick @a[tag=kickit] "You were kicked by moderator or console. There is no way to cancel your punishment."

#clear
clear @a[tag=clearit]
execute as @a[tag=clearit] run tellraw @a[tag=!clearit] {"rawtext":[{"text":"§cPlayer §4"},{"selector":"@s"},{"text":"§c's items were swallowed by the §4§l§oVOID!"}]} 
tellraw @a[tag=clearit] {"rawtext":[{"text":"§cItems cleared by §4moderator or console!"}]}
tag @a[tag=clearit] remove clearit

#essentials tick
effect @a[tag=vanish] invisibility infinite 1 true
effect @a[tag=vanish] weakness infinite 255 true
effect @a[tag=godmode] resistance infinite 255 true
effect @a[tag=godmode] instant_health infinite 255 true
effect @a[tag=godmode] weakness infinite 255 true
execute at @a[tag=shock] run summon lightning_bolt ~ ~ ~
tag @a[tag=shock] remove shock
execute as @a[tag=launch] run effect @s levitation 1 150 true
tag @a[tag=launch] remove launch

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
kill @e[type=armor_stand,name=!"АА",name=!"ААC"]
#kill @e[type=armor_stand]

#freezer
inputpermission set @a[tag=freezer] dismount disabled
inputpermission set @a[tag=freezer] jump disabled
inputpermission set @a[tag=freezer] lateral_movement disabled
inputpermission set @a[tag=freezer] mount disabled
inputpermission set @a[tag=freezer] move_forward disabled
inputpermission set @a[tag=freezer] move_backward disabled
inputpermission set @a[tag=freezer] move_left disabled
inputpermission set @a[tag=freezer] move_right disabled
inputpermission set @a[tag=freezer] movement disabled
inputpermission set @a[tag=freezer] sneak disabled
titleraw @a[tag=freezer] actionbar {"rawtext":[{"text":"§cYou are frozen!"}]}

#unfreezer
inputpermission set @a[tag=!freezer] dismount enabled
inputpermission set @a[tag=!freezer] jump enabled
inputpermission set @a[tag=!freezer] lateral_movement enabled
inputpermission set @a[tag=!freezer] mount enabled
inputpermission set @a[tag=!freezer] move_forward enabled
inputpermission set @a[tag=!freezer] move_backward enabled
inputpermission set @a[tag=!freezer] move_left enabled
inputpermission set @a[tag=!freezer] move_right enabled
inputpermission set @a[tag=!freezer] movement enabled
inputpermission set @a[tag=!freezer] sneak enabled

#particles
execute at @a[tag=particles] run particle minecraft:villager_happy ~~~
execute at @a[tag=particles] run particle minecraft:end_chest ~~~

#VFX(Particles for items, arrows)
effect @e[type=armor_stand,tag=itemVFX] invisibility infinite 1 true
effect @e[type=armor_stand,tag=itemVFX] resistance infinite 255 true
effect @e[type=armor_stand,tag=itemVFX] instant_health infinite 255 true
execute at @e[type=armor_stand,tag=itemVFX,scores={itemVFX=1}] run execute at @e[type=item] run particle minecraft:basic_flame_particle ~~~
execute at @e[type=armor_stand,tag=itemVFX,scores={itemVFX=1}] run execute at @e[type=arrow] run particle minecraft:blue_flame_particle ~~~
execute at @e[type=armor_stand,tag=itemVFX,scores={itemVFX=1}] run execute at @e[type=thrown_trident] run particle minecraft:lava_drip_particle ~~~