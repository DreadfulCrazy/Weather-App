import convert from 'convert-units';

import {
    CLOUD,
    CLOUDY,
    SUN,
    RAIN,
    SNOW,
    WINDY,
    THUNDER,
    DRIZZLE
} from '../constants/weather';

const getTemp = kelvin =>{
    return  convert(kelvin).from("K").to("C").toFixed(0);
}

const getWeatherState = weather =>{
    const { id } = weather

    if(id<300){
        return THUNDER;
    }else if (id < 400) {
        return DRIZZLE;
    }else if( id < 600){
        return RAIN;
    }else if (id < 700) {
        return SNOW;
    }else if (id < 781) {
        return WINDY;
    }else if (id < 800) {
        return SUN;
    }else if(id < 802){
        return CLOUD;
    }else if (id < 804) {
        return CLOUDY;
    }
}

const transformWeather = weather_data =>{
    const { temp,humidity } = weather_data.main;
    const {speed} = weather_data.wind;
    const weatherState = getWeatherState(weather_data.weather[0]);
    const temperature = getTemp(temp)

    const data = {
        humidity,
        temperature,
        weatherState,
        wind: `${speed} m/s`
    }

    return data;
}

export default transformWeather;