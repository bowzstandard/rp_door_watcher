import { RadioReceiverAgent } from './lib/radio_receiver';
import { PortalUseCase } from './usecases/portal';

function init() {
  // TODO:抽象化して複数チャンネルで使えるようにする
  RadioReceiverAgent.addEventListener(PortalUseCase);
  RadioReceiverAgent.init();
  // 検知後switchbotを起動するか判定（状態管理必要。インメモリで扱って再起動したときはnull。そのタイミングだけjsonを読み込む）
}

init();
