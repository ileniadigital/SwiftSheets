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

// Importing useState and useEffect
import { useState, useEffect } from 'react';
import exportPdf from './exportPdf';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {fetchTimesheetsbyID} from '../../../Components/Data/TimesheetData';
import {fetchEventsByTimesheetID} from '../../../Components/Data/EventsData';

export default function Timesheet() {
    const role='linemanager' // Placeholder for user role
    const [timesheet, setTimesheet] = useState(null); 
    const [events, setEvents] = useState([]);
    const [timesheetStatus, setTimesheetStatus] = useState(''); 
    const [isSaved] = useState(false);
    const [timesheetReviewStatus, setTimesheetReviewStatus] = useState(''); 
    const [timesheetPaymentStatus, setTimesheetPaymentStatus] = useState('');
    const { timesheetId } = useParams(); 

    //Fetch the user's timesheet by ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID= 6;
                const data = await fetchTimesheetsbyID(userID);
                
                const timesheet = data.find(ts => ts.id === parseInt(timesheetId));
                setTimesheet(timesheet);
                console.log("Timesheet:", timesheet);

                const events = await fetchEventsByTimesheetID(timesheetId);
                setEvents(events);
                console.log("Events:", events);

                if (timesheet){
                    //Set timesheet status based on submission and save status
                    if (timesheet.is_submitted) {
                        setTimesheetStatus('Submitted');
                    } else {
                        if (isSaved) {
                            setTimesheetStatus('Saved');
                        } else {
                            setTimesheetStatus('Not Saved');
                        }
                    }
                    setTimesheetReviewStatus(timesheet.review_status);
                    setTimesheetPaymentStatus(timesheet.payment_status);
                    if  (timesheet.completion_reminder) {
                        setTimesheetCompletionReminder(timesheet.completion_reminder);
                        setCompletionReminderDate(timesheet.completion_reminder_date);
                        setCompletionReminderTime(timesheet.completion_reminder_time);
    
                    }
                }

            } catch (error) {
                console.error('Error fetching timesheets:', error);
            }
        };

        fetchData();
    }, [timesheetId]);

    console.log("Review:", timesheetReviewStatus);
    
    // Setting the date for the reminder
    const [completionReminderDate, setCompletionReminderDate] = useState('');
    const [completionReminderTime, setCompletionReminderTime] = useState('');
    const [timesheetCompletionReminder, setTimesheetCompletionReminder] = useState(false);
    
    // Define function to set reminder time
    const setReminderTime = (time) => {
        // Here you can set reminder time as needed
        console.log('Reminder time:', time);
    };

    // Initialize today and endOfWeek variables
    const today = new Date().toISOString().split('T')[0]; // Get current date
    const nextWeek = new Date(); // Get current date
    nextWeek.setDate(nextWeek.getDate() + 7); // Add 7 days for end of week
    const endOfWeek = nextWeek.toISOString().split('T')[0]; // Get next week's date

    // Function to check if reminder is before current time and day
    function isReminderBeforeCurrentTimeAndDay(reminderTime, reminderDate) {
        // Get current date and time
        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
        const currentTimeString = currentDate.toTimeString().split(' ')[0]; // Get current time in "HH:MM:SS" format
    
        // Concatenate reminder date and time strings in the format "YYYY-MM-DDTHH:MM:SS"
        const reminderDateTimeString = `${reminderDate}T${reminderTime}:00`;
    
        // Check if reminder date is before current date or if it's the same date but the reminder time is before current time
        if (reminderDate < currentDateString || (reminderDate === currentDateString && reminderDateTimeString < currentTimeString)) {
            return true; // Reminder is before current time and day
        } else {
            return false; // Reminder is not before current time and day
        }
    }

    // Function to format date
    //This is also in TimesheetDetails.jsx and it can definitely be called without being defined twice
    //No time to figure it out now, we got a deadline to meet
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

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

    // Function to handle revoking submission
    const handleRevokeSubmission = () => {
        axios.patch(`http://127.0.0.1:8000/timesheet/${timesheetId}/`, {
            is_submitted: false,
        })
        .then(response => {
            console.log("Success");
            // Update the timesheet status in the UI immediately
            setTimesheetStatus('Not Submitted');
        })
        .catch(error => {
            console.error('Error revoking submission:', error);
        });
    };
    return (
        localStorage.getItem('daysWorked') !== "[]" ? (
        <div className = 'consultant-view'>
            {/* Creating page header */}
            <div className='consultant-view-header'>
                <p> 
                    {timesheet && formatDate(timesheet.start_date)} – {timesheet && formatDate(timesheet.end_date)}
                </p>
                <button className='add-event-button' disabled = {timesheetStatus === "Submitted"} onClick={() => addEventHandler("Timesheet", viewedWeek)}> 
                    <FaCirclePlus /> {/* Button icon */}
                </button>
                <button className='completion-reminder' disabled = {timesheetStatus === "Submitted"} onClick={updateCompletionReminder}>
                    {timesheetCompletionReminder ? <IoIosNotifications /> : <IoIosNotificationsOff />}
                </button>
                {reminder  &&  (
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
                            {isReminderBeforeCurrentTimeAndDay(completionReminderTime, completionReminderDate) && 
                                <div className='reminder-error'>Reminder time and date must be after current date and time</div>}
                            <div className='reminder-buttons'>
                                <button className='reminder-toggle turn-off' onClick={() => {
                                    setReminder(false);
                                    setTimesheetCompletionReminder(false)
                                    setCompletionReminderDate('')
                                    setCompletionReminderTime('')}}>
                                    Turn Off
                                </button>
                                <button className='reminder-toggle' onClick={() => setReminder(false)} disabled={isReminderBeforeCurrentTimeAndDay(completionReminderTime, completionReminderDate)}>
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
                    {/* Revoke Button for line manager */}
                    {role === 'linemanager' && timesheet && timesheet.is_submitted && (
                        <button className='submit-button' onClick={handleRevokeSubmission}>
                            Revoke
                        </button>
                    )}
                    <button id='submit-button' className='submit-button' disabled={timesheet && timesheet.is_submitted} onClick={handleSubmission}>
                        {timesheet && timesheet.is_submitted ? "Submitted" : "Submit"}
                    </button>
                    <button id='save-button' className='submit-button' disabled={timesheet && timesheet.is_submitted} onClick={() => setTimesheetStatus("Saved")}>
                        Save
                    </button>
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