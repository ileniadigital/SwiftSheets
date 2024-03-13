export default function AddEvent({addEventHandler}) {

    return(
        <div id='addEvent'>
            <button className = "closeEvent" onClick={addEventHandler}>X</button>
            <form action="" id = "addNewEvent">
                <div className="input">
                    <label htmlFor="eventName">Event Name</label>
                    <input type="text" hame = "eventName"/>
                </div>
                <div className="input">
                    <label htmlFor="eventDate">Date</label>
                    <input type="text" hame = "eventDate"/>
                </div>
                <div className="input">
                    <label htmlFor="eventDuration">Event Duration</label>
                    <input type="text" hame = "eventDuration"/>
                </div>
                <div className="input">
                    <label htmlFor="eventType">Event Type</label>
                    <select name="eventType" id="eventType">
                        <option value="eventTypeNormal">Normal</option>
                        <option value="eventTypeOvertime">Overtime</option>
                        <option value="eventTypeHoliday">Holiday</option>
                        <option value="eventTypeSick">Sick</option>
                    </select>
                </div>
                <div className="input">
                    <label htmlFor="eventCategory">Event Category</label>
                    <select name="eventCategory" id="eventCategory">
                        <option value="Project">Project</option>
                        <option value="eventCategoryPlanning">Planning</option>
                        <option value="eventCategoryMeetig">Meeting</option>
                    </select>
                </div>
                <input type="submit" value={"Add Event"}/>
            </form>
        </div>
    )
}