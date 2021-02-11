import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './modules/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware());

const store = createStore(rootReducer, enhancer);

export default store;
