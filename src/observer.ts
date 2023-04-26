// Let's suppose that we are building sport activity app
// In our any user could subscribe to any team updates
// Once some changes happen with team we send mail to user email

import { getId } from "./utils/get-id";

namespace Observer {
  class Team {
    private subscribers: Map<number, User> = new Map();
    private players: Array<string> = [];


    constructor(public name: string) {}

    subscribe(user: User) {
      const id = getId();
      this.subscribers.set(id, user);

      return id;
    }
    unsubscribe(id: number) {
      this.subscribers.delete(id);
    }

    setPlayers(players: Array<string>){
      this.players = players;
      // Some changes on team happens and we notify about them users
      this.notify()
    }

    // This method will be called once we has some changes in team
    private notify(){
      this.subscribers.forEach((user)=> user.sendEmail(this.name))
    }
  }

  class User {
    constructor(public name: string){}
    sendEmail(teamName: string){
      console.log(
        `User ${this.name} was notified about changes in '${teamName}' team`
      );
    }
  }


  const team1 = new Team('Team 1')
  const team2 = new Team('Team 2')

  const user1 = new User('Dima')
  const user2 = new User('Sandu')
  const user3 = new User('Alex')


  team1.subscribe(user1)
  team1.subscribe(user2)

  const notificationsId = team2.subscribe(user2)
  team2.subscribe(user3)

  team1.setPlayers(['First one'])
  team2.setPlayers(['First one'])

  team2.unsubscribe(notificationsId);

  team2.setPlayers(["Second one"]);
}
