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
import getDate from '../../../Components/ConsultantView/getDate';

import ReactDOM from 'react-dom';
import { fetchTimesheet } from '../../../Components/Data/TimesheetData';

// Importing useState and useEffect
import { useState, useEffect } from 'react';
import exportPdf from './exportPdf';
import { useParams } from 'next/navigation';

export default function Timesheet({completionReminderDate, setCompletionReminderDate, completionReminderTime, setCompletionReminderTime, timesheetCompletionReminder, setTimesheetCompletionReminder}) {
    let {timesheetId}= useParams();
    const [timesheet, setTimesheet] = useState(null);

    useEffect(() => {
        const fetchOpenTimesheet = async () => {
            try {
                const timesheetData = await fetchTimesheet(timesheetId);
                setTimesheet(timesheetData);
            } catch (error) {
                console.error('Error fetching timesheet:', error);
            }
        };
        fetchOpenTimesheet();
    }, [timesheetId]);

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
    
    // Determinining date for start of week
    const startDate = getDate(viewedWeek, 1)
    // Converting into format for minimum date value
    let startOfWeek = `${startDate[0]}/${startDate[1]}/${startDate[2]}`

    // Determinining date for end of week
    const endDate = getDate(viewedWeek, 7)
    // Converting into format for maximum date value
    let endOfWeek = `${endDate[0]}/${endDate[1]}/${endDate[2]}`

   //  Initialising recurring events
   if (!localStorage.getItem('recurringEvents')) {
    localStorage.setItem('recurringEvents', JSON.stringify({}))
   }

   const [emptyTimesheetError, setEmptyTimesheetError] = useState(false)
    // Function that handles timesheet submission
    const handleSubmission = () => {
        // Include iteration that checks the length of the events; if theres more than 1 the timesheet can be submitted
        const numberOfEvents = Object.keys(JSON.parse(localStorage.getItem('events'))).length > 0
        if (numberOfEvents > 0 ) {
            // Storing date and time of timesehet submission
            const timesheetSubmissionDateandTime = new Date() 
            setTimesheetStatus('Submitted')
        } else {
            setEmptyTimesheetError(true)
        }
    }

    return (
        localStorage.getItem('daysWorked') !== "[]" ? (
        <div className = 'consultant-view'>
            {/* Creating page header */}
            <div className='consultant-view-header'>
                <p> 
                    {startOfWeek} – {endOfWeek}
                </p>
                <h1>ID: {timesheetId}</h1>
                <button className='add-event-button' disabled = {timesheetStatus === "Submitted"} onClick={() => addEventHandler("Timesheet", viewedWeek)}> 
                    <FaCirclePlus /> {/* Button icon */}
                </button>
                <button className='completion-reminder' disabled = {timesheetStatus === "Submitted"} onClick={updateCompletionReminder}>
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
                    <button className='submit-button' onClick={handleSubmission} disabled = {timesheetStatus === "Submitted"} >{timesheetStatus === "Submitted" ? "Submitted" : "Submit"}</button>
                    <button className='submit-button' onClick={() => setTimesheetStatus("Saved")} disabled = {timesheetStatus === "Submitted"}>Save</button>
                    <button className='submit-button' onClick={() => exportPdf(document.querySelector('body'))}>PDF Export</button>
                </div>
            </div>

            {/* Display error if user attempts to submit empty timesheet */}
            {emptyTimesheetError && 
            <div className='empty-error-container'>
                <div className='empty-error'>
                    <button>
                        <IoClose onClick={() => setEmptyTimesheetError(false)}/>
                    </button>
                    <p>You cannot submit an empty timesheet</p>
                </div>
            </div>}
        </div> 
        ) : (
            // Display error if the user has selected 0 working days
                <NoWorkingDaysError />
        )
    )
}