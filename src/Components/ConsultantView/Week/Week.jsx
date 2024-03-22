// Importing CSS
import './Week.css';

// Importing Component
import Day from '../Day/Day';
import DailyHours from '../DailyHours/DailyHours';

// Function retrieves the date of the current day of the week
function getDay(week, day) {
    let tempDay = new Date(week)
    tempDay.setDate(week.getDate() - week.getDay() + day)  // Going to beginning of week and adding number of days passed as parameter to get day's date
    
    let day0 = tempDay.getDate().toString().padStart(2, '0');
    let month = (tempDay.getMonth() + 1).toString().padStart(2,'0'); // + 1 due to 0 indexing
    let year = tempDay.getFullYear();

    let formattedDate = `${year}-${month}-${day0}`
    return formattedDate 
}

export default function Week({viewedWeek, addEventHandler}) {

    // Creating array to store the week, with its corresponding hours
    let week = []
    week.push(<DailyHours key={0}/>) // Adding daily hours as first column
    const weekDays = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

    // Creating Day component for each day of the week and adding it to the array
    for (let i = 0; i < weekDays.length; i++) {
        week.push(<Day key={i+1} day = {weekDays[i]} date = {getDay(viewedWeek,i+1)} addEventHandler = {addEventHandler}/>)}

    return(
    // Weekdays all stored under a single week div
    <div className = "week">
        {week}
    </div> 
    )
}