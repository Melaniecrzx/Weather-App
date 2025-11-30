import { useContext, useState, useRef, useEffect } from "react"
import { WeatherContext } from "../../context/weather-context";
import { getWeatherIcon } from "../../utils/weatherUtils";
import { useUnits } from '../../hooks/useUnits';
import dropDownIcon from "../../assets/images/icon-dropdown.svg";


export default function HourlyForecast() {
    const { weatherData } = useContext(WeatherContext);
    const { formatTemp } = useUnits();

    const [showDay, setShowDay] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen])

    if (!weatherData) return null;

    const { hourly } = weatherData;

    const now = new Date();

    const currentHourIndex = hourly.time.findIndex(time => {
        const timeDate = new Date(time);
        return timeDate >= now;
    });

    const groupByDay = {};

    hourly.time.forEach((hour, index) => {
        if (index < currentHourIndex) return;

        const hourDate = new Date(hour);
        const day = hourDate.toLocaleDateString('en-EN', { weekday: 'long' });
        const dayKey = hourDate.toDateString();

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

    const handleDaySelect = (dayIndex) => {
        setShowDay(dayIndex);
        setIsOpen(false);
    };

    return (
        <div className="text-white h-[730px] bg-neutral-800 rounded-xl p-6 flex flex-col gap-4 w-full md:max-w-[720px] lg:max-w-[384px]">
            <div className="flex justify-between items-center">
                <h2 className="font5">Hourly forecast</h2>

                <div ref={dropDownRef} className="relative">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="bg-neutral-700 text-white cursor-pointer font7 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-600 transition-colors min-w-[140px] justify-between"
                    >
                        <span>{dailyForecasts[showDay]?.day || 'Select day'}</span>
                        <img 
                            src={dropDownIcon} 
                            alt="DropDown Icon" 
                            className={`w-3 h-[18px] transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                        />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 bg-neutral-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px] max-h-[300px] overflow-y-auto">
                            {dailyForecasts.map((dayForecast, dayIndex) => (
                                <button 
                                    key={dayIndex}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDaySelect(dayIndex);
                                    }}
                                    className={`w-full text-left px-4 py-3 font7 hover:bg-neutral-600 transition-colors cursor-pointer ${
                                        showDay === dayIndex ? 'bg-neutral-600 text-blue-500' : 'text-white'
                                    }`}
                                >
                                    {dayForecast.day}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto flex-1">
                {dailyForecasts[showDay]?.hours?.map((hour, hourIndex) => (
                    <div key={hourIndex} className="flex justify-between items-center p-3 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors">
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