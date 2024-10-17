import { WeatherCondition } from "@/app/api/domain/entities/WeatherInfo";
import { getCondition } from "@/app/libs/weatherConditions";

type WeatherContentProps = {
  weatherCondition: WeatherCondition;
};
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
