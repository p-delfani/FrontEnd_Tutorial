import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Products from './Components/Products/Products'
import Comments from './Components/Comments/Comments'
import Users from './Components/Users/Users'
import Orders from './Components/Orders/Orders'
import Offs from './Components/Offs/Offs'

import './App.css'

export default function App() {
  return (
    <>
      <Sidebar />

      <div className="main">
        <Header />

        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/offs" element={<Offs />} />
        </Routes>

        {/* Router */}
      </div>
    </>
  );
}
