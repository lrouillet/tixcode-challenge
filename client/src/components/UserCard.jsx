import React from 'react'
import styled from 'styled-components';

const CardContainer = styled.div`
    margin: 30px auto;
`

const UserCard = (props) => {

    return (
        <CardContainer className="card">
            <div className="card-header">
                {props.username}
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.address}</h5>
                <a href={`/users/${props.username}`} className="btn btn-primary">Ver más</a>
            </div>
        </CardContainer>
    );
}
 
export default UserCard;