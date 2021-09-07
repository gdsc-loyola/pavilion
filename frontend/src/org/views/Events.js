import React, { useState, useEffect } from 'react'
import DashboardBase from '../components/DashboardBase'
import axios from 'axios'
import more_options from '../../../static/assets/more_options.svg'
import '../../../stylesheets/org/Events.scss'

const Events = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [events, getEvents] = useState([])
    const [user_loggedin, setUser] = useState("gdsc")
    const url = 'http://127.0.0.1:8000/api/'

    function show_dropdown(e) {
        console.log(e.target)
        console.log(e.target.value)
        if (dropdownOpen) {
            setDropdownOpen(false);
        }
        else {
            setDropdownOpen(true);
        }
    }

    useEffect(() => {
        setEvents()
    }, [])
    
    const setEvents = () => {
        axios.get(`${url}orgs`)
        .then(res => {
            const user = res.data.find(({ user }) => user.username === user_loggedin)
            return getEvents(user.events)
        })
        .catch((e) => 
            console.log(e)
        )
    }

    const Table = () => {
        return events.map((val, i) => {
            return (
                <tr key={i} value={val.id}>
                    <td value={val.name}>{val.name}</td>
                    <td>{val.start_date} - {val.end_date}</td>
                    <td>{val.last_updated}</td>
                    <td>{val.status}</td>
                    <td>
                        <ul className="dropdown" style={{display: dropdownOpen ? "flex": "none"}}>
                            <li>Edit</li>
                            <li>Publish</li>
                            <li>Delete</li>
                        </ul>
                    </td>
                    <td><img onClick={show_dropdown} src={more_options} /></td>
                </tr>
            )
        })
    }

    return (
        <div>
            <DashboardBase />
            <h1 className="title">Events</h1>
            <table className="events">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{Table()}</tbody>
            </table>
        </div>
    )
}

export default Events