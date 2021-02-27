import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosClient from '../http-common';

import { 
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    GET_USER,
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
            const res = await axiosClient.post('/users', body);

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            // console.log(error.response.data.msg);
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

    // Cuando el usuario inicia sesión
    const login = async body => {
        try {
            const res = await axiosClient.post('/users/login', body);
            
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
                userSignUp,
                login,
                logout
            }}
        >{props.children}

        </AuthContext.Provider>
    )
}

export default AuthState;