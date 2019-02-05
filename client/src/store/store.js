import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {fetchRestaurantsReducer} from './reducers/restaurantReducer'
import {fetchBookingsReducer} from './reducers/bookingsReducer'
import {getProfileReducer} from './reducers/userReducer'


const cheifReducer =  combineReducers({
  reducedRestaurants: fetchRestaurantsReducer,
  reducedBookings: fetchBookingsReducer,
  reducedUser: getProfileReducer,
})

const store = createStore(cheifReducer, compose(applyMiddleware(thunk),   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;