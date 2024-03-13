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

    const currentWeek = new Date()
    const [viewedWeek, setViewedWeek] = useState(new Date());

    const changeWeekPrevious = () => {

        /* Create a temporary variable to store the date a week before*/
        const newViewedWeek = new Date(viewedWeek);
        newViewedWeek.setDate(viewedWeek.getDate() - 7)
        setViewedWeek(newViewedWeek)
    }

    const changeWeekNext = () => {
        // if (currentWeek !== changeWeekNext)
         /* Create a temporary variable to store the date a week later*/
         const newViewedWeek = new Date(viewedWeek);
         newViewedWeek.setDate(viewedWeek.getDate() + 7)
         setViewedWeek(newViewedWeek)
    }


    const weekBeginning = getWeekDay(viewedWeek, 1)
    const weekEnd = getWeekDay(viewedWeek, 7)
    

    const [addEventClicked, setAddEventClicked] = useState(false);

    const addEventHandler = () => {
        setAddEventClicked(!addEventClicked)
    }

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
    </div> 
    )
}