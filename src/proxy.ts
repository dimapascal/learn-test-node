// Let’s suppose we have an object that makes requests to database
// But we should not allow not admin users to make requests, that is why we decided to implement a proxy that will check who make’s the request and to check if user is allowed to make that request
// We have class Database {} with some methods, each method has 3 params: query, data, ctx (in ctx we store all data related to who did a request)
// Now we create AdminDatabaseProxy and we implement checking of user rights from ctx


namespace ProxyPattern {
  interface IDatabase {
    makeRequest(query:string, data:any, ctx:any) : Promise<any>
  }

  // Hear i defined oject to which we would want to restrict access to some users
  class Database implements IDatabase {
    async makeRequest(query: string, data: any, ctx: any) {
      return "response"
    }
  }

  // This is our proxy
  class AdminDatabaseProxy implements IDatabase {
    constructor(private database: IDatabase) {}

    makeRequest(query: string, data: any, ctx: any) {
      // Hear we restrict access to not admin user
      if (ctx?.user?.role !== "admin") {
        throw new Error("403");
      }

      return this.database.makeRequest(query, data, ctx);
    }
  }
}


namespace NodeProxyPattern {
  class Database {
    async makeRequest(query: string, data: any, ctx: any) {
      return "response";
    }
  }

  const database = new Database();

  const guardedDatabase = new Proxy(database, {
    apply(target, thisArg, args) {
      if (args[args.length - 1]?.user?.role !== "admin") {
        throw new Error("403");
      }
      return target.makeRequest.apply(thisArg, args as any);
    },
  });


  // guardedDatabase.makeRequest()
}
