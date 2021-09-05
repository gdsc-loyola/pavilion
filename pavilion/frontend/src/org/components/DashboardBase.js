import React from 'react'
import NavDashboard from './DashboardNav'
import TopBar from './TopBar'

const DashboardBase = () => {
    return (
        <div>
            <TopBar />
            <NavDashboard />
        </div>
    )
}

export default DashboardBase
