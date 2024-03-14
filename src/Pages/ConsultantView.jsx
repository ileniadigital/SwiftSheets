// Importing CSS
import '../CSS/ConsultantView/ConsultantView.css';

// Importing Components
import WeekNavigation from '../Components/ConsultantView/WeekNavigation';
import Week from '../Components/ConsultantView/Week';
import AddEventButton from '../Components/ConsultantView/AddEventButton';
import DailyHours from '../Components/ConsultantView/DailyHours';

import { useState } from 'react';

export default function ConsultantView() {

     /* Enables relevant screen to be displayed when the + button is clicked */
     const [addEventClicked, setAddEventClicked] = useState(false);

     const addEventHandler = () => {
         setAddEventClicked(!addEventClicked)
     }

    const [submissionStatus, setSubmissionStatus] = useState(false)

    return(
    <div id = 'consultantView'>
        <div className='consultantViewContainer'>
            <WeekNavigation/>
            <AddEventButton addEventClicked = {addEventClicked} addEventHandler = {addEventHandler}/>
        </div>
        <div id = 'timesheet'>
            <DailyHours/>
            <Week addEventHandler = {addEventHandler}/>
        </div>
        <div id='statusContainer'>
            <p>Status {submissionStatus ? 'Submitted' : 'Unsubmitted'}</p>
            <p>Review Status</p>
            <p>Payment Status </p>
            <button className='submitButton' onClick={() => setSubmissionStatus(true)} disabled={submissionStatus === true}>Submit</button>
        </div>
    </div> 
    )
}