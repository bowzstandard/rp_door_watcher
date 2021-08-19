declare module 'node-switchbot' {
  class SwitchBot {
    discover: (params: ISwitchBotDiscoverParams) => Promise<SwitchbotDevice[]>;
    wait: (msec: number) => Promise<void>;
  }
  class SwitchbotDevice {
    down: () => Promise<void>;
    up: () => Promise<void>;
  }
  type ISwitchBotDiscoverParams = {
    duration?: number;
    model?: 'H' | 'T' | 'M' | 'CS' | 'c';
    id?: string;
    quick?: boolean;
  };
}
