import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const middlewares = [thunk]
const initialState = {
    product: {
        isLoading: false,
        products: []
    },
    // ram:"jsfa"
}

export const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))

