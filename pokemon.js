//test commit from desktop

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

const pokedex = {
  bulbasaur: {
    name: "Bulbasaur",
    type1: "grass",
    type2: "none",
    level: 5,
    currentHP: 39,
    maxHP: 39,
    nature: "hardy",
    ability: "none",
    heldItem: "none",
    status: "healthy",
    baseStats: { hp_: 45, att: 49, def: 49, spA: 65, spD: 65, spe: 45 },
    stats: { hp_: 20, att: 11, def: 10, spA: 12, spD: 13, spe: 10 },
    moveSet: [
      {
        moveName: "TACKLE",
        type: "normal",
        category: "physical",
        movePP: 35,
        moveMaxPP: 35,
        power: 40,
        accuracy: 1,
      },
      {
        moveName: "VINE WHIP",
        type: "grass",
        category: "physical",
        movePP: 25,
        moveMaxPP: 25,
        power: 45,
        accuracy: 1,
      },
      {
        moveName: "GROWL",
        type: "normal",
        category: "status",
        movePP: 40,
        moveMaxPP: 40,
        power: 0,
        accuracy: 1,
        effect: "op att d1",
      },
      {
        moveName: "POISON POWDER",
        type: "poison",
        category: "status",
        movePP: 35,
        moveMaxPP: 35,
        power: 0,
        accuracy: 0.75,
        effect: "poison",
      },
    ],
  },
  squirtle: {
    name: "Squirtle",
    type1: "water",
    type2: "none",
    level: 5,
    currentHP: 40,
    maxHP: 40,
    nature: "hardy",
    ability: "none",
    heldItem: "none",
    status: "healthy",
    baseStats: { hp_: 44, att: 48, def: 65, spA: 50, spD: 64, spe: 43 },
    stats: { hp_: 17, att: 9, def: 11, spA: 10, spD: 10, spe: 9 },
    moveSet: [
      {
        moveName: "TACKLE",
        type: "normal",
        category: "physical",
        movePP: 35,
        moveMaxPP: 35,
        power: 40,
        accuracy: 1,
      },
      {
        moveName: "BUBBLE",
        type: "water",
        category: "special",
        movePP: 30,
        moveMaxPP: 30,
        power: 40,
        accuracy: 1,
      },
      {
        moveName: "TAIL WHIP",
        type: "normal",
        category: "status",
        movePP: 30,
        moveMaxPP: 30,
        power: 0,
        accuracy: 1,
        effect: "op def d1",
      },
      {
        moveName: "WITHDRAW",
        type: "water",
        category: "status",
        movePP: 40,
        moveMaxPP: 40,
        power: 0,
        accuracy: 1,
        effect: "me def u1",
      },
    ],
  },
  charmander: {
    name: "Charmander",
    type1: "fire",
    type2: "none",
    level: 5,
    currentHP: 38,
    maxHP: 38,
    nature: "hardy",
    ability: "none",
    heldItem: "none",
    status: "healthy",
    baseStats: { hp_: 39, att: 52, def: 43, spA: 60, spD: 50, spe: 65 },
    stats: { hp_: 19, att: 11, def: 9, spA: 12, spD: 11, spe: 12 },
    moveSet: [
      {
        moveName: "SCRATCH",
        type: "normal",
        category: "physical",
        movePP: 35,
        moveMaxPP: 35,
        power: 40,
        accuracy: 1,
      },
      {
        moveName: "EMBER",
        type: "fire",
        category: "special",
        movePP: 25,
        moveMaxPP: 25,
        power: 40,
        accuracy: 1,
      },
      {
        moveName: "GROWL",
        type: "normal",
        category: "status",
        movePP: 40,
        moveMaxPP: 40,
        power: 0,
        accuracy: 1,
        effect: "op att d1",
      },
      {
        moveName: "WILL-O-WISP",
        type: "fire",
        category: "status",
        movePP: 15,
        moveMaxPP: 15,
        power: 0,
        accuracy: 0.85,
        effect: "burn",
      },
    ],
  },
};

