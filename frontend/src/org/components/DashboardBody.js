// import essential dependencies
import React from 'react'

// import assets
import dashboard_empty from "../../../static/assets/dashboard_empty.svg"

// import components
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton"

// import stylesheets
import "../../../stylesheets/org/Dashboard.scss"
import "../../../stylesheets/PrimaryButton.scss"
import "../../../stylesheets/SecondaryButton.scss"

const BodyDashboard = () => {
    return (
        <section className="dashboard-body">
            <img src={dashboard_empty} alt=""/>
            <h1>Your dashboard's coming soon 😉</h1>
            <p>We’re still working on creating a big experience for you and your organization. For now, try adding a past event to your organization’s web page!</p>
            <div className="CTA">
                <PrimaryButton button_copy="Create an event"/>
                <SecondaryButton button_copy="View my webpage"/>
            </div>
        </section>
    )
}

export default BodyDashboard

