// Let's suppose we are factory of batteries
// Per hour we produce 100_000 batteries
// By requirements we store information about all produced batteries 1 hour
// till batteries are verified and after that we move that data to another place :)
// All batteries has next properties type: "" quality: "(from C to A)" status:  and validationTime
// Properties type and quality are intrinsic as they are immutable on our battery lifecycle but status and validationTime are extrinsic as those are mutable
// We need to describe our battery object creation process

namespace Flyweight {
  // Hear we implement creation of our intrinsic data creation
  type Types = "AAA"|"AA"|"A"
  type Quality = "A"|"B"|"C"
  class BatterType {
    private static types: Array<BatterType> = [];
    private constructor(public type: string, public quality: string) {}
    static getType(type: Types, quality: Quality) {
      const batteryType = BatterType.types.find(
        (batteryType) =>
          batteryType.quality === quality && batteryType.type === type
      );

      if (batteryType) {
        return batteryType;
      }

      const newBatteryType = new BatterType(type, quality);
      BatterType.types.push(newBatteryType);

      return newBatteryType;
    }
  }


  // Hear i defined creation of batteries which contains extrinsic
  class Battery {
    // Those data are mutable so this are  extrinsic props
    public status: "verified" | "not-verified" = "not-verified";
    public validationTime?: number;
    public validationErrorMessage?: string;

    // Hear i assign type which is ref to our immutable object (which contains our intrinsic data)
    constructor(public id: number, public type: BatterType) {}
  }


  const  probably = (percentage:number) => {
    return Math.random() * 100 < percentage;
  }

  const validate = (battery: Battery) => {
    if (probably(1)) {
      battery.validationErrorMessage = "You have error message";
    }

    battery.validationTime = Date.now();
    battery.status = "verified";
  };

  const getRandomFromArray = <T>(arr: Array<unknown>): T => {
    return arr[Math.floor(Math.random() * arr.length)] as T;
  };

  const getBatt = () => {
    const response = [];
    const batteryTypes = ["AAA", "AA", "A"];
    const batteryQualities = ["A", "B", "C"];

    for (const iterator of new Array(100_000)) {
      // Join our intrinsic and extrinsic data
      const battery = new Battery(
        iterator,
        BatterType.getType(
          getRandomFromArray<Types>(batteryTypes),
          getRandomFromArray<Quality>(batteryQualities)
        )
      );

      validate(battery);

      response.push(battery);
    }

    return response
  }

  console.log(getBatt());
}
