import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', ()=> {
        expect(reducer(undefined, {})).toEqual({
                idToken: null,
                userId: null,
                loading: false,
                error: null,
                authRedirectPath: '/'
        });
    });
    it('should store a token', () =>{ 
        expect(reducer({
            idToken: null,
            userId: null,
            loading: false,
            error: null,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'random-token',
            userId: 'random-userId'
        })).toEqual({
            idToken: 'random-token',
            userId: 'random-userId',
            loading: false,
            error: null,
            authRedirectPath: '/'
        })
    })
})