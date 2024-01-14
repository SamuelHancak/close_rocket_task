import { useQuery } from "@tanstack/react-query";
import { useMemo, useReducer } from "react";
import { BASE_API_URL, SensorValuesType } from "./Values.types.ts";
import "./Values.styles.css";
import { calculateStats, transformData } from "../utils.ts";

const Values = () => {
  const [data, dispatch] = useReducer(
    (state: SensorValuesType[], action: SensorValuesType[]) => [
      ...state,
      ...action,
    ],
    [],
  );

  const currentTimestamp: number = Date.now();

  const { isPending, isError, error } = useQuery({
    queryKey: ["sensorValues"],
    queryFn: () =>
      fetch(`${BASE_API_URL}${currentTimestamp}`).then((res) =>
        res.text().then((data) => {
          const transformedData = transformData(data);
          dispatch(transformedData);

          return transformedData;
        }),
      ),
    refetchInterval: 300_000, // 5 minutes,
  });

  const { tempData, humData } = useMemo(() => {
    return {
      tempData: calculateStats("temp1", data),
      humData: calculateStats("hum1", data),
    };
  }, [data]);

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return isPending ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <h2>Sensor Values</h2>
      <div className={"wrapper"}>
        <div>
          <h3>temp1</h3>
          <p>Current: {tempData.current}</p>
          <p>Min: {tempData.min}</p>
          <p>Max: {tempData.max}</p>
          <p>Average: {tempData.average}</p>
        </div>
        <div>
          <h3>hum1</h3>
          <p>Current: {humData.current}</p>
          <p>Min: {humData.min}</p>
          <p>Max: {humData.max}</p>
          <p>Average: {humData.average}</p>
        </div>
      </div>
    </>
  );
};

export default Values;
