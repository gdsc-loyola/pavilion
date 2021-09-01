import React from 'react'
import org_logo from "../../assets/gdsc_logo.svg"
import expand from "../../assets/expand_more.png"
import "../../../stylesheets/org/Dashboard.scss"

const TopBar = () => {
    return (
        <section className="top-bar">
            <div className="chevron">
                {/* This functions as a placeholder
                TODO: Replace this with dynamic code that changes the logo based on who is logged in */}
                <img src={org_logo} id="org-logo"alt="Org Logo" />
                <img src={expand} id="chevron" alt="" />
            </div>
        </section>
    )
}

export default TopBar
