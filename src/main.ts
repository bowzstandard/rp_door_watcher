import { RadioReceiverAgent } from './lib/radio_receiver';

function init() {
  // TODO:抽象化して複数チャンネルで使えるようにする
  RadioReceiverAgent.init();
  // 検知後switchbotを起動するか判定（状態管理必要。インメモリで扱って再起動したときはnull。そのタイミングだけjsonを読み込む）
}

init();
