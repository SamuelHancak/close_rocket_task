import {
  SensorType,
  SensorValuesType,
  StatsType,
} from "./components/Values.types.ts";

export const transformData = (dataProp: string): SensorValuesType[] =>
  dataProp.split("\n").map((line) => {
    const [timestamp, sensor, value] = line.split(",");

    return {
      timestamp: +timestamp,
      sensor: sensor as SensorType,
      value: +value,
    };
  });

export const calculateStats = (
  sensorType: SensorType,
  parsedData: SensorValuesType[],
): StatsType => {
  const sensorData = parsedData.filter((entry) => entry.sensor === sensorType);

  if (sensorData.length === 0) {
    return {
      min: 0,
      max: 0,
      average: 0,
      current: 0,
    };
  }

  const values = sensorData.map((entry) => entry.value);
  const valuesLength = values.length;

  return {
    min: Math.min(...values),
    max: Math.max(...values),
    average: +(
      values.reduce((acc, value) => acc + value, 0) / valuesLength
    ).toFixed(2),
    current: values[valuesLength - 1],
  };
};
