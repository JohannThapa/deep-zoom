import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Toolbar from "../../toolbar";
import TileSourceSelect from "../../tiles/sourceSelect";
import Thumbnails from "../../thumbnails";
import { ConfigContext } from "../../../utils/configContext";
import OpenSeadragon, { Point } from "openseadragon";

import {
  updateUrl,
  parseHash,
  getCanvasImageResources,
} from "../../../utils/helper";
import {css } from "@emotion/react";

const osdTopRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 60px;
`;
const workTitle = css`
  text-align: left;
  color: white;
  font-size: 1.25rem;
  padding-left: 1rem;
`;
const toolBarWrapper = css`
  font-size: 1rem;
  color: #e3e3e3;
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 80px;
  padding-right: 1rem;

  select {
    color: #e3e3e3;
    background-color: #716c6b;
    height: auto;
    margin: 1rem 0 1rem 1rem;
  }

  @media screen and (max-width: 768px) {
    select {
      display: none;
    }
  }
`;

/**
 * Viewer component
 */
const Viewer = ({ manifest }) => {
  if (!manifest) return null;

  const title = manifest.label || "";
  const [openSeadragonInstance, setOpenSeadragonInstance] = useState();
  const [canvasImageResources, setCanvasImageResources] = useState([]);
  const [currentTileSource, setCurrentTileSource] = useState();
  const [tileIndex, setTileIndex] = useState();
  const [currentURLParams, setCurrentURLParams] = useState(
    window.location.hash
  );
  const scrollElRef = React.useRef();
  const configProps = useContext(ConfigContext);

  const openSeadragonContainer = css`
    display: inline-block;
    background: black;
    width: 100%;
    height: ${configProps.height ? configProps.height : 800}px;

    @media screen and (max-width: 768px) {
      height: ${configProps.height ? configProps.height : 500}px;
    }
  `;

  useEffect(() => {
    // Pull out tile sources from manifest
    setCanvasImageResources(getCanvasImageResources(manifest));
     
  }, []);

  useEffect(() => {
    const params = parseHash();
    const tileSource = params["tilesource"];
    setCurrentTileSource(
      canvasImageResources.length > 0
        ? canvasImageResources[tileSource || 0]
        : null
    );
    setTileIndex(tileSource || 0);
    setCurrentURLParams(params);
    // Initialize OpenSeadragon instance
    initOpenSeadragon();
     
  }, [canvasImageResources]);

  useEffect(() => {
    // Add event handlers
    if (openSeadragonInstance) {
      openSeadragonInstance.addHandler("page", handlePageChange);

      if (tileIndex > 0) {
        openSeadragonInstance.goToPage(tileIndex);
      }
      if (configProps.deepLinking) {
        openSeadragonInstance.addHandler("pan", handlePanZoomUpdate);
        openSeadragonInstance.addHandler("zoom", handlePanZoomUpdate);
        openSeadragonInstance.addOnceHandler("open", handleFullyLoaded);
      }
    }
    // Remove event handlers when component unmounts
    return () => {
      if (openSeadragonInstance) {
        openSeadragonInstance.removeHandler("pan", handlePanZoomUpdate);
        openSeadragonInstance.removeHandler("zoom", handlePanZoomUpdate);
      }
    };
     
  }, [openSeadragonInstance]);

  const handlePanZoomUpdate = () => {
    if (openSeadragonInstance) {
      const pan = openSeadragonInstance.viewport.getCenter();
      const zoom = openSeadragonInstance.viewport.getZoom();
      updateUrl({ pan, zoom });
    }
  };

  const handleFullyLoaded = () => {
    const urlParams = currentURLParams;
    const zoom = urlParams["zoom"] || openSeadragonInstance.viewport.getZoom();

    const pan = openSeadragonInstance.viewport.getCenter();
    const x = urlParams["x"] || pan.x;
    const y = urlParams["y"] || pan.y;
    openSeadragonInstance.viewport.panTo(new Point(x, y), true);
    openSeadragonInstance.viewport.zoomTo(zoom, null, true);
  };
  const handleThumbClick = (id) => {
    loadNewFileset(id);
  };

  const calculateDownloadDimensions = () => {
    let returnObj = {};

    try {
      let height,
        width,
        maxWidth = 3000,
        canvasHeight = openSeadragonInstance.drawer.canvas.height,
        canvasWidth = openSeadragonInstance.drawer.canvas.width,
        proportionRatio = canvasHeight / canvasWidth;

      width = canvasWidth > maxWidth ? maxWidth : canvasWidth;
      height = width * proportionRatio;

      returnObj = { width, height };
    } catch {
      console.error(
        "Error in handling download click for a tile source in OpenSeadragon viewer"
      );
      returnObj = {};
    }

    return returnObj;
  };

  const handleDownloadFullSize = () => {
    const { width } = calculateDownloadDimensions();
    const path = `${currentTileSource?.id}/full/${width},/0/default.jpg`;
    window.open(path, "_blank");
  };

  const handleFilesetSelectChange = (id) => {
    loadNewFileset(id);
  };

  const handlePageChange = ({ page }) => {
    const activeTile = canvasImageResources[page];
    setCurrentTileSource(activeTile);
    centerActiveThumbnail(activeTile.id);

    if (configProps.deepLinking) {
      updateUrl({ tileSourceIndex: page });
    }
  };

  function loadNewFileset(id) {
    const index = canvasImageResources.findIndex(
      (element) => element.id === id
    );
    setCurrentTileSource(canvasImageResources[index]);
    openSeadragonInstance.goToPage(index);
  }

  /**
   * Center selected thumbnail in the thumbnail drawer
   * @param {String} id
   */
  function centerActiveThumbnail(id) {
    const el = document.querySelector(`[data-id="${id}"]`);
    const leftPos =
      el?.offsetLeft - scrollElRef?.current?.offsetWidth / 2 + el.offsetWidth / 2;
    scrollElRef?.current?.scrollTo({ left: leftPos, behavior: "smooth" });
  }

  function initOpenSeadragon() {
    if (canvasImageResources.length === 0) {
      return;
    }

    const customControlIds = {
      zoomInButton: `zoom-in-${configProps.containerId}`,
      zoomOutButton: `zoom-out-${configProps.containerId}`,
      //homeButton: "home",
      fullPageButton: `full-page-${configProps.containerId}`,
      nextButton: `next-${configProps.containerId}`,
      previousButton: `previous-${configProps.containerId}`,
    };

    // Include any user passed in Open Seadragon config options
    const getOsdConfig = () => {
      const options = configProps?.openSeadragonOptions;
      return options && Object.keys(options).length > 0 ? options : {};
    };

    setOpenSeadragonInstance(
      OpenSeadragon({
        ajaxWithCredentials: true,
        crossOriginPolicy: "Anonymous",
        defaultZoomLevel: 0,
        gestureSettingsMouse: {
          scrollToZoom: false,
          clickToZoom: true,
          dblClickToZoom: true,
          pinchToZoom: true,
        },
        id: configProps.containerId,
        loadTilesWithAjax: true,
        navigatorPosition: "ABSOLUTE",
        navigatorTop: "100px",
        navigatorLeft: "40px",
        navigatorHeight: "200px",
        navigatorWidth: "260px",
        navImages: {},
        preserveViewport: true,
        referenceStripScroll: "vertical",
        sequenceMode: true,
        showNavigationControl: true,
        showHomeControl: false,
        showReferenceStrip: false,
        toolbar: "toolbarDiv",
        tileSources: canvasImageResources.map((t) => t.id),
        visibilityRatio: 1,
        ...customControlIds,
        ...getOsdConfig(),
      })
    );
  }

  return (
    <>
      <div css={osdTopRow} className="osdTopRow">
        <div css={workTitle} className="workTitle">
          {title}
        </div>
        {configProps.showDropdown && (
          <div>
            <TileSourceSelect
              currentTileSource={currentTileSource}
              onFileSetChange={handleFilesetSelectChange}
              tileSources={canvasImageResources}
            />
          </div>
        )}
      </div>
      <div css={toolBarWrapper} className="toolBarWrapper">
        <div id="toolbarDiv">
          {configProps.showToolbar && (
            <div>
              <Toolbar
                onDownloadFullSize={handleDownloadFullSize}
                toolBarOptions={{
                  showZoom: configProps.showZoom,
                  showFullScreen: configProps.showFullScreen,
                  showDownload: configProps.showDownload,
                  showPreviousNext: configProps.showPreviousNext,
                }}
                containerId={configProps.containerId}
              />
            </div>
          )}
        </div>
      </div>

      <div
        id={configProps.containerId}
        css={openSeadragonContainer}
        className="openSeadragonContainer"
      ></div>
         {configProps?.showThumbnails && canvasImageResources.length > 1 && (
        <div>
          <Thumbnails
            currentTileSource={currentTileSource}
            onThumbClick={handleThumbClick}
            ref={scrollElRef}
            tileSources={canvasImageResources}
          />
        </div>
      )}
    </>
  );
};

Viewer.propTypes = {
  manifestUrl: PropTypes.string,
};

export default Viewer;
