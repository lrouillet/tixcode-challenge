import React, { useEffect, useState } from 'react'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from 'react-google-maps'

import axios from 'axios';

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