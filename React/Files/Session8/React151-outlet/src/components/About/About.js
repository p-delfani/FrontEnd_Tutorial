import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function About() {
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Welcome To About Page :))</h3>

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Link to="setting">Setting</Link>

                <Link to="dashboard">Dashboard</Link>
            </div>
            <hr />
            
            <Outlet />
        </div>
    )
}
