// Importing CSS
import '../CSS/consultantView.css';

// Importing Icons
import previousWeekIcon from '../images/consultantView/previousWeekIcon.svg';
import nextWeekIcon from '../images/consultantView/nextWeekIcon.svg';
import addEventIcon from '../images/consultantView/addEventIcon.svg';

// Importing Components
import WeekDay from '../Components/ConsultantView/WeekDay';
import AddEvent from '../Components/ConsultantView/AddEvent';
import DailyHours from '../Components/ConsultantView/DailyHours';

import { useState } from 'react';

export default function ConsultantView() {

    // Function that retrieves the first day of the week (assumed to be monday)
    function getWeekDay(currentWeek, dayToRetrieve)
    {
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

    /* Storing the state of the viewed week, allows users to alternate between them */
    const currentWeek = new Date()
    const [viewedWeek, setViewedWeek] = useState(new Date());

    /* Function that shows timesheets of the previous week */
    const changeWeekPrevious = () => {
        /* Create a temporary variable to store the date a week before*/
        const newViewedWeek = new Date(viewedWeek);
        newViewedWeek.setDate(viewedWeek.getDate() - 7)
        setViewedWeek(newViewedWeek)
    }

    /* Function that shows timesheets of the next week */
    const changeWeekNext = () => {
        // if (currentWeek !== changeWeekNext)
         /* Create a temporary variable to store the date a week later*/
         const newViewedWeek = new Date(viewedWeek);
         newViewedWeek.setDate(viewedWeek.getDate() + 7)
         setViewedWeek(newViewedWeek)
    }

    /* Allows users to reset week to current week easily after navigating through diffeent weeks */
    const resetWeek = () => {setViewedWeek(currentWeek)}

    /* Created to display the week shown */
    const weekBeginning = getWeekDay(viewedWeek, 1)
    const weekEnd = getWeekDay(viewedWeek, 7)
    
    /* Enables relevant screen to be displayed when the + button is clicked */
    const [addEventClicked, setAddEventClicked] = useState(false);

    const addEventHandler = () => {
        setAddEventClicked(!addEventClicked)
    }

    const [submissionStatus, setSubmissionStatus] = useState(false)


    return(
    <div id = 'consultantView'>
        <div className='consultantViewContainer'>
            <div className='firstItem'>
                <h1 className='welcomeMessage'>Hi !</h1>
                <div className='weekNavigation'>
                    <button className='weekIcon'>
                        <img src={previousWeekIcon} alt="" onClick={changeWeekPrevious}/>
                    </button>
                    <div className='currentWeek'>
                        <h2>{weekBeginning} - {weekEnd}</h2>
                    </div>
                    <button className='weekIcon'>
                        <img src={nextWeekIcon} alt="" onClick={changeWeekNext}/>
                    </button>
                </div>
                <button className = 'resetButton' onClick={resetWeek}>Return to Current Week</button>
            </div>
            <button className='addEventButton' onClick={addEventHandler}>
                <img src={addEventIcon} alt="" />
            </button>

            {/* Display AddEvent when button has been clicked*/}
            {addEventClicked && <AddEvent addEventHandler={addEventHandler}/>} 
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