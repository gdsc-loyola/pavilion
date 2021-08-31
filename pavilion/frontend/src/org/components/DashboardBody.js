// import essential dependencies
import React from 'react'

// import assets
import dashboard_empty from "../assets/dashboard_empty.svg"

// import components
import PrimaryButton from "../components/PrimaryButton"
import SecondaryButton from "../components/SecondaryButton"

// import stylesheets
import "../../stylesheets/org/DashboardBody.scss"

const BodyDashboard = () => {
    return (
        <section className="dashboard-body">
            <img src={dashboard_empty} alt=""/>
            <h1>Your dashboard's coming soon 😉</h1>
            <p>We’re still working on creating a big experience for you and your organization. For now, try adding a past event to your organization’s web page!</p>
            <PrimaryButton button_copy="Create an event"/>
            <SecondaryButton button_copy="View my webpage"/>
        </section>
    )
}

export default BodyDashboard

