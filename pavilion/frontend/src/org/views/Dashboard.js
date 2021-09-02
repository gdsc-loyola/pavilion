import React from 'react' 
import NavDashboard from '../components/DashboardNav'
import BodyDashboard from '../components/DashboardBody'
import "../../../stylesheets/org/Dashboard.scss"

const Dashboard = () => {
    return (
        <div className="dashboard">
            <NavDashboard />
            <BodyDashboard />
        </div>
    )
}

export default Dashboard
