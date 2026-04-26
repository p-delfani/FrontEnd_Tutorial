import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function About() {

    let navigate = useNavigate()

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Welcome To About Page :))</h3>

            <button onClick={() => {
                // navigate('/login')
                navigate('/login', {replace: false})
            }}>ثبت نام در دوره</button>

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Link to="setting">Setting</Link>

                <Link to="dashboard">Dashboard</Link>
            </div>
            <hr />

            <Outlet />
        </div>
    )
}
