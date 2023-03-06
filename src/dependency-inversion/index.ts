// // // Wrong
// // type MysqlOrderFeesResponse = any

// // class MysqlDbConnection {
// //   getOrderFees(): MysqlOrderFeesResponse {}
// // }

// // class Calculator {
// //   // Here we pass concrete implementation of db communication which first violate OCP
// //   // Also our class depends on concrete implementation not on interface
// //   constructor(private db: MysqlDbConnection){};

// //   calculateFees() {
// //     return this.db.getOrderFees();
// //   }
// // }


// // Correct
// type OrderFeesResponse = {}

// interface DbConnection {
//   getOrderFees(): OrderFeesResponse
// }

// // Subclass is defined by abstraction not abstraction is defined from implementation
// class MysqlDbConnection implements DbConnection {
//   getOrderFees(): OrderFeesResponse {
//     throw new Error("Method not implemented.");
//   }

// }
// // Subclass is defined by abstraction not abstraction is defined from implementation
// class MongoDbConnection implements DbConnection {
//   getOrderFees(): OrderFeesResponse {
//     throw new Error("Method not implemented.");
//   }
// }


// class Calculator {
//   // Here we pass an abstraction which means that supper-class depends on abstraction not on sub-class implementation
//   constructor(private db: DbConnection) {}

//   calculateFees() {
//     return this.db.getOrderFees();
//   }
// }
