// Importing component
import Reminder from "./Reminder";

// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState/Effect
import { useState, useEffect } from "react";

// Importing helper function
import getDate from "../getDate";

// Function provides manual timesheet completion reminder
export default function ManualCompletionReminder() {

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
  
    // Setting timesheet completion reminder
    const [timesheetCompletionReminder, setTimesheetCompletionReminder] = useState(localStorage.getItem('timesheetCompletionReminder') || 
    localStorage.setItem('timesheetCompletionReminder', completionReminderDate !== '' && completionReminderTime !== ''));

    // Setting reminder message and whether it should be shown
    const [reminder, setReminder] = useState(false)
    const [reminderMessage, setReminderMessage] = useState('')

    // Updating local storage values on change
    useEffect(() => {
        setTimesheetCompletionReminder(completionReminderDate !== '' && completionReminderTime !== '');
        localStorage.setItem('completionReminderDate', completionReminderDate);
        localStorage.setItem('completionReminderTime', completionReminderTime);
        localStorage.setItem('timesheetCompletionReminder', completionReminderDate !== '' && completionReminderTime !== '');
    }, [completionReminderDate, completionReminderTime]);

    // Provides timesheet completion to reminder if set up
    useEffect(() => {
      let timeoutId;
      if (timesheetCompletionReminder) {
        // Function to trigger the alert
        function timesheetCompletionReminderStart(completionReminderTimeHours, completionReminderTimeMins) {
            const completionReminderDate1 = new Date(completionReminderDate)
            
            // Time difference calculated to delay time between now and the timesheet completion reminder
            const timeDifference = new Date(completionReminderDate1.getFullYear(), 
            completionReminderDate1.getMonth(), completionReminderDate1.getDate(), completionReminderTimeHours, completionReminderTimeMins).getTime() 
            - new Date().getTime();

            if (timeDifference > 0) {
                timeoutId = setTimeout(function() {
                  // Refresh completion reminder time
                  setCompletionReminderTime('')
                  setReminder(true)
                  setReminderMessage("Don't forget to complete your timesheet!")
                }, timeDifference);
            } 
        }
        const completionReminderTimeHours = parseInt(completionReminderTime.slice(0,2))
        const completionReminderTimeMins = parseInt(completionReminderTime.slice(3,5))
        
        // Setting reminder so works no matter what page consultant is on
        timesheetCompletionReminderStart(completionReminderTimeHours, completionReminderTimeMins);

        // Clear timeout when component unmounts or reminder turns off; prevents same timeout displaying multiple times
        return () => clearTimeout(timeoutId);
    }}, [timesheetCompletionReminder, completionReminderDate, completionReminderTime])

    return (
        <div className='reminder-container'>
                        <div className='reminder-setting'>
                            <button onClick={() => setReminder(false)}>
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
                                    setReminder(false);
                                    setTimesheetCompletionReminder(false)
                                    setCompletionReminderDate('')
                                    setCompletionReminderTime('')}}>
                                    Turn Off
                                </button>
                                <button className='reminder-toggle done' onClick={() => setReminder(false)}>
                                    Done
                                </button>
                            </div>
                        </div>
            {reminder && <Reminder message={reminderMessage} setReminder={setReminder}/>}
                    </div>
    )
}