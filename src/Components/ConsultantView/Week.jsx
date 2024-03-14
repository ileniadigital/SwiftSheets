// Importing CSS
import '../../CSS/ConsultantView/Week.css';

// Importing Component
import WeekDay from '../../Components/ConsultantView/WeekDay';

export default function Week({addEventHandler}) {

    let week = []
    const weekDays = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

    for (let i = 0; i < 7; i++)
    {
        week.push(<WeekDay day={weekDays[i]} addEventHandler = {addEventHandler}/>)
    }

    return(
    <div id = "week">
        {week}
    </div> 
    )
}