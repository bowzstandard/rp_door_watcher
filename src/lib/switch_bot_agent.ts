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
        console.log(peripheral.id, deviceId);
        peripheral.id === deviceId;
      });

      if (filtered_peripheral.length === 0) {
        throw new Error('No device was found.');
      }
      // The `SwitchbotDeviceWoHand` object representing the found Bot.
      const device = filtered_peripheral[0];
      // Put the Bot's arm down (stretch the arm)
      await device.down();
      // Put the Bot's arm up (retract the arm)
      await device.up();
    } catch (e) {
      console.log('SWICHBOT ERROR', e);
    }
  }
}

export const SwitchbotAgent = new SwitchbotAgentImpl();
