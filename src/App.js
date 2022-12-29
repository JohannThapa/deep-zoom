import './App.css';
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import IffViewer from "./pages/iifViewer";
import SimpleViewer from "./pages/simpleViewer";
import Clover from './pages/clover';
import Layout from "./layout";
import StaticViewer from './pages/library';
import TilesViewer from './pages/tiles';
import OsmViewer from './pages/osm';
import TmsViewer from './pages/tms';
import MapTilerViewer from './pages/maptiler';
import ImageViewer from './pages/image';
import TileSearchSource from './components/search';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<IffViewer />} /> */}
          <Route path="tiles" element={<TilesViewer />} />
          <Route index element={<Downloader />} />
          <Route path="osm" element={<OsmViewer />} />
          <Route path="image" element={<ImageViewer />} />
          <Route path="tms" element={<TmsViewer />} />
          <Route path="map-tiler" element={<MapTilerViewer />} />
          <Route path="simple" element={<SimpleViewer />} />
          <Route path="clover" element={<Clover />} />
          <Route path="static" element={<StaticViewer />} />
        </Route>
      </Routes>
    </div>
  );
}
const Downloader = () => {
  const [tiles, setTiles] = useState(null);
  const getData=()=>{
    fetch('tiles.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setTiles(myJson?.Slide?.Scan?.Tiles)
      });
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className='rtm'>
      <div className='main-container'>
        <TileSearchSource tileSources={tiles} />
      </div>
    </div>
  )
}
export default App;
