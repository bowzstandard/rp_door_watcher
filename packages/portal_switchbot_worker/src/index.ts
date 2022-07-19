import { TaskKeyForPortalSwitchBotQueue } from '@bowzstandard/rp_door_watcher_interfaces';
import Queue from 'bull';
import { SwitchbotAgent } from './switch_bot_agent';
import dotenv from 'dotenv';
import { sleep } from '@bowzstandard/rp_door_watcher_utils';

dotenv.config();

const SWITCH_BOT_DEVICE_ADDRESS = process.env.SWITCH_BOT_DEVICE_ADDRESS;
const SWITCHBOT_WAIT_TIME = 5;

const main = async () => {
  // bullのprocessよぶ
  // redisのタスクキュー取ってきてswitchbotを順番に実行

  const queue = new Queue(TaskKeyForPortalSwitchBotQueue, {
    redis: {
      host: process.env.REDIS_ENDPOINT,
    },
  });
  const switchBot = new SwitchbotAgent(SWITCH_BOT_DEVICE_ADDRESS);

  queue.process(async (job, done) => {
    // FIXME: queueが3以上の場合タスクを%2してから実行する
    console.log(job.data);
    try {
      await switchBot.scanAndPress();
    } catch (e) {
      queue.add(job.data);
    }
    await sleep(SWITCHBOT_WAIT_TIME);
    done();
  });
};

main();
