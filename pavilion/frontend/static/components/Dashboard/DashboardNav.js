import React from 'react'
<<<<<<< HEAD:pavilion/frontend/src/org/components/DashboardNav.js
import logo from "../../../static/assets/pav_logo.svg"
import "../../../stylesheets/org/DashboardNav.scss"
=======
import logo from "../../assets/pav_logo.svg"
import "../../../stylesheets/org/Dashboard.scss"
>>>>>>> 839bfb2db9f5f51818b09c3bd7540a61a8aea832:pavilion/frontend/static/components/Dashboard/DashboardNav.js

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
