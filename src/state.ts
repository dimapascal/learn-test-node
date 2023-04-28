// Let's suppose that we are programming a height adjustable desk
// That desk has 1 button to move the desk
// Once desk reaches an obstacle or it's height reaches maximum it changes it's movement direction

namespace StatePattern {
  interface IState {
    name: string
    context: AdjustableDesk;
    move(): void;
  }

  class AdjustableDesk {
    state: IState;
    currentHeight = 68;
    min = 68;
    max = 120;

    constructor() {
      // Init with move up state as our current position is 68 which is minimum
      this.state = new MoveUpState(this);
    }

    // event that is connected to our button
    onMove() {
      this.state.move();
    }

    setState(state: IState) {
      console.log("state changed", state.name);
      this.state = state;
    }

    moveUp() {
      this.currentHeight += 1;
      console.log("moveUp", this.currentHeight);;
    }

    moveDown() {
      this.currentHeight -= 1;
      console.log("moveDown", this.currentHeight);
    }
  }

  class MoveUpState implements IState {
    name = "MoveUpState";
    context: AdjustableDesk;
    constructor(context: AdjustableDesk) {
      this.context = context;
    }
    move(): void {
      // In case that we reach maximum we change state to move table desk down
      if (this.context.currentHeight >= this.context.max) {
        this.context.setState(new MoveDownState(this.context));
        return;
      }
      // If max is not reached we just move up
      this.context.moveUp();
    }
  }

  class MoveDownState implements IState {
    name = "MoveDownState";
    context: AdjustableDesk;
    constructor(context: AdjustableDesk) {
      this.context = context;
    }
    move(): void {
      // In case that we reach minimum we change state to move table desk up
      if (this.context.currentHeight <= this.context.min) {
        this.context.setState(new MoveUpState(this.context));
        return;
      }
      this.context.moveDown();
    }
  }


  const desk = new AdjustableDesk()

  // Simulating just holding the move button
  for (let index = 0; index < 130; index++) {
    desk.onMove()
  }
}
