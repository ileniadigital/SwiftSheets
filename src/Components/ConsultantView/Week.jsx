// Importing CSS
import '../../CSS/ConsultantView/Week.css';

// Importing Component
import WeekDay from '../../Components/ConsultantView/WeekDay';

export default function Week({addEventHandler}) {

    // Creating array to store each week day
    let week = []
    const weekDays = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

    for (let i = 0; i < 7; i++)
    {
        week.push(<WeekDay day={weekDays[i]} addEventHandler = {addEventHandler}/>)
    }

    return(
    // Weekdays all stored under a single week div
    <div id = "week">
        {week}
    </div> 
    )
}