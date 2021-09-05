import React, { useState, useEffect } from 'react'
import DashboardBase from '../components/DashboardBase'
import axios from 'axios'

const Events = () => {
    const [events, getEvents] = useState([])

    const url = 'http://localhost:8000/api/'

    useEffect(() => {
        getAllEvents()
    }, [])
    
    const getAllEvents = () => {
        axios.get(`${url}events`)
        .then((res) => {
            const allEvents = res
            getEvents(allEvents)
        })
    }

    return (
        <div>
            <DashboardBase />
            {events.map((val) => {
                return(
                    <p>{val}</p>
                )
            })}
        </div>
    )
}

const Table = () => {

}

export default Events