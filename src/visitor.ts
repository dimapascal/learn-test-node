// Let's suppose that we are building a video game
// we have some classes this are players and mobs that exist in the world
// Player, Horse, Donkey, Villager
// In one day you decide to implement ultimate-skill that will reduce damage and will set a list of baths on your characters
// each of character will have it's buff and damage and so on
// to do that you decide to implement visitor pattern to keep all logic in one place and to don't change all classes to much

namespace Visitor {
  // to implement our pattern we would need to create our visitor interface

  interface MassiveCastVisitor {
    doForPlayer(p: Player): void;
    doForHorse(p: Horse): void;
    doForDonkey(p: Donkey): void;
    doForVillager(p: Villager): void;
  }

  // Now in each of our classes we implement accept method that will take a visitor as param
  class Player {
    health = 20;
    // ...some methods

    // Each of methods accept will call it's method in visitor class
    accept(v: MassiveCastVisitor) {
      v.doForPlayer(this);
    }
  }
  class Horse {
    health = 15;
    // ...some methods

    // Each of methods accept will call it's method in visitor class
    accept(v: MassiveCastVisitor) {
      v.doForHorse(this);
    }
  }
  class Donkey {
    health = 10;
    // ...some methods

    accept(v: MassiveCastVisitor) {
      v.doForDonkey(this);
    }
  }
  class Villager {
    health = 8;
    // ...some methods

    accept(v: MassiveCastVisitor) {
      v.doForVillager(this);
    }
  }

  // now lets implement some concrete mass cast
  class MassiveEnergyWave implements MassiveCastVisitor {
    doForPlayer(p: Player): void {
      p.health -= 5;
    }
    doForHorse(p: Horse): void {
      p.health -= 2;
    }
    doForDonkey(p: Donkey): void {
      p.health -= 1;
    }
    doForVillager(p: Villager): void {
      p.health -= 3;
    }
  }

  const player1 = new Player();
  const player2 = new Player();
  const player3 = new Player();
  const horse = new Horse();
  const villager = new Villager();

  // How all characters that are in radius of you massive cast will be damaged
  const nearestCharacters = [player1, player2, player3, horse, villager];

  console.log("nearestCharacters", nearestCharacters);

  const castedMassiveUltimateSkill = new MassiveEnergyWave();
  // each of character will know which method to call
  nearestCharacters.forEach((ch) => ch.accept(castedMassiveUltimateSkill));

  console.log("nearestCharacters", nearestCharacters);
}
