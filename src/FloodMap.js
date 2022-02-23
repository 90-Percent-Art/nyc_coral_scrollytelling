import React from 'react'
import Map from "react-map-gl"
import { DeckGL } from 'deck.gl'
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; // Load worker code separately with worker-loader

// from https://stackoverflow.com/questions/65434964/mapbox-blank-map-react-map-gl-reactjs
mapboxgl.workerClass = MapboxWorker;

export default function FloodMap() {
    const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const mapStyle = "mapbox://styles/jfoss117/ckzr8kmjs002314lelqt0w83j";

    const initialViewState = {  
        longitude: -74.6,
        latitude: 40.7,
        zoom: 10,
        maxZoom: 16,
        pitch: 0,
        bearing: 0,
        maxBounds: [
            [-74.8, 40], // Southwest coordinates
            [-73.2, 41] // Northeast coordinates
        ]}

    const handleViewStateChange = ({viewState}) => {
        if (viewState.longitude < -74.27) {
            viewState.longitude = -74.27;
        }
        if (viewState.longitude > -73.6) {
            viewState.longitude = -73.6;
        }
        if (viewState.latitude > 40.85) {
            viewState.latitude = 40.85;
        }
        if (viewState.latitude < 40.48) {
            viewState.latitude = 40.48;
        }
        if (viewState.zoom < 10) {
            viewState.zoom = 10;
        }
        // update mapbox
        return viewState;
    }    

    return (
      <DeckGL
        initialViewState={initialViewState}
        controller={{ doubleClickZoom: true, scrollZoom: false }}
        onViewStateChange={handleViewStateChange}
      >
        <Map
          reuseMaps={true}
          mapboxAccessToken={mapboxToken}
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          maxBounds={initialViewState.maxBounds}
        />
      </DeckGL>
    );
}
