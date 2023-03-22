// Let's suppose that we are trying to program smart house
// In house we have several devices which we would like to control
// TV, AudioSystem and HomeTheater
// And also by requirements from customer we should control that devices using:
// Phone, Remote, InWallSystem

// Easiest way would be just to multiply each controllable device with control device but customer sad that in future he would want to buy keyboard and smart light
// So we decided to use Bridge pattern
namespace Bridge {
  // First i define Abstraction and Implementation
  // Abstractions are Phone, Remote, InWallSystem which i will join in Control class
  // Implementations are TV, AudioSystem and HomeTheater which i will join in IDevice interface

  // First we describe our Implementation methods,
  // this are methods that we would use to control our TV or AudioSystem from Phone or Remote

  // Implementation
  interface IDevice {
    getIsEnabled(): boolean;

    powerOn(): void;
    powerOff(): void;

    getVolume(): number;
    setVolume(n: any): void;

    getBrightness(): number;
    setBrightness(n: any): void;

    getChannel(): number;
    setChannel(n: any): void;
  }

  // Now we define
  // Later in app on phone we would use our Controll:
  // on click that button on ui you will trigger turnOnOff
  // and same for our remote

  // Abstractions
  class Control {
    constructor(private device: IDevice) {}
    turnOnOff() {
      if (this.device.getIsEnabled()) {
        this.device.powerOff();
      } else {
        this.device.powerOn();
      }
    }
    mute() {
      this.device.setVolume(0);
    }
    volumeUp() {
      this.device.setVolume(this.device.getVolume() + 10);
    }
    volumeDown() {
      this.device.setVolume(this.device.getVolume() - 10);
    }
    brightnessUp() {
      this.device.setBrightness(this.device.getBrightness() + 1);
    }
    brightnessDown() {
      this.device.setBrightness(this.device.getBrightness() - 1);
    }
    nextChannel() {
      this.device.setChannel(this.device.getChannel() + 1);
    }
    prevChannel() {
      this.device.setChannel(this.device.getChannel() - 1);
    }
  }

  // Hear i adapt our Implementations to Device class
  // class HomeTheater implements IDevice {}
  class TV implements IDevice {
    active = true;
    volume = 10;

    getIsEnabled(): boolean {
      return this.active;
    }
    powerOn(): void {
      this.active = true;
    }
    powerOff(): void {
      this.active = false;
    }
    // This is small difference TV and AudioSystem and it describes why we would need Bridge for this case
    getVolume(): number {
      return this.volume;
    }
    setVolume(n: any): void {
      this.volume = n;
    }
    // Also Brightness levels may differ for HomeTheater
    getBrightness(): number {
      throw new Error("Method not implemented.");
    }
    setBrightness(n: any): void {
      throw new Error("Method not implemented.");
    }
    getChannel(): number {
      throw new Error("Method not implemented.");
    }
    setChannel(n: any): void {
      throw new Error("Method not implemented.");
    }
  }
  class AudioSystem implements IDevice {
    active = true;
    volume = 10000;

    getIsEnabled(): boolean {
      return this.active;
    }
    powerOn(): void {
      this.active = true;
    }
    powerOff(): void {
      this.active = false;
    }
    // Different values from TV
    getVolume(): number {
      return this.volume / 100;
    }
    setVolume(n: any): void {
      this.volume = n * 100;
    }
    getBrightness(): number {
      throw new Error("Method not implemented.");
    }
    setBrightness(n: any): void {
      throw new Error("Method not implemented.");
    }
    getChannel(): number {
      throw new Error("Method not implemented.");
    }
    setChannel(n: any): void {
      throw new Error("Method not implemented.");
    }
  }

  class PhoneApp {
    // On app starts and we select to which device to connect
    constructor(private control: Control) {}

    // Now we can implement some ui, logic with which we will trigger our 'control' methods
    render(){
      const onSubmit = () => this.control.turnOnOff();

      return `<button onClick={onSubmit}>Turn On/Off<button>`;
    }
  }
}
