import Switchbot, { SwitchbotDevice } from 'node-switchbot';

const ERROR_IGNORE_CASES = ['Error: The device returned an error: 0x03ff00'];

export class SwitchbotAgent {
  device?: SwitchbotDevice;

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
        return peripheral.address === this.deviceId;
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

  async scanAndPress() {
    if (!this.device) {
      await this.discover();
      await this.scanAndPress();
      return;
    }

    try {
      await this.device.press();
    } catch (e) {
      console.log(`[${new Date().toISOString()}]SWICHBOT ERROR => ${e}`);

      if (typeof e === 'string' && ERROR_IGNORE_CASES.includes(e)) {
        return;
      }

      throw e;
    }
  }
}
