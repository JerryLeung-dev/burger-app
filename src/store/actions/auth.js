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
                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                    console.log(response.data);
                })
                .catch(err =>{
                    dispatch(authFail(err.response.data.error.message))
                    //err here is an object that wraps response. therefore access by err.response
                    console.log(err.response.data.error.message);
                })
    }
}