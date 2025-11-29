import bgTodayLarge from "../../assets/images/bg-today-large.svg";
import bgTodaySmall from "../../assets/images/bg-today-small.svg"
import { useContext } from "react";
import { WeatherContext } from "../../context/weather-context";
import { useUnits} from '../../hooks/useUnits';
import { useState, useEffect } from "react";
import { getWeatherIcon } from "../../utils/weatherUtils";

export default function Daily() {
    const { weatherData, loading, error, city, country } = useContext(WeatherContext);
    const {formatTemp} = useUnits();
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentDate(new Date()), 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    const temperature = formatTemp(Math.round(weatherData.current.temperature_2m));
    const weatherCode = weatherData.current.weather_code;

    return (
        <div className="relative">
            <picture className="relative overflow-hidden block"> 
                <source media="(min-width: 768px)" srcSet={bgTodayLarge} />
                <img src={bgTodaySmall} alt='Background' className="w-full block" />
            </picture>
            <div className="absolute inset-0 z-40 flex flex-col md:flex-row items-center justify-between py-10 md:px-10 lg:px-16">
                <div className="flex flex-col gap-3 md:items-start md:text-left">
                    <h2 className="text-white font4">{city}, {country}</h2>
                    <p className="text-neutral-200 font6">
                        {currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>    
                </div>
                <div className="flex gap-5 items-center">
                    <img src={getWeatherIcon(weatherCode)} alt="wether Icon" className="w-30 h-30"/>
                    <p className="text-white italic font1">{temperature}</p>
                </div>
            </div>
        </div>
    )
}