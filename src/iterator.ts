namespace IteratorPattern {
  let idVar = 0;
  const getId = () => {
    return idVar++;
  };

  class App {
    users: { [id: number]: User } = [];

    createUser(name: string) {
      const user = new User(name, this);

      this.users[user.id] = user;

      return user;
    }
  }

  // This is interface of our iterable object
  // With that interface we define that our user friends are iterable
  // and we return our iterator
  interface IIterableUser {
    createFriendsIterator(params?: any): IUsersIterator;
  }

  // This is our iterator interface
  // Hear we define just 2 methods but implementation of method getNext could be as we would like
  // Example, we could iterate in deepest friends or, just nearest friends or iterate in reverse
  interface IUsersIterator {
    hasMore(): boolean;
    getNext(): User;
  }

  class User implements IIterableUser {
    id: number;
    private friends: Array<number> = [];
    constructor(public name: string, private app: App) {
      this.id = getId();
    }

    addFriend(id: number) {
      this.friends.push(id);
    }

    createFriendsIterator(reverse?: boolean): IUsersIterator {
      if (reverse) {
        return new ReverseFriendsIterator(this.friends, this.app);
      }
      return new NearestFriendsIterator(this.friends, this.app);
    }
  }

  class NearestFriendsIterator implements IUsersIterator {
    constructor(private friends: Array<number>, private app: App) {}

    currentIndex = 0;

    hasMore(): boolean {
      return this.friends.length > this.currentIndex;
    }

    getNext(): User {
      const user = this.app.users[this.friends[this.currentIndex]];

      this.currentIndex++;

      return user;
    }
  }

  class ReverseFriendsIterator implements IUsersIterator {
    currentIndex: number;

    constructor(private friends: Array<number>, private app: App) {
      this.currentIndex = friends.length;
    }

    hasMore(): boolean {
      return !!this.currentIndex;
    }

    getNext(): User {
      const user = this.app.users[this.friends[this.currentIndex]];

      this.currentIndex--;

      return user;
    }
  }

  const client = () => {
    const app = new App();

    const user1 = app.createUser("Dima");
    const user2 = app.createUser("Sandu");
    const user3 = app.createUser("Alex");
    const user4 = app.createUser("Sergiu");
    const user5 = app.createUser("Maria");
    const user6 = app.createUser("Ion");
    const user7 = app.createUser("Anton");

    user1.addFriend(user2.id);
    user1.addFriend(user3.id);
    user1.addFriend(user4.id);

    user2.addFriend(user4.id);
    user2.addFriend(user5.id);
    user2.addFriend(user6.id);

    user7.addFriend(user1.id);
    user7.addFriend(user2.id);

    function iterateFriends(name: string, iterator: IUsersIterator) {
      while (iterator.hasMore()) {
        console.log(`${name} friend is ${iterator.getNext().name}`);
      }
    }

    iterateFriends(user1.name, user1.createFriendsIterator());
    iterateFriends(user2.name, user2.createFriendsIterator());
    iterateFriends(user7.name, user7.createFriendsIterator());
  };

  client();
}

namespace IteratorPatternInJs {
  let idVar = 0;
  const getId = () => {
    return idVar++;
  };

  class User {
    constructor(public name: string, public id = getId()) {}
  }

  type IUsers = {
    [id: number]: User;
  };

  const user1 = new User("Dima");
  const user2 = new User("Sandu");
  const user3 = new User("Alex");
  const user4 = new User("Sergiu");
  const user5 = new User("Maria");

  const users: IUsers = {
    [user1.id]: user1,
    [user2.id]: user2,
    [user3.id]: user3,
    [user4.id]: user4,
    [user5.id]: user5,
  };

  function* iterateUsers(
    collection: IUsers
  ): Generator<User, number, boolean> {
    const list = Object.values(collection);

    let iterationCount = 0;
    for (let i = 0; i < list.length; i++) {
      iterationCount++;
      yield list[i];
    }

    return iterationCount;
  }
  function* iterateIds(collection: IUsers): Generator<number, number, boolean> {
    const list = Object.keys(collection);

    let iterationCount = 0;
    for (let i = 0; i < list.length; i++) {
      iterationCount++;
      yield parseInt(list[i]);
    }

    return iterationCount;
  }



}
