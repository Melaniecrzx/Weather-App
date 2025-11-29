import { useFetch } from "../../hooks/useFetch"
import searchLogo from "../../assets/images/icon-search.svg";
import geoIcon from "../../assets/images/icon-geolocation.png";
import { useState, useEffect } from "react"
import { useContext } from "react";
import { WeatherContext } from "../../context/weather-context";
import { useGeolocalisation } from "../../hooks/useGeolocalisation.js"

export default function SearchPlace() {
    const [searchCity, setSearchCity] = useState('');
    const [url, setUrl] = useState(null);
    const { data, loading } = useFetch(url);
    const { setLocation, refetch } = useContext(WeatherContext);
    const [showResults, setShowResults] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [reverseGeoUrl, setReverseGeoUrl] = useState(null);

    const { data: reverseGeoData, lodaing: reverGeoLoading } = useFetch(reverseGeoUrl);

    const { localisation } = useGeolocalisation();

    useEffect(() => {
        if (searchCity.trim() === '') {
            setSelectedCity(null);
            setShowResults(false);
            return;
        }

        const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=4&language=en`;
        setUrl(apiUrl);
    }, [searchCity]);


    useEffect(() => {
        if (searchCity.trim() !== '' && !selectedCity) {
            setShowResults(true);
        }
    }, [data, searchCity, selectedCity])

    const handleSelectedCity = (city) => {
        setSearchCity(`${city.name} - ${city.country}`);
        setSelectedCity(city);
        setShowResults(false);

    };


    const handleSearch = () => {
        if (!selectedCity) return;
        setLocation({
            latitude: selectedCity.latitude,
            longitude: selectedCity.longitude,
            city: selectedCity.name,
            country: selectedCity.country,
        });
        refetch();
    }

    const handleUseLocation = () => {
        console.log('Localisation:', localisation);
        console.log('Latitude:', localisation.latitude);
        console.log('Longitude:', localisation.longitude);

        if (localisation) {
            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${localisation.latitude}&longitude=${localisation.longitude}&localityLanguage=en`;
            console.log('URL de géocodage inverse:', url);
            setReverseGeoUrl(url);
        }
    }

    useEffect(() => {
        console.log('=== useEffect déclenché ===');
        console.log('reverseGeoData:', reverseGeoData);
        console.log('reverseGeoUrl:', reverseGeoUrl);
        console.log('localisation:', localisation);
        if (reverseGeoData && reverseGeoUrl && localisation) {
            setLocation({
                latitude: localisation.latitude,
                longitude: localisation.longitude,
                city: reverseGeoData.city,
                country: reverseGeoData.countryName,
            });
            refetch();
            setSearchCity('');
            setSelectedCity(null);
            setReverseGeoUrl(null);
        }
    }, [reverseGeoData, localisation, setLocation, refetch]);

    return (
        <div className="flex flex-col gap-2.5 lg:w-[656px] lg:mx-auto relative">
            <div className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center w-full">
                <div className="bg-neutral-800 rounded-xl flex items-center gap-4 py-4 px-6 w-full md:w-[590px] lg:w-[526px]">
                    <img src={searchLogo} alt="Search Logo" className="w-5 h-5" />
                    <input
                        placeholder="Search for a place..."
                        className="text-neutral-200 font5Medium focus:outline-none focus:ring-0 focus:border-0"
                        type="text"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                    />
                </div>


                <button
                    className="bg-blue-500 text-white font5Mdedium rounded-xl py-4 px-6 w-full md:w-[114px] cursor-pointer"
                    onClick={handleSearch}

                >
                    Search
                </button>
                <button
                    className="bg-blue-500 text-white rounded-xl py-4 px-6 md:w-[114px] cursor-pointer flex items-center justify-center "
                    onClick={handleUseLocation}

                >
                    <img src={geoIcon} alt="geo Icon" className="w-8" />
                </button>

            </div>
            {showResults && (
                <ul className="flex flex-col bg-neutral-800 rounded-xl p-4 md:w-[485px] lg:w-[424px] absolute z-50 top-[134px] md:top-[66px] w-full items-start">
                    {data?.results?.length > 0 ? (
                        data.results.map((city) => (
                            <li key={`${city.latitude}-${city.longitude}`}
                                onClick={() => handleSelectedCity(city)}
                                className="text-neutral-200 font5Medium rounded-lg px-2 py-2.5 hover:bg-neutral-600 cursor-pointer text-left w-full"

                            >
                                {city.name} - {city.country}
                            </li>
                        ))) : (
                        <li className="text-neutral-200 font5Medium rounded-lg px-2 py-2.5 hover:bg-neutral-600 cursor-pointer text-left w-full">No search result found!</li>
                    )}
                </ul>
            )}
        </div>
    )
}

