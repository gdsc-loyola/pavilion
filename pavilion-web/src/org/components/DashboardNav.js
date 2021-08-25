import React from 'react'
import logo from "../assets/pav_logo.svg"
import "../../stylesheets/org/DashboardNav.scss"

const NavDashboard = () => {
    return (
        <nav className="side-nav">
            <img src={logo} alt="Logo" className="logo" />
            <a href="#" className="nav-item"><span>Dashboard</span></a>
            <a href="#" className="nav-item"><span>Events</span></a>
            <a href="#" className="nav-item"><span>Settings</span></a>
        </nav>
    )
}

export default NavDashboard
