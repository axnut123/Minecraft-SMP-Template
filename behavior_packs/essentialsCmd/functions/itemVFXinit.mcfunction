scoreboard objectives add itemVFX dummy
execute at @p run execute unless entity @e[type=armor_stand,name="ААC"] run summon armor_stand ~~-50~ ~~ grow_up "ААC"
tag @e[type=armor_stand,name="ААC"] add itemVFX
tellraw @s {"rawtext":[{"text":"§eItem VFX initialized!"}]}