// Importing CSS
import './AddEvent.css';

// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState
import { useEffect, useState } from 'react';

import {createEvents} from '../../Data/EventsData';

//readd eventDate if it might
export default function AddEvent({onClose, timesheet}) {

    //Handle closing of add event pop up
    const [isOpen, setIsOpen] = useState(true);

    const closeMenu = () => {
        setIsOpen(false);
        onClose();
    }

    // Handle change in date input
    const [date, setDate] = useState('');
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        // Validate the selected date here
        if (selectedDate < timesheet.start_date || selectedDate > timesheet.end_date) {
            e.target.setCustomValidity(`Date must be between ${timesheet.start_date} and ${timesheet.end_date}`);
        } else {
            e.target.setCustomValidity('');
            setDate(selectedDate);
        }
    };

    //Store events in local storage
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDates, setEventDates] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [eventType, setEventType] = useState("");
    const [eventCategory, setEventCategory] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [note, setNote] = useState('N/A');
    const [disableCategory, setDisableCategory] = useState(false);

    // Calculate the duration of the event
    const calculateDuration = (eventStartTime, eventEndTime) => {
        // Split the time strings into hours and minutes
        const [startHour, startMinute] = eventStartTime.split(":").map(Number);
        const [endHour, endMinute] = eventEndTime.split(":").map(Number);

        // Construct Date objects with a common reference date (e.g., today's date)
        const startDate = new Date(0, 0, 0, startHour, startMinute); // January 1, 1900
        const endDate = new Date(0, 0, 0, endHour, endMinute); // January 1, 1900

        // Calculate the difference in milliseconds
        let differenceMs = endDate - startDate;

        // Convert milliseconds to hours (1 hour = 3600000 milliseconds)
        const durationHours = differenceMs / 3600000;

        console.log('Duration (hours):', durationHours);
        return durationHours;
    }

    const handleAddEvent = async (e) => {
        // e.preventDefault();
        // Construct event object
        const startTime = new Date(`${eventDates}T${eventStartTime}`).toLocaleTimeString('en-US', { hour12: false });
        const endTime = new Date(`${eventDates}T${eventEndTime}`).toLocaleTimeString('en-US', { hour12: false });



        // Convert the difference to hours
        const duration = calculateDuration(eventStartTime, eventEndTime);
        console.log('Duration:', duration);

        const newEvent = {
            date: eventDates,
            start_time: startTime,
            end_time: endTime,
            duration: duration,
            name: eventName,
            type: eventType,
            category: eventCategory,
            is_recurring: isRecurring,
            note: note,
            timesheet: timesheet.id
        };

        try {
            // Call createEvents function to send data to the database
            const response = await createEvents(timesheet.id, [newEvent]); // Assuming timesheet has an id field
            console.log('Event created successfully:', response);
            console.log('New event:', newEvent);
            console.log(timesheet.id);
    
            // Close the AddEvent component
            closeMenu();
        } catch (error) {
            console.error('Error creating event:', error);
    
            // Handle error appropriately (e.g., show error message to the user)
        }

        // // Retrieve existing events from local storage or initialize empty array
        // let existingEvents = JSON.parse(localStorage.getItem('events')) || [];
        // // Add new event to existing events
        // const updatedEvents = Array.isArray(existingEvents) ? [...existingEvents, newEvent] : [newEvent];

        // // Store updated events back to local storage
        // localStorage.setItem('events', JSON.stringify(updatedEvents));
        // // Update the events state with the updated array
        // setEvents(updatedEvents);

        // Close the AddEvent component
        closeMenu();
        window.location.reload(); // Reload screen to update events
    }

    //Validate event name
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
        if ((event.target.value === "Sick") || (event.target.value === "Holiday")){
            setEventCategory("None")
            setDisableCategory(true)
        } else {
            setDisableCategory(false)
        }
    }

    return(
        isOpen && (
            <div className='add-event'>
                <button className = "close-event" onClick={closeMenu}><IoClose /></button>
                <h1 className='log-event-heading'>Log Event</h1>
                {/* Creating a form that represents the Consultant logging an event */}
                <form action="" className = "add-new-event">

                    {/* Show dropdown menu for recurring event upon selection */}
                    <div className='input'>
                        <label>Select Event</label>
                        <select defaultValue={''}>
                            <option value="" disabled hidden>Select Event</option> {/* Default value */}
                        </select>
                    </div>
            

                    <div className="input event-name">
                        <label htmlFor="eventName">Name</label>
                        <input type="text" name = "eventName" required onChange={(e) => setEventName(e.target.value)}/>
                    </div>

                    <div className="input">
                        <label htmlFor="eventDate">Date</label>
                            {/* // Limiting days to choose from as days in current week */}
                            <input className = 'datetime' type="date" name = "eventDate" value={eventDates} onChange={(e) => setEventDates(e.target.value)} required min={timesheet.start_date} max={timesheet.end_date}/>
                    </div>

                    <div className="input">
                        <label htmlFor="eventStartTime">Start Time</label>
                        <input type="time" className='datetime' name = "eventStartTime" required  onChange={(e) => setEventStartTime(e.target.value)}/>
                    </div>

                    <div className="input">
                        <label htmlFor="eventEndTime">End Time</label>
                        <input className='datetime' type="time" name = "eventEndTime" required onChange={(e) => setEventEndTime(e.target.value)}/>
                    </div>

                    <div className="input">
                        <label htmlFor="eventType">Type</label>
                        <select name="eventType" required onChange={(e) => handleEventType(e)} value={eventType}>
                            <option value="" disabled hidden>Type</option> {/* Default value */}
                            <option value="Normal">Normal</option>
                            <option value="Overtime">Overtime</option>
                            <option value="Holiday">Holiday</option>
                            <option value="Sick">Sick</option>
                        </select>
                    </div>

                    {/* No need to show category if work is not Normal or Overtime e.g. if Consultants are sick */}
                    <div className="input">
                        <label htmlFor="eventCategory">Category</label>
                        <select name="eventCategory" value={eventCategory} required onChange={(e) => setEventCategory(e.target.value)}>
                            <option value="" disabled hidden>Category</option> {/* Default value */}
                            {!disableCategory ? (
                                <>
                                    <option value="Project">Project</option>
                                    <option value="Planning">Planning</option>
                                    <option value="Meeting">Meeting</option>
                                </>
                            ) : (
                                <option value="None" selected>None</option>
                            )}
                        </select>
                    </div>


                    <div className="input checkbox-container">
                        <label htmlFor="isRecurring" className='checkbox-label'>Recurring </label>
                        {/* <input  type="checkbox" onChange={(e) => setIsRecurring(e.target.value)}/> */}
                        <input className = {`is-recurring ${isRecurring ? 'recur' : ''}`} type="checkbox" onChange={() => setIsRecurring(!isRecurring)}
                        defaultValue={isRecurring}/>
                    </div>

                    <div className='note-container'>
                        <label htmlFor="note"> Note </label>
                        <textarea name="note" cols="30" rows="5" placeholder='Enter text'>
                        </textarea>
                    </div>


                    {/* <div className='input'
                    <input type="submit" value={"Add Event"} className='add-event-button'/> 

                    {/* <p className='concur-error'>Event is Overlapping</p> */}
                    {/* {componentCaller === 'Hours1' ? (
                    <input type="submit" value={"Edit Event"} className='add-event-button'/> 
                    )
                    : (
                    <input type="submit" value={"Add Event"} className='add-event-button'/> ) } */}
                    {/* CHANGE THIS SO IF EVENT ALREADY EXISTS THEN IT'S EDIT IF NOT IT'S ADD */}
                    {/* {timesheet.eventId ? (
                        <input type="submit" value={"Edit Event"} className='add-event-button'/>
                    ) : ( */}
                    <input type="submit" value={"Add Event"} onClick={(event) => {
                        validateEventName(event); 
                        handleAddEvent(event); 
                     }}  className='add-event-button'/>
                    
                </form>
            </div>
        )
    )
}