import { useState } from "react";
import { createContext } from "react";

export const UnitsContext = createContext();

export default function UnitsProvider({children}) {
    const [unit, setUnit] = useState('metric');
    const toggleUnit = () => {
        setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
    };

    return (
        <UnitsContext.Provider value={{unit, setUnit, toggleUnit}}>
            {children}
        </UnitsContext.Provider>
    )
}