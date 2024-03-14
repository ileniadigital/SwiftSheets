// Importing CSS
import '../CSS/ConsultantView/ConsultantView.css';

// Importing Components
import WeekNavigation from '../Components/ConsultantView/WeekNavigation';
import WeekDay from '../Components/ConsultantView/WeekDay';
import AddEventButton from '../Components/ConsultantView/AddEventButton';
import AddEvent from '../Components/ConsultantView/AddEvent';
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
        <div id = 'weekContainer'>
            <DailyHours/>
            <WeekDay day='MON' addEventHandler={addEventHandler}/>
            <WeekDay day='TUE'addEventHandler={addEventHandler}/>
            <WeekDay day='WED' addEventHandler={addEventHandler}/>
            <WeekDay day='THU' addEventHandler={addEventHandler}/>
            <WeekDay day='FRI' addEventHandler={addEventHandler}/>
            <WeekDay day='SAT' addEventHandler={addEventHandler}/>
            <WeekDay day='SUN' addEventHandler={addEventHandler}/>
        </div>
        <div id='statusContainer'>
            <p>Status {submissionStatus ? 'Submitted' : 'Unsubmitted'}</p>
            {/* change to button? */}
            <p>Review Status</p>
            <p>Payment Status </p>
            <button className='submitButton' onClick={() => setSubmissionStatus(true)} disabled={submissionStatus === true}>Submit</button>
        </div>
    </div> 
    )
}