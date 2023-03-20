// Let's suppose that we have Storage class
// for our app we required only one single instance of Storage class



export namespace Singletone {
  export class Storage {
    // Define private instance holder
    private static instance: Storage;
    items: { [key: string]: string } = {};

    // Make constructor private as initialization of class is not possible outside of component
    private constructor() {}

    // Create method getInstance that return existing instance or create new instance of Storage class
    static getInstance() {
      if (!Storage.instance) {
        Storage.instance = new Storage();
      }

      return Storage.instance;
    }

    // define some methods
    getItem(key: string) {
      return this.items[key];
    }

    setItem(key: string, val: string) {
      return (this.items[key] = val);
    }
  }

  const storage = Storage.getInstance();

  const key = "key";
  storage.setItem(key, "Hello world");

  const storage2 = Storage.getInstance();
  const response = storage2.getItem(key);

  console.log("response", response); // response in that case is "Hello world"
}
