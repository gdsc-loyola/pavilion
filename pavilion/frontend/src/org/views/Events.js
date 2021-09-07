import React, { useState, useEffect } from 'react'
import DashboardBase from '../components/DashboardBase'
import axios from 'axios'

const Events = () => {
    const [events, getEvents] = useState([])
    const user_loggedin = "gdsc"

    const url = 'http://localhost:8000/api/'

    useEffect(() => {
        axios.get(`${url}orgs`).then(res => {
            const user = (x) => res.data[x].user.username
            for (var x=0; user(x) === user_loggedin; x++) {
                if (user(x) === user_loggedin) {
                    return getEvents(res.data[x]?.events)
                }
            }
            // console.log(res.data[0])
        })
    }, [])

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