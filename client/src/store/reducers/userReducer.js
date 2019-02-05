import {GET_PROFILE, SIGN_IN} from '../actions/types';

const initialState = {
  isSignedIn: false,
  profile: {}
}

export function getProfileReducer (state=initialState, {type, payload}) {
  switch(type){
    case GET_PROFILE:
      return {
        ...state,
        profile: payload
      }
    case SIGN_IN:
    console.log(!state.isSignedIn)
      return {
        ...state,
        isSignedIn: !state.isSignedIn
      }
    default: 
      return state;
  }
}
