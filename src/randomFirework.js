
Type = 0
Trail = 0
Flicker = 0
LifeTime = 0
Flight = 1
Colors = []
FadeColors = []

summon = true
DataColor = [11743532,3887386,2437522,8073150,2651799,14188952,4312372,14602026,6719955,12801229,15435844,15790320]
//! summon firework_rocket ~ ~1 ~ {LifeTime:30,FireworksItem:{id:firework_rocket,Count:1,tag:{Fireworks:{Flight:2,Explosions:[{Type:0,Flicker:0,Trail:0,Colors:[I;2651799]}]}}}}


module.exports = {
    async execute()
    {
        geneateFirework()
    }
}

function geneateFirework()
{
    if(summon == true)
    {
        //get random number from 1 to 6
        AmountOfColours = Math.floor(Math.random() * 6) + 1
        //for amount of colours get a ranom colour and push it to colors
        for(i = 0; i < AmountOfColours; i++)
        {
            Colors.push(DataColor[Math.floor(Math.random() * DataColor.length)])
        }
        //put colours to string with , in between
        ColorsString = Colors.join(",")

        stringExport = `/summon firework_rocket ~ ~ ~ {LifeTime:${LifeTime},FireworksItem:{id:firework_rocket,Count:1,tag:{Fireworks:{Flight:${Flight},Explosions:[{Type:${Type},Flicker:${Flicker},Trail:${Trail},Colors:[I;${ColorsString}]}]}}}}`
        console.log(stringExport)       
    }
}
