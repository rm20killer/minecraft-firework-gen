const fs = require("fs");
const randomFirework = require("./randomFirework");
var coords = []

const id = "$19227"

module.exports = {
    execute()
    {
        Animation()
    }
}

async function Animation()
{
    ExportFirework = ""
    //get coords.txt
    await fs.readFile("Data/coords.txt", "utf8", function(err, data) {
        if (err) throw err;

        //split coords.txt into array
        coords = data.split("\n")
        console.log(coords)
        Export(ExportFirework,coords)
    })


}

function Export(ExportFirework,coords1)
{

    console.log(coords1)
    //loop through coords
    for(i = 0; i < coords1.length; i++)
    {
        frame = i + 1 * 5
        
        baseString = `execute if score ${id} cw_particleplot matches ${frame} run function `

        firework = randomFirework.execute()
        newFirework = baseString + firework
        ExportFirework += newFirework + "\n"
        console.log(i)
    }
    fs.writeFile("Data/animation.mcfunction", ExportFirework, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}