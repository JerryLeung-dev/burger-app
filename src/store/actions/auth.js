import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() =>{dispatch(authLogout())}, expirationTime * 1000); //hour
    }
}   

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzORAYzq9paQGiZTuz79eJagO_3azxJKM'; //sign up url
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzORAYzq9paQGiZTuz79eJagO_3azxJKM';//sign in url
        }
        axios.post(url, authData)
                .then(response => {
                    //current time + expiration time ( 3600 )
                    //turn it into a date object
                    const expirationDate = new Date(response.data.expiresIn * 1000 + new Date().getTime())
                    localStorage.setItem('token',response.data.idToken);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId',response.data.localId);

                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                    console.log(response.data);
                })
                .catch(err =>{
                    dispatch(authFail(err.response.data.error.message))
                    //err here is an object that wraps response. therefore access by err.response
                    console.log(err.response.data.error.message);
                })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path 
    }
}

export const authCheckState = () => {
    return dispatch =>{
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) {
                dispatch(authLogout());
            } else {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/100))
            }
        }

    }
}