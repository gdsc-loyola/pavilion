import React, { useState, useEffect } from 'react'
import DashboardBase from '../components/DashboardBase'
import OrgsDataService from '../../services/orgs.service'

const Events = () => {
    
    const [events, getEvents] = useState([])
    const [user_loggedin, setUser] = useState("sample@email.com")

    useEffect(() => {
        setEvents()
    }, [])

    const setEvents = () => {
        OrgsDataService.getByOrgUser(user_loggedin) //filter happens in the backend
        .then(res => {
            // const org = res.data.find(({ user }) => user.username === user_loggedin) 
            const org = res.data
            console.log(res.data) //for testing
            return getEvents(org.events)
        })
        .catch((e) => 
            console.log(e)
        )
    }

    const loadEvents = () => {
        console.log(events)
        return events.map(event_detail => {
            return (
                <tr>
                    <td>{event_detail.name}</td>
                    <td>{event_detail.start_date} - {event_detail.end_date}</td>
                    <td>{event_detail.status}</td>
                </tr>
            )
        })
    }

    return (
        <div>
            <DashboardBase />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{loadEvents()}</tbody>
            </table>
        </div>
    )
}

export default Events