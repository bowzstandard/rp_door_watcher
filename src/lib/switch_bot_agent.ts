import Switchbot from 'node-switchbot';

class SwitchbotAgentImpl {
  async scanAndPress(deviceId: string) {
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
    } catch (e) {
      console.log(`[${new Date().toISOString}]SWICHBOT ERROR => ${e}`);
    }
  }
}

export const SwitchbotAgent = new SwitchbotAgentImpl();
