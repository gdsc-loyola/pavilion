import React, { useState } from 'react'
import org_logo from "../../assets/gdsc_logo.svg"
import expand from "../../assets/expand_more.png"
import "../../../stylesheets/org/Dashboard.scss"

const TopBar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    function show_dropdown( ) {
        if (dropdownOpen) {
            setDropdownOpen(false);
        }
        else {
            setDropdownOpen(true);
        }
    }

    return (
        <section className="top-bar">
            <div className={`chevron ${dropdownOpen ? "active" : ""}`} onClick={show_dropdown} /* onBlur={show_dropdown} */ tabIndex="0">
                {/* This functions as a placeholder
                TODO: Replace this with dynamic code that changes the logo based on who is logged in */}
                <img src={org_logo} id="org-logo"alt="Org Logo" />
                <img src={expand} id="chevron" alt="" />
            </div>
            <ul className="dropdown" style={{display: dropdownOpen ? "flex": "none"}}>
                <li>View org page</li>
                <li>Log Out</li>
            </ul>
        </section>
    )
}

export default TopBar
