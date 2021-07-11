import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from "redux-thunk"

const composeA = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const state = createStore(reducer, composeA(applyMiddleware(thunk)))

export default state;