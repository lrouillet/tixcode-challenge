import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const NavbarComponent = () => {

    const signout = () => {
        console.log('session finished');
    }
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">TIXCODE Challenge</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Inicio</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#">Mi perfil</Nav.Link>
                </Nav>
                <Button variant="danger" onClick={signout}>Cerrar Sesión</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}
 
export default NavbarComponent;