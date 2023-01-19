const fs = require("fs");
const randomFirework = require("./randomFirework");
const readline = require('readline');
var coords = []


Type = 4
Trail = 1
Flicker = 0
LifeTime = 0
Flight = 1
Colors = []
FadeColors = []

summon = true
DataColor1 = [11743532,3887386,2437522,8073150,2651799,14188952,4312372,14602026,6719955,12801229,15435844,15790320]
DataColor = [11743532,14602026,15435844]
const id = "$19227"

module.exports = {
    execute()
    {
        Animation()
    }
}

async function Animation()
{
    var itemsProcessed = 0;
    const fileStream = fs.createReadStream('Data/coords.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    ItemCount = rl.length;
    
    

    //console.log(ItemCount);
    for await (const line of rl) {
        itemsProcessed++;
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
        let coord = line;
        //remove space at end if there is a space
        if(coord.endsWith(" ")){
            coord = coord.slice(0, -1);
        }

        if(coord){
            CreateFirework(coord,itemsProcessed)
        }
        // if(itemsProcessed === rl.length) {
        //     callback();
        // }
    }
}

async function CreateFirework(coords,itemsProcessed)
{
    let frame = 205 + itemsProcessed* 5
    firework = geneateFirework(coords)
    console.log(firework);
    baseString = `execute if score ${id} cw_particleplot matches ${frame} run `
    stringExport = baseString + firework
    console.log(stringExport)

    fs.appendFile('Data/animation.mcfunction', stringExport + "\n", (err) => {
        if (err) throw err;
        console.log('Saved!');
      }
    );
}




function geneateFirework(coords)
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

        stringExport = `summon firework_rocket ${coords} {LifeTime:${LifeTime},FireworksItem:{id:firework_rocket,Count:1,tag:{Fireworks:{Flight:${Flight},Explosions:[{Type:${Type},Flicker:${Flicker},Trail:${Trail},Colors:[I;${ColorsString}],FadeColors:[I;15790320]}]}}}}`
        // console.log(stringExport)
        //emepty colors
        Colors = []

        return stringExport
    }
}


