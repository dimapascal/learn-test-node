//Not the best case, but let's suppose that we need to create a of iphone's
// we could have a factory just of cheap, affordable or expensive iphone's
// our factory produces next models: x, 11, 12


namespace AbstractFactory {
  type Photo = any;
  type CallStream = any;
  type Message = any;

  interface Iphone {
    processor: string;
    makePhoto(): Photo;
    call(): CallStream;
    getMessages(): Array<Message>;
    writeMessage(message: Message): Boolean;
  }

  // Describe variability of Iphone's

  // Suppose this are concrete implementations of
  interface IphoneX extends Iphone {
    processor: "Bionic 13";
  }

  interface IphoneXCheap extends IphoneX {
    price: 600;
  }
  interface IphoneXAffordable extends IphoneX {
    price: 700;
  }
  interface IphoneXExpensive extends IphoneX {
    price: 800;
  }

  // Suppose this are concrete implementations
  interface Iphone11 extends Iphone {
    processor: "Bionic 14";
  }

  interface Iphone11Cheap extends Iphone11 {
    price: 700;
  }
  interface Iphone11Affordable extends Iphone11 {
    price: 800;
  }
  interface Iphone11Expensive extends Iphone11 {
    price: 900;
  }

  // Suppose this are concrete implementations
  interface Iphone12 extends Iphone {
    processor: "Bionic 15";
  }

  interface Iphone12Cheap extends Iphone12 {
    price: 800;
  }
  interface Iphone12Affordable extends Iphone12 {
    price: 900;
  }
  interface Iphone12Expensive extends Iphone12 {
    price: 1000;
  }

  // Now we need to define abstract factory

  interface IphoneFactory {
    createIphoneX(): IphoneX;
    createIphone11(): Iphone11;
    createIphone12(): Iphone12;
  }

  // Here i suppose that i have implementations of IphoneFactory
  interface CheapIphoneFactory extends IphoneFactory {
    createIphoneX(): IphoneX;
    // return new IphoneXChip()
    createIphone11(): Iphone11;
    // return new Iphone11Chip()
    createIphone12(): Iphone12;
    // return new Iphone12Chip()
  }

  interface AffordableIphoneFactory extends IphoneFactory {
    createIphoneX(): IphoneX;
    // return new IphoneXAffordable()
    createIphone11(): Iphone11;
    // return new Iphone11Affordable()
    createIphone12(): Iphone12;
    // return new Iphone12Affordable()
  }

  interface ExpensiveIphoneFactory extends IphoneFactory {
    createIphoneX(): IphoneX;
    // return new IphoneXExpensive()
    createIphone11(): Iphone11;
    // return new Iphone11Expensive()
    createIphone12(): Iphone12;
    // return new Iphone12Expensive()
  }

  // Now let's use our factories


  const main = (type: "cheap"| "affordable" | "expensive")=> {

    let factory: IphoneFactory

    if (type === "cheap") {
      // Let's suppose that here we create our abstract factory
      factory = {} as CheapIphoneFactory;
    } else if (type === "affordable") {
      // Let's suppose that here we create our abstract factory
      factory = {} as AffordableIphoneFactory;
    } else if (type === "expensive") {
      // Let's suppose that here we create our abstract factory
      factory = {} as ExpensiveIphoneFactory;
    } else {
      throw new Error('Unknown type')
    }

    console.log("Use factory", factory);
  }

}
