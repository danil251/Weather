import React, {useEffect, useState} from 'react';
import s from './WeatherWindow.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchCities, fetchWeather, fetchWeatherByCoordinates} from "../../store/weather-reducer";
import {location, point} from "../../assets/svg";
import {formation} from "../../assets/formation";
import {Demo} from "../../hook/Position";

const WeatherWindow = () => {
    const pos = Demo()
    const dispatch = useDispatch()
    const cities = useSelector(state => state.weather.cities.city)
    const weather = useSelector(state => state.weather.weather)
    const error = useSelector(state => state.weather.error)

    const [searchIsOpen, setSearchIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [searchArr, setSearchArr] = useState([])
    const [unit, setUnit] = useState('c')
    const [err, setErr] = useState('')


    useEffect( () => {
         dispatch(fetchCities())
    }, [dispatch])

    useEffect(() => {
         dispatch(fetchWeatherByCoordinates(pos.props.children[1], pos.props.children[4]))
    },[dispatch])
    useEffect(() => {
        if (inputValue.length > 2) {
            let arr = cities.filter(c => c.name.toLowerCase().startsWith(inputValue.toLowerCase()))
            setSearchArr(arr)
        } else {
            setSearchArr([])
        }
    }, [inputValue, cities])


    const selectItem = (name) => {
        setInputValue(name)
    }
    const searchHandler = () => {
        if (inputValue) {
            dispatch(fetchWeather(inputValue))
            setSearchIsOpen(false)
        } else {
            setErr('Заполните поле')
        }

    }

    const locationHandler = () => {
        dispatch(fetchWeatherByCoordinates(pos.props.children[1], pos.props.children[4]))
    }


    const formTemp = formation.formTemp(weather.main.temp, unit)
    const formWind = formation.formWind(weather.wind.speed, weather.wind.deg)
    const formPressure = weather.main.pressure + ' мм рт. ст.'
    return (
        <div className={s.container}>
            <div className={s.topLine}>
                {searchIsOpen ?
                    <div className={s.inputWrap}><input type="text" placeholder={err ? err : ''} onChange={(e) => {
                        setInputValue(e.target.value)
                    }} value={inputValue} className={s.input}/>
                        <div className={s.ok} onClick={searchHandler}>OK</div>
                        <div className={s.searchWrap}>
                            {searchArr.map(m => <div onClick={() => selectItem(m.name)} key={m.city_id}
                                                     className={s.searchOption}>{m.name}</div>)}
                        </div>
                    </div> :
                    <div>
                        <div className={s.city}>{weather.name ? weather.name : '----'}</div>
                        <div className={s.wrapCity}>
                            <div className={s.changeCity} onClick={() => setSearchIsOpen(!searchIsOpen)}>Сменить город
                            </div>
                            <div className={s.location} onClick={locationHandler}>{location} Мое местоположение</div>
                        </div>
                        {error ? <div>{error}</div> : null}
                    </div>}
                {searchIsOpen ? null : <div className={s.select}>
                    <div className={s.point}>{point}</div>
                    <div className={s.wrapTemp}>
                        <div className={unit === 'c' ? `${s.cel} ${s.active}` : s.cel} onClick={() => setUnit('c')}>C
                        </div>
                        <div className={unit === 'f' ? `${s.far} ${s.active}` : s.far} onClick={() => setUnit('f')}>F
                        </div>
                    </div>
                </div>}
            </div>
            <div>
                {weather.main.temp ? <div className={s.tempWrap}>
                    <div className={s.tempLine}>
                        <img
                            src={weather.weather[0].icon ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : ''}
                            alt="" className={s.img}/>
                        <div className={s.temp}>{formTemp}
                            <div className={s.grad}>O</div>
                        </div>
                    </div>
                    <div
                        className={s.desc}>{weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</div>
                </div> : null}
            </div>
            {weather.main.humidity ? <div className={s.botLine}>
                <div className={s.windWrap}>
                    <div className={s.title}>
                        Ветер
                    </div>
                    <div className={s.value}>{formWind}</div>
                </div>
                <div className={s.windWrap}>
                    <div className={s.title}>
                        Давление
                    </div>
                    <div className={s.value}>{formPressure}</div>
                </div>
                <div className={s.windWrap}>
                    <div className={s.title}>
                        Влажность
                    </div>
                    <div className={s.value}>{weather.main.humidity + '%'}</div>
                </div>
                <div className={s.windWrap}>
                    <div className={s.title}>
                        Вероятность дождя
                    </div>
                    <div className={s.value}>{weather.clouds.all + '%'}</div>
                </div>
            </div> : null}
        </div>
    );
};

export default WeatherWindow;