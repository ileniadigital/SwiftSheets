// Importing CSS
import './Week.css';

// Importing Component
import Day from '../Day/Day';
import DailyHours from '../DailyHours/DailyHours';
import getDate from '../getDate'



export default function Week({viewedWeek, addEventHandler, timesheetStatus}) {

    // Creating array to store the week, with its corresponding hours
    let week = []
    week.push(<DailyHours key={0}/>) // Adding daily hours as first column
    const weekDays = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

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