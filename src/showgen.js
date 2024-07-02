const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../utils/googlekey.json");
const fs = require("fs");

const spreadsheet = "1oXpFwlReJ9uzIxPje4rrK7fUCZyzLan0TfR2FVC2hGk/";
module.exports = {
  async execute() {
    read();
  },
};

let currentTime = 0.5;
async function read() {
  console.log("starting");
  const doc = new GoogleSpreadsheet(spreadsheet);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[1];

  n = 1000;
  n = n;
  i = 1;
  const load = "B1:J" + n;
  await sheet.loadCells(load);
  console.log("loaded cells");
  let Time;
  let firework;
  let LifeTime;
  let x;
  let y;
  let z;
  let other_commands;
  let min;
  console.log("start");
  let commands = [];

  let startCommand = `command /song-play-pheonix:\n    trigger:\n        execute player command "beatmap play pheonix"\n        set {ShowStarted} to true\n\n`;
  commands.push(startCommand);
  while (i < n) {
    let data = sheet.getCell(i, 1).value;
    if (data) {
      Time = sheet.getCell(i, 1).value;
      firework = sheet.getCell(i, 2).value;
      LifeTime = sheet.getCell(i, 3).value;
      x = sheet.getCell(i, 4).value;
      y = sheet.getCell(i, 5).value;
      z = sheet.getCell(i, 6).value;
      other_commands = sheet.getCell(i, 7).value;
      functions = sheet.getCell(i, 8).value;
      min = sheet.getCell(i, 9).value;
      console.log(Time, firework, LifeTime, x, y, z, other_commands);
      if (min && Time) {
        let minToSec = min * 60;
        Time = Time + minToSec;
      }
      if (Time != currentTime) {
        // find the time difference then fimd the difference in ticks
        let timeDifference = Time - currentTime;
        let ticks = timeDifference * 20;
        //round to the nearest whole number
        ticks = Math.round(ticks);
        if (ticks < 0) {
        } else {
          let executeCommand = `        wait ${ticks} ticks\n        {ShowStarted} is true`;
          commands.push(executeCommand);
          currentTime = Time;
        }
      }
      if (firework != null) {
        let executeCommand = `        execute console command "minecraft:summon minecraft:firework_rocket ${x} ${y} ${z} {LifeTime:${LifeTime},FireworksItem:{id:firework_rocket,Count:1,tag:${firework}}}"`;
        commands.push(executeCommand);
      }
      if (other_commands != null) {
        let executeCommand = `        execute console command "${other_commands}"`;
        commands.push(executeCommand);
      }
      if (functions != null) {
        console.log(functions);
        let executeCommand = `        ${functions}`;
        commands.push(executeCommand);
      }
    }
    i++;
  }
  console.log("done");
  console.log(commands);
  //join commands with new line
  let executeCommands = commands.join("\n");
  // console.log(executeCommands)
  write(executeCommands);
}

async function write(executeCommand) {
  //write to functions/pride_show/I0/animator.mcfunction

  if (fs.existsSync(`./skript/fireworks.sk`)) {
    //make new line
    executeCommand = `\n${executeCommand}`;
    //write to file
    fs.appendFile(`./skript/fireworks.sk`, executeCommand, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  } else {
    //make new file
    fs.writeFile(`./skript/fireworks.sk`, executeCommand, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  }
}
