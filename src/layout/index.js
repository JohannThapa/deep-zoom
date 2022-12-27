import * as React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import Header from "./components/header";

export default function Layout() {
    return (
      <><Header />
      <div style={{marginTop: "60px"}}>

        <Outlet />
      </div></>
    );
  }

  