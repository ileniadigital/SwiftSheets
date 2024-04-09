/* Importing CSS */
import './Day.css';

/* Importing Component */
import Hours from '../Hours/Hours';

export default function Day({ day, date, addEventHandler, timesheetStatus, events }) {
    return (
        // Each weekday stored with its hours in a day
        <div className='weekday'>
            <h1 className='day'>{day}</h1>
            {/* Rendering events for this day */}
            <div className="events">
                {events.map((event, index) => (
                    <div key={index} className="event">
                        <p>{event.eventName}</p>
                        <p>{event.eventStartTime} - {event.eventEndTime}</p>
                        {/* Add more details of event as needed */}
                    </div>
                ))}
            </div>
            <Hours
                addEventHandler={addEventHandler}
                date={date}
                timesheetStatus={timesheetStatus}
            />
        </div>
    )
}
