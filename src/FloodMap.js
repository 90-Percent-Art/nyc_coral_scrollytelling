import React from 'react'
import { useEffect, useState } from 'react';
import Map from "react-map-gl"
import { DeckGL } from 'deck.gl'
import { ScatterplotLayer, SolidPolygonLayer } from "@deck.gl/layers";
import { json } from "d3";
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; // Load worker code separately with worker-loader

// from https://stackoverflow.com/questions/65434964/mapbox-blank-map-react-map-gl-reactjs
mapboxgl.workerClass = MapboxWorker;

export default function FloodMap({mapState, onViewStateChange}) {

    console.log("Flood Map render")
    console.log(mapState.overLayState);

    // Fetch the key bits of data 
    const [dotData, setDotData] = useState([]);
    const [floodData, setFloodData] = useState([]);

    const getData = (url, callback) => {
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((myJSON) => {callback(myJSON.features);})
    };
    useEffect(() => {
      getData("data/sealevel2020_500.geojson", setFloodData);
      getData("data/final_data_points_250.geojson", setDotData);
    }, []);


    // useEffect(() => {
    //   json("./data/sealevel2020_500.geojson")
    //   .then((data) => {
    //     console.log(data);
    //     setFloodData(data.features)})
    //   .catch(err => console.log("here is err ", err));
    // }, []);    

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
    
    const layers = [
      new SolidPolygonLayer({
        id: "polygon-layer",
        data: floodData,
        filled: true,
        stroked: true,
        lineWidthMinPixels: 1,
        getPolygon: (d) => d.geometry.coordinates[0],
        getFillColor: (d) => {
          if (mapState.overLayState.floodVisible) {
            return [146, 184, 221, 125];
          } else {
            return [146, 184, 221, 0];
          }
        },
        updateTriggers: {
          getFillColor: [mapState.overLayState.floodVisible],
        },
        transitions: {
          getFillColor: {
            duration: 300,
          },
        },
      }),
      new ScatterplotLayer({
        id: "scatter-plot",
        data: dotData,
        radiusScale: 80,
        radiusMinPixels: 0.25,
        getPosition: (d) => {
          return d.geometry.coordinates;
        },
        getRadius: 0.7,
        getFillColor: (d) => {
          if (mapState.overLayState.dotsVisible) {
            return [0, 0, 20, 80];
          } else {
            return [0, 0, 20, 0];
          }
        },
        updateTriggers: {
          getFillColor: [mapState.overLayState.dotsVisible],
        },
        transitions:{
          getFillColor: 300
        }
      }),
    ];

    return (
      <DeckGL
        layers={layers}
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
