// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState/Effect
import { useState, useEffect } from "react";

// Importing helper function
import getDate from "../getDate";

// Function provides manual timesheet completion reminder
export default function ManualCompletionReminder({open, setOpen}) {

    // Storing today's date so it can be the minimum for the timesheet completion reminder
    let today = `${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`

    // Determinining date for end of week
    const endDate = getDate(new Date(), 7)

    // Converting into format for maximum date value
    let endOfWeek = `${endDate[0]}/${endDate[1]}/${endDate[2]}`

    // Alert only works when time is at least 2 minutes ahead
    let currentTime = new Date()
    currentTime.setMinutes(currentTime.getMinutes()+1)
    currentTime = currentTime.toTimeString().slice(0,5)
    
    const [reminderError, setReminderError] = useState(false)
    const [reminderTime, setReminderTime] = useState('')
    
    // State to manage completion reminder
    const [completionReminderDate, setCompletionReminderDate] = useState(() => {
        let date = localStorage.getItem('completionReminderDate');
        if (date === null) {
        localStorage.setItem('completionReminderDate', '')
        date = ''
        }
        return date;
    });

    const [completionReminderTime, setCompletionReminderTime] = useState(() => {
        let time = localStorage.getItem('completionReminderTime');
        if (time === null) {
            localStorage.setItem('completionReminderTime', '')
            time = ''
        }
        return time;
    });

    useEffect(() => {
        if (completionReminderTime !== '' && completionReminderDate !== '') {
            const currentTimeHours = parseInt(currentTime.slice(0,2))
            const currentTimeMins = parseInt(currentTime.slice(3,5))
            const inputHours = parseInt(completionReminderTime.slice(0,2))
            const inputMins = parseInt(completionReminderTime.slice(3,5))

            // Ensures input is within valid range
            if (completionReminderDate === today) {
                if (inputHours < currentTimeHours) {
                    setReminderError(true)
                } else if (inputHours === currentTimeHours) {
                    if (inputMins < currentTimeMins) {
                        setReminderError(true)
                    } else {
                        setReminderError(false)
                    }
                } else {
                    setReminderError(false)
                }
            } else {
                setReminderError(false)
            }
        }
    }, [completionReminderTime, completionReminderDate])

    
  
    // Setting timesheet completion reminder
    const [timesheetCompletionReminder, setTimesheetCompletionReminder] = useState(localStorage.getItem('timesheetCompletionReminder') || 
    localStorage.setItem('timesheetCompletionReminder', completionReminderDate !== '' && completionReminderTime !== ''));

    // Updating local storage values on change
    useEffect(() => {
        setTimesheetCompletionReminder(completionReminderDate !== '' && completionReminderTime !== '');
        localStorage.setItem('completionReminderDate', completionReminderDate);
        localStorage.setItem('completionReminderTime', completionReminderTime);
        localStorage.setItem('timesheetCompletionReminder', completionReminderDate !== '' && completionReminderTime !== '');
    }, [completionReminderDate, completionReminderTime]);

    return (
        <>
        {open && 
        <div className='reminder-container'>
            <div className='reminder-setting'>
                <button onClick={() => setOpen(false)}>
                    <IoClose />
                </button>
                <p>
                    Timesheet Completion Reminder
                </p>
                
                <div className='inputs'>
                    <input className="time" type="time" value={completionReminderTime}
                    onChange={(event) => {
                        setReminderTime(event.target.value);
                        setCompletionReminderTime(event.target.value)}}/>
                        
                    <input type="date" className='datetime' value={completionReminderDate} name = "eventDate" min={today} max={endOfWeek} 
                    onChange={(event) => setCompletionReminderDate(event.target.value)}/>
                </div>
                {reminderError && <div className='reminder-error'>Time must be at least {currentTime}</div>}
                <div className='reminder-buttons'>
                    <button className='reminder-toggle turn-off' onClick={() => {
                        setOpen(false);
                        setTimesheetCompletionReminder(false)
                        localStorage.setItem('timesheetCompletionReminder', 'false')
                        setCompletionReminderDate('')
                        setCompletionReminderTime('')}}>
                        Turn Off
                    </button>
                    <button className='reminder-toggle done' onClick={() => setOpen(false)}>
                        Done
                    </button>
                </div>
            </div>
        </div>
        }
    </>
    )
}