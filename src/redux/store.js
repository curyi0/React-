import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import viewReducer from './reducer';

const rootReducer = combineReducers({
    view: viewReducer, // state.view.loading, state.view.data 등으로 접근
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
