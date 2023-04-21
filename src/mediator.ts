// Let's suppose that we have login form with different components
// We have several cases:
// 1. on click submit we validate all components
// 2. on click 'change language' we change all texts in to selected one
// 3. on deselecting a input we validate other


namespace Mediator {
  // Hear we describe each event that our controlled event could emit
  type NotificationTypes = "submit" | "setLanguage" | "deselect";

  interface IForm {
    // Method with which we would notify our form
    notify(
      notification: NotificationTypes,
      context?: { sender: any; value?: any }
    ): void;
  }

  interface Component {
    // Declare our form, to whom we would send notifications
    form: IForm;
    label: string;
    value: any;
    validate(): void;
    setLanguage(language: "en" | "other"): void;
  }

  class Form implements IForm {
    components: Array<Component> = [];

    addComponent(component: Component) {
      component.form = this;

      this.components.push(component);
    }

    notify(
      notification: NotificationTypes,
      context?: { sender: any; value: any }
    ): void {
      // Describe what we do with  all components when some event is triggered
      if (notification === "submit") {
        this.components.forEach((component) => component.validate());
        return;
      }

      if (notification === "deselect" && context?.sender) {
        const component = this.components.find(
          (component) => component == context?.sender
        );

        component?.validate();

        return;
      }
      if (notification === "setLanguage" && context?.value) {
        const language = context?.value as "en" | "other";

        this.components.forEach((component) => component.setLanguage(language));

        return;
      }
    }
  }

  class Button implements Component {
    form!: IForm;
    label = "Button";
    value = null;

    onClick() {
      // Trigger an event on click a button
      this.form.notify("submit");
    }

    validate(): void {}

    setLanguage(language: "en" | "other"): void {
      console.log(`${this.label} language set to ${language}`);
    }
  }

  class Input implements Component {
    form!: IForm;
    label = "Input";
    value = "";

    onDeselect() {
      this.form.notify("deselect", { sender: Input });
    }

    onChange(v: string) {
      this.value = v;
    }

    validate(): void {
      console.log("validate " + this.label);
    }
    setLanguage(language: "en" | "other"): void {
      console.log(`${this.label} language set to ${language}`);
    }
  }

  class SelectLanguage implements Component {
    form!: IForm;
    label = "Select Language";
    value = ["en", "other"];

    onSelect(language: typeof this.value[number]) {
      this.form.notify("setLanguage", { sender: this, value: language });
    }

    validate(): void {
      console.log("validate " + this.label);
    }

    setLanguage(language: "en" | "other"): void {
      console.log(`${this.label} language set to ${language}`);
    }
  }

  const form = new Form();

  const input = new Input();
  const selectLanguage = new SelectLanguage();
  const button = new Button();

  form.addComponent(input);
  form.addComponent(selectLanguage);
  form.addComponent(button);

  //
  button.onClick();

  input.onChange("Some text");
  input.onDeselect();

  selectLanguage.setLanguage("other");

  button.onClick();
}
