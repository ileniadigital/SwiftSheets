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

// Importing helper
import getDate from '../../../Components/ConsultantView/getDate';

// Importing useState and useEffect
import { useEffect, useState } from 'react';
import exportPdf from './exportPdf';
import ManualCompletionReminder from '../../../Components/ConsultantView/Reminder/ManualCompletionReminder';

export default function Timesheet() {

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

    const [reminder, setReminder] = useState(false);

    const updateCompletionReminder = () => {
        setReminder(true)
    }

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

    const [reminderSet, setReminderSet] = useState(
        (localStorage.getItem('timesheetCompletionReminder') && 
    localStorage.getItem('timesheetCompletionReminder') === 'true' ? true : false )|| false)

    useEffect(() => {
        setReminderSet(
        localStorage.getItem('timesheetCompletionReminder') === 'true' ? true : false 
        )
    }, [localStorage.getItem('timesheetCompletionReminder')])

    return (
        localStorage.getItem('daysWorked') !== "[]" ? (
        <div className = 'consultant-view'>
            {/* Creating page header */}
            <div className='consultant-view-header'>
                <p> 
                    {startOfWeek} – {endOfWeek}
                </p>
                <button className='add-event-button' disabled = {timesheetStatus === "Submitted"} onClick={() => addEventHandler("Timesheet", viewedWeek)}> 
                    <FaCirclePlus /> {/* Button icon */}
                </button>
                <button className='completion-reminder' disabled = {timesheetStatus === "Submitted"} onClick={updateCompletionReminder}>
                    {reminderSet ? <IoIosNotifications /> : <IoIosNotificationsOff />}
                </button>
                {reminder && <ManualCompletionReminder open = {reminder} setOpen={setReminder}/>}
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
                    <button className='submit-button' onClick={() => exportPdf()}>Export PDF</button>
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