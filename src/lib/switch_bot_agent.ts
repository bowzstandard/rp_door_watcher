import Switchbot from 'node-switchbot';

export class SwitchbotAgent {
  isRunning: boolean = false;
  isReserved: boolean = false;
  device?: any;

  constructor(readonly deviceId: string) {}

  init() {
    this.discover();
  }

  private async discover() {
    try {
      const switchBot = new Switchbot();
      const found_peripherals = await switchBot.discover({
        model: 'H',
        quick: false,
      });

      const filtered_peripheral = found_peripherals.filter((peripheral) => {
        return peripheral.id === this.deviceId;
      });

      if (filtered_peripheral.length === 0) {
        this.device = undefined;
        throw new Error('No device was found.');
      }
      // The `SwitchbotDeviceWoHand` object representing the found Bot.
      this.device = filtered_peripheral[0];
    } catch (e) {
      console.log(e);
    }
  }

  switchReserved() {
    this.isReserved = !this.isReserved;
  }

  async scanAndPress() {
    if (!this.device) {
      await this.discover();
      await this.scanAndPress();
      return;
    }
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;

    try {
      await this.device.press();
      this.isRunning = false;

      await this.reservedLoop();
    } catch (e) {
      this.isRunning = false;
      console.log(`[${new Date().toISOString()}]SWICHBOT ERROR => ${e}`);
    }
  }

  private async reservedLoop() {
    if (!this.isReserved) {
      return;
    }
    this.isReserved = false;
    await this.scanAndPress();
  }
}
