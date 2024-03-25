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
    if (localStorage.getItem('24HoursWorked') === "true" || startWorkHours > endWorkHours) {
        startWorkHours = 0
        endWorkHours = 23
    }

    date = new Date(date)
    let events = JSON.parse(localStorage.getItem("events"))

    {/* Logic For Event Display: 
                Check if the event is at the beginning or end of the hour block; these will have extra styling that
                rounds the border
                Check if an event is within the start and end time - fill in entire hour block
                If event only takes up part of an hour block, multiply the minutes of the event by 0.05 - the height of 
                   each hour block is 3rem so 1 minute would be 0.05rem */}


    // Iterates through the hours of a day, creating a new button for each day (this will serve as a timesheet timeslot)
    for (let i = startWorkHours; i <= endWorkHours; i++) {

        let className = false
        const addUnderlineClass = i < endWorkHours;
        let height = 0
        let marginTop = 0
        let marginBottom = 0

        // for (const event in events) {
        //     className = '' // Reinitialising classname each time

        //     const loggedEvent = events[event] // Storing current event

        //     let eventDate = new Date(loggedEvent.date)

        //     // Only consider adding event if the dates are the same
        //     if (eventDate.getDate() === date.getDate()) {

        //         // Storing later referenced variables; attributes of Event
        //         // const startTime = loggedEvent.startTime
        //         let startTimeHours = parseInt((loggedEvent.startTime).slice(0,2))
        //         let startTimeMins = parseInt((loggedEvent.startTime).slice(3,5))
        //         // let startDateTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), startTimeHours, startTimeMins)
        //         // let endTime = loggedEvent.endTime
        //         let endTimeHours = parseInt((loggedEvent.endTime).slice(0,2))
        //         let endTimeMins = parseInt((loggedEvent.endTime).slice(3,5))
        //         // let endDateTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), endTimeHours, endTimeMins)

        //         // No change to classname as there is no event - it is the end time   
        //         if (!(endTimeMins === 0 && i === endTimeHours)) {

        //             // If i is between the event start and end time
        //             if (i >= startTimeHours && i <= endTimeHours) {
        //                 className += "event"

        //                 // Considering cases where the start and end time are the same
        //                 if (startTimeHours === endTimeHours) {
        //                     // Round border if it's the first/last working hour (at the top/bottom)
        //                     if (startTimeHours === startWorkHours && startTimeMins < 15) {
        //                         className += " rounded-top" 
        //                     } else if (startTimeHours === endWorkHours) {
        //                         className += ' rounded-bottom'
        //                     }
        //                     height = 0.05* (endTimeMins-startTimeMins)
        //                     marginTop = 0.05 * startTimeMins
        //                 } else if (i === startTimeHours) {
        //                     // Settng height to full amount if that is when the event starts
        //                     if (startTimeMins === 0) {
        //                         height = 3
        //                     } else {
        //                         height = 3-(0.05*startTimeMins)
        //                         marginTop = (0.05*startTimeMins)
        //                     }
        //                     // Checking if hour block is the first working hour
        //                     if (i === startWorkHours) { 
        //                         if (startTimeMins === 0) {
        //                             className += " rounded-top"
        //                         } else {
        //                             if (startTimeMins < 15) {
        //                                 className += " rounded-top"
        //                             } 
        //                         }
        //                     } 
        //                 } else if (i === endTimeHours) {
        //                     if (i === endWorkHours && endTimeMins > 45) {
        //                         className += " rounded-bottom"
        //                     }
        //                     height = 0.05 * endTimeMins
        //                     marginBottom = 3-(0.05 * endTimeMins)
        //                 }
        //             } else if (endTimeHours < startTimeHours) { 
        //                 if (i >= startTimeHours) {
        //                     className += 'event'
        //                     if (i === startTimeHours) {
        //                         if (startTimeMins === 0) {
        //                             height = 3 
        //                         } else {
        //                             height = 3-(0.05*startTimeMins)
        //                             className += " late-start"
        //                         }
        //                     }
        //                     if (i === endWorkHours) {
        //                         className += " rounded-bottom"
        //                         height = 3
        //                     }
        //                 }
        //             } else if (endTimeHours < startTimeHours) {
        //                 const nextDay = eventDate.getDate() + 1
        //                 if (date.getDate() === nextDay) {
        //                     if (i <= endTimeHours) {
        //                         className += 'event'
        //                     }
        //                     if (i === startWorkHours) {
        //                         className += " rounded-top"
        //                     } else if (i === endWorkHours) {
        //                         className += " rounded-bottom"
        //                     }
        //                 }
        //             }
        //         }
        //         console.log(loggedEvent, className)
        //     }
        // }  
            /* Ternary operator used to ensure last div does not have a line underneath; maintaining rounded
            edges of border */
            hoursArray.push(
                <button key={i} 
                className={`hour-block ${addUnderlineClass ? 'add-underline' : ''}`} 
                onClick={() => addEventHandler("Hours", date)} 
                onMouseEnter={() => handleMouseEnter(i)} 
                onMouseLeave={handleMouseLeave}
                disabled={timesheetStatus === "Submitted"}>

                <div className={className}
                style={
                    { height: `${height}rem`, marginTop: `${marginTop}rem`, marginBottom: `${marginBottom}rem` }
                    }>
                    {hoveredHour === i && <FaCirclePlus/>} {/* Show add event button if hour hovered over */}
                    {/* {i === startTimeHours && date.getDate() === eventDate.getDate() ? loggedEvent.name : ''} */}
                </div>
                </button>) 
    }
    
    return(
        // Stroing all hours in a container
        <div className="hours-container">
            {hoursArray}
        </div>
    )
}