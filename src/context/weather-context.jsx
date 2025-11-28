import { createContext, useReducer } from "react";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";

export const WeatherContext = createContext();

function weatherReducer(state, action) {
    switch (action.type) {
        case "SET_CITY":
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                city: action.payload.city,
                country: action.payload.country
            }
        case "SET_WEATHER": {
            return {
                ...state,
                weatherData: action.payload,
            }
        }
        case "SET_LOADING": {
            return {
                ...state,
                loading: action.payload
            }
        }
         case "SET_ERROR": {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
            return state;
    }
}


const initialState = {
    latitude: 48.8566,
    longitude: 2.3522,
    city: "Paris",
    country: "France",
    weatherData: null,
    loading: true,
    error: null
}

export default function WeatherProvider({ children }) {
    const [state, dispatch] = useReducer(weatherReducer, initialState);
    const url = state.latitude && state.longitude
        ? `https://api.open-meteo.com/v1/forecast?latitude=${state.latitude}&longitude=${state.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,sunrise,sunset,uv_index_max&forecast_days=8&timezone=auto`
        : null;
    const { data, loading, error, refetch } = useFetch(url);

    useEffect(() => {
            dispatch({
                type: "SET_LOADING",
                payload: loading,
            })
    }, [loading])

   useEffect(() => {
            dispatch({
                type: "SET_ERROR",
                payload: error,
            })
    }, [error])

    useEffect(() => {
        if (data) {
            dispatch({
                type: "SET_WEATHER",
                payload: data,
            })
        }
    }, [data])

    const setLocation = ({ latitude, longitude, city, country }) => {
        dispatch({
            type: "SET_CITY",
            payload: { latitude, longitude, city, country }
        });
    };

    const contextValue = {
        city: state.city,
        country: state.country,
        latitude: state.latitude,
        longitude: state.longitude,
        weatherData: state.weatherData,
        loading: state.loading,
        error: state.error,
        refetch,
        setLocation,
        dispatch,

    }

    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    )
}