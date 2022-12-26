import React from "react";
// import { Link } from "@react/router";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import { css } from "@emotion/react";

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
      Home
    </Link>
    <CustomLink to="/">iifViewer</CustomLink>
    <CustomLink to="/simple">simple</CustomLink>
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
    style={{flexGrow:2, padding: "1rem"}}
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