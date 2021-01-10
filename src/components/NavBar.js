import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
export default function NavBar() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Link to="/"><span className="navbar-brand"><strong>The Chatter</strong></span></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <span>Chat online to Random strangers</span>
                    </Nav>
                    <Nav className="ml-auto">
                        <Link to="/about"><span className="nav-link">About</span></Link>
                        <Link to="/contact"><span className="nav-link">Contact Us</span></Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
