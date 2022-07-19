import Queue from 'bull';
import {
  IRadioReceivedUnit,
  IRadioReceiverListener,
  TaskKeyForPortalSwitchBotQueue,
} from '@bowzstandard/rp_door_watcher_interfaces';
import { LineNotificationAgent } from '../lib';
const SENSOR_ID = process.env.SENSOR_ID ?? '01';
const OPEN_STATE = '01';

class PortalUseCaseImpl implements IRadioReceiverListener {
  queue: Queue.Queue;
  constructor() {
    this.queue = new Queue(TaskKeyForPortalSwitchBotQueue, {
      redis: {
        host: process.env.REDIS_ENDPOINT,
      },
    });
  }

  public render(sensorUnit: IRadioReceivedUnit) {
    if (sensorUnit.sensorId !== SENSOR_ID) {
      return;
    }

    const currentState = sensorUnit.sensorValue === OPEN_STATE;

    console.log(
      `[${new Date().toISOString()}]DOOR STATE UPDATED => ${
        currentState ? 'OPEN' : 'CLOSE'
      }`
    );

    this.generateQueueSwitchLighting(currentState);
    this.switchNotification(currentState);
  }

  private switchNotification(currentState: boolean) {
    LineNotificationAgent.notify(currentState);
  }

  private generateQueueSwitchLighting(currentState: boolean) {
    // queue投げる
    this.queue.add({
      object: {
        currentState,
      },
    });
  }
}

export const PortalUseCase = new PortalUseCaseImpl();
