// Importing CSS
import '../../CSS/ConsultantView/AddEvent.css';

// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState
import { useState } from 'react';

export default function AddEvent({componentCaller, addEventHandler, viewedWeek}) {

    // eventDuration stored for validation to take place
    const [eventDuration, setEventDuration] = useState('');

    // Ensuring number is a float between 0 (exclusive) and 24
    function validateEventDuration(event) {
        const duration = parseFloat(event.target.value);
        if (duration <= 0 || duration > 24 || ! Number.isFinite(duration)) {
            // setEventDuration('')
            event.target.setCustomValidity('Duration must be between 0 (exclusive) and 24 (inclusive)');
        } else {
            // If value is valid, clear any existing error message
            setEventDuration(duration);
            event.target.setCustomValidity('');
        }
    }

    // eventDate stored for validation purposes
    const {eventDate, setEventDate} = useState('');

    function validateEventDate(event) {
        console.log(viewedWeek)
    }

    console.log(viewedWeek)

    return(
        <div id='addEvent'>
            <button className = "closeEvent" onClick={addEventHandler}><IoClose /></button>
            <h1 className='logEventHeading'>Log Event</h1>
            {/* Creating a form that represents the Consultant logging an event */}
            <form action="" id = "addNewEvent">
                <div className="input">
                    <label htmlFor="eventName">Name</label>
                    <input type="text" name = "eventName" required/>
                </div>

                <div className="input">
                    <label htmlFor="eventDate">Date</label>
                {componentCaller === "Hours" ? (

                    <input type="date" name = "eventDate" value = {viewedWeek} readOnly onChange={validateEventDate} required/>
                    ) : (
                    
                    <input type="date" name = "eventDate" onChange={validateEventDate} required/>
                )}
                </div>

                <div className="input">
                    <label htmlFor="eventStartTime">Start Time</label>
                    <input type="time" name = "eventStartTime" required/>
                </div>

                <div className="input">
                    <label htmlFor="eventDuration"> Duration</label>
                    <input type="text" name = "eventDuration" 
                    onChange={validateEventDuration} placeholder='Hours' required/> 
                </div>
                <div className="input">
                    <label htmlFor="eventType">Type</label>
                    <select name="eventType" id="eventType" placeholder='Type' defaultValue={""} required>
                        <option value="" disabled hidden className='placeHolder'>Type</option> {/* Default value */}
                        <option value="eventTypeNormal">Normal</option>
                        <option value="eventTypeOvertime">Overtime</option>
                        <option value="eventTypeHoliday">Holiday</option>
                        <option value="eventTypeSick">Sick</option>
                    </select>
                </div>
                <div className="input">
                    <label htmlFor="eventCategory">Category</label>
                    <select name="eventCategory" id="eventCategory" defaultValue={""} required>
                        <option value="" disabled hidden className='placeHolder'>Category</option> {/* Default value */}
                        <option value="Project">Project</option>
                        <option value="eventCategoryPlanning">Planning</option>
                        <option value="eventCategoryMeetig">Meeting</option>
                    </select>
                </div>
                <div className="input">
                    <label htmlFor="isRecurring">Recurring </label>
                    <input type="checkbox" className='checkBox'/>
                </div>
                <input type="submit" value={"Add Event"} className='addEventButton'/>
            </form>
        </div>
    )
}