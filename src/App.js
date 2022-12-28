import './App.css';
import * as React from "react";
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
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<IffViewer />} /> */}
          <Route index element={<TilesViewer />} />
          <Route path="osm" element={<OsmViewer />} />
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

export default App;
