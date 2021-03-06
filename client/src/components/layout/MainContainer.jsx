import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    min-height: 100vh;
`

const MainContainer = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    );
}
 
export default MainContainer;