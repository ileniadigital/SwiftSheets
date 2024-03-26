// Importing CSS
import './Hours.css';

// Importing icon
import { FaCirclePlus } from "react-icons/fa6";

// Importing useState
import { useState } from 'react';

export default function Hours({addEventHandler, date, timesheetStatus}) {

    // Retrieve start and end time from database to determine hours displayed
    let startWorkHours = parseInt(localStorage.getItem('startWorkHours').slice(0,2))
    let startWorkMins = parseInt(localStorage.getItem('startWorkHours').slice(3,5))
    let endWorkHours = parseInt(localStorage.getItem('endWorkHours').slice(0,2))
    let endWorkMins = parseInt(localStorage.getItem('endWorkHours').slice(3,5))

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
    if (localStorage.getItem('24HoursWorked') === "true" || startWorkHours > endWorkHours || (startWorkHours === endWorkHours && startWorkMins > endWorkMins)) {
        startWorkHours = 0
        endWorkHours = 23
    }

    // No need to show hour block for hour that ends
    if (endWorkMins == 0) {
        endWorkHours-=1
    }

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
                <div className='add-event-button'> 
                    {hoveredHour === i && <FaCirclePlus/>} {/* Show add event button if hour hovered over */}
                </div>
            </button>)
    }
    
    return(
        // Storing all hours in a container
        <div className="hours-container">
            {hoursArray}
        </div>
    )
}