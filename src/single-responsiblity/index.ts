// // // Wrong:
// // class Employee {
// //   constructor(protected name: string, protected toPay: number) {}

// //   updateName(name: string) {
// //     this.name = name;
// //   }

// //   updateToPay(toPay: number) {
// //     this.toPay = toPay;
// //   }
// // }
// // // New requirements: Now we have partners in project
// // class Partner {
// //   constructor(protected name: string, protected income: number) {}
// //   //REUSE OF SAME METHOD
// //   updateName(name: string) {
// //     this.name = name;
// //   }

// //   updateIncome(income: number) {
// //     this.income = income;
// //   }
// // }

// // // New requirements: Now we have sub company
// // class SubCompany {
// //   constructor(protected serialNumber: string, protected toPay: number) {}

// //   updateSerialNumber(name: string) {
// //     this.serialNumber = name;
// //   }

// //   //REUSE OF SAME METHOD
// //   updateToPay(toPay: number) {
// //     this.toPay = toPay;
// //   }
// // }


// // // Correct version should look like:
// // class Person {
// //   constructor(public name: string) {}

// //   updateName = (name: string) =>{
// //     this.name = name;
// //   }
// // }

// // class Payable {
// //   constructor(public toPay: number) {}

// //   updateToPay =(toPay: number)=> {
// //     this.toPay = toPay;
// //   }
// // }

// // class Employee {
// //   constructor(name: string, toPay: number) {
// //     Object.assign(this, new Person(name));
// //     Object.assign(this, new Payable(toPay));
// //   }
// // }

// // export const employee = new Employee('Dima', 10);


// // // // Correct version2 should look like:
// // interface Person {
// //   name: string;
// //   updateName(name: string): void;
// // }

// // interface Payable {
// //   toPay: number;
// //   updateToPay(value: number): void;
// // }


// // class Employee implements Person, Payable {
// //   constructor(private _name: string, private _toPay: number) {}
// //   public get toPay() {
// //     return this._toPay;
// //   }

// //   public get name() {
// //     return this._name;
// //   }

// //   updateToPay(value: number): void {
// //     throw (this._toPay = value);
// //   }

// //   updateName(name: string): void {
// //     this._name = name;
// //   }
// // }

// // export const employee = new Employee('dima', 1000);



// // Correct version2 should look like:
// interface Person {
//   name: string;
//   updateName(name: string): void;
// }

// interface Payable {
//   toPay: number;
//   updateToPay(value: number): void;
// }


// class Employee implements Person, Payable {
//   constructor(private _name: string, private _toPay: number) {}
//   public get toPay() {
//     return this._toPay;
//   }

//   public get name() {
//     return this._name;
//   }

//   updateToPay(value: number): void {
//     throw (this._toPay = value);
//   }

//   updateName(name: string): void {
//     this._name = name;
//   }
// }

// export const employee = new Employee('dima', 1000);
