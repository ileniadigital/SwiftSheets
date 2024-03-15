// Importing CSS
import '../../CSS/ConsultantView/AddEvent.css';

// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState
import { useState } from 'react';

export default function AddEvent({componentCaller, addEventHandler, viewedWeek}) {

    // eventDuration stored for validation to take place
    const [eventName, setEventName] = useState('');

    // Ensuring empty string is not entered
    function validateEventName(event) {
        const eventName = event.target.value.trim(); 
        if (eventName.trim() == "") {
            // setEventName('')
            event.target.setCustomValidity('Enter an event name');
        } else {
            // If value is valid, clear any existing error message
            // setEventName(eventName);
            event.target.setCustomValidity('');
        }
    }

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
            // setEventDuration(duration);
            event.target.setCustomValidity('');
        }
    }

    // Determining date for start of week
    let startOfWeek = new Date(viewedWeek); // Creates copy of current week
    startOfWeek.setDate(viewedWeek.getDate() - viewedWeek.getDay() + 1)  // Adds 1 as function starts from Sunday (o)

    let startOfWeekDay = startOfWeek.getDate().toString().padStart(2, '0');
    let startOfWeekMonth = (startOfWeek.getMonth() + 1).toString().padStart(2,'0'); // + 1 due to 0 indexing
    let startOfWeekYear = startOfWeek.getFullYear();

    // Converting into format for minimum date value
    startOfWeek = `${startOfWeekYear}-${startOfWeekMonth}-${startOfWeekDay}`

    // Determinining date for end of week
    let endOfWeek = new Date(startOfWeek); // Creates copy of current week
    endOfWeek.setDate(endOfWeek.getDate() + 6) // Retrives end of week by adding 6
    
    let endOfWeekDay = endOfWeek.getDate().toString().padStart(2, '0');
    let endOfWeekMonth = (endOfWeek.getMonth() + 1).toString().padStart(2,'0'); // + 1 due to 0 indexing
    let endOfWeekYear = endOfWeek.getFullYear();

    // Converting into format for maximum date value
    endOfWeek = `${endOfWeekYear}-${endOfWeekMonth}-${endOfWeekDay}`

    return(
        <div id='addEvent'>
            <button className = "closeEvent" onClick={addEventHandler}><IoClose /></button>
            <h1 className='logEventHeading'>Log Event</h1>
            {/* Creating a form that represents the Consultant logging an event */}
            <form action="" id = "addNewEvent">
                <div className="input">
                    <label htmlFor="eventName">Name</label>
                    <input type="text" name = "eventName" required onChange={validateEventName}/>
                </div>

                <div className="input">
                    <label htmlFor="eventDate">Date</label>
                {componentCaller === "Hours" ? (

                    <input type="date" name = "eventDate" value = {viewedWeek} readOnly required/>
                    ) : (
                    
                    // Limiting days to choose from as days in current week
                    <input type="date" name = "eventDate" min={startOfWeek} max={endOfWeek}
                    required/>
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
                    <select name="eventType" id="eventType" defaultValue={""} required>
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
                <div className="input checkBoxContainer">
                    <label htmlFor="isRecurring" className='checkBoxLabel'>Recurring </label>
                    <input type="checkbox"/>
                </div>
                <input type="submit" value={"Add Event"} className='addEventButton'/>
            </form>
        </div>
    )
}