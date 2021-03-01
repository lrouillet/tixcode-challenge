import React from 'react';

import MainContainer from '../components/layout/MainContainer'
import UserScroll from '../components/UsersScroll'

const Home = () => {
    return (
        <MainContainer>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">TIXCODE Locs</h1>
                    <p className="lead">La base de datos de ubicaciones más grande del país.</p>
                </div>
            </div>
            <UserScroll />
        </MainContainer>
    );
}
 
export default Home;