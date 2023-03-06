// // // Wrong
// // class Car {
// //   move(_maximumSpeed: number, _angle: number) {}
// // }


// // class Road {
// //   static maximumSpeed = 0;
// //   static angle = 0;

// //   static ride(entity: Car | Person) {
// //     if (entity instanceof Car) {
// //       entity.move(Road.maximumSpeed, Road.angle);
// //     }
// //     if (entity instanceof Person) {
// //       entity.walk(Road.angle);
// //     }
// //   }
// // }

// // const car1 = new Car()

// // Road.ride(car1)

// // // Then we would want person to be able to move on road
// // class Person {
// //   walk(_angle: number) {}
// // }

// // const person1 = new Person();
// // // To add ability for person to be executed by method ride i changed it in Road class which is violation of closed principle
// // Road.ride(person1);





// // // Correct version would look like:

// interface Movable {
//   move(_maximumSpeed: number, _angle: number): void;
// }


// class Road {
//   static maximumSpeed = 0;
//   static angle = 0;

//   static ride(car: Movable) {
//     car.move(Road.maximumSpeed, Road.angle);
//   }
// }

// // class Car {
// //   name='car'
// //   move(_maximumSpeed: number, _angle: number) {}
// // }

// // class Person {
// //   name='person'
// //   walk(_angle: number) {}
// // }

// // // Here i have not modified Person class but extended it with new method move
// // class MovablePerson extends Person implements Movable {
// //   move(_maximumSpeed: number, _angle: number): void {
// //     this.walk(_angle)
// //   }
// // }

// // const car1 = new Car()
// // const person1 = new MovablePerson();

// // Road.ride(car1)
// // Road.ride(person1)

// // Correct 2 version would look like:

// class Car implements Movable {
//   name='car'
//   move(_maximumSpeed: number, _angle: number) {}
// }

// class Person implements Movable {
//   name = "person";
//   walk(_angle: number) {}

//   // Here i created an proxy method that takes walk methods and adapts it to Movable interface
//   // Definitely easier would be just to change walk in to move but just wanted to show how it would look
//   // All new classes should created with implementation of Movable method
//   move(_maximumSpeed: number, _angle: number): void {
//     this.walk(_angle);
//   }
// }

// const car1 = new Car()
// const person1 = new Person();

// Road.ride(car1)
// Road.ride(person1)
