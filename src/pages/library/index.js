

import React from "react";
    import OpenSeaDragon from "openseadragon";
// import * as staticJs from "../../utils/static";
import { duomo, highsmith } from "../../utils/dummy";

function Library() {
    const [viewer, setViewer] = React.useState(null);

    
      const InitOpenseadragon = () => {
        viewer && viewer.destroy();
        setViewer(
          OpenSeaDragon({
            id: "openSeaDragon",
            prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
            tileSources: [
                {
                    tileSource: highsmith,
                    x: 0
                },
                {
                    tileSource: duomo,
                    x: 1.1
                }
            ]
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
        id="openSeaDragon"
        style={{
          height: "800px",
          width: "1200px",
        }}
      ></div>
      );
  }
export default function StaticViewer() {

    return (
        <div 
         className="App"
         style={{
           display: "flex",
           justifyContent:'space-between'
           }}
        >
          <div>
          <Library/>
          </div>
        </div>
      );
  }
