import React, { useState } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

const wrapper = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 1rem;
  .toolbar-button-text {
    display: none;
  }
  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
`;
const controller = css`
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 14px;
  border: 0;
  font-size: 2rem;
  padding: 10px;
  &:hover {
    background: rgba(0, 0, 0, 0.75);
  }
`;
const dropdownWarapper = css`
  position: relative;
  display: inline-block;
`;
const dropdown = css`
  position: absolute;
  top: 50px;
  left: -65px;
  background: #342f2e;
  color: #e3e3e3;
  width: 200px;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #716c6b;
  button {
    padding: 0.75rem 1rem;
    color: #f0f0f0;
    display: inline-block;
    width: 100%;
    font-size: 1rem;
    &:hover {
      background: #716c6b;
      transition: all 0.25s ease-in-out;
    }
  }
`;

const Toolbar = ({
  onDownloadCropClick,
  onDownloadFullSize,
  toolBarOptions = {},
  containerId,
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  function handleDownloadClick(e) {
    e.preventDefault();
    setDropDownOpen(!dropDownOpen);
  }

  function handleDownloadCropClick(e) {
    e.preventDefault();
    onDownloadCropClick();
    setDropDownOpen(false);
  }

  function handleDownloadFullSize(e) {
    e.preventDefault();
    onDownloadFullSize();
    setDropDownOpen(false);
  }

  return (
    <nav css={wrapper} className="toolbar-wrapper">
      {toolBarOptions?.showZoom && (
        <>
          <button
            id={`zoom-in-${containerId}`}
            href="#zoom-in"
            css={controller}
            className="toolbar-controller"
            title="Zoom In"
          >
            <span className="toolbar-button-text">Zoom In</span>
          </button>
          <button
            id={`zoom-out-${containerId}`}
            href="#zoom-out"
            css={controller}
            className="toolbar-controller"
            title="Zoom Out"
          >
            <span className="toolbar-button-text">Zoom Out</span>
          </button>
        </>
      )}

      {toolBarOptions?.showFullScreen && (
        <button
          id={`full-page-${containerId}`}
          href="#full-page"
          css={controller}
          className="toolbar-controller"
          title="Full Screen"
        >
          <span className="toolbar-button-text">Full Screen</span>
        </button>
      )}

      {toolBarOptions?.showDownload && (
        <div css={dropdownWarapper} className="toolbar-dropdownWarapper">
          <button
            onClick={handleDownloadClick}
            css={controller}
            className="toolbar-controller"
            aria-haspopup="true"
            aria-expanded={dropDownOpen}
            title="Download"
          >
            <span className="toolbar-button-text">Download Image</span>
          </button>
          {dropDownOpen && (
            <ul css={dropdown} className="toolbar-dropdown">
              <li>
                <button
                  title="Download cropped canvas"
                  onClick={handleDownloadCropClick}
                  css={controller}
                  className="toolbar-controller"
                >
                  Download crop
                </button>
              </li>
              <li>
                <button
                  onClick={handleDownloadFullSize}
                  css={controller}
                  className="toolbar-controller"
                  title="Download full size image"
                >
                  Download full size
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
      {toolBarOptions?.showPreviousNext && (
        <>
          <button
            id={`previous-${containerId}`}
            href="#previous"
            css={controller}
            className="toolbar-controller"
            title="Previous"
          >
            <span className="toolbar-button-text">Previous</span>
          </button>
          <button
            id={`next-${containerId}`}
            href="#next"
            css={controller}
            className="toolbar-controller"
            title="Next"
          >
            <span className="toolbar-button-text">Next</span>
          </button>
        </>
      )}
    </nav>
  );
};

Toolbar.propTypes = {
  /** Callback function executed when Dropdown Crop is clicked */
  onDownloadCropClick: PropTypes.func,
  /** Callback function executed when Dropdown Full size is clicked */
  onDownloadFullSize: PropTypes.func,
  /** Configuration options for the toolbar */
  toolBarOptions: PropTypes.shape({
    showDownload: PropTypes.bool,
    showFullScreen: PropTypes.bool,
    showPreviousNext: PropTypes.bool,
    showZoom: PropTypes.bool,
  }),
  /** Option id attribute for the container element */
  containerId: PropTypes.string,
};

export default Toolbar;