declare module 'node-switchbot' {
  namespace Switchbot {
    class Switchbot {
      discover: (
        params: ISwitchbotDiscoverParams
      ) => Promise<SwitchbotDevice[]>;
      wait: (msec: number) => Promise<void>;
    }
    class SwitchbotDevice {
      down: () => Promise<void>;
      up: () => Promise<void>;
      press: () => Promise<void>;
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
  export = Switchbot;
}
