// Importing helper function
import getDate from "../getDate";

// Importing component
import Reminder from "./Reminder";

// Importing useState
import { useState } from "react";

// Function provides timesheet completion reminder on Sunday if the timesheet is unsubmitted
export default function CompletionReminder() {

    // Setting reminder message and whether it should be shown
    const [reminder, setReminder] = useState(false)
    const [reminderMessage, setReminderMessage] = useState('')

    // Dummy data - delete
    const timesheetData = {
        week: "25/03/24 – 31/03/24",
        submissionStatus: "Unsubmitted",
        reviewStatus: "Approved",
        paymentStatus: "Pending",
        isSubmitted: false,
        submissionTime: null,
        events: {
            event1: {
                startTime: '13:00',
                endTime: '15:00',
            },
            event2: {
                startTime: '13:00',
                endTime: '15:00',
            },
            event3: {
                startTime: '13:24',
                endTime: '15:36',
            },
            event4: {
                startTime: '13:00',
                endTime: '15:00',
            },
            event5: {
                startTime: '13:00',
                endTime: '15:00',
            },
            event6: {
                startTime: '13:00',
                endTime: '15:00',
            },
            event7: {
                startTime: '13:00',
                endTime: '11:00',
            },
        }
    };

    localStorage.setItem('currentTimesheet', JSON.stringify(timesheetData));
    const currentTimesheet = JSON.parse(localStorage.getItem('currentTimesheet'))


    // Set reminder for consultant to submit timesheet on Sunday whenever they open the app

    // Edit this so it doesnt use localstorage but checks a reminderSent attribute of a timesheet
    if (new Date().getDay() === 0 && localStorage.getItem('reminderSent') !== 'true') {
        const time = new Date()
        time.setSeconds(new Date().getSeconds()+1)
        const submissionReminderTime = time.getTime() - new Date().getTime(); // Remind consultant when they open the app
        
        if (submissionReminderTime > 0) {
        const timeoutId = setTimeout(function() {
                if (!currentTimesheet.isSubmitted) {
                    setReminder(true)
                    setReminderMessage("Don't forget to complete your timesheet!")
                    localStorage.setItem('reminderSent', 'true')
                }
            }, submissionReminderTime);
            return () => clearTimeout(timeoutId);

        } 
    }

    // Finding end of week
    let endOfWeek1 = getDate(new Date(), 7)

    // Setting reminder for Sunday 00:00
    let endOfWeekReminder = new Date(`${endOfWeek1[2]}-${endOfWeek1[1]}-${endOfWeek1[0]}`)

    // Setting automatic submission for end of week 23:59:59
    let automaticSubmissionTime = new Date(endOfWeekReminder)
    automaticSubmissionTime.setHours(23);
    automaticSubmissionTime.setMinutes(59);
    automaticSubmissionTime.setSeconds(59);

    const autoSubmit = automaticSubmissionTime.getTime() - new Date().getTime();

    if (autoSubmit > 0) {
        const timeoutId = setTimeout(function() {
        const numberOfEvents = Object.keys(JSON.parse(localStorage.getItem('events'))).length
            if (numberOfEvents !== 0 && !currentTimesheet.isSubmitted) {
                const timesheetSubmissionDateandTime = new Date() // Storing date and time of timesehet submission
                // setTimesheetStatus('Submitted') // Update value in database
                setReminder(true)
                setReminderMessage("Timesheet Submitted!")
            }
        }, autoSubmit)
        clearTimeout(timeoutId)
    } 
    
    return (
        <div>
            {reminder && <Reminder message={reminderMessage} setReminder={setReminder}/>}
        </div>
    )
}