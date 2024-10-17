import weatherConditionsFile from "../weather_conditions.json";

interface WeatherConditionsCodes {
  [key: string]: {
    day: string;
    night: string;
  };
}
const weatherConditionsTyped: WeatherConditionsCodes = weatherConditionsFile;

export const getCondition = (code: string) => {
  return weatherConditionsTyped[code];
};
