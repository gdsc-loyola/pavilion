import React from 'react' 
import EventCard from '../../components/EventCard'
const Settings = () => {
    return (
        <div>
            <EventCard 
                imgSrc="http://placehold.jp/150x150.png" 
                alt="img" 
                eventName="This is an event." 
                startDate="August 12, 2021" 
                endDate="August 22, 2021" 
                logoSrc="http://placehold.jp/150x150.png" 
                logoName="GDSC-L" 
            />
        </div>
    )
}

export default Settings
