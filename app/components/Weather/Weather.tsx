import { useWeatherConditionsApi } from "@/app/hooks/useWeatherConditionsApi";
import { getCondition } from "@/app/libs/weatherConditions";

type WeatherProps = {
  locationId: number;
  date: Date;
};
export const Weather = ({ locationId, date }: WeatherProps) => {
  const weatherCondition = useWeatherConditionsApi({
    location: locationId,
    date,
  });
  if (!weatherCondition)
    return (
      <div className="border-t border-gray-600 pt-4">
        <p className="text-lg">Cargando información del clima</p>
      </div>
    );

  const dayOrNight = weatherCondition.condition.is_day ? "day" : "night";
  const weatherDescription = getCondition(weatherCondition.condition.code)[
    dayOrNight
  ];
  return (
    <div className="border-t border-gray-600 pt-4">
      <p className="text-lg">Condiciones climaticas: </p>
      <div className="flex flex-col justify-end">
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
      </div>
    </div>
  );
};
