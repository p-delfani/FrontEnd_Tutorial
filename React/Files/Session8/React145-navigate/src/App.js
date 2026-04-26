import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Posts from './components/Posts'
import MainPost from './components/MainPost'


export default function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/posts" element={<Posts />}/>
            <Route path="/post/:postID" element={<MainPost />}/>
        </Routes>
        </>
    )
}
