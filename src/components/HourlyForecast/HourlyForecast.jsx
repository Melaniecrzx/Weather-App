import { useContext } from "react"
import { WeatherContext } from "../../context/weather-context";
import { getWeatherIcon } from "../../utils/weatherUtils";
import { useUnits } from '../../hooks/useUnits';
import { useState } from "react";


export default function HourlyForecast() {
    const { weatherData } = useContext(WeatherContext);
    const { formatTemp } = useUnits();

    const [showDay, setShowDay] = useState(0);

    const { hourly } = weatherData;
    const now = new Date();

    const currentHourIndex = hourly.time.findIndex(time => {
        const timeDate = new Date(time);
        return timeDate >= now;
    });

    const groupByDay = {};

    hourly.time.forEach((hour, index) => {
        if (index < currentHourIndex) return; // Ignorer les heures passées

        const hourDate = new Date(hour);
        const day = hourDate.toLocaleDateString('en-EN', { weekday: 'long' });
        const dayKey = hourDate.toDateString(); // Utiliser la date complète comme clé pour éviter les doublons

        if (!groupByDay[dayKey]) {
            groupByDay[dayKey] = {
                dayName: day,
                hours: []
            };
        }

        groupByDay[dayKey].hours.push({
            hour: hourDate.toLocaleTimeString('en-EN', {
                hour: '2-digit',
                hour12: true,
            }),
            temperature: formatTemp(Math.round(hourly.temperature_2m[index])),
            weatherCode: hourly.weather_code[index],
        });
    });

    const dailyForecasts = Object.entries(groupByDay).map(([dateKey, data]) => ({
        day: data.dayName,
        hours: data.hours,
    }));


    return (
        <div className="text-white  h-[730px] bg-neutral-800 rounded-xl p-6 flex flex-col gap-4 w-full md:max-w-[720px] lg:max-w-[384px]">
            <div className="flex justify-between items-center">
                <h2 className="font5">Hourly forecast</h2>

                <select
                    value={showDay}
                    onChange={(e) => setShowDay(Number(e.target.value))}
                    className="bg-neutral-700 text-white font7 p-2 rounded-lg">
                    {dailyForecasts.map((dayForecast, dayIndex) => (
                        <option key={dayIndex} value={dayIndex}>{dayForecast.day}</option>
                    ))}
                </select>
            </div>


            <div className="flex flex-col gap-2 h-[98vh] overflow-y-scroll">
                {dailyForecasts[showDay]?.hours.map((hour, hourIndex) => (
                    <div key={hourIndex} className="flex justify-between items-center p-2 bg-neutral-700 rounded">
                        <div className="flex gap-2 items-center">
                            <img src={getWeatherIcon(hour.weatherCode)} alt='weather Icon' className="w-10 h-10" />
                            <span className="font5Medium">{hour.hour}</span>
                        </div>
                        <span className="font7">{hour.temperature}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}