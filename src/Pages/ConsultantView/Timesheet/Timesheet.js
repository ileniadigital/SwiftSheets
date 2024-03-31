// Importing CSS
import './Timesheet.css';

// Importing Components
import Week from '../../../Components/ConsultantView/Week/Week';
import AddEvent from '../../../Components/ConsultantView/AddEvent/AddEvent';
import NoWorkingDaysError from '../../../Components/ConsultantView/NoWorkingDaysError/NoWorkingDaysError'

// Importing icons
import { IoIosNotifications } from "react-icons/io";
import { IoIosNotificationsOff } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

// Importing helper function
import getDate from '../../../Components/ConsultantView/getDate'

// Importing useState and useEffect
import { useState, useEffect } from 'react';
import exportPdf from './exportPdf';

export default function Timesheet({completionReminderDate, setCompletionReminderDate, completionReminderTime, setCompletionReminderTime, timesheetCompletionReminder, setTimesheetCompletionReminder}) {

    // Getting current timesheet
    // let currentTimesheet = TimeshgetCurrentTimesheet()

    // Used to create and manage the week shown on the timesheet
    const [viewedWeek, setViewedWeek] = useState(new Date());

    /* Created to keep track of the component that has called the addEvent Component
       If the caller was the Hours component, the date for the add event input can be
       predefined as hours fall within a particular day. If the Timesheet 
       Component called AddEvent, this input field will not be prefilled as it is a 
       general + icon that will be clicked, with no way of identifying the date of the
       event*/

    const [componentCaller, setComponentCaller] = useState(null)

    const [addEventViewedWeek, setAddEventViewedWeek] = useState(null)
    const [event, setEvent] = useState(null)

    // Enables relevant screen to be displayed when the + button is clicked 
    const [addEventClicked, setAddEventClicked] = useState(false);


    //  Used to control timesheet submission
    const [timesheetStatus, setTimesheetStatus] = useState("Unsubmitted") // Allows timesheet to become uneditable if submitted
    const [timesheetReviewStatus, setTimesheetReviewStatus] = useState("Pending")
    const [timesheetPaymentStatus, setTimesheetPaymentStatus] = useState("Pending")

    // When add event is clicked, add event screen is shown, with the details based on the component it is called by
    const addEventHandler = (componentCaller1, addEventViewedWeek1, event) => {
        // Won't open the Add Event box as the timesheet is submitted
        if (timesheetStatus === "Submitted") {
            return
        }
        if (!addEventClicked) {
            setComponentCaller(componentCaller1)
            setAddEventViewedWeek(addEventViewedWeek1)
            setEvent(event)
        }
        setAddEventClicked(!addEventClicked)
    }

    // Function that formats the day of the week
    const formatDate = (week, dayToRetrieve) => {
        const date = getDate(week, dayToRetrieve)
        return `${date[0]}/${date[1]}/${date[2]}`
    }


    // Store whether timesheet completion reminder has been set
    const [reminder, setReminder] = useState(false);


    const updateCompletionReminder = () => {
        setReminder(true)
    }

    // Storing today's date so it can be the minimum for the timesheet completion reminder
    let today = `${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`

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
    
    let startOfWeek, startOfWeekDay, startOfWeekMonth, startOfWeekYear;
    let endOfWeek, endOfWeekDay, endOfWeekMonth, endOfWeekYear;
    // Determining date for start of week
    startOfWeek = new Date(viewedWeek); // Creates copy of current week
    startOfWeek.setDate(viewedWeek.getDate() - viewedWeek.getDay() + 1)  // Adds 1 as function starts from Sunday (0 indexed)

    startOfWeekDay = startOfWeek.getDate().toString().padStart(2, '0');
    startOfWeekMonth = (startOfWeek.getMonth() + 1).toString().padStart(2,'0'); // + 1 due to 0 indexing
    startOfWeekYear = startOfWeek.getFullYear();

   // Converting into format for minimum date value
   startOfWeek = `${startOfWeekYear}-${startOfWeekMonth}-${startOfWeekDay}`

   // Determinining date for end of week
   endOfWeek = new Date(startOfWeek); // Creates copy of current week
   endOfWeek.setDate(endOfWeek.getDate() + 6) // Retrives end of week by adding 6
   
    endOfWeekDay = endOfWeek.getDate().toString().padStart(2, '0');
    endOfWeekMonth = (endOfWeek.getMonth() + 1).toString().padStart(2,'0'); // + 1 due to 0 indexing
    endOfWeekYear = endOfWeek.getFullYear();

   // Converting into format for maximum date value
   endOfWeek = `${endOfWeekYear}-${endOfWeekMonth}-${endOfWeekDay}`

   let recurringEvents;

   //  Initialising recurring events
   if (!localStorage.getItem('recurringEvents')) {
    localStorage.setItem('recurringEvents', {})
   }
   recurringEvents = localStorage.getItem('recurringEvents')


    return (
        localStorage.getItem('daysWorked') !== "[]" ? (
        <div className = 'consultant-view'>
            {/* Creating page header */}
            <div className='consultant-view-header'>
                <p> 
                    {formatDate(viewedWeek, 1)} – {formatDate(viewedWeek, 7)}
                </p>
                <button className='add-event-button' disabled = {timesheetStatus === "Submitted"} onClick={() => addEventHandler("Timesheet", viewedWeek)}> 
                    <FaCirclePlus /> {/* Button icon */}
                </button>
                <button className='completion-reminder' onClick={updateCompletionReminder}>
                    {timesheetCompletionReminder ? <IoIosNotifications /> : <IoIosNotificationsOff />}
                </button>
                {reminder && (
                    <div className='reminder-container'>
                        <div className='reminder-setting'>
                            <button onClick={() => setReminder(false)}>
                                <IoClose />
                            </button>
                            <p>
                                Timesheet Completion Reminder
                            </p>
                            
                            <div className='inputs'>
                                <input type="time" value={completionReminderTime}
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
                                <button className='reminder-toggle' onClick={() => setReminder(false)}>
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Displays currently viewed week, along with hours */}
            <Week viewedWeek = {viewedWeek} addEventHandler = {addEventHandler} timesheetStatus = {timesheetStatus}/>

            {/* Shows add event screen, with the arguments based on the component that called the method 
                Only allows logging events if timesheet has not been submitted */}
            {addEventClicked && timesheetStatus !== "Submitted" && (
                    <AddEvent
                        componentCaller={componentCaller}
                        addEventHandler={addEventHandler} 
                        viewedWeek={addEventViewedWeek}
                        event={event}
                    />
                )}

            {/* Used to display the different statuses of the timesheet */}
            <div className='status-container'>
                <div className='centered'>
                    <p>Status <span className={"status " + timesheetStatus.toLowerCase()}>{timesheetStatus}</span></p>
                    <p>Review Status <span className={"status " + timesheetReviewStatus.toLowerCase()}>{timesheetReviewStatus}</span></p>
                    <p>Payment Status <span className={"status " + timesheetPaymentStatus.toLowerCase()}>{timesheetPaymentStatus}</span></p>
                </div>
                <div className='buttons'>
                    <button className='submit-button' onClick={() => setTimesheetStatus("Submitted")} disabled = {timesheetStatus === "Submitted"} >{timesheetStatus === "Submitted" ? "Submitted" : "Submit"}</button>
                    <button className='submit-button' onClick={() => setTimesheetStatus("Saved")} disabled = {timesheetStatus === "Submitted"}>Save</button>
                    <button className='submit-button' onClick={() => exportPdf(document.querySelector('body'))}>Export as PDF</button>
                </div>
            </div>
        </div> 
        ) : (
            // Display error if the user has selected 0 working days
                <NoWorkingDaysError />
        )
    )
}