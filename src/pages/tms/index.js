import React from "react";
import OpenSeaDragon from "openseadragon";

export default function TmsViewer() {

  const [viewer, setViewer] = React.useState(null);

  const InitOpenseadragon = () => {
    viewer && viewer.destroy();
    setViewer(
      OpenSeaDragon({
        id: "openSeaDragon",
        showNavigator: true,
        navigatorSizeRatio: 0.25,
        blendTime: 0,
        navigatorPosition: 'BOTTOM_RIGHT',
        wrapHorizontal: true,
        prefixUrl: "openseadragon-images/",
        tileSources:   [{
            type:       'tiledmapservice',
            tilesUrl:   'http://tilecache.osgeo.org/wms-c/tilecache.py/1.0.0/basic/',
            width: 256 * 65534,
            height: 256 * 32767
        }]
      })
    );
  };


  React.useEffect(() => {
    InitOpenseadragon();
    return () => {
      viewer && viewer.destroy();
    };
  }, []);

  return (
    <div
      className="App"
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <div
        id="openSeaDragon"
        style={{
          height: "600px",
          width: "100%",
        }}
      ></div>
    </div>
  );
}
