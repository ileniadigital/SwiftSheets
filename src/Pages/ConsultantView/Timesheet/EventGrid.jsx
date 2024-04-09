import React from 'react';
import './EventGrid.css';

const EventGrid = ({ events }) => {
  // You would typically get this from your app's state
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const hours = [...Array(24).keys()]; // Array from 0 to 23 for each hour

  const calculateEventBlockStyle = (event, dayIndex) => {
  // Calculate the start and end times of the event in minutes
  const startTime = parseInt(event.start_time.split(':')[0]) * 60 + parseInt(event.start_time.split(':')[1]);
  const endTime = parseInt(event.end_time.split(':')[0]) * 60 + parseInt(event.end_time.split(':')[1]);

  // Calculate the duration of the event in minutes
  const duration = endTime - startTime;

  // Calculate the top position of the event block based on the start time
  const top = `${(startTime / 60) * 3}rem`; // Each hour slot is 3rem high

  // Calculate the height of the event block based on the duration
  const height = `${(duration / 60) * 3}rem`; // Each hour slot is 3rem high

  const columnWidth = 100 / days.length; // Assuming each column takes up an equal width
  const left = `${columnWidth * dayIndex}%`;

  // Return the style object with dynamic top and height properties
  return {
    top: top,
    height: height,
    left: left, // Align to the correct day column
    right: `${100 - (left + columnWidth)}%`, // Ensure the block does not exceed the day column width
    backgroundColor: 'green', // Example color, adjust as needed
    position: 'absolute'
  };
};

  return (
    <div className="event-grid">
      <div className="grid-header">
        {/* Display days as column headers */}
        {days.map(day => (
          <div key={day} className="grid-column-header">{day}</div>
        ))}
      </div>
      <div className="grid-body">
        {/* Display hours as a separate row */}
        <div className="hour-column">
          {hours.map(hour => (
            <div key={hour} className="time-slot">{`${hour}:00`}</div>
          ))}
        </div>
        {/* Display events for each day */}
        {days.map((day, index) => (
          <div key={day} className="grid-column">
            {events.filter(event => new Date(event.date).getDay() === (index + 1) % 7).map(event => (
              <div key={event.id} className="event-block" style={calculateEventBlockStyle(event, index)}>
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
