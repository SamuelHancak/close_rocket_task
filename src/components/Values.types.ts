export const BASE_API_URL: string = "http://localhost:4242/reading?start=";

export type SensorType = "temp1" | "hum1";

export type SensorValuesType = {
  timestamp: number;
  sensor: SensorType;
  value: number;
};

export type StatsType = {
  min: number;
  max: number;
  average: number;
  current: number;
};
