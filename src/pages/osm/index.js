

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
                showNavigator: true,
                navigatorSizeRatio: 0.3,
                prefixUrl: "openseadragon-images/",
                wrapHorizontal: true,
                zoomPerScroll: 1.2,
                minZoomImageRatio: 0.5,
                tileSources: [{
                    type: 'openstreetmaps'
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
            id="openSeaDragon"
            style={{
                marginTop: "60px",
                height: "600px",
                width: "900px",
            }}
        ></div>
    );
}
export default function OsmViewer() {

    return (
        <div
            className="App"
            style={{
                display: "flex",
                justifyContent: 'space-between'
            }}
        >
            <div>
                <Library />
            </div>
        </div>
    );
}
