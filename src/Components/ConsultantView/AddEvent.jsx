// Importing CSS
import '../../CSS/ConsultantView/AddEvent.css';

// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState
import { useState } from 'react';

export default function AddEvent({componentCaller, addEventHandler, viewedWeek}) {

    // eventDuration stored for validation to take place

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
    const [eventHours, setEventHours] = useState(null)
    const [eventMinutes, setEventMinutes] = useState(null)

    // Ensuring duration is between 0 (exclusive) and 24 (inclusive)
    function validateEventDuration(event, units) {
        if (units === 'Minutes') {
            // Ensuring minutes is not 0 when hours is 0
            const minutes = event.target.value;
            setEventMinutes(minutes) // Updating state
            if ((minutes === "" || parseInt(minutes) === 0) && (eventHours === null || eventHours === "" || parseInt(eventHours) === 0)) {
                setErrorMessage('Enter Event Duration');
                return;
            }
        } else {
            const hours = event.target.value;
            setEventHours(hours) // Updating state
            // Ensuring hours != 0 when minutes is also 0
            if ((hours === "" || parseInt(hours) === 0) && (eventMinutes === null || eventMinutes === "" || parseInt(eventMinutes) === 0)) {
                setErrorMessage('Enter Event Duration');
                return;
            } 
        } 
        setErrorMessage(null)
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
            console.log(event.target.value)
            setDisableCategory(true)
        } else {
            setDisableCategory(false)
        }
    }

    const [errorMessage, setErrorMessage] = useState(null)
    // Handles validation after submit button has abeen pressed
    function handleSubmit(event) {
        event.preventDefault(); // Prevent submission until validation is complete

        if (eventMinutes === null && eventHours == null) {
            setErrorMessage('Enter Event Duration')
            return
        }
        setErrorMessage(null)
    }

    return(
        <div id='addEvent' onSubmit={handleSubmit}>
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
                    <div className='eventDurationLength'>
                        <input type="number" name = "eventDurationHours" className='eventDurationLengthItem'
                        onChange={(event) => validateEventDuration(event, "Hours")} placeholder='Hours' min={0} max={24} step={1}/>
                        <input type="number" name = "eventDurationMinutes" className='eventDurationLengthItem'
                        onChange={(event) => validateEventDuration(event, "Minutes")} placeholder='Minutes' min={0} max={59} step={1}/>
                    </div>  
                </div>
                <div className="input">
                    <label htmlFor="eventType">Type</label>
                    <select name="eventType" id="eventType" defaultValue={""} 
                    onChange={handleEventType} required>
                        <option value="" disabled hidden className='placeHolder'>Type</option> {/* Default value */}
                        <option value="eventTypeNormal">Normal</option>
                        <option value="eventTypeOvertime">Overtime</option>
                        <option value="eventTypeHoliday">Holiday</option>
                        <option value="eventTypeSick">Sick</option>
                    </select>
                </div>

                {/* No need to show category if work is not Normal or Overtime e.g. if Consultants are sick */}
                <div className="input">
                    <label htmlFor="eventCategory">Category</label>
                    <select name="eventCategory" id="eventCategory" defaultValue={""} required onChange={handleEventType} disabled = {disableCategory}>
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
                { (errorMessage !== null) && <span className='errorMessage'>{errorMessage}</span> }
            </form>
        </div>
    )
}