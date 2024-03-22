/* Importing CSS */
import './Day.css';

/* Importing Component */
import Hours from '../Hours/Hours';

export default function Day({day, date, addEventHandler, addEventClicked}) {
    return(
        // Each weekday stored with its hours in a day
        <div id='weekday'>
            <h1 id='day'>{day}</h1>
            <Hours addEventHandler={addEventHandler} date = {date}/>
        </div>
    )
}