import React from 'react'
import logo from "../assets/pav_logo.svg"
import "../../stylesheets/org/NavDashboard.scss"

const NavDashboard = () => {
    return (
        <nav className="side-nav">
            <img src={logo} alt="Logo" className="logo" />
            <div className="nav-item"><a>Dashboard</a></div>
            <div className="nav-item"><a>Events</a></div>
            <div className="nav-item"><a>Settings</a></div>
        </nav>
    )
}

export default NavDashboard
