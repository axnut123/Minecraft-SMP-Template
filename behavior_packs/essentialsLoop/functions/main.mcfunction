tag @a[m=creative,tag=killit] add creativemode
gamemode survival @a[tag=creativemode,tag=killit]
kill @a[tag=killit]
tag @a[tag=!killit] add announce
tellraw @a[tag=killit] {"rawtext":[{"text":"§cYou were killed by §4moderator or console."}]}
tag @a[tag=announce] remove announce
gamemode creative @a[tag=creativemode,tag=killit]
tag @a[tag=creativemode,tag=killit] remove creativemode
tag @a[tag=killit] remove killit

#kicker
tellraw @a[tag=kickit] {"rawtext":[{"text":"§cYou were kicked by §4moderator or console."}]}
kick @a[tag=kickit] You were kicked by moderator or console. There is no way to cancel your punishment.

#clear
clear @a[tag=clearit]
tellraw @a[tag=clearit] {"rawtext":[{"text":"§cItems cleared by moderator or console!"}]}
tag @a[tag=clearit] remove clearit

#essentials tick
effect @a[tag=vanish] invisibility infinite 1 true
effect @a[tag=godmode] resistance infinite 255 true
effect @a[tag=godmode] instant_health infinite 255 true