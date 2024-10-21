import weatherConditionsFile from "../weather_conditions.json";

/**
 * Interfaz que define los códigos de condiciones climáticas del archivo importado
 *
 * @interface WeatherConditionsCodes
 * @property {Object<string, {day: string, night: string}>} [key] - Objeto que contiene las descripciones del clima para el día y la noche.
 */
interface WeatherConditionsCodes {
  [key: string]: {
    day: string;
    night: string;
  };
}
// Archivo de condiciones climáticas tipado.
const weatherConditionsTyped: WeatherConditionsCodes = weatherConditionsFile;

/**
 * Obtiene las condiciones climáticas asociadas a un código específico.
 *
 * @param {string} code - El código de la condición climática.
 * @returns {{day: string, night: string} | undefined} - Un objeto con la descripción del clima para el día y la noche, o undefined si no se encuentra el código.
 */
export const getCondition = (
  code: string,
): { day: string; night: string } | undefined => {
  return weatherConditionsTyped[code];
};
