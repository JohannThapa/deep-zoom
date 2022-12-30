import React from "react";
import OpenSeaDragon from "openseadragon";
import TileSourceSelect from "../../components/tiles/tilesSelect";
{/* <iframe width="500" height="300" src="https://api.maptiler.com/tiles/satellite-v2/?key=nECYiaZ6s0limOBfbcxY#1.0/0.00000/0.00000"></iframe> */ }
const apiKey = "https://api.maptiler.com/tiles/satellite-v2/?key=nECYiaZ6s0limOBfbcxY#1.0/0.00000/0.00000";

const TileSource = [
  {
    id: "city",
    label: "City"
  },
  {
    id: "satellite",
    label: "Satellite"
  },
  {
    id: "border",
    label: "Borders and Lines"
  }
]
export default function TilesViewer() {

  const [viewer, setViewer] = React.useState(null);
  const [currentTileSource, setCurrentTileSource] = React.useState();
  const SwitchViewer = (id) => {
    viewer && viewer.destroy();
    if (id === "city") {
      setViewer(
        OpenSeaDragon({
          id: "openSeaDragon",
          showNavigator: true,
          navigatorPosition: 'BOTTOM_RIGHT',
          blendTime: 0,
          wrapHorizontal: true,
          prefixUrl: "openseadragon-images/",
          tileSources: {
            height: 500 * 256,
            width: 1024 * 500,
            tileSize: 256,
            zoomPerScroll: 1.2,
            minLevel: 9,
            getTileUrl: function (level, x, y) {
              return "https://www.large-format.photography/gigapixelKacheln/Barcelona/TileGroup0/" +
                (level - 8) + "-" + x + "-" + y + ".jpg";
            }
          },
        })
      );
    }
    else if (id === "border") {
      setViewer(
        OpenSeaDragon({
          id: "openSeaDragon",
          showNavigator: true,
          navigatorPosition: 'BOTTOM_RIGHT',
          blendTime: 0,
          wrapHorizontal: true,
          imageLoaderLimit: 5,
          constrainDuringPan: true,
          immediateRender: false,
          prefixUrl: "openseadragon-images/",
          tileSources: {
            height: 1024 * 256,
            width: 1024 * 256,
            tileSize: 256,
            minLevel: 9,
            imageLoaderLimit: 5,
            getTileUrl: function (level, x, y) {

              function zeropad(i) {
                var n = String(i),
                  m = 6 - n.length;
                n = (m < 1) ? n : new Array(m + 1).join("0") + n;
                return n.substring(0, 3) + "/" + n.substring(3);
              };

              return "http://s3.amazonaws.com/info.aaronland.tiles.shapetiles/" +
                (level - 8) + "/" + zeropad(x) + "/" + zeropad(y) + ".png";
            }
          },
        })
      );
    }
    else {
      setViewer(
        OpenSeaDragon({
          id: "openSeaDragon",
          showNavigator: true,
          navigatorSizeRatio: 0.25,
          blendTime: 0,
          navigatorPosition: 'BOTTOM_RIGHT',
          wrapHorizontal: true,
          prefixUrl: "openseadragon-images/",
          tileSources: {
            height: 1024 * 256,
            width: 1024 * 256,
            tileSize: 256,
            minLevel: 9,
            getTileUrl: function (level, x, y) {
              return "http://s3.amazonaws.com/com.modestmaps.bluemarble/" +
                (level - 8) + "-r" + y + "-c" + x + ".jpg";
            }
          },
        })
      );
    }
  }
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
        tileSources: {
          height: 500 * 256,
          width: 1024 * 500,
          tileSize: 256,
          tileOverlap: 1,
          zoomPerScroll: 1,
          defaultZoomLevel:8,
          minLevel: 1,
          // getTileUrl: function (level, x, y) {
          //   function padding(i) {
          //     var n = String(i),
          //     m = 6 - n.length;
          //   n = (m < 1) ? n : new Array(m + 1).join("0") + n;
          //   return  n.substring(3);
          //   }
          //   console.log(level)
          //   return "https://barcelonagigapixel.s3.us-east-2.amazonaws.com/giga2/BARCELONA_2022_01_19_502280x251140.tiles/" +
          //     "l" + (level - 8) + "/" + padding(y) + "/" + `l${level - 8}_${padding(y)}_${padding(x)}` + ".jpg";
          // }
          getTileUrl: function (level, x, y) {
            function zeropad(i) {
              var n = String(i),
                m = 6 - n.length;
              n = (m < 1) ? n : new Array(m + 1).join("0") + n;
              return  n.substring(3);
            };

            console.log(zeropad(x))
            console.log('y',zeropad(y))
            console.log('level',(level - 8))
            return "https://www.large-format.photography/gigapixelKacheln/Barcelona/TileGroup0/" +
              (level - 8) + "-" + x + "-" + y + ".jpg";
          }
        },
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
          height: "500px",
          width: "100%",
        }}
      ></div>
    </div>
  );
}
