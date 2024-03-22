// Importing CSS
import '../Components/ConsultantView/ConsultantView.css';

// Importing Components
import Week from '../Components/ConsultantView/Week/Week';
import AddEvent from '../Components/ConsultantView/AddEvent/AddEvent';
import { FaCirclePlus } from "react-icons/fa6";

// Importing useState and useEffect
import { useState, useEffect } from 'react';

export default function ConsultantView() {

    // Used to create and manage the week shown on the timesheet
    const [viewedWeek, setViewedWeek] = useState(new Date());

    /* Created to keep track of the component thath has called the addEvent Component
       If the caller was the Hours component, the date for the add event input can be
       predefined as hours fall within a particular day. If the ConsultantView 
       Component called AddEvent, this input field will not be prefilled as it is a 
       general + icon that will be clicked, with no way of identifying the date of the
       event*/

    const [componentCaller, setComponentCaller] = useState(null)

    const [addEventViewedWeek, setAddEventViewedWeek] = useState(null)

    // Enables relevant screen to be displayed when the + button is clicked 
    const [addEventClicked, setAddEventClicked] = useState(false);

    // When add event is clicked, add event screen is shown, with the details based on the component it is called by
    const addEventHandler = (componentCaller1, addEventViewedWeek1) => {
        if (!addEventClicked) {
            setComponentCaller(componentCaller1)
            setAddEventViewedWeek(addEventViewedWeek1)
        }
        setAddEventClicked(!addEventClicked)
    }

    //  Used to control timesheet submission
    const [timesheetStatus, setTimesheetStatus] = useState("Unsubmitted")
    const [timesheetReviewStatus, setTimesheetReviewStatus] = useState("Pending")
    const [timesheetPaymentStatus, setTimesheetPaymentStatus] = useState("Pending")

    // Retrieve week
    // Function that retrieves the first day of the week (assumed to be monday)
    const getWeekDay = (currentWeek, dayToRetrieve) => { 
        let weekDay = new Date(currentWeek); // Creates copy of current week

        /* Subtracts curent day of week to get 'Sunday' (start of the week)
           Adds daysToRetrrieve to get the target day */
           weekDay.setDate(weekDay.getDate() - weekDay.getDay() + dayToRetrieve) 
        
        /* Series of function calls to return the date in the desired format  
           .padStart() used to add leading zeroes to the day & month */

        let day = weekDay.getDate().toString().padStart(2, '0');
        let month = (weekDay.getMonth() + 1).toString().padStart(2,'0'); // + 1 due to 0 indexing
        let year = weekDay.getFullYear();

        let formattedDate = `${day}/${month}/${year}`
        return formattedDate 
    }

    return(
    <div className = 'consultant-view'>
        {/* Creating page header */}
        <div className='consultant-view-header'>
            <p>{getWeekDay(viewedWeek, 1)} – {getWeekDay(viewedWeek, 7)}</p>
            <FaCirclePlus className='add-event-button' onClick={() => addEventHandler("ConsultantView", viewedWeek)}/>
        </div>

        {/* Displays currently viewed week, along with hours */}
        <Week viewedWeek = {viewedWeek} addEventHandler = {addEventHandler}/>

        {/* Shows add event screen, with the arguments based on the component that called the method */}
        {addEventClicked && (
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
    )
}