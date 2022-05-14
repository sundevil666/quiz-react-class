import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionType';

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email, password, returnSecuredToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo0YNClT4V7LGs2cf4z_RhTesryQGAQ0w'
    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo0YNClT4V7LGs2cf4z_RhTesryQGAQ0w'
    }
    const res = await axios.post(url, authData)
    const data = res.data

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)

    dispatch(authSuccess(data.idToken))
  }
}


export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  return {
    type: AUTH_LOGOUT
  }
}
export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}
