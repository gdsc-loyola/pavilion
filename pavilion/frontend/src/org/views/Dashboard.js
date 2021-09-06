import React from 'react' 
import NavDashboard from '../components/DashboardNav'
import BodyDashboard from '../components/DashboardBody'
import TopBar from '../components/TopBar'
import "../../../stylesheets/org/Dashboard.scss"

const Dashboard = () => {
    return (
        <div className="dashboard">
            <TopBar />
            <NavDashboard />
            <BodyDashboard />
        </div>
    )
}

export default Dashboard
