import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import './style.css'

export default function Header() {
    return (
        <div>
            <Container>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">SabzLearn</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink to="/" style={{ marginLeft: 35, color: '#fff' }}>Home</NavLink>
                        <NavLink to="/courses" style={{ marginLeft: 35, color: '#fff' }}
                        className={(link) => link.isActive ? 'active' : ''}
                        >Courses</NavLink>
                        <NavLink to="/about" style={{ marginLeft: 35, color: '#fff' }}>About</NavLink>
                        <NavLink to="/login" style={{ marginLeft: 35, color: '#fff' }}>Login</NavLink>
                        <NavLink to="/panel" style={{ marginLeft: 35, color: '#fff' }}>Panel</NavLink>
                        <NavLink to="/dashboard" style={{ marginLeft: 35, color: '#fff' }}>Dashboard</NavLink>
                    </Nav>
                </Navbar>
            </Container>
        </div>
    )
}
