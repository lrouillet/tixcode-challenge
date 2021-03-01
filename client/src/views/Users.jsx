import React, { useState, useEffect }from 'react'
import Map from '../components/Map';

import http from '../http-common';
import axios from 'axios';
import MainContainer from '../components/layout/MainContainer';

const Users = (props) => {
    const { match: { params } } = props;
    console.log(params);

    const [appStatus, setAppStatus] = useState({
        loading: true,
        user: {},
        coordinates: {
            lat: 0,
            lng: 0
        }
    });

    useEffect( () => {
        fetchData();
    },[appStatus]);

    const fetchData = async () => {
        if (!appStatus.loading) return;

        const user = (await http.get(`/users/${params.id}`)).data;
        console.log(user);
        const coordinates = (await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${user.address}&key=${process.env.REACT_APP_API_KEY}`
        ))
        .data
        .results[0]
        .geometry
        .location;

        setAppStatus({
            loading: false,
            user,
            coordinates
        });
    }

    console.log('appStatus', appStatus);

    return (
        <MainContainer>
            {!appStatus.loading ?
            <Map
                coordinates={appStatus.coordinates} 
                googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCGb1DC2QzMwBfrVsuryy3WFza-UoT2mZw"}    
                containerElement={<div style={{height: '400px'}}></div>}
                loadingElement={<p>Cargando</p>}
                mapElement={<div style={{ height: `100%` }} />}
            /> : null}
        </MainContainer>
    )
}

export default Users