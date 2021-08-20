declare module 'node-switchbot' {
  class Switchbot {
    discover: (params: ISwitchbotDiscoverParams) => Promise<SwitchbotDevice[]>;
    wait: (msec: number) => Promise<void>;
  }
  export = Switchbot;
  class SwitchbotDevice {
    down: () => Promise<void>;
    up: () => Promise<void>;
    id: string;
    address: string;
    model: string;
  }
  type ISwitchbotDiscoverParams = {
    duration?: number;
    model?: 'H' | 'T' | 'M' | 'CS' | 'c';
    id?: string;
    quick?: boolean;
  };
}
