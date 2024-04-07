// Importing component
import Reminder from "./Reminder";

// Importing useState/Effect
import { useState, useEffect } from "react";

// Returns reminder
export default function StartReminder() {
    const [reminder, setReminder] = useState(false)

    // Provides timesheet completion to reminder if set up
    useEffect(() => {
        let timeoutId;
        if (localStorage.getItem('timesheetCompletionReminder') && localStorage.getItem('timesheetCompletionReminder') === 'true') {
          // Function to trigger the alert
          function timesheetCompletionReminderStart(completionReminderTimeHours, completionReminderTimeMins) {
              const completionReminderDate1 = new Date(localStorage.getItem('completionReminderDate'))
              // Time difference calculated to delay time between now and the timesheet completion reminder
              const timeDifference = new Date(completionReminderDate1.getFullYear(), 
              completionReminderDate1.getMonth(), completionReminderDate1.getDate(), completionReminderTimeHours, completionReminderTimeMins).getTime() 
              - new Date().getTime();
  
              if (timeDifference > 0) {
                  timeoutId = setTimeout(function() {
                        // Refresh completion reminder time
                        localStorage.setItem('completionReminderTime', '')
                        setReminder(true)
                  }, timeDifference);
              } 
          }
          const completionReminderTimeHours = parseInt(localStorage.getItem('completionReminderTime').slice(0,2))
          const completionReminderTimeMins = parseInt(localStorage.getItem('completionReminderTime').slice(3,5))
          // Setting reminder so works no matter what page consultant is on
          timesheetCompletionReminderStart(completionReminderTimeHours, completionReminderTimeMins);
  
          // Clear timeout when component unmounts or reminder turns off; prevents same timeout displaying multiple times
          return () => clearTimeout(timeoutId);
      }}, [localStorage.getItem('timesheetCompletionReminder'), localStorage.getItem('completionReminderDate'), localStorage.getItem('completionReminderTime')])

      return (
        <>
            {reminder && <Reminder message={"Don't forget to complete your timesheet!"} setReminder={setReminder}/>}
        </>
      )
}