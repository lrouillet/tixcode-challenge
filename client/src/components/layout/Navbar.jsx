import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/authContext';

const NavbarComponent = () => {

    const authContext = useContext(AuthContext);
    const { authenticated, logout, user } = authContext;
    
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/home">TIXCODE Locs</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {
                    authenticated ? (
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Inicio</Nav.Link>
                        </Nav>
                    ) :
                    (
                        <Nav className="mr-auto">
                        </Nav>
                    )
                }
                <Nav>
                    {
                        authenticated ?
                        (<Nav.Link href={`/users/${user._id}`}>{user.username}</Nav.Link>) :
                        (<Nav.Link href="/">Inicia Sesión</Nav.Link>)
                    }
                </Nav>
                {
                    authenticated ?
                    (<Button variant="danger" onClick={logout}>Cerrar Sesión</Button>) :
                    (<Button variant="primary" href="/signup">Regístrate</Button>)
                }
            </Navbar.Collapse>
        </Navbar>
    );
}
 
export default NavbarComponent;