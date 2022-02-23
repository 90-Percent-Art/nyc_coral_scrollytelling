import React from 'react'
import Map from "react-map-gl"
import { DeckGL } from 'deck.gl'
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; // Load worker code separately with worker-loader

// from https://stackoverflow.com/questions/65434964/mapbox-blank-map-react-map-gl-reactjs
mapboxgl.workerClass = MapboxWorker;

export default function FloodMap({mapState, onViewStateChange}) {

    console.log(mapState)
    
    const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const mapStyle = "mapbox://styles/jfoss117/ckzr8kmjs002314lelqt0w83j";

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
        // update the parent component 
        onViewStateChange(viewState);
        // update mapbox 
        return viewState;
    }    

    return (
      <DeckGL
        initialViewState={mapState.viewState}
        controller={{ doubleClickZoom: true, scrollZoom: false }}
        onViewStateChange={handleViewStateChange}
      >
        <Map
          reuseMaps={true}
          mapboxAccessToken={mapboxToken}
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          maxBounds={mapState.viewState.maxBounds}
        />
      </DeckGL>
    );
}
