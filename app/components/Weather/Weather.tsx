import { useWeatherConditionsApi } from "@/app/hooks/useWeatherConditionsApi";
import { WeatherContent } from "./WeatherContent";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

type WeatherProps = {
  locationId: number;
  date: Date;
};
/**
 * Componente `Weather` que muestra las condiciones climáticas para una ubicación y fecha específicas.
 *
 * Este componente utiliza un hook para obtener datos sobre el clima y muestra
 * un ícono de carga mientras los datos están siendo recuperados.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {number} props.locationId - El ID de la ubicación para la cual se obtienen las condiciones climáticas.
 * @param {Date} props.date - La fecha para la cual se obtienen las condiciones climáticas.
 *
 * @returns {JSX.Element} Un elemento que representa las condiciones climáticas
 *                        o un ícono de carga si los datos aún están siendo recuperados.
 */
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
