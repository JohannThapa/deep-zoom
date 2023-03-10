import OpenSeaDragon from "openseadragon";
import React, { useEffect, useState } from "react";
import "./style.css";

const SimpleOpenSeadragonViewer = ({ image }) => {
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    if (image && viewer) {
      viewer.open(image.source);
    }
  }, [image]);

  const InitOpenseadragon = () => {
    viewer && viewer.destroy();
    setViewer(
      OpenSeaDragon({
        id: "openSeaDragon",
        prefixUrl: "openseadragon-images/",
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 2,
        minZoomLevel: 1,
        visibilityRatio: 1,
        zoomPerScroll: 2,
      })
    );
  };

  useEffect(() => {
    InitOpenseadragon();
    return () => {
      viewer && viewer.destroy();
    };
  }, []);

  return (
    <div
      id="openSeaDragon"
      style={{
        height: "800px",
        width: "800px",
        position: "absolute",
        top: 0,
      }}
    ></div>
  );
};

export default SimpleOpenSeadragonViewer;
