import React from 'react';
import styled from 'styled-components';

const SignInForm = styled.form`
    width: 100%;
    max-width: 330px;
    padding: 25px;
    margin:200px auto;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
`

const Login = () => {
    return (
        <SignInForm>
            <h1 className="h3 mb-3">Inicio de sesión</h1>
            <input type="text" id="inputUsername" className="form-control" placeholder="Usuario" required={true} autoFocus="" />
            <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña" required={true} />
            <button className="btn btn-lg btn-primary w-100" type="submit">Iniciar Sesión</button>
        </SignInForm>
    );
}
 
export default Login;