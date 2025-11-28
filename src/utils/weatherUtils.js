import iconDrizzle from '../assets/images/icon-drizzle.webp';
import iconFog from '../assets/images/icon-fog.webp';
import iconOvercast from '../assets/images/icon-overcast.webp';
import iconPartlyCloudy from '../assets/images/icon-partly-cloudy.webp';
import iconRain from '../assets/images/icon-rain.webp';
import iconSnow from '../assets/images/icon-snow.webp';
import iconStorm from '../assets/images/icon-storm.webp';
import iconSunny from '../assets/images/icon-sunny.webp';



export function getWeatherIcon(code) {
    const weatherCategories = {
        sunny: {code: [0], icon: iconSunny},
        partlyCloudy: {code: [1, 2], icon: iconPartlyCloudy},
        overCast: {code: [2], icon: iconOvercast},
        fog: {code: [45, 48], icon: iconFog},
        drizzle: {code: [51, 53, 55, 56, 57, 61, 80], icon: iconDrizzle},
        rain: {code: [63, 65, 66, 67, 81, 82], icon: iconRain},
        snow: {code: [71, 73, 75, 77, 85, 86], icon: iconSnow},
        storm: {code: [95, 96, 99], icon: iconStorm},
    };

    for(const category of Object.values(weatherCategories)) {
        if(category.code.includes(code)) {
            return category.icon;
        }
    }
    return iconPartlyCloudy;

}