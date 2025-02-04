import {combineReducers} from "redux";
import usersReducer from "../reducers/users";
import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from 'redux';
import appReducer from "../reducers/app";
import walletsReducer from "../reducers/wallet";

const rootReducer = combineReducers({
    user: usersReducer,
    wallet: walletsReducer,
    app: appReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;

export type State = ReturnType<typeof rootReducer>