// Importing CSS
import './Week.css';

// Importing Component
import Day from '../Day/Day';
import DailyHours from '../DailyHours/DailyHours';
import getDate from '../getDate'


export default function Week({viewedWeek, addEventHandler, timesheetStatus}) {

    // Creating array to store the week, with its corresponding hours
    let week = []
    
    // Retrieving consultant's days worked
    const daysWorked = JSON.parse(localStorage.getItem('daysWorked')) // Conversion from string to array

    // Storing possible days of the week to choose from
    const daysOfTheWeek = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

    // Will be appended to with the consultant's working days
    let weekDays = []

    // Adds day worked to weekday if it exists in daysWorked
    for (let i = 0; i < daysOfTheWeek.length; i++) {
        if (daysWorked.includes(i)) {
            weekDays.push(daysOfTheWeek[i])
        }
    }

    // Adding daily hours as first column if there are days that the consultant works for
    if (weekDays.length > 0) {
        week.push(<DailyHours key={0}/>) 
    }

    // Function that formats the day of the week
    const formatDate = (week, dayToRetrieve) => {
        const date = getDate(week, dayToRetrieve)
        return `${date[2]}-${date[1]}-${date[0]}`
    }

    // Creating Day component for each day of the week and adding it to the array
    for (let i = 0; i < weekDays.length; i++) {
        week.push(
            <Day 
                key={i+1} 
                day = {weekDays[i]} 
                date = {formatDate(viewedWeek,i+1)} 
                addEventHandler = {addEventHandler} 
                timesheetStatus = {timesheetStatus}
            />
        )
    }

    return(
    // Weekdays all stored under a single week div
    <div className = "week">
        {week}
    </div> 
    )
}