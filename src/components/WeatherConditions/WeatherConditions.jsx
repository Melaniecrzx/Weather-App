import { useContext } from "react";
import { WeatherContext } from "../../context/weather-context";
import { useState } from "react";
import { useUnits } from '../../hooks/useUnits';


export default function WeatherConditions() {
    const { weatherData } = useContext(WeatherContext);
    const [showDetails, setShowDetails] = useState(false);
    const { formatTemp, formatSpeed, formatPrecipitation } = useUnits();


    if (!weatherData) return null;


    const handleDetails = () => {
        setShowDetails(!showDetails);
    }

    const formatTime = (string) => {
        return new Date(string).toLocaleTimeString('en-EN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
    }

    const conditions = [
        { label: "Feels Like", value: `${formatTemp(Math.round(weatherData.current.apparent_temperature))}`},
        { label: "Humidity", value: `${Math.round(weatherData.current.relative_humidity_2m)}`, unit: "%" },
        { label: "Wind", value: `${formatSpeed(Math.round(weatherData.current.wind_speed_10m))}`},
        { label: "Precipitation", value: `${formatPrecipitation(weatherData.current.precipitation)}`},
    ]

    const conditions2 = [
        { label: "Sunrise", value: `${formatTime(weatherData.daily.sunrise[0])}` },
        { label: "Sunset", value: `${formatTime(weatherData.daily.sunset[0])}` },
        { label: "UV Index", value: `${Math.round(weatherData.daily.uv_index_max[0])}`, unit: "" }

    ]

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-white">
                {conditions.map((condition, index) => (
                    <div key={index} className="bg-neutral-800 border border-neutral-600 rounded-xl p-5 text-left">
                        <p className="text-neutral-200 font6">{condition.label}</p>
                        <p className="text-white font3">{condition.value} {condition.unit}</p>
                    </div>
                ))}
            </div>
            <button className="bg-blue-500 text-white rounded-xl py-4 px-6 w-full cursor-pointer"
                onClick={handleDetails}>
                {showDetails ? 'Hide Details' : 'Show All Details'}
            </button>

            {showDetails && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-white">
                    {conditions2.map((condition2, index) => (
                        <div key={index} className="bg-neutral-800 border border-neutral-600 rounded-xl p-5">
                            <p className="text-neutral-200 font6">{condition2.label}</p>
                            <p className="text-white font3">{condition2.value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}