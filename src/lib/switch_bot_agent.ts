import Switchbot from 'node-switchbot';

class SwitchbotAgentImpl {
  async scanAndPress(deviceAddress: string) {
    const switchBot = new Switchbot();
    const bot_list = await switchBot.discover({
      model: 'H',
      quick: true,
      id: deviceAddress,
    });

    if (bot_list.length === 0) {
      throw new Error('No device was found.');
    }
    // The `SwitchbotDeviceWoHand` object representing the found Bot.
    const device = bot_list[0];
    // Put the Bot's arm down (stretch the arm)
    await device.down();
    // Wait for 5 seconds
    await switchBot.wait(5000);
    // Put the Bot's arm up (retract the arm)
    await device.up();
  }
}

export const SwitchbotAgent = new SwitchbotAgentImpl();
