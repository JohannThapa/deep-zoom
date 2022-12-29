import React from "react";
import OpenSeaDragon from "openseadragon";
import TileSourceSelect from "../../components/tiles/tilesSelect";

const TileSource = [
    {
        id: "jpg-images/15mb.jpg",
        label: "18 mb JPG image"
    },
    {
        id: "jpg-images/38mb.png",
        label: "38 mb PNG image"
    },
    {
        id: "webp-images/8mb.webp",
        label: "8 mb WEBP image"
    },
    {
        id: "webp-images/south-america.webp",
        label: "Webp SAmerica"
    },
    {
        id: "jpg-images/south-america.jpg",
        label: "Jpg SAmerica"
    },
    {
        id: "jpg-images/5mb.jpg",
        label: "5 mb image"
    },
    {
        id: "webp-images/1b.webp",
        label: "Webp image1"
    },
    {
        id: "jpg-images/space.png",
        label: "Png Space"
    }, {
        id: "jpg-images/island.jpg",
        label: "Jpg Island"
    },
    {
        id: "webp-images/2.webp",
        label: "Webp small image1"
    },
    {
        id: "jpg-images/1b.jpg",
        label: "Jpg small image 2"
    },
]
export default function ImageViewer() {

    const [viewer, setViewer] = React.useState(null);
    const [currentTileSource, setCurrentTileSource] = React.useState();
    const SwitchViewer = (id) => {
        viewer && viewer.destroy();
        setViewer(
            OpenSeaDragon({
                id: "openSeaDragon",
                showNavigator: true,
                navigatorSizeRatio: 0.25,
                navigatorPosition: 'BOTTOM_RIGHT',
                wrapHorizontal: true,
                prefixUrl: "openseadragon-images/",
                tileSources: {
                    type: 'image',
                    url: id
                }
            })
        );
    }
    const InitOpenseadragon = () => {
        viewer && viewer.destroy();
        setViewer(
            OpenSeaDragon({
                id: "openSeaDragon",
                showNavigator: true,
                navigatorSizeRatio: 0.25,
                navigatorPosition: 'BOTTOM_RIGHT',
                wrapHorizontal: true,
                prefixUrl: "openseadragon-images/",
                buildPyramid: false,
                tileSources: {
                    type: 'image',
                    url: "jpg-images/15mb.jpg",
                    buildPyramid: false,
                }
            })
        );
    };
    const handleFilesetSelectChange = (id) => {
        loadNewTileset(id);
    };
    function loadNewTileset(id) {
        const index = TileSource.findIndex(
            (element) => element?.id === id
        );
        setCurrentTileSource(TileSource[index]);
        SwitchViewer(TileSource[index]?.id)
    }
    React.useEffect(() => {
        InitOpenseadragon();
        setCurrentTileSource(
            TileSource.length > 0
                ? TileSource[0]
                : null
        );
        return () => {
            viewer && viewer.destroy();
        };
    }, []);

    return (
        <div
            className="App"
            style={{
                position: "relative",
                width: "50%",
                margin: "0 auto"
            }}
        >
            <div className="tilesTopRow">
                <div></div>
                <div style={{ color: "black", textAlign: "center" }}>
                    {currentTileSource?.label}
                </div>
                <TileSourceSelect
                    currentTileSource={currentTileSource}
                    onFileSetChange={handleFilesetSelectChange}
                    tileSources={TileSource}
                />
            </div>
            <div
                id="openSeaDragon"
                style={{
                    height: "600px",
                    width: "600px",
                }}
            ></div>
        </div>
    );
}
