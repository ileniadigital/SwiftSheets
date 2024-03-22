// Performing necessary imports
import '../Components/general.css';
import '../Components/ConsultantSettings/ConsultantSettings.css'
import { useState, useEffect } from 'react';

// Defines the structure of the settings page for consultants
export default function ConsultantSettings() {

    // Keeping track of the consultant's days workers
    const [daysWorked, setDaysWorked] = useState([0, 1, 2, 3, 4, 5, 6])

    // Initialising database with all days worked when the component mounts
    useEffect(() => {
        localStorage.setItem('daysWorked', JSON.stringify(daysWorked))
    }, [])

    // Default is that all days in the week are worked to account for the flexibility in consultant work schedules
    const [mondayWorked, setMondayWorked] = useState(true)
    const [tuesdayWorked, setTuesdayWorked] = useState(true)
    const [wednesdayWorked, setWednesdayWorked] = useState(true)
    const [thursdayWorked, setThursdayWorked] = useState(true)
    const [fridayWorked, setFridayWorked] = useState(true)
    const [saturdayWorked, setSaturdayWorked] = useState(true)
    const [sundayWorked, setSundayWorked] = useState(true)

    // Updates the value of the day worked
    const handleDayWorked = (dayIndex, dayWorked, setDayWorked) => {
        // Creating a copy of daysWorked to prevent errors
        let newDaysWorked = [...daysWorked]

        // Removes the day if it exists in the array
        if (daysWorked.includes(dayIndex)) {
            newDaysWorked = daysWorked.filter(day => day !== dayIndex)
        } else {
            newDaysWorked.push(dayIndex)
        }
        setDayWorked(!dayWorked)
        setDaysWorked(newDaysWorked)
        // Updating database
        localStorage.setItem('daysWorked', JSON.stringify(newDaysWorked))
    }

    return (
        <div className='settings'>
            <h1 className='header'>Settings</h1>
            <div className='settings-items'>
                <div className='days-of-week-worked'>
                    <p>Select Working Day(s)</p>
                    <div className='days-of-week'>
                        {/* Worked days will be given a border so the user knows they are counted as such; hence the ternary operator the the class worked-day
                            Each time the button is clicked, it is counted as a worked day */}
                        <button className={`day-of-week ${mondayWorked ? 'worked-day' : ''}`} onClick={() => handleDayWorked(0, mondayWorked, setMondayWorked)}>M</button>
                        <button className={`day-of-week ${tuesdayWorked ? 'worked-day' : ''}`} onClick={() => handleDayWorked(1, tuesdayWorked, setTuesdayWorked)}>T</button>
                        <button className={`day-of-week ${wednesdayWorked ? 'worked-day' : ''}`} onClick={() => handleDayWorked(2, wednesdayWorked, setWednesdayWorked)}>W</button>
                        <button className={`day-of-week ${thursdayWorked ? 'worked-day' : ''}`} onClick={() => handleDayWorked(3, thursdayWorked, setThursdayWorked)}>T</button>
                        <button className={`day-of-week ${fridayWorked ? 'worked-day' : ''}`} onClick={() => handleDayWorked(4, fridayWorked, setFridayWorked)}>F</button>
                        <button className={`day-of-week ${saturdayWorked ? 'worked-day' : ''}`} onClick={() => handleDayWorked(5, saturdayWorked, setSaturdayWorked)}>S</button>
                        <button className={`day-of-week ${sundayWorked ? 'worked-day' : ''}`} onClick={() => handleDayWorked(6, sundayWorked, setSundayWorked)}>S</button>
                    </div>
                </div>
            </div>
        </div>
    )
}