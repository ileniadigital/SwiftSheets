// Importing CSS
import '../Components/ConsultantView/ConsultantView.css';

// Importing Components
import WeekNavigation from '../Components/ConsultantView/WeekNavigation/WeekNavigation';
import Week from '../Components/ConsultantView/Week/Week';
import AddEvent from '../Components/ConsultantView/AddEvent/AddEvent';
import { FaCirclePlus } from "react-icons/fa6";

// Importing useState and useEffect
import { useState, useEffect } from 'react';

export default function ConsultantView() {

    // Used to create and manage the week shown on the timesheet
    const [viewedWeek, setViewedWeek] = useState(new Date());
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

    //  Used to control submission
    const [timesheetStatus, setTimesheetStatus] = useState("Unsubmitted")
    const [timesheetReviewStatus, setTimesheetReviewStatus] = useState("Pending")
    const [timesheetPaymentStatus, setTimesheetPaymentStatus] = useState("Pending")

    return(
    <div id = 'consultantView'>

        {/* Creating page header */}
        <div id='consultantViewHeader'>
            <WeekNavigation viewedWeek={viewedWeek} setViewedWeek={setViewedWeek}/>
            <FaCirclePlus className='addEventButton' onClick={() => addEventHandler("ConsultantView", viewedWeek)}/>
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
        <div id='statusContainer'>
            <div className='centered'>
                <p>Status <span className={"status " + timesheetStatus.toLowerCase()}>{timesheetStatus}</span></p>
                <p>Review Status <span className={"status " + timesheetReviewStatus.toLowerCase()}>{timesheetReviewStatus}</span></p>
                <p>Payment Status <span className={"status " + timesheetPaymentStatus.toLowerCase()}>{timesheetPaymentStatus}</span></p>
            </div>
            <div className='buttons'>
                <button className='submitButton' onClick={() => setTimesheetStatus("Submitted")} disabled = {timesheetStatus === "Submitted"} >{timesheetStatus === "Submitted" ? "Submitted" : "Submit"}</button>
                <button className='submitButton' onClick={() => setTimesheetStatus("Saved")} disabled = {timesheetStatus === "Submitted"}>Save</button>
            </div>
        </div>
    </div> 
    )
}