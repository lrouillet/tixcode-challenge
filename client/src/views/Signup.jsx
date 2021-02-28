import React, {useEffect, useState, useContext} from 'react'
import styled from 'styled-components';
import backgroundImage from '../images/signup-bkgd.png';
import AuthContext from '../context/authContext';

const Container = styled.div`
    height: 100%;
    background-image: url(${backgroundImage});
`

const FormContainer = styled.div`
    right: 0;
    margin-left: 60%;
    padding: 150px 30px;
    box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    @media (max-width: 992px) {
        margin-left: 0;
        padding-left: 90px;
        padding-right: 90px;
    }
`

const Signup = (props) => {

    const authContext = useContext(AuthContext);
    const { authenticated,  userSignUp, error } = authContext;

    useEffect(() => {
        if (authenticated) {
            return props.history.push('/home');
        }
    }, [authenticated, props.history]);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
        confirmPass: ''
    });

    const [formError, setFormError] = useState({ fieldName: '' , message: '' });

    const onSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPass) {
            return setFormError({
                fieldName: 'confirmPass',
                message: 'Las contraseñas no coinciden'
            });
        } else if (formData.password.length < 8) {
            return setFormError({
                fieldName: 'password',
                message: 'Contraseña demasiado corta (al menos 8 caracteres)'
            });
        } else {
            setFormError({ fieldName: '', message: ''});
        }

        userSignUp(formData);
    }

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        });
    }

    return (
        <Container>
            <FormContainer>
                <h1 className="h1 text-center">Únete a nosotros</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputUserName">Usuario</label>
                            <input
                                type="text"
                                name="username"
                                className={
                                    error.errors.username ?
                                    "form-control is-invalid" :
                                    "form-control"
                                }
                                id="inputUserName"
                                placeholder="Usuario"
                                required={true}
                                onChange={onChange}
                            />
                            { error.errors.username ? (<div className="invalid-feedback">{error.errors.username.message}</div>) : null }
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail">Email</label>
                            <input
                                type="email"
                                name="email"
                                className={
                                    error.errors.email ?
                                    "form-control is-invalid" :
                                    "form-control"
                                }
                                id="inputEmail"
                                placeholder="Email"
                                required={true}
                                onChange={onChange}
                            />
                            { error.errors.email ? (<div className="invalid-feedback">{error.errors.email.message}</div>) : null }
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                className={
                                    formError.fieldName === 'confirmPass' || formError.fieldName === 'password' ?
                                    "form-control is-invalid" :
                                    "form-control"
                                }
                                id="inputPassword"
                                placeholder="Contraseña"
                                required={true}
                                onChange={onChange}
                            />
                            { formError.fieldName === 'password' ? (<div className="invalid-feedback">{formError.message}</div>) : null }
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPasswordConfirm">Confirmar Contraseña</label>
                            <input
                                type="password"
                                name="confirmPass"
                                className={ formError.fieldName === 'confirmPass' ? "form-control is-invalid" : "form-control" }
                                id="inputPasswordConfirm"
                                placeholder="Contraseña"
                                required={true}
                                onChange={onChange}
                            />
                            { formError.fieldName === 'confirmPass' ? (<div className="invalid-feedback">{formError.message}</div>) : null }
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputName">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="inputName"
                                placeholder="Nombre"
                                required={true}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputSurname">Apellido</label>
                            <input
                                type="text"
                                name="surname"
                                className="form-control"
                                id="inputSurname"
                                placeholder="Apellido"
                                required={true}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Dirección</label>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            id="inputAddress"
                            placeholder="Av. Corrientes 600, Buenos Aires, Argentina"
                            required={true}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Regístrate</button>
                </form>
            </FormContainer>
        </Container>
    );
}
 
export default Signup;