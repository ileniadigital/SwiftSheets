// Importing CSS
import './AddEvent.css';

// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState
import { useEffect, useState } from 'react';

export default function AddEvent({componentCaller, addEventHandler, viewedWeek, event}) {

    /* Only needs to be rendered for Timesheet component caller as its viewedWeek
    argument will be a Date, compared to Hours' string */
    let startOfWeek, startOfWeekDay, startOfWeekMonth, startOfWeekYear;
    let endOfWeek, endOfWeekDay, endOfWeekMonth, endOfWeekYear;

    if (componentCaller === "Timesheet") {
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

    // String all inputs
    const [eventName, setEventName] = useState('')
    const [eventDate, setEventDate] = useState(componentCaller !== 'Hours' ? '' : viewedWeek) // Set default if an event is clicked, otherwise find it
    const [eventStartTime, setEventStartTime] = useState('')
    const [eventEndTime, setEventEndTime] = useState('')
    const [eventCategory, setEventCategory] = useState(componentCaller === 'Hours1' ? event.category : '')
    const [isRecurring, setIsRecurring] = useState(false)
    const [eventNote, setEventNote] = useState('')

    const [eventType, setEventType] = useState('')
    const [disableCategory, setDisableCategory] = useState(eventType === 'Normal' || eventType === 'Overtime' ? false : true)

    // Ensuring empty string is not entered
    const validateEventName = (event) =>  {
        const eventName = event.target.value.trim(); 
        if (eventName.trim() == "") {
            // setEventName('')
            event.target.setCustomValidity('Enter an event name');
        } else {
            // If value is valid, clear any existing error message and update value
            event.target.setCustomValidity('');
            setEventName(eventName)
        }
    }

    /* Used to determining whether Category input is disabled - no need to enter category if a worker is sick */
    function handleEventType(event) {
        setEventType(event.target.value)

        // Disabling category input
        if ((event.target.value !== "eventTypeNormal") && (event.target.value !== "eventTypeOvertime")) {
            setEventCategory('')
            setDisableCategory(true)
        } else {
            setDisableCategory(false)
        }
    }

    // Retrieve start and end time from database 
    let startWorkHours = parseInt(localStorage.getItem('startWorkHours').slice(0,2))
    let startWorkMins = parseInt(localStorage.getItem('startWorkHours').slice(3,5))
    let endWorkHours = parseInt(localStorage.getItem('endWorkHours').slice(0,2))
    let endWorkMins = parseInt(localStorage.getItem('endWorkHours').slice(3,5))

    // Providing whole day as time slots if working hours extend across multiple days
    if (localStorage.getItem('24HoursWorked') === "true" || startWorkHours > endWorkHours || startWorkHours === endWorkHours && startWorkMins > endWorkMins) {
        startWorkHours = 0
        endWorkHours = 23
    }

    // No need to show hour block for hour that ends
    if (endWorkMins == 0) {
        endWorkHours-=1
    }
    
    const validateStartTime = (event) =>  {
        const startTime = event.target.value; 
        setEventStartTime(startTime)
 
        // Only perform comparison when both have values 
        if (startTime !== '') {
            const startTimeHours = parseInt(startTime.slice(0,2)); 
            const startTimeMins = parseInt(startTime.slice(3,5)); 
            if (startTimeHours < startWorkHours  || startTimeHours > endWorkHours) {
                event.target.setCustomValidity('Start time must be within working hours');
                return
            }
            if (eventEndTime !== '') {
                const endTimeHours = parseInt(eventEndTime.slice(0,2)); 
                const endTimeMins = parseInt(eventEndTime.slice(3,5)); 
                if (localStorage.getItem('24HoursWorked') === 'false') {
                    // Ensuring start time is not after end time
                   
                    if (startTimeHours === endTimeHours) {
                        if (startTimeMins > endTimeMins) {
                            event.target.setCustomValidity('Start time must not exceed end time');
                            return
                        } 
                    } else if (startTimeHours > endTimeHours) {
                        event.target.setCustomValidity('Start time must not exceed end time');
                        return
                    }
                } 
            }
        }
        // Erase error messages
        event.target.setCustomValidity('');
    }

    const validateEndTime = (event) =>  {
        const endTime = event.target.value; 
        setEventEndTime(endTime)
 
        // Only perform comparison when both have values 
        if (endTime !== '') {
            const endTimeHours = parseInt(endTime.slice(0,2)); 
            const endTimeMins = parseInt(endTime.slice(3,5)); 
            
            if (endTimeHours > endWorkHours || endTimeHours < startWorkHours) {
                event.target.setCustomValidity('End time must be within working hours');
                return
            }
            if (eventStartTime !== '') {
                const startTimeHours = parseInt(eventStartTime.slice(0,2)); 
                const startTimeMins = parseInt(eventStartTime.slice(3,5)); 
                if (localStorage.getItem('24HoursWorked') === 'false') {
                    // Ensuring end time is not before start time
                    if (startTimeHours === endTimeHours) {
                        if (startTimeMins > endTimeMins) {
                            event.target.setCustomValidity('Start time must not exceed end time');
                            return
                        } 
                    } else if (startTimeHours > endTimeHours) {
                        event.target.setCustomValidity('Start time must not exceed end time');
                        return
                    }
                } 
            }
        }
        event.target.setCustomValidity('');
    }

    // Handles validation after submit button has abeen pressed
    function handleSubmit(event) {
        const events = JSON.parse(localStorage.getItem("events")) || {}
        const newEventId = Object.keys(events).length; // Get the length of current events to generate a new ID
        const newEvent = {
            id: newEventId,
            name: eventName,
            date: eventDate,
            startTime: eventStartTime,
            endTime: eventEndTime,
            type: eventType,
            category: eventCategory,
            recurring: isRecurring,
            note: eventNote
        };
        events[newEventId] = newEvent; // Add the new event to the existing events object
        localStorage.setItem("events", JSON.stringify(events)); // Save the updated events back to localStorage
        // Values to be added to database
        //     eventName,
        //     eventDate,
        //     eventStartTime,
        //     eventEndTime,
        //     eventType,
        //     eventCategory,
        //     isRecurring,
        //     eventNote
    }
    console.log(event)

    return(
        <div className='add-event' onSubmit={handleSubmit}>
            <button className = "close-event" onClick={addEventHandler}><IoClose /></button>
            <h1 className='log-event-heading'>Log Event</h1>
            {/* Creating a form that represents the Consultant logging an event */}
            <form action="" className = "add-new-event">
                <div className="input event-name">
                    <label htmlFor="eventName">Name</label>
                    <input type="text" name = "eventName" required onChange={validateEventName}
                    defaultValue={componentCaller === 'Hours1' ? event.name : ''}/>
                </div>

                <div className="input">
                    <label htmlFor="eventDate">Date</label>
                    {componentCaller === "Hours" || "Hours1" ? (

                        // Date is preset as the day of the week is known from the time/dayslot click 
                        <input className = 'datetime' type="date" name = "eventDate" value = {viewedWeek} readOnly required/>
                        ) : (
                        
                        // Limiting days to choose from as days in current week
                        <input type="date" className='datetime' name = "eventDate" min={startOfWeek} max={endOfWeek} onChange={(event) => setEventDate(event.target.value)} required/>
                    )}
                </div>

                <div className="input">
                    <label htmlFor="eventStartTime">Start Time</label>
                    <input type="time" className='datetime' name = "eventStartTime" required onChange={validateStartTime}
                    defaultValue={componentCaller === 'Hours1' ? event.startTime : ''}/>
                </div>

                <div className="input">
                    <label htmlFor="eventEndTime">End Time</label>
                    <input className='datetime' type="time" name = "eventEndTime" required onChange={validateEndTime}
                    defaultValue={componentCaller === 'Hours1' ? event.endTime : ''}/>
                </div>

                <div className="input">
                    <label htmlFor="eventType">Type</label>
                    <select name="eventType" onChange={handleEventType} required
                    defaultValue={componentCaller === 'Hours1' ? event.type : ''}>
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
                    <select name="eventCategory" required onChange = {(event) => setEventCategory(event.target.value)} disabled = {disableCategory}
                    defaultValue={componentCaller === 'Hours1' ? event.category : ''}>
                        <option value="" disabled hidden>Category</option> {/* Default value */}
                        <option value="Project">Project</option>
                        <option value="eventCategoryPlanning">Planning</option>
                        <option value="eventCategoryMeeting">Meeting</option>
                    </select>
                </div>

                <div className="input checkbox-container">
                    <label htmlFor="isRecurring" className='checkbox-label'>Recurring </label>
                    <input className ='is-recurring' type="checkbox" onChange={() => setIsRecurring(!isRecurring)}
                    defaultValue={componentCaller === 'Hours1' ? event.recurring : ''}/>
                </div>

                <div className='note-container'>
                    <label htmlFor="note"> Note </label>
                    <textarea name="note" cols="30" rows="5" placeholder='Enter text' onChange = {(event) => setEventNote(event.target.value.trim())}
                    defaultValue={componentCaller === 'Hours1' ? event.note : ''}>
                    </textarea>
                </div>

                {componentCaller === 'Hours1' ? (
                <input type="submit" value={"Edit Event"} className='add-event-button'/> 
                )
                : (
                <input type="submit" value={"Add Event"} className='add-event-button'/> ) }
            </form>
        </div>
    )
}