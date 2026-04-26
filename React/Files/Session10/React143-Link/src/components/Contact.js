import React from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
    return (
        <div>

            <h1>Contact</h1>
            
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/products'>Products</Link>
        </div>
    )
}
