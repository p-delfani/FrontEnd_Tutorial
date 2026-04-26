import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

export default function About() {
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Welcome To About Page :))</h3>

            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Link to="setting">Setting</Link>

                <Link to="dashboard">Dashboard</Link>
            </div>

            <hr />
            <Routes>
                <Route path="setting" element={<p style={{ textAlign: 'center' }}>Setting</p>} />
                <Route path="dashboard" element={<p style={{ textAlign: 'center' }}>Dashboard</p>} />
            </Routes>
        </div>
    )
}
