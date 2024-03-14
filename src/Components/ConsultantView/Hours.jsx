// Importing CSS
import '../../CSS/ConsultantView/Hours.css';

// Importing Component
import '../../Components/ConsultantView/AddEvent';

// Importing useState
import { useState } from 'react';
import AddEventButton from '../../Components/ConsultantView/AddEventButton';

export default function Hours({addEventHandler}) {

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

    for (let i = 0; i < 24; i++)
    {
        /* If statement used to ensure last div does not have a line underneath; maintaining rounded
        edges of border */
        const addUnderlineClass = i < 23;
        hoursArray.push(
            <button key={i} className={`hourBlock ${addUnderlineClass ? 'addUnderline' : ''}`} onClick={addEventHandler} onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave}>
            {hoveredHour === i && <AddEventButton source = 'fromHoursComponent' />} {/* Show add event button if hour hovered over */}
            </button>)
    }
    return(
        // Stroing all hours in a container
        <div id="hoursContainer">
            {hoursArray}
        </div>
    )
}