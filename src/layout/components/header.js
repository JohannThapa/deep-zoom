import React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import { css } from "@emotion/react";
import logo from "../../logo.svg";

const headrStyle = css`
  float: left;
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 9999;

`;
const Header = () => (
  <header
  style={{
    display: "flex",
    alignItems: "stretch",
    height: "60px",
    width: "100%",
    textAlign: "left",
    position: "fixed",
    zIndex: "9999",
    top: 0,
    left: 0,
  }}
  >
    <Link to="/" style={{flexGrow:6, padding: "1rem"}}>
      <img src={logo} width={60}/>
    </Link>
    {/* <CustomLink to="/">Custom</CustomLink> */}
    <CustomLink to="/">Searcg</CustomLink>
    <CustomLink to="/tiles">Tiles</CustomLink>  
    <CustomLink to="/image">Simple Image</CustomLink>
    <CustomLink to="/osm">OSM</CustomLink>
    <CustomLink to="/tms">TMS</CustomLink>
    <CustomLink to="/map-tiler">Map Tiler</CustomLink>
    {/* <CustomLink to="/simple">simple</CustomLink> */}
    {/* <CustomLink to="/clover">Clover</CustomLink> */}
    <CustomLink to="/static">DZI</CustomLink>
    <span aria-label="logo" role="img">
      🐩
    </span>
  </header>
);
function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div
    style={{flexGrow:1, padding: "1rem"}}
    >
      <Link
        style={{ textDecoration: match ? "underline" : "none"}}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {match && " (active)"}
    </div>
  );
}

export default Header;