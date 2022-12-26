import './App.css';
import * as React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import IffViewer from "./pages/iifViewer";
import SimpleViewer from "./pages/simpleViewer";
import Layout from "./layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IffViewer />} />
          <Route path="simple" element={<SimpleViewer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
