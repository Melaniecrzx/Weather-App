import { useContext } from "react";
import { UnitsContext } from "../context/units-context";
import { temperatureToFarenheit, speedToMph, precipitationToIn } from "../utils/unitsConverter";

export const useUnits = () => {
    const { unit } = useContext(UnitsContext);

    const formatTemp = (temp) => {
        const value = unit === 'imperial' ? temperatureToFarenheit(temp) : temp;
        const symbol = unit === 'imperial' ? '°' : '°';
        return `${Math.round(value)}${symbol}`;
    }
    const formatSpeed = (speed) => {
        const value = unit === 'imperial' ? speedToMph(speed) : speed;
        const symbol = unit === 'imperial' ? 'mph' : 'km/h';
        return `${Math.round(value)} ${symbol}`;
    }
    const formatPrecipitation = (precipitation) => {
        const value = unit === 'imperial' ? precipitationToIn(precipitation) : precipitation;
        const symbol = unit === 'imperial' ? 'in' : 'mm';
        return `${value.toFixed(1)} ${symbol}`;
    }
    return {unit, formatTemp, formatSpeed, formatPrecipitation};
}