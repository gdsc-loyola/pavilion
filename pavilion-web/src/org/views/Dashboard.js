import React from 'react' 
import NavDashboard from '../components/Dashboard/DashboardNav'
import BodyDashboard from '../components/Dashboard/DashboardBody'
import "../../stylesheets/org/Dashboard.scss"

const Dashboard = () => {
    return (
        <div className="dashboard">
            <NavDashboard />
            <BodyDashboard />
        </div>
    )
}

export default Dashboard
