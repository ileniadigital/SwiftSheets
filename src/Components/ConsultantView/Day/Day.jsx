/* Importing CSS */
import './Day.css';

/* Importing Component */
import Hours from '../Hours/Hours';

export default function Day({day, date, addEventHandler, timesheetStatus}) {
    return(
        // Each weekday stored with its hours in a day
        <div className='weekday'>
            <h1 className='day'>{day}</h1>
            <Hours 
                addEventHandler={addEventHandler} 
                date = {date}
                timesheetStatus = {timesheetStatus}
            />
        </div>
    )
}