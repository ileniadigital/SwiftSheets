// Importing CSS
import '../../Components/ConsultantView/Timesheet.css';

// Importing Components
import Week from '../../Components/ConsultantView/Week/Week';
import AddEvent from '../../Components/ConsultantView/AddEvent/AddEvent';
import { FaCirclePlus } from "react-icons/fa6";
import NoWorkingDaysError from '../../Components/ConsultantView/NoWorkingDaysError/NoWorkingDaysError'

// Importing helper function
import getDate from '../../Components/ConsultantView/getDate'

// Importing useState and useEffect
import { useState } from 'react';

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

    // Enables relevant screen to be displayed when the + button is clicked 
    const [addEventClicked, setAddEventClicked] = useState(false);


    //  Used to control timesheet submission
    const [timesheetStatus, setTimesheetStatus] = useState("Unsubmitted") // Allows timesheet to become uneditable if submitted
    const [timesheetReviewStatus, setTimesheetReviewStatus] = useState("Pending")
    const [timesheetPaymentStatus, setTimesheetPaymentStatus] = useState("Pending")

    // When add event is clicked, add event screen is shown, with the details based on the component it is called by
    const addEventHandler = (componentCaller1, addEventViewedWeek1) => {
        // Won't open the Add Event box as the timesheet is submitted
        if (timesheetStatus === "Submitted") {
            return
        }
        if (!addEventClicked) {
            setComponentCaller(componentCaller1)
            setAddEventViewedWeek(addEventViewedWeek1)
        }
        setAddEventClicked(!addEventClicked)
    }


    // Function that formats the day of the week
    const formatDate = (week, dayToRetrieve) => {
        const date = getDate(week, dayToRetrieve)

        return `${date[0]}/${date[1]}/${date[2]}`
    }

    // Testing retrieval of current timesheet
    // Store the timesheet data in local storage
    const event = {
        name: 'test',
        date: "2024-03-25",
        type: "Project",
        startTime: "17:00",
        endTime: "20:30"
    };
  
    localStorage.setItem('event', JSON.stringify(event));


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
            </div>
        </div>
    </div> 
    ) : (
        // Display error if the user has selected 0 working days
            <NoWorkingDaysError />
    )
    )
}