// Importing CSS
import '../CSS/ConsultantView/ConsultantView.css';

// Importing Components
import WeekNavigation from '../Components/ConsultantView/WeekNavigation';
import Week from '../Components/ConsultantView/Week';
import AddEventButton from '../Components/ConsultantView/AddEventButton';

// Improting state
import { useState } from 'react';

export default function ConsultantView() {

    // Enables relevant screen to be displayed when the + button is clicked 
     const [addEventClicked, setAddEventClicked] = useState(false);

     const addEventHandler = () => {
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
            <WeekNavigation/>
            <AddEventButton addEventClicked = {addEventClicked} addEventHandler = {addEventHandler} source={"no"}/>
        </div>

        {/* Displays currently viewed week, along with hours */}
        <Week addEventHandler = {addEventHandler}/>

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