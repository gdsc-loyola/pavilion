import React, { useState, useEffect } from 'react'
import DashboardBase from '../components/DashboardBase'
import EventsDataService from '../../services/events.service'
import OrgsDataService from '../../services/orgs.service'
import axios from 'axios'

const Events = () => {
    
    const [events, getEvents] = useState([])
    const [user_loggedin, setUser] = useState("sample@email.com")

    useEffect(() => {
        setEvents()
    }, [])

    const setEvents = () => {
        OrgsDataService.get(user_loggedin) //filter happens in the backend
        // OrgsDataService.getAll()//get all might be problematic. slow
        .then(res => {
            // const org = res.data.find(({ user }) => user.username === user_loggedin) //replace with user.id??
            const org = res.data[0]
            console.log(res.data[0]) //for testing
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