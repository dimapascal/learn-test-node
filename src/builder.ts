// let's suppose that we are food company and we create each order step by step
// the final order is big object with a lot of data which we require for our statistics metrics and so on
// but constructor of our order is very big, and here we decide to use builder pattern


namespace FactoryMethod {

  class Order {
    // Problem: We have big constructor, We could have comment but don't have any additions
    constructor(
      public user: any,
      public bundles: any,
      public paymentMethod: any,
      public additions?: any,
      public utensils?: any,
      public comment?: any
    ) {}
  }

  // We suppose that we implement our builder, in that case we define all methods that we would need to build our order
  // Later define build() method that we would use to create our actual order
  // Also is good to have reset() method to use clear builder from previous usage
  interface IOrderBuilder {
    bundles: Array<any>;
    constructor(user: any): void;
    reset(): IOrderBuilder;

    addBundle(b: any): IOrderBuilder;

    addAdditions(b: any): IOrderBuilder;
    addUtensils(b: any): IOrderBuilder;

    addComment(b: any): IOrderBuilder;

    setPaymentMethod(b: any): IOrderBuilder;

    build(): Order;
    // {
    //   Hear is how our builder would look like
    //   return new Order(this.user, this.bundles, this.paymentMethod, this.additions, this.utensils, this.comment)
    // }
  }

}
