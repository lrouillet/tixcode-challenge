import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import http from '../http-common';

import { 
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    AUTH_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null, 
        message: null, 
        loading: true
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const userSignUp = async body => {
        try {
            const res = await http.post('/users', body);

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            const alert = {
                msg: error,
                cathegory: 'error-alert'
            }

            dispatch({
                type: SIGNUP_ERROR,
                payload: alert
            })
        }
    }

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return dispatch({
                    type: LOGIN_ERROR
                })
            }

            const res = await http.get('/users/me');
            console.log(res);

            dispatch({
                type: AUTH_SUCCESS,
                payload: res.data.user
            });
        } catch (e) {
            console.log('error', e);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    const login = async body => {
        try {
            const res = await http.post('/users/login', body);
            
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cierra la sesión del usuario
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loader,
                checkAuth,
                userSignUp,
                login,
                logout
            }}
        >{props.children}

        </AuthContext.Provider>
    )
}

export default AuthState;