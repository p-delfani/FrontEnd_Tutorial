import React, { Component } from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'

export default class Menus extends Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="white">
                    <Container>
                        <Navbar.Brand href="#home">SabzLearn.ir</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#features">Home</Nav.Link>
                                <Nav.Link href="#pricing">About Us</Nav.Link>
                                <NavDropdown title="Front End" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Html</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Css</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Java Script</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">React Js 💗</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#deets">More deets</Nav.Link>
                                <Nav.Link eventKey={2} href="#memes">
                                    Dank memes
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}
