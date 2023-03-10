// requirements, have class Farm and class Animal
// Farm raise animal and then process it's meet

namespace FactoryMethod {
  type Meat = any;

  interface Animal {
    process(): void;

    getMeet(): Meat;
  }

  class Cow implements Animal {
    process(): void {}

    getMeet() {
      return { name: "beef" };
    }
  }

  class Chicken implements Animal {
    process(): void {}

    getMeet() {
      return { name: "poultry" };
    }
  }

  // Superclass that has abstract factory method
  class Farm {
    // factory method
    getAnimal(): Animal {
      throw new Error("Not done");
    }

    processAndGetMeet(): Meat {
      // here we use our factory method (and get abstraction)
      const animal = this.getAnimal();

      animal.process();

      return animal.getMeet();
    }
  }

  // Create subclass and override factory method that will be used later in processAndGetMeet method
  class ChickenFarm extends Farm {
    // override factory method
    getAnimal(): Animal {
      return new Chicken();
    }
  }

  class CowFarm extends Farm {
    getAnimal(): Animal {
      return new Cow();
    }
  }

  const chickenFarm1 = new ChickenFarm();
  const cowFarm1 = new CowFarm();

  const chickenMeet = chickenFarm1.processAndGetMeet();
  console.log("chickenMeet", chickenMeet);

  const cowMeet = cowFarm1.processAndGetMeet();
  console.log("cowMeet", cowMeet);
}
