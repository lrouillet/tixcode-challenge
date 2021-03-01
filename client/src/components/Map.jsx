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
            defaultCenter={coordinates}
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