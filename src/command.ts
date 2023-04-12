
// Let's suppose that we are programming a light remote buttons (4 buttons)
// Our light remote buttons are programable
// in our initial requirements we have that:
// when we click on turn-on button all lamps brightness go up to 70% and on second click on turn on light brightness go to 100%
// When we click on turn off brightness go down to 0
// Third button will add 10% of brightness to all lamps
// Forth button will decrease 10% of brightness to all lamps

namespace Command {
  let idVar = 0;
  const getId = () => {
    return idVar++;
  };

  class Lamp {
    constructor(public brightness = 0, public id = getId()) {}

    setBrightness(value: number) {
      this.brightness = value;
    }
  }

  class Remote {
    constructor(private command: ICommander) {}

    turnOnButtonClick() {
      this.command.emit("turnOn");
    }
    turnOffButtonClick() {
      this.command.emit("turnOff");
    }
    middleButton1Click() {
      this.command.emit("button1");
    }
    middleButton2Click() {
      this.command.emit("button2");
    }
  }

  // This is our commander interface
  interface ICommander {
    // This method could be named as we would want, we could also name it execute()
    emit(action: "turnOn" | "turnOff" | "button1" | "button2"): void;
  }
  // Our command handler that will process our actions
  // It is what we gonna program from our phone
  // We could have different implementations of our commander with different logic
  class Commander implements ICommander {
    private clickOnCount: 0 | 1 | 2 = 0;

    // Server is our receiver, hear could be an api, some parse and so on, dosen't metter
    constructor(private server: Server) {}

    public emit(action: "turnOn" | "turnOff" | "button1" | "button2") {
      if (this[action]) {
        this[action]();
      }
    }

    private turnOn() {
      if (this.clickOnCount === 1) {
        const lamps = this.server.getAll();
        lamps.forEach((lamp) => this.server.updateLamp(lamp.id, 100));
        this.clickOnCount += 1;
      }

      if (this.clickOnCount === 0) {
        const lamps = this.server.getAll();
        lamps.forEach((lamp) => this.server.updateLamp(lamp.id, 70));
        this.clickOnCount += 1;
      }
    }
    private turnOff() {
      const lamps = this.server.getAll();
      lamps.forEach((lamp) => this.server.updateLamp(lamp.id, 0));

      this.clickOnCount = 0;
    }

    private button1() {
      const lamps = this.server.getAll();
      lamps.forEach((lamp) => {
        if (lamp.brightness >= 100) {
          return;
        }

        this.server.updateLamp(lamp.id, lamp.brightness + 10);
      });
    }

    private button2() {
      const lamps = this.server.getAll();
      lamps.forEach((lamp) => {
        if (lamp.brightness <= 0) {
          return;
        }

        this.server.updateLamp(lamp.id, lamp.brightness - 10);
      });
    }
  }

  class Server {
    private lamps: Array<Lamp> = [];

    constructor() {}

    connectLamp(lamp: Lamp) {
      this.lamps.push(lamp);
      return this;
    }

    getAll() {
      return this.lamps as Array<Omit<Lamp, "setBrightness">>;
    }

    updateLamp(id: number, brightness: number) {
      this.lamps.find((lamp) => lamp.id === id)?.setBrightness(brightness);
    }
  }

  const server = new Server();

  server
    .connectLamp(new Lamp())
    .connectLamp(new Lamp())
    .connectLamp(new Lamp())
    .connectLamp(new Lamp())
    .connectLamp(new Lamp())
    .connectLamp(new Lamp())
    .connectLamp(new Lamp());

  const commander = new Commander(server);

  // This is our client who will click on our remote
  const user = (remote: Remote) => {
    console.log("server.getAll()", server.getAll());

    remote.turnOnButtonClick();
    console.log("server.getAll() first turnOnButtonClick", server.getAll());

    remote.turnOnButtonClick();
    console.log("server.getAll() second turnOnButtonClick", server.getAll());

    remote.turnOffButtonClick();
    console.log("server.getAll() after turnOffButtonClick", server.getAll());

    remote.middleButton1Click();
    console.log("server.getAll() after middleButton1Click", server.getAll());

    remote.middleButton1Click();
    console.log("server.getAll() after middleButton1Click", server.getAll());

    remote.middleButton2Click();
    console.log("server.getAll() after middleButton2Click", server.getAll());
  };

  user(new Remote(commander));
}
