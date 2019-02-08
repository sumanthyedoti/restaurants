import {FETCH_BOOOKINGS, FETCH_RESTAURANTS_BOOOKINGS, BOOK_TABLE} from './types';

export function fetchBookingsAction(type) {
  return function (dispatch) {
    return new Promise((resolve, reject)=>{
      fetch('http://localhost:3000/api/bookings/', {
      headers: {
        "Content-Type": "application/json",
        "username": localStorage.getItem('username'),
      }
    })
      .then((res)=> res.json())
      .then((json) => {
        if(json.bookings.table.length>0){
          let bookings = json.bookings.table;
          bookings.forEach((booking, i) => {
            fetch(`http://localhost:3000/api/restaurants/${booking.idRestaurant}`, {
              headers: {
                "Content-Type": "application/json",
                "username": localStorage.getItem('username'),
              }
            })
              .then((res)=> res.json())
              .then((json) => {
                dispatch({
                  type: FETCH_RESTAURANTS_BOOOKINGS,
                  payload: json.restaurant
                })
                if(i===bookings.length-1){
                  resolve('completed');
                }
              })
          });
        }
        dispatch({
          type: FETCH_BOOOKINGS,
          payload: json
        })
      })
    })
    
  }
}

export function fetchRestaurantsBookedAction(bookingId) {
  return function (dispatch) {
    fetch(`http://localhost:3000/api/restaurants/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        "username": localStorage.getItem('username'),
      }
    })
      .then((res)=> res.json())
      .then((json) => {
        return dispatch({
          type: FETCH_RESTAURANTS_BOOOKINGS,
          payload: json.restaurant
        })
      })
  }
}

export function bookingTableAction(bookingObj) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/api/bookings`, {
        method: 'POST',
        mode: "cors", 
        headers: {
            "Content-Type": "application/json",
            "username": localStorage.getItem('username'),
        },
        body: JSON.stringify(bookingObj)
      })
        .then((res) =>{
          dispatch({
            type: BOOK_TABLE,
            payload: bookingObj,
          })
          resolve(res);
        })
        .catch((err) => {
          reject(err)
        });
    })
  }
}

