const { model } = require("./model");

const view = {
  displaySprites: function () {
    document.getElementById("p1Img").src = src =
      "./images/" + model.p1Pokemon + ".png";
    document.getElementById("p2Img").src = src =
      "./images/" + model.p2Pokemon + ".png";
  },
  displayMoves: function () {
    for (let i = 0; i < 4; i++) {
      document.getElementById("move" + i + "name").innerHTML =
        pokedex[model.p1Pokemon].moveSet[i].moveName;

      document.getElementById("move" + i + "pp").innerHTML =
        pokedex[model.p1Pokemon].moveSet[i].movePP +
        "/" +
        pokedex[model.p1Pokemon].moveSet[i].moveMaxPP;
    }
  },
  displayInfo: function () {
    document.getElementById("p1Info").innerHTML =
      "HP " +
      pokedex[model.p1Pokemon].currentHP +
      "/" +
      pokedex[model.p1Pokemon].maxHP;

    document.getElementById("p2Info").innerHTML =
      "HP " +
      pokedex[model.p2Pokemon].currentHP +
      "/" +
      pokedex[model.p2Pokemon].maxHP;
  },

  toggleSetup: function () {
    let setup = document.getElementById("setup");
    if (setup.style.display === "none") {
      setup.style.display = "block";
    } else {
      setup.style.display = "none";
    }
  },
  togglePlayArea: function () {
    let playArea = document.getElementById("playArea");
    if (playArea.style.display === "none") {
      playArea.style.display = "flex";
    } else {
      playArea.style.display = "none";
    }

    let messageLog = document.getElementById("messageLog");
    if (messageLog.style.display === "none") {
      messageLog.style.display = "block";
    } else {
      messageLog.style.display = "none";
    }
  },

  changeHealth: function (player, newCurrent, max) {
    const id = player + "Info";
    const info = document.getElementById(id);
    info.innerHTML = "HP " + newCurrent + "/" + max;
  },
  changePP: function (move, newCurrent, max) {
    const id = "move" + move + "pp";
    const PP = document.getElementById(id);
    PP.innerHTML = newCurrent + "/" + max;
  },
  displayMessage: function (msg) {
    const messageArea = document.getElementById("messageLog");
    if (model.p1Turn === true && model.defender.status !== "fainted") {
      messageArea.innerHTML = msg;
    } else {
      messageArea.innerHTML = messageArea.innerHTML + "<br>" + msg;
    }
  },
};

module.exports = view;
