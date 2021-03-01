import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 60px;
`

const MainContainer = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    );
}
 
export default MainContainer;