import { WeatherCondition } from "@/app/api/domain/entities/WeatherInfo";
import { getCondition } from "@/app/libs/weatherConditions";

type WeatherContentProps = {
  weatherCondition: WeatherCondition;
};
/**
 * Componente `WeatherContent` que muestra la información de las condiciones climáticas.
 *
 * Este componente presenta una descripción del clima, un ícono que representa
 * las condiciones climáticas y la temperatura en grados Celsius.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {WeatherCondition} props.weatherCondition - Un objeto que contiene la
 *                                                   información sobre las condiciones climáticas.
 *
 * @returns {JSX.Element} Un elemento que representa las condiciones climáticas,
 *                        incluyendo una descripción y la temperatura.
 */
export const WeatherContent: React.FC<WeatherContentProps> = ({
  weatherCondition,
}) => {
  const dayOrNight = weatherCondition.condition.is_day ? "day" : "night";
  const weatherDescription = getCondition(weatherCondition.condition.code)[
    dayOrNight
  ];
  return (
    <>
      <div className="flex flex-row justify-end items-center ">
        <p className="text-lg font-semibold">{weatherDescription}</p>
        <img
          src={`https:${weatherCondition.condition.icon}`}
          width={64}
          height={64}
          alt={weatherDescription}
        />
      </div>
      <p className="text-lg font-semibold text-right">
        Temperatura: {weatherCondition.temp_c}ºC
      </p>
    </>
  );
};
