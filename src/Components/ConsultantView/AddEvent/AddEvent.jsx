// Importing CSS
import './AddEvent.css';

// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState
import { useEffect, useState } from 'react';
import getDate from '../getDate';

export default function AddEvent({componentCaller, addEventHandler, viewedWeek, event}) {

    /* Only needs to be rendered for Timesheet component caller as its viewedWeek
    argument will be a Date, compared to Hours' string */


    // Determinining date for start of week
    const startDate = getDate(viewedWeek, 1)
    // Converting into format for minimum date value
    let startOfWeek = `${startDate[2]}-${startDate[1]}-${startDate[0]}`

    // Determinining date for end of week
    const endDate = getDate(viewedWeek, 7)
    // Converting into format for maximum date value
    let endOfWeek = `${endDate[2]}-${endDate[1]}-${endDate[0]}`


    // String all inputs
    const [eventName, setEventName] = useState(componentCaller === 'Hours1' ? event.name : '')
    const [eventDate, setEventDate] = useState(componentCaller === 'Hours1' ? event.date : componentCaller === 'Hours' ? viewedWeek : '') // Set default if an event is clicked, otherwise find it
    const [eventStartTime, setEventStartTime] = useState(componentCaller === 'Hours1' ? event.startTime : '')
    const [eventEndTime, setEventEndTime] = useState(componentCaller === 'Hours1' ? event.endTime : '')
    const [eventCategory, setEventCategory] = useState(componentCaller === 'Hours1' ? event.category : '')
    const [isRecurring, setIsRecurring] = useState(componentCaller === 'Hours1' ? event.recurring : false)
    const [eventNote, setEventNote] = useState(componentCaller === 'Hours1' ? event.note : '')
    const [events, setEvents] = useState([]);
    const [eventType, setEventType] = useState(componentCaller === 'Hours1' ? event.type : '')
    const [disableCategory, setDisableCategory] = useState(componentCaller === 'Hours1' && (eventType !== 'eventTypeNormal' && eventType !== 'eventTypeOvertime') ? true : false)

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

    // Retrieve start and end time from local storage
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

    const [concurrentEvent, setConcurrentEvent] = useState(false)

    /* Add Event Validation: Iterate through all events and check:
    - start and end time dont match that of existing events
    - start and end time are not between that of an existing event
    - start time not before event and end time within event
    logic must hold for events that span over 2 days, or just 1 
    (i think i had some code for it but it seems to have disappeared)
    -  */

    return(
        <div className='add-event'>
            <button className = "close-event" onClick={addEventHandler}><IoClose /></button>
            <h1 className='log-event-heading'>Log Event</h1>
            {/* Creating a form that represents the Consultant logging an event */}
            <form action="" className = "add-new-event">

                {/* Show dropdown menu for recurring event upon selection */}
                {componentCaller !== 'Hours1' && 
                
                <div className='input'>
                    <label>Select Event</label>
                    <select defaultValue={''}>
                        <option value="" disabled hidden>Select Event</option> {/* Default value */}
                    </select>
                </div>
                }

                <div className="input event-name">
                    <label htmlFor="eventName">Name</label>
                    <input type="text" name = "eventName" required onChange={validateEventName}
                    defaultValue={eventName}/>
                </div>

                <div className="input">
                    <label htmlFor="eventDate">Date</label>
                        {/* // Limiting days to choose from as days in current week */}
                        <input className = 'datetime' type="date" name = "eventDate" defaultValue = {viewedWeek} min={startOfWeek} max={endOfWeek} onChange={(event) => setEventDate(event.target.value)} required/>
                </div>

                <div className="input">
                    <label htmlFor="eventStartTime">Start Time</label>
                    <input type="time" className='datetime' name = "eventStartTime" required onChange={validateStartTime}
                    defaultValue={eventStartTime}/>
                </div>

                <div className="input">
                    <label htmlFor="eventEndTime">End Time</label>
                    <input className='datetime' type="time" name = "eventEndTime" required onChange={validateEndTime}
                    defaultValue={eventEndTime}/>
                </div>

                <div className="input">
                    <label htmlFor="eventType">Type</label>
                    <select name="eventType" onChange={handleEventType} required
                    value={eventType}>
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
                    value={eventCategory}>
                        <option value="" disabled hidden>Category</option> {/* Default value */}
                        <option value="Project">Project</option>
                        <option value="eventCategoryPlanning">Planning</option>
                        <option value="eventCategoryMeeting">Meeting</option>
                    </select>
                </div>

                <div className="input checkbox-container">
                    <label htmlFor="isRecurring" className='checkbox-label'>Recurring </label>
                    <input className = {`is-recurring ${isRecurring ? 'recur' : ''}`} type="checkbox" onChange={() => setIsRecurring(!isRecurring)}
                    defaultValue={isRecurring}/>
                </div>

                <div className='note-container'>
                    <label htmlFor="note"> Note </label>
                    <textarea name="note" cols="30" rows="5" placeholder='Enter text' onChange = {(event) => setEventNote(event.target.value.trim())}
                    defaultValue={eventNote}>
                    </textarea>
                </div>
                
                <div>
                    {/* Pass setEvents as a prop to AddEvent component */}
                    <AddEvent setEvents={setEvents} />
                </div>

                {concurrentEvent && 
                <p className='concur-error'>Event is Overlapping</p>}
                {componentCaller === 'Hours1' ? (
                <input type="submit" value={"Edit Event"} className='add-event-button'/> 
                )
                : (
                <input type="submit" value={"Add Event"} className='add-event-button'/> ) }
            </form>
        </div>
    )
}