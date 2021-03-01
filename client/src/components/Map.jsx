import React from 'react'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from 'react-google-maps'

const Map = ({ coordinates, zoomLevel }) => {

    return (
        <GoogleMap
            defaultZoom={zoomLevel | 15}
            defaultCenter={
                Object.keys(coordinates).length !== 0 ?
                coordinates :
                {lat: 0, lng: 0}
            }
        >
            <Marker position={coordinates} />
        </GoogleMap>
    );
}

export default withScriptjs(
    withGoogleMap(
        Map
    )
);