export type IRadioReceiverListener = {
  render: (sensorUnit: IRadioReceivedUnit) => void;
};

export type IRadioReceivedUnit = {
  sensorId: string;
  sensorVoltage: number;
  sensorValue: string;
};
