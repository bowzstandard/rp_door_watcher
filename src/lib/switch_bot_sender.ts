import noble from 'noble';

export class SwitchBotSender {
  constructor(readonly deviceAddress: string) {
    this.init();
  }
  private init() {
    noble.on('stateChange', (state) => {
      if (state !== 'poweredOn') {
        noble.stopScanning();
        return;
      }

      noble.startScanning();
    });

    noble.on('discover', (peripheral) => {
      if (peripheral.address !== this.deviceAddress) {
        return;
      }

      noble.stopScanning();

      peripheral.once('connect', () => {
        peripheral.discoverServices([])
      });

      peripheral.once('serviceDiscover', () => {});

      peripheral.connect();
    });
  }
}
