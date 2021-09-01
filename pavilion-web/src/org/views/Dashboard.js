import React from 'react' 
import NavDashboard from '../components/Dashboard/DashboardNav'
import BodyDashboard from '../components/Dashboard/DashboardBody'
import TopBar from '../components/Dashboard/TopBar'
import "../../stylesheets/org/Dashboard.scss"

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
