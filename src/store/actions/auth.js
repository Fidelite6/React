import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      idToken: token,
      userId
    }
  }
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error
    }
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};

export const checkAuthTimeout = (expTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  }
};
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: {
      path: path
    }
  }
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZfySkQKS0-Cz7-TQNNeHSSARB-IDh2LY';

    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZfySkQKS0-Cz7-TQNNeHSSARB-IDh2LY';
    }

    axios.post(url, authData)
      .then(response => {
        localStorage.setItem('token', response.data.idToken);
        const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFailed(err.response.data.error));
        console.log(err);
      })
    //
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem('expirationDate'));

      if (expirationTime < new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}
