import {weatherAPI} from "../api/api";

const initialState = {
    weather: {
        name: '',
        wind: {
            speed: '',
            deg: ''
        },
        weather: [{
            description: '',
            main: '',
            icon: ''
        }],
        main: {
            temp: '',
            pressure: '',
            humidity: ''
        },
        clouds: {
            all: ''
        }
    },
    cities: [],
    error: ''
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET-WEATHER': {
            return {...state, weather: action.weather}
        }
        case 'SET-CITIES': {
            return {...state, cities: action.cities}
        }
        case 'SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return {...state}
    }
}

export const setWeather = (weather) => ({type: 'SET-WEATHER', weather})
export const setCities = (cities) => ({type: 'SET-CITIES', cities})
export const setError = (error) => ({type: 'SET-ERROR', error})

export const fetchWeather = (city) => (dispatch) => {
    weatherAPI.getWeather(city).then((res) => {
        dispatch(setError(''))
        dispatch(setWeather(res.data))
    }).catch(() => {
        dispatch(setError('Город не найден'))
    })
}
export const fetchWeatherByCoordinates = (lat, lon) => (dispatch) => {
    weatherAPI.getWeatherByCoordinates(lat, lon).then((res) => {
        dispatch(setError(''))
        dispatch(setWeather(res.data))
    }).catch(() => {
        dispatch(setError('Город не найден'))
    })
}
export const fetchCities = () => (dispatch) => {
    weatherAPI.getCities().then((res) => {
        dispatch(setCities(res.data))
    })
}