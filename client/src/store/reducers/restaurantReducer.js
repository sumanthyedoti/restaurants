import {FETCH_RESTAURANTS, FETCH_RESTAURANT, SEARCH_RESTAURANTS, NULL_SEARCH} from '../actions/types';

const initialState = {
  restaurants : [],
  searchReasult: [],
  restaurant: {
    location: {},
    user_rating: {},
  }
}

export function fetchRestaurantsReducer (state=initialState, {type, payload}) {
  switch(type){
    case FETCH_RESTAURANTS:
      return {
        ...state,
        restaurants: payload,
        searchReasult: payload
      }
    case SEARCH_RESTAURANTS:
      return {
        ...state,
        searchReasult: payload
      }
    case NULL_SEARCH:
      return {
        ...state,
        searchReasult: state.restaurants
      }
    case FETCH_RESTAURANT:
      return {
        ...state,
        restaurant: payload,
      }
    default: 
      return state;
  }
}