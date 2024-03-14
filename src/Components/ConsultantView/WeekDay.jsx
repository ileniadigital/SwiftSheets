/* Importing CSS */
import '../../CSS/ConsultantView/WeekDay.css';

/* Importing Component */
import Hours from './Hours';

export default function WeekDay({day, addEventHandler}) {
    return(
        // Each weekday stored with its hours in a day
        <div id='weekDay'>
            <h1 id='day'>{day}</h1>
            <Hours addEventHandler={addEventHandler}/>
        </div>
    )
}