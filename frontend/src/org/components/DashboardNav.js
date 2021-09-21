import React from 'react'
import logo from "../../../static/assets/pav_logo.svg"
import "../../../stylesheets/org/Dashboard.scss"

const NavDashboard = () => {
    return (
        <nav className="side-nav">
            <img src={logo} alt="Logo" className="logo" />
            <a href="/admin/" className="nav-item"><span>Dashboard</span></a>
            <a href="/admin/events/" className="nav-item"><span>Events</span></a>
            <a href="/admin/settings/" className="nav-item"><span>Settings</span></a>
        </nav>
    )
}

export default NavDashboard
