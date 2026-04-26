import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link to='/about'>About</Link>
            <br />
            <Link to='/contact'>Contact</Link>
            <br />
            <Link to='/posts'>Posts</Link>
        </div>
    )
}
