import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Environment from "./Environment";
import Device from "./Device";
import "./App.css";
import HeaderLayout from "./components/HeaderLayout";
import Rifd from "./rifd/Rifd";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <HeaderLayout />
        {/* Nội dung */}
        <div className="boxContent">
          <div className="content">
            <Routes>
              <Route path="/" element={<Environment />} />
              <Route path="/device" element={<Device />} />
              <Route path="/rfid" element={<Rifd />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
