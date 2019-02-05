import {GET_PROFILE} from './types';

export function getProfileAction(username) {
  return function (dispatch){
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/login/${username}`, {
      headers: {
        "Content-Type": "application/json",
        "username": username,
      }
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: GET_PROFILE,
          payload: json.user,
        })
        resolve(json);
      })
      .catch((err) => {
        reject('err');
      })
    })
  }
}