import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

const dropdownSelectWrapper = css`
  width: 150px;
  color: #2e2f34;
  padding-right: 1rem;
  font-size: 1rem;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const reactSelectContainer = css`
  text-align: left;
`;

const TileSourceSelect = ({
  currentTileSource,
  onFileSetChange,
  tileSources = [],
}) => {
  const tileSourcesCount = tileSources.length;

  if (!currentTileSource || tileSourcesCount < 2) return null;

  const handleChange = (value) => {
    onFileSetChange(value.id);
  };

  return (
    <div
      css={dropdownSelectWrapper}
      className="dropdownSelectWrapper"
    >
      <Select
        classNamePrefix="react-select"
        css={reactSelectContainer}
        getOptionValue={(option) => option.id}
        isMulti={false}
        maxMenuHeight={600}
        onChange={handleChange}
        options={tileSources}
        placeholder="Filter tile sets"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: "#6b6c71",
            primary50: "#c9cbd6",
            primary25: "#abb2b8",
          },
        })}
        aria-label="Select file set"
        value={currentTileSource}
      />
    </div>
  );
};

const tileSourceShape = {
  label: PropTypes.string,
  id: PropTypes.string,
};

TileSourceSelect.propTypes = {
  currentTileSource: PropTypes.shape(tileSourceShape),
  /** Callback function executed when a thumbnail is clicked */
  onFileSetChange: PropTypes.func,
  /** All tilesources for the thumbnails */
  tileSources: PropTypes.array,
};

export default TileSourceSelect;
