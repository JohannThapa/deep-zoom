import React from "react";
import PropTypes from "prop-types";

import { css } from "@emotion/react";

const bottomPanel = (props) => css`
  position: ${props};
  height: 113px;
  z-index: 4;
  overflow: hidden;
  transition: transform 0.3s ease;
`;
const thumbnailView = css`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`;
const activeThumb = css`
  outline: 8px solid #f0f0f0;
  cursor: pointer;
  transition: outline 0.2s ease-in-out;
`;
const panelListingThumbs = css`
  clear: both;
  list-style: none;
  padding: 0;
  white-space: nowrap;
  margin-top: 13px;
  margin-bottom: 4px;
  li {
    box-sizing: border-box;
    padding: 0 10px 0 10px;
    display: inline-block;

    &.active {
      img {
        ${activeThumb}
      }
    }
  }

  img {
    margin: 8px;
    &:hover {
      ${activeThumb}
    }
  }
`;

const Thumbnails = React.forwardRef(
  ({ currentTileSource, tileSources = [], onThumbClick }, scrollRef) => {
    function getClassName(t) {
      let className = `osrv-thumbnail`;
      if (currentTileSource && currentTileSource.id === t.id) {
        className += ` active`;
      }
      return className;
    }

    return (
      <div
        className="thumb-banel"
      >
        <div css={thumbnailView} ref={scrollRef} className="thumbnailView">
          <ul css={panelListingThumbs} className="panelListingThumbs">
            {tileSources.map((t) => (
              <li
                key={t.id}
                data-id={t.id}
                onClick={() => onThumbClick(t.id)}
                aria-label="Thumbnail"
                className={getClassName(t)}
              >
                <img
                  src={`${t.id}/square/70,70/0/default.jpg`}
                  alt={t.label}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

Thumbnails.propTypes = {
  /** Current tile source displayed in OpenSeadragon viewer */
  currentFileset: PropTypes.object,
  /** Callback function executed when a thumbnail is clicked */
  onThumbClick: PropTypes.func,
  /** All tilesources for the image resource */
  tileSources: PropTypes.array,
};

export default Thumbnails;
