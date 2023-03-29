// Let's suppose we have DB that before every request requires to connect to it
// And after request is done we need to finish that connection
// We need to simplify request method to don't need in each place where we want to connect to db, to have those methods, connect and disconnect

namespace Facade {

  class Database {
    connect() {
      console.log("Connected");
    }
    disconnect() {
      console.log("Disconnected");
    }

    request(request?: string) {
      console.log("Make some request: ", request);
    }
  }




  class DatabaseFacade {
    constructor(private db: Database){}
    request(request?: string) {
      // Also let's suppose that our request requires some user data
      // And that data we need to fetch from some api first
      // ...

      this.db.connect();
      // Hear i also have some parsing or validation logic from other methods
      // ...


      this.db.request(request);

      this.db.disconnect();
    }
  }

}
