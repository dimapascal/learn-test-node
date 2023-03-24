// We are Software development company
// Our company works on hierarchical methodology
// It means that any developer could also has role of manager and could have smaller teams of developers
// Every manager developer is payed with 0.25%-2% more from all of it's sub developers
// With other words manager salary is: sum(sub_developers) + 1%
// And now we would like to calculate what is sum off all salaries that we should pay

namespace Composite {
  interface IDeveloper {
    uuid: string;
    getSalary(): number;
  }

  class Developer implements IDeveloper {
    constructor(private salary: number) {
      this.uuid = `${Date.now()}-${Math.random()}`;
    }
    uuid: string;

    getSalary() {
      return this.salary;
    }
  }

  class Manager implements IDeveloper {
    constructor(
      private salary: number,
      private managerTax: number,
      private developers: Array<IDeveloper> = []
    ) {
      this.uuid = `${Date.now()}-${Math.random()}`;
    }
    uuid: string;

    addDeveloper(dev: IDeveloper) {
      this.developers.push(dev);
    }
    removeDeveloper(uuid: string) {
      this.developers = this.developers.filter((dev) => dev.uuid !== uuid);
    }

    getSalary(): number {
      if (!this.developers.length) {
        return this.salary;
      }

      const developersSalary = this.developers.reduce(
        (sum, dev) => (sum += dev.getSalary()),
        0
      );

      const developersSalaryWithManagerTax =
        (developersSalary * (this.managerTax + 100)) / 100;

      return developersSalaryWithManagerTax + this.salary;
    }
  }

  const director = new Manager(100_000, 2);

  const Senior1 = new Developer(80_000);
  const Senior2 = new Developer(80_000);
  const Senior3 = new Developer(70_000);
  const Middle1 = new Developer(62_000);
  const Middle2 = new Developer(65_000);
  const Middle3 = new Developer(61_000);
  const Middle4 = new Developer(66_000);
  const Middle5 = new Developer(59_000);
  const Middle6 = new Developer(51_000);
  const Junior1 = new Developer(45_000);
  const Junior2 = new Developer(35_000);

  const MainManager1 = new Manager(80_000, 1);
  const MainManager2 = new Manager(78_000, 1);
  const Manager1 = new Manager(72_000, 0.5);
  const Manager2 = new Manager(66_000, 0.5);
  const Manager3 = new Manager(60_000, 0.4);
  const JuniorManager = new Manager(50_000, 0.25);

  // Hear our dippiest managers hierarchy is:
  // Director -> MainManager2 -> Manager3 -> JuniorManager -> Some dev's

  director.addDeveloper(Senior1);
  director.addDeveloper(Senior2);
  director.addDeveloper(MainManager1);
  director.addDeveloper(MainManager2);

  MainManager1.addDeveloper(Senior3);
  MainManager1.addDeveloper(Middle1);
  // Some managers could not have developers yet
  MainManager1.addDeveloper(Manager1);
  MainManager1.addDeveloper(Manager2);

  MainManager2.addDeveloper(Middle2);
  MainManager2.addDeveloper(Middle3);
  MainManager2.addDeveloper(Manager3);

  Manager3.addDeveloper(Middle4);
  Manager3.addDeveloper(Middle5);
  Manager3.addDeveloper(JuniorManager);

  JuniorManager.addDeveloper(Middle6);
  JuniorManager.addDeveloper(Junior1);
  JuniorManager.addDeveloper(Junior2);


  // No we could take any dev or manager and calculate it's salary

  console.log('director',director.getSalary());
  console.log("MainManager1", MainManager1.getSalary());
  console.log("MainManager2", MainManager2.getSalary());
  console.log("Manager1", Manager1.getSalary());
  console.log("Manager2", Manager2.getSalary());
  console.log("Manager3", Manager3.getSalary());
  console.log("JuniorManager", JuniorManager.getSalary());
}
