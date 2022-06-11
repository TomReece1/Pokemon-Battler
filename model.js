const { view } = require("./view");

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

    this.applyPP(moveNum);

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

  applyPP: function (moveNum) {
    // if (this.attacker.moveSet[moveNum].movePP > 0) {
    this.attacker.moveSet[moveNum].movePP--;
    console.log(this.attacker.moveSet[moveNum].movePP);
    if (this.p1Turn) {
      view.changePP(
        moveNum,
        this.attacker.moveSet[moveNum].movePP,
        this.attacker.moveSet[moveNum].moveMaxPP
      );
    }
    // }
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

module.exports = model;
