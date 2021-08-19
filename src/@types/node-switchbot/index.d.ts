declare module 'node-switchbot' {
  class Switchbot {
    discover: (params: ISwitchbotDiscoverParams) => Promise<SwitchbotDevice[]>;
    wait: (msec: number) => Promise<void>;
  }
  class SwitchbotDevice {
    down: () => Promise<void>;
    up: () => Promise<void>;
  }
  type ISwitchbotDiscoverParams = {
    duration?: number;
    model?: 'H' | 'T' | 'M' | 'CS' | 'c';
    id?: string;
    quick?: boolean;
  };
}
