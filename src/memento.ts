// Let's suppose that we are making a game
// By exploring the world player can save current progress
// Player could run one of previous saved backups(snapshots)

namespace Memento {
  class PlayerBackup {
    constructor(
      public name: string,
      private player: Player,
      private playerXCord: number,
      private playerYCord: number,
      private playerLocation: string,
      private playerLevel: number,
      private playerItems: Array<string>
    ) {}

    restore() {
      this.player.xCord = this.playerXCord;
      this.player.xCord = this.playerYCord;
      this.player.location = this.playerLocation;
      this.player.level = this.playerLevel;
      this.player.items = this.playerItems;
    }
  }

  class Player {
    public level = 1;
    public items: Array<string> = [];

    constructor(
      public name: string,
      public xCord: number,
      public yCord: number,
      public location: string
    ) {}

    makeSnapshot(backupName: string): PlayerBackup {
      // Hear i could also some internal method that is declared in Player class to set all this values
      return new PlayerBackup(
        backupName,
        this,
        this.xCord,
        this.yCord,
        this.location,
        this.level,
        this.items
      );
    }
  }

  const playerWolf = new Player("Wolf", 100, 100, "Basic");
  const snapshot1 = playerWolf.makeSnapshot("Begin");

  playerWolf.level = 2;
  playerWolf.items.push("Meet");
  playerWolf.xCord = 200;
  playerWolf.yCord = 350;

  const snapshot2 = playerWolf.makeSnapshot("First Kill");

  playerWolf.level = 3;
  playerWolf.items.push("Sword");
  playerWolf.location = "Dune";
  playerWolf.xCord = 200;
  playerWolf.yCord = 100;

  const snapshot3 = playerWolf.makeSnapshot("Open new location");

  console.log("current", playerWolf);

  snapshot1.restore();
  console.log("snapshot1", playerWolf);

  snapshot2.restore();
  console.log("snapshot2", playerWolf);

  snapshot3.restore();
  console.log("snapshot3", playerWolf);
}
