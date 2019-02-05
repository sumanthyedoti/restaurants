import {FETCH_BOOOKINGS, FETCH_RESTAURANTS_BOOOKINGS, BOOK_TABLE} from '../actions/types';

const initialState = {
  bookings : [],
  restaurants: {},
}

export function fetchBookingsReducer (state=initialState, {type, payload}) {
  switch(type){
    case FETCH_BOOOKINGS:
      return {
        ...state,
        bookings: payload.bookings.table,
      }
    case FETCH_RESTAURANTS_BOOOKINGS:
    let restaurants = state.restaurants;
    restaurants[payload.id] = payload
      return {
        ...state,
        restaurants,
      }
    case BOOK_TABLE:
        return {
          ...state,
          bookings: [...state.bookings, payload],
        }
    default: 
      return state;
  }
}
