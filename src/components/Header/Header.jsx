import { useEffect, useState, useRef } from "react";
import logo from "../../assets/images/logo.svg";
import unitIcon from "../../assets/images/icon-units.svg";
import dropDownIcon from "../../assets/images/icon-dropdown.svg";
import Units from "../Units/Units";

export default function Header() {
    const [showUnits, setShowUnits] = useState(false);
    const unitRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if(unitRef.current && !unitRef.current.contains(event.target)) setShowUnits(false);
        } if(showUnits) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showUnits]);

    const handleUnits = () => {
        setShowUnits(prev => !prev)
    }

    return (
        <div>
            <header className="flex justify-between">
                <div className="flex justify-between">
                    <img src={logo} alt="Weather Logo" />
                </div>
                <div className={`flex gap-2.5 rounded-xl bg-neutral-800 items-center px-4 py-3border ${showUnits ? ' border-white' : 'border-transparent'}`}>
                    <img src={unitIcon} alt="Unit Icon" className="w-4 h-4" />
                    <p className="text-white">Units</p>
                    <div ref={unitRef} className="relative">
                        <button className='cursor-pointer'  onClick={handleUnits}>
                            <img src={dropDownIcon} alt="DropDown Icon" className="w-3 h-[18px]" />
                        </button>
                        {showUnits &&
                            <Units />
                        }
                    </div>


                </div>

            </header>

        </div>

    )
}