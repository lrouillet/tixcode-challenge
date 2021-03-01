import React, { useState, useEffect }from 'react'
import Map from '../components/Map';

import styled from 'styled-components';

import http from '../http-common';
import axios from 'axios';
import MainContainer from '../components/layout/MainContainer';

const UserInfo = styled.div`
    background-color: #e9ecef;
    padding-top: 3rem;
    padding-bottom: 2rem;
    min-height: 100%;
`

const Users = (props) => {
    const { match: { params } } = props;

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
        // eslint-disable-next-line
    },[appStatus]);

    const fetchData = async () => {
        if (!appStatus.loading) return;
        try {
            const user = (await http.get(`/users/${params.id}`)).data;
            const geoData = (await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${user.address}&key=${process.env.REACT_APP_API_KEY}`
            )).data
    
            const coordinates = geoData.results[0] ? geoData.results[0].geometry.location : {lat: 0, lng: 0};
            setAppStatus({
                loading: false,
                user,
                coordinates
            });
        } catch (e) {
            setAppStatus({
                loading: false,
                user: {},
                coordinates: {lat: 0, lng: 0}
            });
        }
    }


    return (
        <MainContainer>
            {!appStatus.loading ?
            <Map
                coordinates={appStatus.coordinates} 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_API_KEY}`}    
                containerElement={<div style={{height: '400px'}}></div>}
                loadingElement={<p>Cargando</p>}
                mapElement={<div style={{ height: `100%` }} />}
            /> : null}
            <UserInfo>
                <div className="container">
                    <h1 className="display-4">{appStatus.user.username}</h1>
                    <p className="lead">Miembro desde {new Date(appStatus.user.createdAt).toLocaleDateString('es-AR')}</p>
                </div>
                <div className="container">
                    <div className="mb-3 row">
                        <label htmlFor="staticName" className="col-sm-2 h5 col-form-label">Nombre</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" id="staticName" defaultValue={appStatus.user.name} />
                        </div>
                        <label htmlFor="staticSurname" className="col-sm-2 h5 col-form-label">Apellido</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" id="staticSurname" defaultValue={appStatus.user.surname} />
                        </div>
                    </div>
                    <div className="mb-3 row justify-content-center">
                        <label htmlFor="staticEmail" className="col-sm-2 h5 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={appStatus.user.email}/>
                        </div>
                        <label htmlFor="staticCreatedAt" className="col-sm-2 h5 col-form-label">Dirección</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" id="staticCreatedAt" defaultValue={appStatus.user.address}/>
                        </div>
                    </div>
                </div>
            </UserInfo>
        </MainContainer>
    )
}

export default Users