const model = {
  p1Pokemon: "charmander",
  p2Pokemon: "squirtle",
  attacker: {},
  defender: {},
  p1Turn: true,
  weather: "none",
  typeChart: {
    normal: { rock: 0.5, ghost: 0, steel: 0.5 }, //Normal attacker has effectiveness X against the following
    fighting: {
      normal: 2,
      flying: 0.5,
      poison: 0.5,
      rock: 2,
      bug: 0.5,
      ghost: 0,
      steel: 2,
      psychic: 0.5,
      ice: 2,
      dark: 2,
      fairy: 0.5,
      light: 0.5,
    },
    flying: {},
    poison: {},
    ground: {},
    rock: {},
    bug: {},
    ghost: {},
    steel: {},
    fire: {
      rock: 0.5,
      bug: 2,
      steel: 2,
      fire: 0.5,
      water: 0.5,
      grass: 2,
      ice: 2,
      dragon: 0.5,
      light: 0.5,
    },
    water: { ground: 2, rock: 2, fire: 2, water: 0.5, grass: 0.5, dragon: 0.5 },
    grass: {
      flying: 0.5,
      poison: 0.5,
      ground: 2,
      rock: 2,
      bug: 0.5,
      steel: 0.5,
      fire: 0.5,
      water: 2,
      grass: 0.5,
      dragon: 0.5,
      light: 2,
    },
    electric: {},
    psychic: {},
    ice: {},
    dragon: {},
    dark: {},
    fairy: {},
    light: {},
  },

  useMove: function (moveNum) {
    //Say the function is passed the number 0, meaning squirtle uses tackle on charmander
    //Model was keeping track of who's turn it is so we don't need to pass which pokemon is using move 0.
    //First would need to calculate the damage of that

    view.displayMessage("");

    if (this.p1Turn === true) {
      this.attacker = pokedex[this.p1Pokemon];
      this.defender = pokedex[this.p2Pokemon];
    } else {
      this.attacker = pokedex[this.p2Pokemon];
      this.defender = pokedex[this.p1Pokemon];
    }

    let damage = 0;

    if (this.attacker.moveSet[moveNum].category !== "status") {
      damage = this.calcDamage(moveNum);

      this.applyDamage(damage);
      view.displayMessage(
        this.attacker.name.toUpperCase() +
          " used " +
          this.attacker.moveSet[moveNum].moveName +
          "! <br> It did " +
          damage +
          " damage!"
      );
    } else {
      view.displayMessage(
        this.attacker.name.toUpperCase() +
          " used " +
          this.attacker.moveSet[moveNum].moveName
      );
    }

    //After applying damage, check if fainted
    this.applyFaint();

    if (this.p1Turn === true) {
      this.p1Turn = false;
    } else {
      this.p1Turn = true;
    }
  },

  calcDamage: function (moveNum) {
    //We already know squirtle has used tackle on charmander from this.useMove
    //First decide if it's a crit
    let critStage = 0;
    const critChance = 0.04167;
    let critModifier = 1;
    if (Math.random() < critChance) {
      critModifier = 1.5;
    }
    //Then we need the randomness
    const randomness = 1 - Math.random() * 0.15;
    //Let's also pull out the stat ratio
    let statRatio = 1;
    if (this.attacker.moveSet[moveNum].category === "physical") {
      statRatio = this.attacker.stats.att / this.defender.stats.def;
    } else if (this.attacker.moveSet[moveNum].category === "special") {
      statRatio = this.attacker.stats.spA / this.defender.stats.spD;
    }
    //Let's also pull out the raw power from level and move power
    const rawPower =
      ((2 * this.attacker.level) / 5 + 2) *
      this.attacker.moveSet[moveNum].power;

    //Is it STAB?
    let STABmodifier = 1;
    if (
      this.attacker.moveSet[moveNum].type === this.attacker.type1 ||
      this.attacker.moveSet[moveNum].type === this.attacker.type2
    ) {
      STABmodifier = 1.5;
    }

    //What's the Effectiveness? 0, 1/8, 1/4, 1/2, 1, 2, 4, 8
    let effectModifier1 = 1;
    let effectModifier2 = 1;
    let effectModifier = 1;

    let moveType = this.attacker.moveSet[moveNum].type;
    let defenderType1 = this.defender.type1;
    let defenderType2 = this.defender.type2;

    if (this.typeChart[moveType][defenderType1] !== undefined) {
      effectModifier1 = this.typeChart[moveType][defenderType1];
    }
    if (this.typeChart[moveType][defenderType2] !== undefined) {
      effectModifier2 = this.typeChart[moveType][defenderType2];
    }
    effectModifier = effectModifier1 * effectModifier2;

    //Is the attacking pokemon burned
    let burnModifier = 1;
    if (this.attacker.status === "burned") {
      burnModifier = 0.5;
    }
    damageAmount = Math.floor(
      ((rawPower * statRatio) / 50 + 2) *
        critModifier *
        randomness *
        STABmodifier *
        effectModifier *
        burnModifier
    );

    return damageAmount;
  },

  applyDamage: function (amount) {
    this.defender.currentHP = Math.max(0, this.defender.currentHP - amount);
    if (this.p1Turn === true) {
      view.changeHealth("p2", this.defender.currentHP, this.defender.maxHP);
    } else {
      view.changeHealth("p1", this.defender.currentHP, this.defender.maxHP);
    }
  },

  applyFaint: function () {
    if (this.defender.currentHP === 0) {
      this.defender.status = "fainted";
      view.displayMessage(this.defender.name.toUpperCase() + " fainted!");
      const moves = document.getElementsByClassName("move");
      for (let i = 0; i < moves.length; i++) {
        moves[i].onclick = "";
        moves[i].onmouseover = "";
      }
    }
  },

  cpuMove: function () {
    this.useMove(Math.floor(Math.random() * 4));
  },
};

// event handlers
window.onload = init;

function init() {
  view.displaySprites();
  view.displayMoves();
  view.displayInfo();
  // view.toggleSetup();
  view.togglePlayArea();

  const moves = document.getElementsByClassName("move");
  for (let i = 0; i < moves.length; i++) {
    moves[i].onclick = handleMoveClick;
    moves[i].onmouseover = handleMoveHover;
    moves[i].onmouseout = handleMoveHoverOut;
  }
  document.getElementById("choice1").onclick = handleChoiceClick;
  document.getElementById("choice2").onclick = handleChoiceClick;
  document.getElementById("choice3").onclick = handleChoiceClick;
}

function handleMoveClick(eventObject) {
  model.useMove(eventObject.target.id[4]);
  if (model.defender.status !== "fainted") {
    model.cpuMove();
  }
}
function handleMoveHover(eventObject) {
  eventObject.target.classList.add("hovered");
}
function handleMoveHoverOut(eventObject) {
  eventObject.target.classList.remove("hovered");
}

function handleChoiceClick(eventObject) {
  model.p1Pokemon = document
    .getElementById(eventObject.target.id)
    .alt.toLowerCase();

  model.p2Pokemon = document
    .getElementById("choice" + (Math.floor(Math.random() * 3) + 1))
    .alt.toLowerCase();
  view.displaySprites();
  view.displayMoves();
  view.displayInfo();
  view.togglePlayArea();
  view.toggleSetup();
}
