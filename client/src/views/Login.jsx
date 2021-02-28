import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import MainContainer from '../components/layout/MainContainer';

import AuthContext from '../context/authContext';

const SignInForm = styled.form`
    width: 100%;
    max-width: 330px;
    padding: 25px;
    margin:200px auto;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
`

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const { login, authenticated, error } = authContext;

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if (authenticated) {
            return props.history.push('/home');
        }
    }, [authenticated, props.history]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        login(formData);
    }

    return (
        <MainContainer>
            <SignInForm onSubmit={onSubmit}>
                <h1 className="h3 mb-3">Inicio de sesión</h1>
                <input type="text" name="username" id="inputUsername" className="form-control" placeholder="Usuario" required={true} autoFocus="" onChange={onChange} />
                <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Contraseña" required={true} onChange={onChange} />
                { error ? ( <div className="alert alert-danger" role="alert"> Usuario y/o contraseña inválidos </div> ) : null }
                <button className="btn btn-lg btn-primary w-100" type="submit">Iniciar Sesión</button>
            </SignInForm>
        </MainContainer>
    );
}
 
export default Login;