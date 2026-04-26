import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'

export default function App() {
    return (
        <>
        <Header />
        <Routes>
            {/* <Route path='/courses' element={<Courses />} /> */}
        </Routes>
        </>
    )
}
