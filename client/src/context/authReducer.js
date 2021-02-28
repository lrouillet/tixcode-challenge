import {
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    AUTH_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../types/index';

const types = ( state, action ) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            console.log(action.payload);
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                msg: null,
                loading: false
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                authenticated: true,
                user: action.payload.user,
                loading: false
            }
        case LOGOUT:
        case LOGIN_ERROR:
        case SIGNUP_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                error: action.payload, 
                loading: false
            }
                
        default: return state;
    }
}

export default types;