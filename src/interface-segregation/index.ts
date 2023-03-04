// // Wong
// interface IDatabase  {
//   getUsers(): Array<any>
//   updateUser(data:any): Array<any>
//   deleteUser(data:any): boolean
//   connect(): void
// }

// class Database implements IDatabase {
//   connect(): void {
//     throw new Error("Method not implemented.");
//   }
//   getUsers(): any[] {
//     throw new Error("Method not implemented.");
//   }
//   updateUser(data: any): any[] {
//     throw new Error("Method not implemented.");
//   }
//   deleteUser(data: any): boolean {
//     throw new Error("Method not implemented.");
//   }
// }

// class Manager {
//   constructor(readonly db:IDatabase){}

//   getAll() {
//     return this.db.getUsers();
//   }
//   update() {
//     return this.db.updateUser({});
//   }
//   delete() {
//     return this.db.deleteUser({});
//   }
// }

// // Wrong as we send entire interface but in that case we need interface just with limited functionality
// class Sellers {
//   constructor(readonly db: IDatabase) {}
//   getAll() {
//     return this.db.getUsers();
//   }
// }

// Correct
interface IReadDatabase {
  getUsers(): Array<any>;
}
interface IWriteDatabase {
  updateUser(data: any): Array<any>;
  deleteUser(data: any): boolean;
}


interface IDatabase extends IReadDatabase, IWriteDatabase {
  connect(): void;
}

class Database implements IDatabase {
  connect(): void {
    throw new Error("Method not implemented.");
  }
  getUsers(): any[] {
    throw new Error("Method not implemented.");
  }
  updateUser(data: any): any[] {
    throw new Error("Method not implemented.");
  }
  deleteUser(data: any): boolean {
    throw new Error("Method not implemented.");
  }
}

class Manager {
  constructor(readonly db: IReadDatabase & IWriteDatabase) {}

  getAll() {
    return this.db.getUsers();
  }
  update() {
    return this.db.updateUser({});
  }
  delete() {
    return this.db.deleteUser({});
  }
}

// In that case Sellers know just that we can read users and nothing more, which is not related to their implementation
class Sellers {
  constructor(readonly db: IReadDatabase) {}
  getAll() {
    return this.db.getUsers();
  }
}
