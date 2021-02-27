import React from 'react'
import styled from 'styled-components';
import backgroundImage from '../images/signup-bkgd.png';

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
    }
`

const Signup = () => {
    return (
        <Container>
            <FormContainer>
                <h1 className="h1 text-center">Únete a nosotros</h1>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Usuario</label>
                            <input type="text" className="form-control" id="inputEmail" placeholder="Usuario" required={true} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Contraseña</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Contraseña" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Dirección</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Av. Corrientes 600, Buenos Aires, Argentina" required={true} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Regístrate</button>
                </form>
            </FormContainer>
        </Container>
    );
}
 
export default Signup;