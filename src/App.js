// Import stylesheets
import './Components/general.css';

// Import components 
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/Settings';
import ConsultantHome from './Pages/ConsultantView/ConsultantHome/ConsultantHome'
import Timesheet from './Pages/ConsultantView/Timesheet/Timesheet';
import ConsultantDashboard from './Pages/ConsultantView/ConsultantDashboard/ConsultantDashboard';
import Home from './Pages/Home';
import Name from './Components/NavBar/Name';
import ConsultantSettings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import TimesheetListView from './Pages/TimesheetListView';

import { useState, useEffect } from 'react';
//ADD ROUTING BASED ON ROLE FROM DB
const role='consultant';

// Main App component
export default function App() {

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
  const [timesheetCompletionReminder, setTimesheetCompletionReminder] = useState(completionReminderDate !== '' && completionReminderTime !== '');

  // Updating local storage values on change
  useEffect(() => {
        setTimesheetCompletionReminder(completionReminderDate !== '' && completionReminderTime !== '');
        localStorage.setItem('completionReminderDate', completionReminderDate);
        localStorage.setItem('completionReminderTime', completionReminderTime);
    }, [completionReminderDate, completionReminderTime]);

  // Provides timesheet completion to reminder if set up
  useEffect(() => {
    let timeoutId;
    if (timesheetCompletionReminder && role === 'consultant') {
            // Function to trigger the alert
            function timesheetCompletionReminderStart(completionReminderTimeHours, completionReminderTimeMins) {
                const completionReminderDate1 = new Date(completionReminderDate)
                
                // Time difference calculated to delay time between now and the timesheet completion reminder
                const timeDifference = new Date(completionReminderDate1.getFullYear(), 
                completionReminderDate1.getMonth(), completionReminderDate1.getDate(), completionReminderTimeHours, completionReminderTimeMins).getTime() 
                - new Date().getTime();

                if (timeDifference > 0) {
                    timeoutId = setTimeout(function() {
                        alert("Don't forget to complete your timesheet!");
                        // Refresh completion reminder time/date
                        setCompletionReminderDate('')
                        setCompletionReminderTime('')
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

  // Render page based on location
  let page
  switch (window.location.pathname) {
    // default:
    //   page= <LogIn/>
    //   break
    case "/Home":
    case "/":
      page= <Home view={role}/>
      break
    case "/Account":
      page= <Account/>
      break
    case "/Settings":
      page= <Settings/>
      break
    case "/consultanthome":
      page = <ConsultantHome/>
      break
    case "/timesheet":
      page = <Timesheet
      completionReminderDate={completionReminderDate}
      setCompletionReminderDate = {setCompletionReminderDate} 
      completionReminderTime={completionReminderTime}
      setCompletionReminderTime={setCompletionReminderTime}
      timesheetCompletionReminder = {timesheetCompletionReminder}
      setTimesheetCompletionReminder={setTimesheetCompletionReminder}
      />
      break
    case "/consultantdashboard":
      page = <ConsultantDashboard/>
      break
    case "/linemanagerview":
      page = <TimesheetListView/>
      break
    case "/financeteamview":
      page = <TimesheetListView/>
      break
    case "/consultantsettings":
      page = <ConsultantSettings/>
      break
  }

  return (
    <>
        <NavBar view={role}/>
        <Name/>
        {page}
    </>
  )
}