import React from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";

import './App.css'

export default function App() {
  return (
    <>
      <Sidebar />

      <div className="main">
        <Header />
        {/* Router */}
      </div>
    </>
  );
}
