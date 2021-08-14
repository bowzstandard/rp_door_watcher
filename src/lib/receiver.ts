import SerialPort, { parsers } from 'serialport';

const DEVICE = process.env.DEVICE ?? '/dev/ttyUSB0';
const BAUD_RATE = 115200;

class ReceiverAgentImpl {
  port?: SerialPort;
  constructor() {}
  init() {
    this.port = new SerialPort(DEVICE, {
      baudRate: BAUD_RATE,
    });
    this.port.on('open', () => {
      console.log('port open');
    });

    // Open errors will be emitted as an error event
    this.port.on('error', function (err) {
      console.log('Error: ', err.message);
    });
    const parser = new parsers.Readline({ delimiter: '\r\n' });
    this.port.pipe(parser);
    parser.on('data', (data) => {
      const date = new Date();
      const sensorId = data.substr(1, 2);
      const sensorVoltage = data.substr(27, 4);
      const sensorValue = data.substr(33, 2);

      const str =
        date.toString() +
        'センサ:' +
        sensorId +
        ' (' +
        parseInt(sensorVoltage, 16) +
        ' mV) => ' +
        sensorValue;
      console.log(str);
    });
  }
}

export const ReceiverAgent = new ReceiverAgentImpl();
