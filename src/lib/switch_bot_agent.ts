import Switchbot from 'node-switchbot';

class SwitchbotAgentImpl {
  isRunning: boolean = false;
  isReserved: boolean = false;

  switchReserved() {
    this.isReserved = !this.isReserved;
  }

  async scanAndPress(deviceId: string) {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;

    try {
      const switchBot = new Switchbot();
      const found_peripherals = await switchBot.discover({
        model: 'H',
        quick: false,
      });

      const filtered_peripheral = found_peripherals.filter((peripheral) => {
        return peripheral.id === deviceId;
      });

      if (filtered_peripheral.length === 0) {
        throw new Error('No device was found.');
      }
      // The `SwitchbotDeviceWoHand` object representing the found Bot.
      const device = filtered_peripheral[0];
      await device.press();
      this.isRunning = false;

      await this.reservedLoop(deviceId);
    } catch (e) {
      this.isRunning = false;
      console.log(`[${new Date().toISOString()}]SWICHBOT ERROR => ${e}`);
    }
  }

  private async reservedLoop(deviceId: string) {
    if (!this.isReserved) {
      return;
    }
    this.isReserved = false;
    await this.scanAndPress(deviceId);
  }
}

export const SwitchbotAgent = new SwitchbotAgentImpl();
