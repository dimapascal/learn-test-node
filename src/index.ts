// Person should take and put any item from closet
// Person should write on paper using Biro

interface IItem {
  name: string
}

interface IBiro extends IItem {
  decorateText(text: string): string;
  write(text: string, paper: IPaper): IPaper;
}

interface IPaper extends IItem {
  text: Array<{text:string, wroteWith: IBiro}>;
  write(text: string, item: IBiro): IPaper;
  read():string;
}

interface ICloset {
  items: Array<IItem>;

  watchAllItems(): Array<IItem>;
  insertItem(item: IItem): void;
  getItem(itemName: string): IItem | undefined;
}


interface IPerson {
  name: string;
  items: Array<IItem>;

  write(text: string): IPaper;

  lookInClosed(closed: ICloset): Array<IItem>;
  takeItem(closed: ICloset, itemName: string): void;
  putItem(closed: ICloset, itemName: string): void;
}

// Items

class Biro implements IBiro {
  public name = "biro";

  write(text: string, paper: IPaper): IPaper {
    return paper.write(text, this);
  }
  decorateText(text: string): string {
    throw new Error("Method not implemented.");
  }
}
class Pencil extends Biro {
  public name = "pencil";
  decorateText(text: string): string {
    return `<pencil>${text}</pencil>\n`;
  }
}
class Pen extends Biro {
  public name = "pen";
  decorateText(text: string): string {
    return `<pen>${text}</pen>\n`;
  }
}


class Paper implements IPaper {
  public name = "paper";
  public text: Array<{text:string, wroteWith: IBiro}> = [];

  write(text: string, wroteWith: IBiro): IPaper {
    this.text.push({ text, wroteWith });

    return this;
  }

  read(){
   return  this.text.reduce((acc,{text, wroteWith})=> {
      acc += wroteWith.decorateText(text);
      return acc;
    },'')
  }
}

class Pocket implements IItem {
  public name = "pocket";
}

// Closet
class Closet implements ICloset {
  constructor(public items: Array< IItem>){}

  watchAllItems(): IItem[] {
    return this.items
  }

  insertItem(item: IItem): void {
     this.items.push(item)
  }

  getItem(itemName: string): IItem | undefined {
    return this.items.find((i) => i.name === itemName);
  }
}

// Person
class Person implements IPerson {
  items: IItem[] = [];

  constructor(public name: string) {}

  lookInClosed(closed: ICloset): IItem[] {
    return closed.watchAllItems();
  }

  write(text: string): IPaper {
    const paper = this.items.find((item) => item instanceof Paper);

    if (!paper){
      throw new Error("No paper was taken");
    }
    const biro = this.items.find((item) => item instanceof Biro);

    if (!biro) {
      throw new Error("No biro was taken");
    }

    return (paper as Paper).write(text, biro as Biro);
  }

  takeItem(closed: ICloset, itemName: string): void {
    const item = closed
      .watchAllItems()
      .find((item) =>item.name === itemName);


    if (!item){
      throw new Error("This item is not in Closet");
    }

    this.items.push(item);
  }

  putItem(closed: ICloset, itemName: string): void {
    const itemIndex = this.items.findIndex((item) => item.name === itemName);

    if (itemIndex===-1){
      throw new Error("User don't have such item");
    }

    closed.insertItem(this.items.splice(itemIndex, 1)[0]);
  }
}


// How it works
const person1 = new Person('Dima')
const closed1 = new Closet([
  new Pencil(),
  new Pencil(),
  new Pencil(),
  new Pen(),
  new Pocket(),
  new Paper(),
]);


console.log('that is inside',  person1.lookInClosed(closed1));;

person1.takeItem(closed1, 'paper')
person1.takeItem(closed1, 'pen')


person1.write('Hello world')

person1.putItem(closed1, "pen");
person1.takeItem(closed1, "pencil");

person1.write("Hello again");

person1.putItem(closed1, "paper");


const paper = closed1.getItem('paper')

if(paper){
  const text = (paper as IPaper).read()

  console.log(text);
}
