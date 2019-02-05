import {FETCH_RESTAURANTS, FETCH_RESTAURANT, SEARCH_RESTAURANTS, NULL_SEARCH} from './types';

export function fetchRestaurantsAction(type) {
  return function (dispatch){
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/restaurants/')
        .then((res)=> res.json())
        .then((json) => {
          dispatch({
            type: FETCH_RESTAURANTS,
          payload: json.restaurants
          })
          resolve(json);
        })
        .catch(err => reject(err));
    })
  }
}

export function fetchRestaurantAction(id) {
  console.log(id)
  return function (dispatch){
    fetch(`http://localhost:3000/api/restaurants/${id}`)
      .then((res)=> res.json())
      .then((json) => dispatch({
        type: FETCH_RESTAURANT,
        payload: json.restaurant
      }))
  }
}

export function nullSearchAction() {
  return {
    type: NULL_SEARCH
  }
}

export function searchRestaurantsAction(searchText) {
  return function (dispatch){
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/api/restaurants/search/${searchText}`)
        .then((res)=> res.json())
        .then((json) => {
          dispatch({
            type: SEARCH_RESTAURANTS,
            payload: json.restaurants,
          })
          resolve(json);
        })
        .catch(err => reject(err));
    })
  }
}