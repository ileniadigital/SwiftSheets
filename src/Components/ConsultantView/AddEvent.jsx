// Importing CSS
import '../../CSS/ConsultantView/AddEvent.css';

// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState
import { useState } from 'react';

export default function AddEvent({addEventHandler}) {

    // Input stored for validation to take place
    const [eventDuration, setEventDuration] = useState('');

    function validateEventDuration(event) {
        const duration = parseFloat(event.target.value);
        if (duration <= 0 || duration > 24) {
            // setEventDuration('')
            event.target.setCustomValidity('Duration must be between 0 (exclusive) and 24 (inclusive)');
        } else {
            // If value is valid, clear any existing error message
            setEventDuration(duration);
            event.target.setCustomValidity('');
        }
    }

    return(
        <div id='addEvent'>
            <button className = "closeEvent" onClick={addEventHandler}><IoClose /></button>
            
            {/* Creating a form that represents the Consultant logging an event */}
            <form action="" id = "addNewEvent">
                <div className="input">
                    <label htmlFor="eventName">Event Name</label>
                    <input type="text" hame = "eventName" required/>
                </div>
                <div className="input">
                    <label htmlFor="eventDate">Date</label>
                    <input type="date" hame = "eventDate" required/>
                </div>
                <div className="input">
                    <label htmlFor="eventStartTime">Event Start Time</label>
                    <input type="time" hame = "eventStartTime" required/>
                </div>
                <div className="input">
                    <label htmlFor="eventDuration">Event Duration</label>
                    <input type="text" hame = "eventDuration" 
                    onChange={validateEventDuration} required/> <span>hours</span>
                </div>
                <div className="input">
                    <label htmlFor="eventType">Event Type</label>
                    <select name="eventType" id="eventType" required>
                        <option value="eventTypeNormal">Normal</option>
                        <option value="eventTypeOvertime">Overtime</option>
                        <option value="eventTypeHoliday">Holiday</option>
                        <option value="eventTypeSick">Sick</option>
                    </select>
                </div>
                <div className="input">
                    <label htmlFor="eventCategory">Event Category</label>
                    <select name="eventCategory" id="eventCategory" required>
                        <option value="Project">Project</option>
                        <option value="eventCategoryPlanning">Planning</option>
                        <option value="eventCategoryMeetig">Meeting</option>
                    </select>
                </div>
                <div className="input">
                    <label htmlFor="isRecurring">Recurring Event</label>
                    <input type="checkbox"/>
                </div>
                <input type="submit" value={"Add Event"} className='addEventButton'/>
            </form>
        </div>
    )
}