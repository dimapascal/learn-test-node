// Let's suppose we have website builder, to create new element on page we drag existing components from menu and clone it on our page
// for our example we would use Buttons section where we would have different styled buttons, IconButton, TextButton, SubmitButton
// When we drag button we call method clone() on our button and get exact copy of our current button




namespace Prototype {
  class Button {
    constructor(
      public name: string,
      public isIcon?: boolean,
      public title?: string
    ) {}

    // Define clone method which will return new copy of Button with exactly the same props
    clone(): Button {
      return new Button(this.name, this.isIcon, this.title);
    }
  }

  function dragButton(target: Button) {
    return target.clone();
  }

  const iconButtonPrototype = new Button("icon", true);
  const textButtonPrototype = new Button("text", false, "Default");
  const submitButtonPrototype = new Button("submit", false, "Default");

  // Now i can drop that copy as it is without affecting of initial button
  console.log("Drop copy in app", dragButton(iconButtonPrototype));


  const textButton = dragButton(textButtonPrototype);
  // Also i could modify predefined copy without affecting of initial button
  textButton.title = "Click me to get cookies";
  console.log("Drop copy in app", textButton);
}
