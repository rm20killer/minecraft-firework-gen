const fs = require("fs");

Type = 0;
Trail = 0;
Flicker = 0;
LifeTime = 0;
Flight = 1;
Colors = [];
FadeColors = [];

const prideColoursJson = require("../prideColours.json");
const fireworkColoursJson = require("../fireworkData.json");

module.exports = {
  async execute() {
    ReadJson();
  },
};

function ReadJson() {
  console.log(prideColoursJson);
  prideColours = prideColoursJson.Pride;
  prideColours.forEach((element) => {
    geneateFirework(element);
  });
}

function geneateFirework(element) {
  let name = element.Name;
  let colors = element.colour;
  console.log(colors);
  let FwColours = [];
  for (let i = 0; i < colors.length; i++) {
    const colour = colors[i];
    let colourNum = fireworkColoursJson.colour[colour];
    FwColours.push(colourNum);
  }

  console.log(FwColours);
  ColorsString = FwColours.join(",");
  let fireworkString = `{Fireworks:{Flight:${Flight},Explosions:[{Type:${Type},Flicker:${Flicker},Trail:${Trail},Colors:[I;${ColorsString}]}]}}`;
  console.log(fireworkString);

  SaveData(fireworkString, name);
}

function SaveData(Firework, name) {
  //if file exists
  if (fs.existsSync(`./Fireworks/${name}.txt`)) {
    //make new line
    Firework = `\n${Firework}`;
    //write to file
    fs.appendFile(`./Fireworks/${name}.txt`, Firework, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  } else {
    //make new file
    fs.writeFile(`./Fireworks/${name}.txt`, Firework, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  }
}
