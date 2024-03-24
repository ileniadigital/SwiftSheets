// Importing CSS
import './Hours.css';

// Importing icon
import { FaCirclePlus } from "react-icons/fa6";

// Importing useState
import { useState } from 'react';

export default function Hours({addEventHandler, date, timesheetStatus}) {

    // Retrieve start and end time from database to determine hours displayed
    let startWorkHours = parseInt(localStorage.getItem('startWorkHours').slice(0,2))
    let endWorkHours = parseInt(localStorage.getItem('endWorkHours').slice(0,2))

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
    if (localStorage.getItem('24HoursWorked') === true || startWorkHours > endWorkHours) {
        startWorkHours = 0
        endWorkHours = 23
    }


    const event = JSON.parse(localStorage.getItem("event"))

    const startTime = parseInt((JSON.parse(localStorage.getItem("event")).startTime).slice(0,2))
    const startMinsTimeREM = parseInt((JSON.parse(localStorage.getItem("event")).startTime).slice(3,6))*0.05 || 60
    const endTimeMinsREM = parseInt((JSON.parse(localStorage.getItem("event")).endTime).slice(3,6))*0.05
    const endTime = parseInt((JSON.parse(localStorage.getItem("event")).endTime).slice(0,2))



    // Iterates through the hours of a day, creating a new button for each day (this will serve as a timesheet timeslot)
    for (let i = startWorkHours; i <= endWorkHours; i++)
    {
        /* Ternary operator used to ensure last div does not have a line underneath; maintaining rounded
        edges of border */
        const addUnderlineClass = i < endWorkHours;
        hoursArray.push(
            <button key={i} 
            className={`hour-block ${addUnderlineClass ? 'add-underline' : ''}`} 
            onClick={() => addEventHandler("Hours", date)} 
            onMouseEnter={() => handleMouseEnter(i)} 
            onMouseLeave={handleMouseLeave}
            disabled={timesheetStatus === "Submitted"}>
            {i === startTime && date === event.date ? 
            (i === startWorkHours ? 
                <div className={'add-event-button rounded-top'}
                style={{ height: `${startMinsTimeREM}rem` }}
                >

                    {hoveredHour === i && <FaCirclePlus/>} {/* Show add event button if hour hovered over */}
                    {i === startTime && date === event.date ? event.name : ''}
                </div>
                : 

            (i === endWorkHours ? 
                <div className={'add-event-button rounded-bottom'}
                style={{ height: `${endTimeMinsREM}rem` }}>
                    {hoveredHour === i && <FaCirclePlus/>} {/* Show add event button if hour hovered over */}
                    {i === startTime && date === event.date ? event.name : ''}
                </div>
                : 
                <div className='add-event-button event'> 
                    {hoveredHour === i && <FaCirclePlus/>} {/* Show add event button if hour hovered over */}
                    {i === startTime && date === event.date ? event.name : ''}
                </div>

            ))
            : 
                <div className='add-event-button'> 
                    {hoveredHour === i && <FaCirclePlus/>} {/* Show add event button if hour hovered over */}
                    {i === startTime && date === event.date ? event.name : ''}
                </div>
            }
            </button>)
    }
    
    return(
        // Stroing all hours in a container
        <div className="hours-container">
            {hoursArray}
        </div>
    )
}