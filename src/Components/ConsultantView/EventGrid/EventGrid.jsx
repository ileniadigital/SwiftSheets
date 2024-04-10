import React from 'react';
import { useState } from 'react';
import './EventGrid.css'; //Import Styling

// Importing icon
import { IoClose } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";

import DeleteEventConfirmation from '../DeleteEventConfirmation/DeleteEventConfirmation';

const EventGrid = ({ events, openAddEvent, timesheetStatus }) => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const hours = [...Array(24).keys()]; 

  // Calculate the style of the event block based on the start and end times of the event
  const calculateEventBlockStyle = (event, dayIndex) => {
    // Calculate the start and end times of the event in minutes
    const startTime = parseInt(event.start_time.split(':')[0]) * 60 + parseInt(event.start_time.split(':')[1]);
    const endTime = parseInt(event.end_time.split(':')[0]) * 60 + parseInt(event.end_time.split(':')[1]);

    // Calculate the duration of the event in minutes
    const duration = endTime - startTime;

    // Calculate the top position of the event block based on the start time
    const top = `${(startTime / 60) * 3}rem`;

    // Calculate the height of the event block based on the duration
    const height = `${(duration / 60) * 3}rem`;

    return {
      top: top,
      height: height,
      backgroundColor: '#afd900', 
      position: 'absolute'
    };
  };


  //Open Event Menu
  const handleAddEventClick = () => {
    openAddEvent();
  };


  //Open Delete Event Menu
  const [deleteEventConfirmation, setDeleteEventConfirmation] = useState(false);
  const deleteEvent = (event) => {
    setDeleteEventConfirmation(event);
  }

  return (
    <div className="event-grid">
      <div className="grid-header">
        {/* Display the days */}
        {days.map(day => (
          <div key={day} className="grid-column-header">{day}</div>
        ))}
      </div>
      <div className="grid-body">
        <div className="hour-column">
          {/* Display the hours */}
          {hours.map(hour => (
            <div key={hour} className="time-slot">
              {`${hour}:00`}
            </div>
          ))}
        </div>
        {days.map((day, dayIndex) => (
          <div key={day} className="grid-column">
            {hours.map(hour => (
                    <div key={`${day}-${hour}`} className="add-button" style={{ position: 'relative' }}>
                    <button className="add-event-button" onClick={handleAddEventClick} disabled={timesheetStatus === 'Submitted'}>
                        <FaCirclePlus size={30} /> 
                    </button>
                    </div>
            ))}

            {events.filter(event => new Date(event.date).getDay() === (dayIndex + 1) % 7).map(event => (
              <div key={event.id} className="event-block" style={calculateEventBlockStyle(event, dayIndex)}>
                {/* Delete Pop up */}
                <button className ="delete-event"  onClick={() => deleteEvent(event)}><IoClose/></button>
              </div>
            ))}
          </div>
        ))}
      </div>
       {/* Render delete event confirmation pop-up if deleteEventPopup is not null */}
       {deleteEventConfirmation && <DeleteEventConfirmation event={deleteEventConfirmation} setOpenPopup={setDeleteEventConfirmation} />}
    </div>
  );
};

export default EventGrid;
