import { useContext } from "react";
import { WeatherContext } from "../../context/weather-context";
import { getWeatherIcon } from "../../utils/weatherUtils";
import { useUnits } from '../../hooks/useUnits';


export default function DailyForecast() {
    const { weatherData } = useContext(WeatherContext);
    const { formatTemp } = useUnits();


    const { daily } = weatherData;


    const forecasts = daily.time.slice(1).map((date, index) => ({
        date: new Date(date).toLocaleDateString('en-EN', { weekday: 'short' }),
        tempMax: formatTemp(Math.round(daily.temperature_2m_max[index + 1])),
        tempMin: formatTemp(Math.round(daily.temperature_2m_min[index + 1])),
        weatherCode: daily.weather_code[index + 1],
    }));

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-white text-left font5">Daily forecast</h2>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-4 ">
                {forecasts.map((forecast, index) => (
                    <div key={index} className="text-white bg-neutral-800 border border-neutral-600 rounded-xl px-2.5 py-4 flex flex-col">
                        <p className="font6 text-white">{forecast.date}</p>
                        <img src={getWeatherIcon(forecast.weatherCode)}
                            alt="Weather Icon"
                            className="w-15 h-15 mx-auto" />
                        <div className="flex justify-between">
                            <p className="font6 text-white">{forecast.tempMax}</p>
                            <p className="font7 text-neutral-200">{forecast.tempMin}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}