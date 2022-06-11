const { moveList } = require("./moveList");

class Pokemon {
  constructor(
    name,
    type1,
    type2,
    currentHP,
    maxHP,
    baseStats,
    stats,
    moveSet,
    level = 5,
    nature = "hardy",
    ability = "none",
    heldItem = "none"
  ) {
    this.name = name;
    this.type1 = type1;
    this.type2 = type2;
    this.currentHP = currentHP;
    this.maxHP = maxHP;
    this.baseStats = baseStats;
    this.stats = stats;
    this.moveSet = moveSet;
    this.status = "healthy";
    this.level = level;
    this.nature = nature;
    this.ability = ability;
    this.heldItem = heldItem;
  }
  takeDamage(amount) {
    this.hitPoints = Math.max(this.hitPoints - amount, 0);
  }
  useMove() {
    // console.log(`${this.name} used ${this.move}`);
    // return this.attackDamage;
  }
  hasFainted() {
    if (this.hitPoints === 0) {
      return true;
    } else {
      return false;
    }
  }
}

class Bulbasaur extends Pokemon {
  constructor(
    level = 5,
    nature = "hardy",
    ability = "none",
    heldItem = "none"
  ) {
    (this.name = "bulbasaur"),
      (this.type1 = "grass"),
      (this.type2 = "poison"),
      (this.baseStats = baseStats),
      (this.moveSet = [
        moveList.tackle,
        moveList.vineWhip,
        moveList.growl,
        moveList.poisonPowder,
      ]),
      (this.level = level),
      (this.nature = nature),
      (this.ability = ability),
      (this.heldItem = heldItem);
  }
}

module.exports = { Pokemon, Bulbasaur };
