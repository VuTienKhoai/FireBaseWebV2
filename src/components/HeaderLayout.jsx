import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function HeaderLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 className="title">Smart Home System</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <Link
          to="/"
          className={`menu-link ${currentPath === "/" && "menu-linkFocus"}`}
        >
          Environment
        </Link>

        <Link
          to="/device"
          className={`menu-link ${
            currentPath === "/device" && "menu-linkFocus"
          }`}
        >
          Device
        </Link>

        <Link
          to="/rfid"
          className={`menu-link ${currentPath === "/rfid" && "menu-linkFocus"}`}
        >
          RFID
        </Link>
      </div>
    </div>
  );
}
