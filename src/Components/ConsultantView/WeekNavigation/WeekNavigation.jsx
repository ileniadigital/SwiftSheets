import './WeekNavigation.css';

// Importing Icons
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


import { useState } from 'react';

export default function WeekNavigation({viewedWeek, setViewedWeek}) {

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
    
    return(
    <div id='weekNavigation'>

        {/* Div created to allow users to move back and forth between weeks */}
        <div className='viewedWeek'>
            <button className='arrow'>
                <IoIosArrowBack onClick={changeWeekPrevious}/>
            </button>
            <div className='currentWeek'>
                <h2>{weekBeginning} - {weekEnd}</h2>
            </div>
            <button className='arrow'>
                <IoIosArrowForward onClick={changeWeekNext}/>
            </button>
        </div>

        {/* Button created to allow user to return to current week */}
        <button className = 'resetButton' onClick={resetWeek}>Return to Current Week</button>
    </div>
    )
}