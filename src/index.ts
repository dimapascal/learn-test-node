// Let's suppose that we are making some controller to handle request prepare data and later to get some response
// By requirements our we should be able to have different databases one sql and other for no-sql


interface User {}

// Our controller which will require some service
class Controller {
  // This constructor was implemented later
  constructor(private userService: AUserService) {}

  getById(id: number): User {
    return this.userService.getById(id);
  }

  getAll(): Array<User> {
    return this.userService.getAll();
  }
}


// Our Interface with required methods to fetch data from db
// But our concrete service should also require some abstraction over databases
// as database implementations could vary
interface AUserService {
  getById(id: number): User;
  getAll(): Array<User>;
}



// Our abstraction over database
interface IDatabase {
  fetch(request?: any): any
}

// Now we implement our concrete databases
// They should implement Database to be possible to inject DB classes in our services that require this interface
class SQLDatabase implements IDatabase {
  fetch(request: any) {
    if (request) {
      return { name: "user by id" };
    }

    return [{ name: "many users" }];
  }

}

class NoSQLDatabase implements IDatabase {
  fetch(request: any) {
    if (request) {
      return { name: "user by id" };
    }

    return [{ name: "many users" }];
  }
}

// Now we could make some concrete User service
class UserService implements AUserService {
  constructor(private db: IDatabase) {}

  getById(id: number): User {
    return this.db.fetch({ id });
  }
  getAll(): User[] {
    return this.db.fetch();
  }
}

// Now let's implement our injector
// In our case this will be just some function that is called when project starts
const main = (sql?: boolean) => {
  let db!: IDatabase;
  // Init our database with correct implementation
  if (sql) {
    db = new SQLDatabase();
  } else {
    db = new NoSQLDatabase();
  }

  // Inject our database in service
  const userService = new UserService(db);

  // Inject service in our client
  const controller = new Controller(userService);

  return controller
}

const controller = main()

console.log("getAll()", controller.getAll());
console.log("getById()", controller.getById(1));
