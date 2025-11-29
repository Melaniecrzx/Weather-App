import { useEffect } from "react";
import { useState } from "react"

export const useGeolocalisation = () => {
    const [localisation, setLocalisation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocalisation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

            },
        )
    }, [])

    return {localisation}

}