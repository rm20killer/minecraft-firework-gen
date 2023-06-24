const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../utils/googlekey.json");
const fs = require("fs");

const spreadsheet = ""
module.exports = {
  async execute() {
    read();
  },
};

let ID = "$84626"

async function read() {

    const doc = new GoogleSpreadsheet(spreadsheet);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[1];

    n = 1000
    n = n
    i = 1
    const load = "B1:H" + n;
    await sheet.loadCells(load);
    console.log("loaded cells")
    let Time
    let firework 
    let LifeTime
    let x
    let y
    let z
    let other_commands
    console.log("start")
    let commands = []
    while (i < n) {
        let data = sheet.getCell(i, 1).value
        if (data) {
            Time = sheet.getCell(i, 1).value
            firework = sheet.getCell(i, 2).value
            LifeTime = sheet.getCell(i, 3).value
            x = sheet.getCell(i, 4).value
            y = sheet.getCell(i, 5).value
            z = sheet.getCell(i, 6).value
            other_commands = sheet.getCell(i, 7).value
            console.log(Time, firework, LifeTime, x, y, z, other_commands)
            if(firework !=null)
            {
                let executeCommand = `execute if score ${ID} cw_particleplot matches ${Time} run summon minecraft:firework_rocket ^${x} ^${y} ^${z} {LifeTime:${LifeTime},FireworksItem:{id:firework_rocket,Count:1,tag:${firework}}}`
                commands.push(executeCommand)
            }
            if(other_commands !=null)
            {
                let executeCommand = `execute if score ${ID} cw_particleplot matches ${Time} run ${other_commands}`
                commands.push(executeCommand)
            }
        }
        i++
    }
    console.log("done")
    console.log(commands)
    //join commands with new line
    let executeCommands = commands.join("\n");
    // console.log(executeCommands)
    write(executeCommands)
}


async function write(executeCommand) {
    //write to functions/pride_show/I0/animator.mcfunction

    if (fs.existsSync(`./functions/pride_show/frame/animator.mcfunction`)) {
        //make new line
        executeCommand = `\n${executeCommand}`;
        //write to file
        fs.appendFile(`./functions/pride_show/frame/animator.mcfunction`, executeCommand, function (err) {
            if (err) throw err;
            console.log("Saved!");
            }
        );
      } else {
        //make new file
        fs.writeFile(`./functions/pride_show/frame/animator.mcfunction`, executeCommand, function (err) {
            if (err) throw err;
            console.log("Saved!");
            }
        );
      }

}