import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allReviews from './allReviews';
import currentReview from './currentReview';
import allOrders from './allOrders';
import order from './order';
import singleProduct from './singleProduct';

const reducer = combineReducers({user, allReviews, currentReview, allOrders, order, singleProduct})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
