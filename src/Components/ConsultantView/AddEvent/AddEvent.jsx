// Importing CSS
import './AddEvent.css';

// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState
import { useState } from 'react';

export default function AddEvent({componentCaller, addEventHandler, viewedWeek}) {

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

    /* Only needs to be rendered for ConsultantView component caller as its viewedWeek
    argument will be a Date, compared to Hours' string */
    let startOfWeek, startOfWeekDay, startOfWeekMonth, startOfWeekYear;
    let endOfWeek, endOfWeekDay, endOfWeekMonth, endOfWeekYear;
    if (componentCaller === "ConsultantView") {
        // Determining date for start of week
         startOfWeek = new Date(viewedWeek); // Creates copy of current week
         startOfWeek.setDate(viewedWeek.getDate() - viewedWeek.getDay() + 1)  // Adds 1 as function starts from Sunday (o)

         startOfWeekDay = startOfWeek.getDate().toString().padStart(2, '0');
         startOfWeekMonth = (startOfWeek.getMonth() + 1).toString().padStart(2,'0'); // + 1 due to 0 indexing
         startOfWeekYear = startOfWeek.getFullYear();

        // Converting into format for minimum date value
        startOfWeek = `${startOfWeekYear}-${startOfWeekMonth}-${startOfWeekDay}`

        // Determinining date for end of week
        endOfWeek = new Date(startOfWeek); // Creates copy of current week
        endOfWeek.setDate(endOfWeek.getDate() + 6) // Retrives end of week by adding 6
        
         endOfWeekDay = endOfWeek.getDate().toString().padStart(2, '0');
         endOfWeekMonth = (endOfWeek.getMonth() + 1).toString().padStart(2,'0'); // + 1 due to 0 indexing
         endOfWeekYear = endOfWeek.getFullYear();

        // Converting into format for maximum date value
        endOfWeek = `${endOfWeekYear}-${endOfWeekMonth}-${endOfWeekDay}`
}

    /* Used to store eventType, determining whether Category input is disabled
     no need to enter category if a worker is sick */
    const [eventType, setEventType] = useState('')
    const [disableCategory, setDisableCategory] = useState(false)

    function handleEventType(event) {
        setEventType(event.target.value)

        // Disabling category input
        if ((event.target.value !== "eventTypeNormal") && (event.target.value !== "eventTypeOvertime")) {
            setDisableCategory(true)
        } else {
            setDisableCategory(false)
        }
    }

    // Keeps track of any messages that need to be set
    const [errorMessage, setErrorMessage] = useState(null)
    
    // Handles validation after submit button has abeen pressed
    function handleSubmit(event) {
        event.preventDefault(); // Prevent submission until validation is complete
    }

    /* Storing start and end time so they can be compared with one another and to ensure the start time is 
       before the end time */
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

    return(
        <div className='add-event' onSubmit={handleSubmit}>
            <button className = "close-event" onClick={addEventHandler}><IoClose /></button>
            <h1 className='log-event-heading'>Log Event</h1>
            {/* Creating a form that represents the Consultant logging an event */}
            <form action="" className = "add-new-event">
                <div className="input">
                    <label htmlFor="eventName">Name</label>
                    <input type="text" name = "eventName" required onChange={validateEventName}/>
                </div>

                <div className="input">
                    <label htmlFor="eventDate">Date</label>
                    {componentCaller === "Hours" ? (

                        // Date is preset as the day of the week is known from the time/dayslot click 
                        <input className = 'datetime' type="date" name = "eventDate" value = {viewedWeek} readOnly required/>
                        ) : (
                        
                        // Limiting days to choose from as days in current week
                        <input type="date" className='datetime' name = "eventDate" min={startOfWeek} max={endOfWeek} required/>
                    )}
                </div>

                <div className="input">
                    <label htmlFor="eventStartTime">Start Time</label>
                    <input type="time" className='datetime' name = "eventStartTime" required onChange={(event) => setStartTime(event.target.value)}/>
                </div>

                <div className="input">
                    <label htmlFor="eventEndTime">End Time</label>
                    <input className='datetime' type="time" name = "eventEndTime" required onChange={(event) => setEndTime(event.target.value)}/>
                </div>

                <div className="input">
                    <label htmlFor="eventType">Type</label>
                    <select name="eventType" defaultValue={""} onChange={handleEventType} required>
                        <option value="" disabled hidden>Type</option> {/* Default value */}
                        <option value="eventTypeNormal">Normal</option>
                        <option value="eventTypeOvertime">Overtime</option>
                        <option value="eventTypeHoliday">Holiday</option>
                        <option value="eventTypeSick">Sick</option>
                    </select>
                </div>

                {/* No need to show category if work is not Normal or Overtime e.g. if Consultants are sick */}
                <div className="input">
                    <label htmlFor="eventCategory">Category</label>
                    <select name="eventCategory" defaultValue={""} required disabled = {disableCategory}>
                        <option value="" disabled hidden>Category</option> {/* Default value */}
                        <option value="Project">Project</option>
                        <option value="eventCategoryPlanning">Planning</option>
                        <option value="eventCategoryMeetig">Meeting</option>
                    </select>
                </div>

                <div className="input checkbox-container">
                    <label htmlFor="isRecurring" className='checkbox-label'>Recurring </label>
                    <input className ='is-recurring' type="checkbox"/>
                </div>

                <div className='note-container'>
                    <label htmlFor="note"> Note </label>
                    <textarea name="note" cols="30" rows="5" placeholder='Enter text'></textarea>
                </div>

                <input type="submit" value={"Add Event"} className='add-event-button'/>

                {/* Show error message when it has a value */}
            </form>
        </div>
    )
}