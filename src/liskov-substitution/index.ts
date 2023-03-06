

// class Paper {
//   text = "";

//   write(text: string) {
//     this.text = text;
//     return text;
//   }
// }

// // Wrong
// // class Letter extends Paper {
// //   sign = "";
// // // Here i have violation onf LSP because i overwrided parent method write with new one
// // // Now all methods that uses my class Letter should know exactly that all letters should have sign
// //   write(text: string, sign: string) {
// //     this.text = text;
// //     this.sign = sign;
// //     return text
// //   }
// // }

// class MyPerson {
//   notes = "My notes";

//   makeNotes(paper: any) {
//     paper.write(this.notes);
//   }
// }

// // Here i added new method addSign for signs and haven't touched write method
// // So any method that could write on Paper now can also write on Letter and know exactly how to do that and know what would receive back
// class Letter extends Paper {
//   sign = "";

//   // write(text: string) {
//   //   this.text = text;
//   //   return text
//   // }

//   addSign(sign: string) {
//     this.sign = sign;
//   }
// }
