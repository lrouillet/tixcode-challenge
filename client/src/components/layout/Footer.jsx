import React from 'react'
import styled from 'styled-components';

const FooterElement = styled.footer`
    margin-bottom: 0px;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f5f5f5;
`

const Footer = () => {
    return (
        <FooterElement>
            <div className='container'>© {(new Date()).getFullYear()} - TIXCODE - Todos los derechos reservados.</div>
        </FooterElement>
    );
}
 
export default Footer;