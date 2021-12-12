import { IRadioReceivedUnit, IRadioReceiverListener } from '../interfaces';
import fs from 'fs';
import { SwitchbotAgent } from '../lib/switch_bot_agent';
import { LineNotificationAgent } from '../lib/line_notification_agent';
const SENSOR_ID = process.env.SENSOR_ID ?? '01';
const STATE_FILE = `${process.cwd()}/src/data/portal.json`;
const OPEN_STATE = '01';
const SWITCH_BOT_DEVICE_ADDRESS = 'f2f6c2cf9a9f';

class PortalUseCaseImpl implements IRadioReceiverListener {
  previousState: boolean | null = null;
  switchBot?: SwitchbotAgent;

  constructor() {
    this.switchBot = new SwitchbotAgent(SWITCH_BOT_DEVICE_ADDRESS);
  }

  public render(sensorUnit: IRadioReceivedUnit) {
    if (sensorUnit.sensorId !== SENSOR_ID) {
      return;
    }
    // isOpenがnullだったらjsonから状態を読み込む
    // isOpenとvalueを比較
    // 同じだったら終了
    // 違う値ならswitchbot通知してjsonへ書き込み
    // web側はjsonみるから独立

    const currentState = sensorUnit.sensorValue === OPEN_STATE;
    const previousState = this.getPreviousState();

    console.log(`SENSOR INFO => ${sensorUnit}`);

    if (currentState === previousState) {
      return;
    }

    console.log(
      `[${new Date().toISOString()}]DOOR STATE UPDATED => ${
        currentState ? 'OPEN' : 'CLOSE'
      }`
    );

    this.switchLighting();
    this.switchNotification(currentState);
    this.setCurrentState(currentState);
  }

  private switchNotification(currentState: boolean) {
    LineNotificationAgent.notify(currentState);
  }

  private switchLighting() {
    if (this.previousState === null) {
      return;
    }
    if (!this.switchBot) {
      return;
    }
    if (this.switchBot.isRunning) {
      console.log('RESERVED SWITCH');
      this.switchBot.switchReserved();
      return;
    }
    this.switchBot.scanAndPress();
  }

  private getPreviousState(): boolean {
    if (this.previousState !== null) {
      return this.previousState;
    }

    return this.readJson()?.previousState;
  }

  private readJson(): any {
    try {
      return JSON.parse(
        fs.readFileSync(STATE_FILE, {
          flag: 'a+',
          encoding: 'utf-8',
        })
      );
    } catch (e) {
      console.log(`[${new Date().toISOString()}]READ FILE ERROR => ${e}`);
      return undefined;
    }
  }

  private setCurrentState(currentState: boolean) {
    this.previousState = currentState;
    try {
      fs.writeFileSync(
        STATE_FILE,
        JSON.stringify({ previousState: currentState }, null, '\t')
      );
    } catch (e) {
      console.log(`[${new Date().toISOString()}]WRITE FILE ERROR => ${e}`);
    }
  }
}

export const PortalUseCase = new PortalUseCaseImpl();
