/* Importing CSS */
import '../../CSS/ConsultantView/WeekDay.css';

/* Importing Component */
import Hours from './Hours';

export default function WeekDay({day, addEventHandler}) {
    return(
        <div>
            <h1 id='day'>{day}</h1>
            <Hours addEventHandler={addEventHandler}/>
        </div>
    )
}