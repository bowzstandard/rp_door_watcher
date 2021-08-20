import { IRadioReceivedUnit, IRadioReceiverListener } from '../interfaces';
import fs from 'fs';
import { SwitchbotAgent } from '../lib/switch_bot_agent';

const SENSOR_ID = process.env.SENSOR_ID ?? '01';
const STATE_FILE = `${process.cwd()}/data/portal.json`;
const OPEN_STATE = '00';
const SWITCH_BOT_DEVICE_ADDRESS = 'f2f6c2cf9a9f';

class PortalUseCaseImpl implements IRadioReceiverListener {
  previousState: boolean | null = null;
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

    if (currentState === previousState) {
      return;
    }

    this.switchLighting();
    this.writeJson(currentState);
  }

  private switchLighting() {
    SwitchbotAgent.scanAndPress(SWITCH_BOT_DEVICE_ADDRESS);
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
      console.log('JSON PARSE ERROR', e);
      return undefined;
    }
  }

  private writeJson(currentState: boolean) {
    fs.writeFileSync(
      STATE_FILE,
      JSON.stringify({ previousState: currentState }, null, '\t')
    );
  }
}

export const PortalUseCase = new PortalUseCaseImpl();
