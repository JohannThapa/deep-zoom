import React from "react";
import OpenSeaDragon from "openseadragon";
import { highsmith } from "../../utils/dummy";

export default function LegacyViewer() {

  const [viewer, setViewer] = React.useState(null);
  const [currentTileSource, setCurrentTileSource] = React.useState();
  const InitOpenseadragon = () => {
    viewer && viewer.destroy();
    setViewer(
      OpenSeaDragon({
        id: "openSeaDragon",
        showNavigator: true,
        navigatorSizeRatio: 0.2,
        minZoomImageRatio: 0.5,
        maxZoomLevel:100,
        constrainDuringPan: true,
        navigatorPosition: 'TOP_LEFT',
        maxZoomPixelRatio:5,
        immediateRender: false,
        smoothTileEdgesMinZoom: 100,
        imageLoaderLimit: 5,
        prefixUrl: "openseadragon-images/",
        tileSources:  
        [
            {
                tileSource: highsmith,
                x: 0
            },
        ]
        //  {
        //     Image: {
        //         xmlns:    "http://schemas.microsoft.com/deepzoom/2008",
        //         Url:      "tiles/",
        //         Format:   "png", 
        //         Overlap:  "2", 
        //         TileSize: "256",
        //         Size: {
        //             Height: "2048",
        //             Width:  "2448"
        //         }
        //     }
        // }
        // tileSources: {
        //     type: 'legacy-image-pyramid',
        //     levels:[{
        //         url: 'tiles/0_0.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/0_1.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/0_2.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/0_3.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/0_4.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/1_0.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/1_1.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/1_2.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/1_3.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/1_4.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/2_0.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/2_1.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/2_2.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/2_3.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/2_4.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/3_0.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/3_1.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/3_2.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/3_3.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        //     {
        //         url: 'tiles/3_4.webp',
        //         height: 2048,
        //         width:  2448
        //     },
        // ]
        // }
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
      }}
    >
      <div
        id="openSeaDragon"
        style={{
          height: "500px",
          width: "100%",
        }}
      ></div>
    </div>
  );
}
