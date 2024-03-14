// Importing CSS
import '../../CSS/ConsultantView/Week.css';

// Importing Component
import WeekDay from '../../Components/ConsultantView/WeekDay';
import DailyHours from '../../Components/ConsultantView/DailyHours';

export default function Week({addEventHandler}) {

    // Creating array to store each week day
    let week = []
    week.push(<DailyHours/>) // Adding daily hours as first column
    const weekDays = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

    for (let i = 0; i < weekDays.length; i++) {
        week.push(<WeekDay day={weekDays[i]} addEventHandler = {addEventHandler}/>)
    }

    return(
    // Weekdays all stored under a single week div
    <div id = "week">
        {week}
    </div> 
    )
}