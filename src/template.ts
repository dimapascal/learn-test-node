// Let's suppose that we are creating website creating app
// This app will components will have a method named construct which should get all children data all props and so on
// then will parse and transform in to json

namespace Template {
  abstract class ComponentTemplate {
    children: Array<ComponentTemplate> = [];

    // Could be overwrite
    getChildrenData() {
      return this.children.map((child) => child.construct());
    }

    // Could be overwrite
    transform(props: object, content: object, children: Array<string>) {
      return JSON.stringify({
        props,
        content,
        children,
      });
    }

    // Should be overwrite
    abstract getProps(): object;
    abstract getContent(): object;

    // Our method which describes our algorithm of transforming of our component in to json object
    construct(): string {
      const props = this.getProps();
      const content = this.getContent();
      const children = this.getChildrenData();

      return this.transform(props, content, children);
    }
  }

  class ButtonComponent extends ComponentTemplate {
    // Now we just overwrite algorithms method's but we still keep algorithm itself untouched
    getProps(): object {
      return { some: "Props" };
    }
    getContent(): object {
      return { some: "Content" };
    }
  }

  class TextComponent extends ComponentTemplate {
    // Now we just overwrite algorithms method's but we still keep algorithm itself untouched
    getProps(): object {
      return { some: "Props" };
    }
    getContent(): object {
      return { some: "Content" };
    }
  }

  const btn = new ButtonComponent();

  console.log("btn.construct", btn.construct());
}
