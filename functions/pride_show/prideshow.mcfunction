#Generated with: RM20's firework show geneateFirework
scoreboard objectives add cw_particleplot dummy
function firework:pride_show/l0/animtor
scoreboard players add $84626 cw_particleplot 1
execute if score $84626 cw_particleplot matches 71.. run scoreboard players set $84626 cw_particleplot 0