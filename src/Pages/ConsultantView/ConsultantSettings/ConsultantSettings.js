// Performing necessary imports
import './ConsultantSettings.css'
import { useState, useEffect } from 'react';

// Defines the structure of the settings page for consultants
export default function ConsultantSettings() {

    // Keeping track of the consultant's days worked ; default is all days
    const [daysWorked, setDaysWorked] = useState(JSON.parse(localStorage.getItem('daysWorked')) || [0, 1, 2, 3, 4, 5, 6])

    // Keeping track of the consultant's maximum working hours to define the first grid's hours ; default is all hours
    const [startWorkHours, setStartWorkHours] = useState(localStorage.getItem('startWorkHours') || "00:00")
    const [endWorkHours, setEndWorkHours] = useState(localStorage.getItem('endWorkHours') || "23:00")


    // Default is that all days in the week are worked to account for the flexibility in consultant work schedules
    const [mondayWorked, setMondayWorked] = useState(daysWorked.includes(0))
    const [tuesdayWorked, setTuesdayWorked] = useState(daysWorked.includes(1))
    const [wednesdayWorked, setWednesdayWorked] = useState(daysWorked.includes(2))
    const [thursdayWorked, setThursdayWorked] = useState(daysWorked.includes(3))
    const [fridayWorked, setFridayWorked] = useState(daysWorked.includes(4))
    const [saturdayWorked, setSaturdayWorked] = useState(daysWorked.includes(5))
    const [sundayWorked, setSundayWorked] = useState(daysWorked.includes(6))

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

    // Keeps track of any messages that need to be set
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        // Updating in database if ther is a value
        if (startWorkHours !== '') {
            localStorage.setItem("startWorkHours", startWorkHours)
        }
    }, [startWorkHours]);

    // Updating in database if ther is a value
    useEffect(() => {
        // First part checks that the input is complete; no need to show error message if input hasn't been fully entered
        if (endWorkHours !== '' ) {
            localStorage.setItem("endWorkHours", endWorkHours)
        }
    }, [endWorkHours]);

    // Updates value in local storage when changed
    const handleWorkHours = (event, workHour, setWorkHours, databaseName) => {
        // Nothing to perform if the input is not complete
        if (event.target.value == '') {
            setErrorMessage('Enter a value')
            return
        } else {
            setWorkHours(event.target.value)
            localStorage.setItem(databaseName, workHour)
            setErrorMessage(null)
        }
    }

    // Storing whether working hours is 24
    const [is24WorkingHours, setIs24WorkingHours] = useState(false)

     // Checks for changes in start/end time and outputs appropriate error message if start time < end time
     useEffect(() => {
        localStorage.setItem('24HoursWorked', is24WorkingHours || startWorkHours > endWorkHours)
    }, [is24WorkingHours]);

    return (
        <div className='settings'>
            <div className='settings-items'>
                <div className='days-of-week-worked'>
                    <p>Working Day(s)</p>
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
                <br />
                <div className='working-hours'>
                    <p>Maximum Working Hours</p>
                    <div className='hours'>
                        <div>
                            <input type="time" defaultValue={startWorkHours} onChange={(event) => handleWorkHours(event, startWorkHours, setStartWorkHours, "startWorkHours")}/>
                            {""} – {""}
                            <input type="time" defaultValue={endWorkHours} onChange={(event) =>  handleWorkHours(event, endWorkHours, setEndWorkHours, "endWorkHours")}/>
                        </div>
                        {startWorkHours.slice(0,2) === endWorkHours.slice(0,2) &&
                            
                        // If start and end time are the same, a worker may work less than 1, or 24 hours
                        <div className='max-work-hours'>
                            Maximum Working Hours is 24
                            <input type="checkbox" defaultValue={endWorkHours} onChange={() => setIs24WorkingHours(!is24WorkingHours)}/>
                        </div>
                        }
                        {/* Display error message if available */}
                        { (errorMessage !== null) && 
                        <div className='error-message'> 
                            {errorMessage}
                        </div> 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}