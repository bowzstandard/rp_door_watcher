declare module 'node-switchbot' {
  export class Switchbot {
    discover: (params: ISwitchbotDiscoverParams) => Promise<SwitchbotDevice[]>;
    wait: (msec: number) => Promise<void>;
  }
  export class SwitchbotDevice {
    down: () => Promise<void>;
    up: () => Promise<void>;
    press: () => Promise<void>;
    id: string;
    address: string;
    model: string;
  }
  export type ISwitchbotDiscoverParams = {
    duration?: number;
    model?: 'H' | 'T' | 'M' | 'CS' | 'c';
    id?: string;
    quick?: boolean;
  };
}
