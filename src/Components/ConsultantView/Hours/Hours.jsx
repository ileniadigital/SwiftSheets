// Importing CSS
import './Hours.css';

// Importing icon
import { FaCirclePlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

// Importing useState
import { useEffect, useState } from 'react';

// Importing component to display event on click
import DeleteEventConfirmation from '../DeleteEventConfirmation/DeleteEventConfirmation';


export default function Hours({addEventHandler, date, timesheetStatus, events}) {

    console.log("Events in hours:", events)
    /* Whether hour has been clicked on stored to determine whether to show add event icon
       (makes it easier to identify which time slot is being clicked on) */
    const [hoveredHour, setHoveredHour]  = useState(null);

    const handleMouseEnter = (hour) => {
        if (hour !== hoveredHour){
        setHoveredHour(hour)}    }

    const handleMouseLeave = () => {
        setHoveredHour(null)}

    // Creating array to store each hour in day as a time slot
    let hoursArray = []

    // Providing whole day as time slots if working hours extend across multiple days
    let startWorkHours = 0;
    let endWorkHours = 23;

    // Determine if user wants to delete an event
    const [deleteEventID, setDeleteEventID] = useState(false);
    // Delete event
    const deleteEvent = (eventId) => {
        setDeleteEventID(eventId)
    }

    // Iterates through the hours of a day, creating a new button for each day (this will serve as a timesheet timeslot)
    for (let i = startWorkHours; i <= endWorkHours; i++)
    {
        /* Ternary operator used to ensure last div does not have a line underneath; maintaining rounded
        edges of border */
        const addUnderlineClass = i < endWorkHours;

        let eventsPerHour = [] // Creating array to store event hours
        let numberOfEvents = 0 // Track number of events to determine if + event button should appear
        let startHour = false // Only show x button for start hour

        // Iterate over sorted events array
        for (const event of events) {
            let className = 'add-event-button'
            let top = 0
            let height = 0

            let eventStartHour = parseInt(event.start_time.slice(11, 13))
            let eventEndHour = parseInt(event.end_time.slice(11, 13))
            let eventStartMin = parseInt(event.start_time.slice(14, 16))
            let eventEndMin = parseInt(event.end_time.slice(14, 16))
            // Ensures event is logged on the same day
            if (event.date === date) {
                // Performing checks where the event does not last more than a day
                if (((eventStartHour < eventEndHour) || (eventStartHour === eventEndHour && eventStartMin < eventEndMin)) && i >= eventStartHour && i <= eventEndHour) {
                    // Checks when start and end time are within the same hour and sets height accordingly
                    if (eventStartHour === eventEndHour && i === eventStartHour) {
                        className = 'event'
                        height = 0.05 * (eventEndMin - eventStartMin)
                        top = 0.05 * eventStartMin
                        if (eventStartHour === startWorkHours && top < 0.9) {
                            className += ' rounded-top'
                        } else if (eventStartHour === endWorkHours && top + height > 2) {
                            className += ' rounded-bottom'
                        }
                        numberOfEvents++
                        startHour = true
                        className += ' complete-event'
                    } else {
                        // Checks when start time is below end time
                        if (i === eventStartHour) {
                            className = 'event'
                            top = 0.05 * eventStartMin
                            height = 3 - top
                            if (eventStartHour === startWorkHours && top < 0.9) {
                                className += ' rounded-top'
                            }
                            numberOfEvents++
                            startHour = true
                            className += ' start-event hours-event'
                        } else if (i === eventEndHour && eventEndMin !== 0) {
                            className = 'event'
                            height = 0.05 * eventEndMin
                            // No need for top as it is a continuation of the above
                            if (i === endWorkHours && top + height > 2) {
                                className += ' rounded-bottom'
                            }
                            numberOfEvents++
                            className += ' end-event hours-event'
                        } else if (!(i === eventEndHour && eventEndMin === 0)) {
                            className = 'event'
                            height = 3 // Take up full hour block

                            if (((eventEndHour === endWorkHours + 1 && eventEndMin === 0) && i === eventEndHour - 1) && top + height > 2) {
                                className += ' rounded-bottom end-event'
                            } else if (eventEndHour === endWorkHours + 1) {
                                className += ' end-event'
                            }
                            numberOfEvents++
                            className += ' hours-event'
                        }
                    }
                } else if (eventStartHour > eventEndHour || (eventStartHour === eventEndHour && eventStartMin > eventEndMin)) {
                    // Handling the case where worker works for over 2 days
                    if (i === eventStartHour) {
                        className = 'event'
                        top = 0.05 * eventStartMin
                        height = 3 - top
                        if (eventStartHour === startWorkHours && top < 0.9) {
                            className += ' rounded-top'
                        }
                        numberOfEvents++
                        startHour = true
                        className += ' start-event hours-event'
                    } else if (i > eventStartHour && i > eventEndHour) {
                        // Regular hour blocks
                        className = 'event'
                        height = 3
                        if (i === endWorkHours && top < 0.9) {
                            className += ' rounded-bottom'
                        }
                        numberOfEvents++
                        className += ' hours-event'
                    }
                }
            } else if (eventStartHour > eventEndHour || (eventStartHour === eventEndHour) && eventStartMin > eventEndMin) {
                const nextEventDay = new Date(event.date).getDate() + 1
                const dateDay = new Date(date).getDate()
                if (nextEventDay === dateDay) {
                    // Considering next day
                    if (i === eventEndHour && eventEndMin !== 0) {
                        height = 0.05 * eventEndMin
                        className = 'event'
                        if (i === startWorkHours) {
                            className += ' rounded-top'
                        }
                        numberOfEvents++
                        className += ' end-event hours-event'
                    } else if (i < eventEndHour) {
                        className = 'event'
                        height = 3
                        if (i === startWorkHours) {
                            className += ' rounded-top'
                        }
                        numberOfEvents++
                        className += ' hours-event'
                    }
                }
            }

            const event1 = event
            eventsPerHour.push (
                className !== 'add-event-button' &&
                <div className={className} key={event.id}
                    style={{ top: `${top}rem`, height: `${height}rem` }}
                    onClick={(event) => {
                        event.stopPropagation();
                        addEventHandler("Hours1", date, event1);
                    }}>
                    {startHour ? <div className="delete-event">
                        <IoClose onClick={(event) => {
                            event.stopPropagation()
                            deleteEvent(event1.id)}}/></div> : ''}
                    {startHour && deleteEventID === event1.id && <DeleteEventConfirmation event={event1.id} setOpenPopup={setDeleteEventID}/>}
                </div>
            )
        }

        hoursArray.push(
            <button key={i}
                className={`hour-block ${addUnderlineClass ? 'add-underline' : ''}`}
                onClick={() => addEventHandler("Hours", date, null)}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                disabled={timesheetStatus === "Submitted"}>
                <div className='event-container'>
                    {numberOfEvents === 0 && hoveredHour === i && <FaCirclePlus/>} {/* Show add event button if hour hovered over */}
                    {eventsPerHour}
                </div>
            </button>)
    }

    return (
        // Storing all hours in a container
        <div className="hours-container">
            {hoursArray}
        </div>
    )
}

