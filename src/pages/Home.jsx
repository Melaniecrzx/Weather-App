import SearchPlace from "../components/SearchPlace/SearchPlace";
import Daily from "../components/Daily/Daily";
import Error from "../components/Error/Error";
import WeatherConditions from "../components/WeatherConditions/WeatherConditions";
import DailyForecast from "../components/DailyForecast/DailyForecast";
import HourlyForecast from "../components/HourlyForecast/HourlyForecast";
import { useContext, useState } from "react";
import { WeatherContext } from "../context/weather-context";
import { useEffect } from "react";

export default function Home() {
    const { weatherData, loading, error, refetch } = useContext(WeatherContext);
    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
        <div>
            {weatherData && (
                <div className="flex justify-center text-center flex-col gap-12 lg:gap-16 relative">
                    <h1 className={`text-white font-bricolage font2 transition-opacity duration-1000 ease-in-out
                ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>How's the sky looking today?</h1>
                    <SearchPlace/>
                    {error && !loading && (
                        <p>No search result found!</p>
                    )}
                    <div className="flex flex-col lg:flex-row gap-8 justify-center">

                        <div className="flex flex-col gap-8 lg:gap-12">
                            <div className="flex flex-col gap-5 lg:gap-8">
                                <Daily />
                                <WeatherConditions />
                            </div>

                            <DailyForecast />
                        </div>
                        <HourlyForecast />
                    </div>
                </div>


            )}

            {error && !loading && (
                <Error onRetry={refetch} />
            )}


        </div>
    )
}