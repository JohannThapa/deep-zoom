import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import "./style.css";
import Downloader from "../downloader";
import { Namer } from "../../utils/naming";

const COLUMN = 20;
const ROW = 49;
const TILE_WIDTH = 2448;
const TILE_HEIGHT = 2048;
const FILE_HEIGHT = 99506;
const FILE_WIDTH = 47415;

const TileSearchSource = ({ tileSources = [] }) => {
  const tileSourcesCount = tileSources?.length;
  const [currentTileSource, setCurrentTileSource] = React.useState();
  const [currentDetails, setCurrentDetails] = React.useState();
  const [searchedList, setSearcher] = React.useState([]);
  const [search, setsearch] = React.useState("");
  const [selectTiles, setSelectTiles] = React.useState([]);

  if (tileSourcesCount < 1) return null;

  function loadNewFileset(id) {
    const index = tileSources.findIndex((element) => element.id === id);
    setCurrentDetails(tileSources.find((element) => element.Name === id));
    setSearcher(null);
    setsearch(null);
    setCurrentTileSource(tileSources[index]);
  }
  const handleChange = (value) => {
    loadNewFileset(value.id);
  };
  React.useEffect(() => {
    if (tileSources) {
      const custom = tileSources.map((x) => {
        return {
          id: x.Name,
          label: x.Name,
        };
      });
      setSelectTiles(custom);
    }
  }, tileSources);

  const onChange = (evt) => {
    setsearch(evt.target.value);
  };
  const onSubmit = () => {
    // console.log(search);
    // const next = parseInt(search) + 1;
    // setsearch(next)
    const index = tileSources.filter((element) => {
      const { Name } = element;
      console.log(Name);
      return Name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    });
    setSearcher(index);
    setCurrentDetails(index[0]);
    console.log("index", index);
  };
  const urlText = (name) => {
    return `https://storage.googleapis.com/dp_alex_teset/alexchanwork20%40gmail.com/Project1/mr-big-10/${name}`;
  };

  const naming = (arr = [], name = "") => {
    console.log("arr", arr);
    console.log("name", name);
    const index = name?.split(".")[0];
    let position;
    if (parseInt(index) <= COLUMN) {
      position = "1_" + parseInt(index);
    }
    else if (parseInt(index) <= (COLUMN*2) && parseInt(index) > COLUMN) {
      position = "2_" + (parseInt(index) - COLUMN);
    }
    else if (parseInt(index) <= (COLUMN*3) && parseInt(index) > (COLUMN*2)) {
      position = "3_" +  (parseInt(index) - (COLUMN*2));
    }
    return (
      parseInt(index) +
      "-" +
      position +
      "-" +
      arr[0] +
      "_" +
      arr[1] +
      "-" +
      TILE_HEIGHT +
      "x" +
      TILE_WIDTH + ".png"
    );
  };
  return (
    <div className="grid-container">
      <div className="search-card bg-grey">
        <div className="dropdownSelectWrapper pxis">
          <Select
            classNamePrefix="react-select"
            getOptionValue={(option) => option.id}
            isMulti={false}
            maxMenuHeight={600}
            onChange={handleChange}
            options={selectTiles}
            placeholder="Filter tile sets"
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
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
      </div>
      <div className="search-card">
        <div className="card__content search-wrapper">
          <div className="Card_s">
            <div className="Card_sinner">
              <label>Search for tiles name</label>
              <div>
                <form onSubmit={onChange} className="container">
                  <div className="Icon" onClick={onSubmit}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#657789"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-search"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <div className="Inputcontainer">
                    <input
                      value={search}
                      onChange={onChange}
                      type="number"
                      name="name"
                    />
                    {
                      currentDetails?.Name && <Downloader linkUrl={urlText(currentDetails?.Name)} name={Namer(currentDetails?.Position, currentDetails?.Name)} />
                    }
                 </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card--single padding-large--l">
        <h2>Name: {currentDetails?.Name}</h2>
        <input value={urlText(currentDetails?.Name)} />
        <input value={Namer(currentDetails?.Position, currentDetails?.Name)} />
        <p className="padding-x--l">
          {currentDetails?.Position.map((x) => {
            return <input value={x} />;
          })}
        </p>

      </div>
      <div className="card--single padding-large--l" style={{ height: "100%" }}>
        {search && (
          <h1>
            Searched List starting from {search} consist {searchedList?.length}{" "}
            items
          </h1>
        )}

        <p className="padding-x--l">
          {searchedList?.map((x) => {
            return <p>
              <input value={urlText(x?.Name)} />
            </p>;
          })}
        </p>
      </div>
    </div>
  );
};

TileSearchSource.propTypes = {
  tileSources: PropTypes.array,
};

export default TileSearchSource;
