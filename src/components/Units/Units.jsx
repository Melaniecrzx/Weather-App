import checkedIcon from "../../assets/images/icon-checkmark.svg";
import { useContext } from "react";
import { UnitsContext } from "../../context/units-context";

export default function Units() {
    const { unit, toggleUnit } = useContext(UnitsContext);

    return (
        <div className="flex flex-col text-white absolute z-50 bg-neutral-800 rounded-xl px-2 py-1.5 items-start gap-1 min-w-[214px] w-full right-0 top-full mt-5">
            <button onClick={toggleUnit} className="flex rounded-lg px-2.5 py-2 w-full border border-transparent hover:border-white cursor-pointer">
                Switch to {unit === 'imperial' ? `Metric` : `Imperial`}
            </button>
            <div className="flex flex-col gap-2 w-full">
                <p className="text-neutral-300">Temperature</p>
                <div className="flex flex-col gap-1 items-start">
                    <button className={`flex justify-between rounded-lg px-2.5 py-2 w-full cursor-pointer ${unit === 'metric' ? 'bg-neutral-700' : ''}`}>
                        Celcius (°C) {unit === 'metric' && <img src={checkedIcon} alt='checked'/>} 
                    </button>
                    <button className={`flex justify-between rounded-lg px-2.5 py-2 w-full cursor-pointer ${unit === 'imperial' ? 'bg-neutral-700' : ''}`}>
                        Farenheit (°F){unit === 'imperial' && <img src={checkedIcon} alt='checked'/>} 
                    </button>
                </div>
            </div>
             <hr className="border-neutral-600 w-full"></hr>
            <div className="flex flex-col gap-2 w-full">
                <p className="text-neutral-300">Wind Speed</p>
                <div className="flex flex-col gap-1 items-start">
                    <button className={`flex justify-between rounded-lg px-2.5 py-2 w-full cursor-pointer ${unit === 'metric' ? 'bg-neutral-700' : ''}`}>
                        km/h {unit === 'metric' && <img src={checkedIcon} alt='checked'/>}
                    </button>
                    <button className={`flex justify-between rounded-lg px-2.5 py-2 w-full cursor-pointer ${unit === 'imperial' ? 'bg-neutral-700' : ''}`}>
                        mph {unit === 'imperial' && <img src={checkedIcon} alt='checked'/>}
                    </button>
                </div>
            </div>
            <hr className="border-neutral-600 w-full"></hr>
            <div className="flex flex-col gap-2 w-full">
                <p className="text-neutral-300">
                    Precipitation
                </p>
                <div className="flex flex-col gap-1 items-start">
                    <button className={`flex justify-between rounded-lg px-2.5 py-2 w-full cursor-pointer ${unit === 'metric' ? 'bg-neutral-700' : ''}`}>
                        Milimeters (mm) {unit === 'metric' && <img src={checkedIcon} alt='checked'/>}
                    </button>
                    <button className={`flex justify-between rounded-lg px-2.5 py-2 w-full cursor-pointer ${unit === 'imperial' ? 'bg-neutral-700' : ''}`}>
                        Inches (in) {unit === 'imperial' && <img src={checkedIcon} alt='checked'/>}
                    </button>
                </div>

            </div>

        </div>
    )
}