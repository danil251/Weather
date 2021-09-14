import {applyMiddleware, combineReducers, createStore} from 'redux'
import {cardsReducer} from "./cards-reducer";
import thunkMiddleware from 'redux-thunk'


const rootReducer = combineReducers({
    Cards: cardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


