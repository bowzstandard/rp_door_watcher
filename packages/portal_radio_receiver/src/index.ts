import { RadioReceiverAgent } from './lib';
import { PortalUseCase } from './usecases';
import dotenv from 'dotenv';

dotenv.config();

function init() {
  // TODO:抽象化して複数チャンネルで使えるようにする
  RadioReceiverAgent.addEventListener(PortalUseCase);
  RadioReceiverAgent.init();
  // 検知後switchbotを起動するか判定（状態管理必要。インメモリで扱って再起動したときはnull。そのタイミングだけjsonを読み込む）
}

init();
