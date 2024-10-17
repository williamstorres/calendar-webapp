import { useWeatherConditionsApi } from "@/app/hooks/useWeatherConditionsApi";
import { WeatherContent } from "./WeatherContent";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

type WeatherProps = {
  locationId: number;
  date: Date;
};
export const Weather = ({ locationId, date }: WeatherProps) => {
  const weatherCondition = useWeatherConditionsApi({
    location: locationId,
    date,
  });

  return (
    <div className="border-t border-gray-600 pt-4">
      <p className="text-lg">Condiciones climaticas: </p>
      <div className="flex flex-col justify-end">
        {weatherCondition ? (
          <WeatherContent weatherCondition={weatherCondition} />
        ) : (
          <div className="flex flex-row justify-end p-10">
            <ArrowPathIcon className="animate-spin" width={30} height={30} />
          </div>
        )}
      </div>
    </div>
  );
};
