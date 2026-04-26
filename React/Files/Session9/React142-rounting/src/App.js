import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Products from './components/Products'

export default function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/products" element={<Products />}/>
        </Routes>
        </>
    )
}
