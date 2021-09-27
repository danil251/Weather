import axios from 'axios'

export const weatherAPI = {
    getWeather(city) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15ed7e04010ca6665419de69eacd0137&lang=ru`);
    }, getCities () {
        return axios.get('https://raw.githubusercontent.com/aZolo77/citiesBase/master/cities.json')
    }, getWeatherByCoordinates(lat, lon) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=15ed7e04010ca6665419de69eacd0137&lang=ru`)
    }
}

