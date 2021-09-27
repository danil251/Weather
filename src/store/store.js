import {applyMiddleware, combineReducers, createStore} from 'redux'
import {weatherReducer} from "./weather-reducer";
import thunkMiddleware from 'redux-thunk'


const rootReducer = combineReducers({
    weather: weatherReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


