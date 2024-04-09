// Importing CSS
import './AddEvent.css';

// Importing icon
import { IoClose } from "react-icons/io5";

// Importing useState
import { useEffect, useState } from 'react';
import getDate from '../getDate';

export default function AddEvent({onClose, timesheet}) {

    //Handle closing of add event pop up
    const [isOpen, setIsOpen] = useState(true);

    const closeMenu = () => {
        setIsOpen(false);
        onClose();
    }
    
    return(
        isOpen && (
            <div className='add-event'>
                <button className = "close-event" onClick={closeMenu}><IoClose /></button>
                <h1 className='log-event-heading'>Log Event</h1>
                {/* Creating a form that represents the Consultant logging an event */}
                <form action="" className = "add-new-event">

                    {/* Show dropdown menu for recurring event upon selection */}
                    <div className='input'>
                        <label>Select Event</label>
                        <select defaultValue={''}>
                            <option value="" disabled hidden>Select Event</option> {/* Default value */}
                        </select>
                    </div>
            

                    <div className="input event-name">
                        <label htmlFor="eventName">Name</label>
                        <input type="text" name = "eventName" required/>
                    </div>

                    <div className="input">
                        <label htmlFor="eventDate">Date</label>
                            {/* // Limiting days to choose from as days in current week */}
                            <input className = 'datetime' type="date" name = "eventDate" required min={timesheet.start_date} max={timesheet.end_date}/>
                    </div>

                    <div className="input">
                        <label htmlFor="eventStartTime">Start Time</label>
                        <input type="time" className='datetime' name = "eventStartTime" required />
                    </div>

                    <div className="input">
                        <label htmlFor="eventEndTime">End Time</label>
                        <input className='datetime' type="time" name = "eventEndTime" required />
                    </div>

                    <div className="input">
                        <label htmlFor="eventType">Type</label>
                        <select name="eventType" required>
                            <option value="" disabled hidden>Type</option> {/* Default value */}
                            <option value="eventTypeNormal">Normal</option>
                            <option value="eventTypeOvertime">Overtime</option>
                            <option value="eventTypeHoliday">Holiday</option>
                            <option value="eventTypeSick">Sick</option>
                        </select>
                    </div>

                    {/* No need to show category if work is not Normal or Overtime e.g. if Consultants are sick */}
                    <div className="input">
                        <label htmlFor="eventCategory">Category</label>
                        <select name="eventCategory" required>
                            <option value="" disabled hidden>Category</option> {/* Default value */}
                            <option value="Project">Project</option>
                            <option value="eventCategoryPlanning">Planning</option>
                            <option value="eventCategoryMeeting">Meeting</option>
                        </select>
                    </div>

                    <div className="input checkbox-container">
                        <label htmlFor="isRecurring" className='checkbox-label'>Recurring </label>
                        <input  type="checkbox"/>
                        {/* <input className = {`is-recurring ${isRecurring ? 'recur' : ''}`} type="checkbox" onChange={() => setIsRecurring(!isRecurring)}
                        defaultValue={isRecurring}/> */}
                    </div>

                    <div className='note-container'>
                        <label htmlFor="note"> Note </label>
                        <textarea name="note" cols="30" rows="5" placeholder='Enter text'>
                        </textarea>
                    </div>
                    
                    {/* <div>
                        <AddEvent />
                    </div> */}

                    <input type="submit" value={"Add Event"} className='add-event-button'/> 

                    {/* <p className='concur-error'>Event is Overlapping</p> */}
                    {/* {componentCaller === 'Hours1' ? (
                    <input type="submit" value={"Edit Event"} className='add-event-button'/> 
                    )
                    : (
                    <input type="submit" value={"Add Event"} className='add-event-button'/> ) } */}
                </form>
            </div>
        )
    )
}