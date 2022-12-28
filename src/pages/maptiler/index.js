import React from "react";
import Map from 'react-map-gl';
const apiKey = "nECYiaZ6s0limOBfbcxY";


export default function MapTilerViewer() {

  return (
    <Map 
    initialViewState={{
      longitude: 16.62662018,
      latitude: 49.2125578,
      zoom: 14
    }}
    style={{width: "100%", height: " calc(100vh - 77px)"}}
    mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`}
 >
  </Map>
  );
}
