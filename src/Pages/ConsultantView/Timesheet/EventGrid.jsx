import React from 'react';
import './EventGrid.css';

import { FaCirclePlus } from "react-icons/fa6";

const EventGrid = ({ events, openAddEvent }) => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const hours = [...Array(24).keys()]; 

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

    const columnWidth = 100 / days.length; 
    const left = `${columnWidth * dayIndex}%`;
    const right = `${100 - (parseFloat(left) + columnWidth)}%`;

    return {
      top: top,
      height: height,
      left: left, 
      right: right, 
      backgroundColor: '#afd900', 
      position: 'absolute'
    };
  };

  const handleAddEventClick = () => {
    openAddEvent();
  };

  return (
    <div className="event-grid">
      <div className="grid-header">
        {days.map(day => (
          <div key={day} className="grid-column-header">{day}</div>
        ))}
      </div>
      <div className="grid-body">
        <div className="hour-column">
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
                    <button className="add-event-button" onClick={handleAddEventClick}>
                        <FaCirclePlus size={30} /> 
                    </button>
                    </div>
            ))}

            {events.filter(event => new Date(event.date).getDay() === (dayIndex + 1) % 7).map(event => (
              <div key={event.id} className="event-block" style={calculateEventBlockStyle(event, dayIndex)}>
                {/* Event content */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGrid;