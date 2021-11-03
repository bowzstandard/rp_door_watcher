declare module 'node-switchbot' {
  class Switchbot {
    discover: (params: ISwitchbotDiscoverParams) => Promise<SwitchbotDevice[]>;
    wait: (msec: number) => Promise<void>;
  }

  export type SwitchbotDevice = {
    down: () => Promise<void>;
    up: () => Promise<void>;
    press: () => Promise<void>;
    id: string;
    address: string;
    model: string;
  };

  export type ISwitchbotDiscoverParams = {
    duration?: number;
    model?: 'H' | 'T' | 'M' | 'CS' | 'c';
    id?: string;
    quick?: boolean;
  };
  export default Switchbot;
}
