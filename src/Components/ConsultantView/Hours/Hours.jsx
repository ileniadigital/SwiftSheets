import React, { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import DeleteEventConfirmation from '../DeleteEventConfirmation/DeleteEventConfirmation';
import './Hours.css';

export default function Hours({ addEventHandler, date, timesheetStatus, events }) {

    function calculateEventBlockStyle(event) {
        // Assuming each hour block is 3rem in height
        const heightPerHour = 3;
        
        const startHour = parseInt(event.start_time.split(":")[0], 10);
        const startMinutes = parseInt(event.start_time.split(":")[1], 10);
        const endHour = parseInt(event.end_time.split(":")[0], 10);
        const endMinutes = parseInt(event.end_time.split(":")[1], 10);
        
        // Calculate the start position in rem
        const startBlockPosition = (startHour + startMinutes / 60 - 0) * heightPerHour; // Assuming your grid starts at 9 AM
        const endBlockPosition = (endHour + endMinutes / 60 - 0) * heightPerHour; // Likewise
    
        const blockHeight = endBlockPosition - startBlockPosition;
        
        return { top: `${startBlockPosition}rem`, height: `${blockHeight}rem` };
    }
    
  // Filter events for the current date
  const filteredEvents = events.filter(event => event.date === date);

  // Sort filtered events by start time
  const sortedEvents = filteredEvents.sort((a, b) => {
    const startTimeA = new Date(`${date} ${a.start_time}`);
    const startTimeB = new Date(`${date} ${b.start_time}`);
    return startTimeA - startTimeB;
  });

  /* Whether hour has been clicked on stored to determine whether to show add event icon
     (makes it easier to identify which time slot is being clicked on) */
  const [hoveredHour, setHoveredHour] = useState(null);

  const handleMouseEnter = hour => {
    if (hour !== hoveredHour) {
      setHoveredHour(hour);
    }
  };

  const handleMouseLeave = () => {
    setHoveredHour(null);
  };

  // Creating array to store each hour in day as a time slot
  let hoursArray = [];

  // Providing whole day as time slots if working hours extend across multiple days
  const startWorkHours = 0;
  const endWorkHours = 23;

  // Determine if user wants to delete an event
  const [deleteEventID, setDeleteEventID] = useState(false);

  // Delete event
  const deleteEvent = eventId => {
    setDeleteEventID(eventId);
  };

  // Iterates through the hours of a day, creating a new button for each day (this will serve as a timesheet timeslot)
  for (let i = startWorkHours; i <= endWorkHours; i++) {
    /* Ternary operator used to ensure last div does not have a line underneath; maintaining rounded
    edges of border */
    const addUnderlineClass = i < endWorkHours;

    let eventsPerHour = []; // Creating array to store event hours
    let numberOfEvents = 0; // Track number of events to determine if + event button should appear
    let startHour = false; // Only show x button for start hour

    // Iterate over sorted events array
    for (const event of sortedEvents) {
      let className = 'add-event-button';
      let top = 0;
      let height = 0;

      const eventStartHour = parseInt(event.start_time.slice(0, 2));
      const eventEndHour = parseInt(event.end_time.slice(0, 2));

      // Check if the event falls within the current hour
      if (eventStartHour <= i && i < eventEndHour) {
        className = 'event';
        height = 3;
        numberOfEvents++;
      }

      const event1 = event;
      eventsPerHour.push(
        className !== 'add-event-button' && (
          <div
            className={className}
            key={event.id}
            style={{ top: `${top}rem`, height: `${height}rem` }}
            onClick={event => {
              event.stopPropagation();
              addEventHandler('Hours1', date, event1);
            }}>
            {startHour ? (
              <div className="delete-event">
                <IoClose
                  onClick={event => {
                    event.stopPropagation();
                    deleteEvent(event1.id);
                  }}
                />
              </div>
            ) : (
              ''
            )}
            {startHour && deleteEventID === event1.id && (
              <DeleteEventConfirmation event={event1.id} setOpenPopup={setDeleteEventID} />
            )}
          </div>
        )
      );
    }

    hoursArray.push(
      <button
        key={i}
        className={`hour-block ${addUnderlineClass ? 'add-underline' : ''}`}
        onClick={() => addEventHandler('Hours', date, null)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        disabled={timesheetStatus === 'Submitted'}>
        <div className="event-container">
          {numberOfEvents === 0 && hoveredHour === i && <FaCirclePlus />} {/* Show add event button if hour hovered over */}
          {eventsPerHour}
        </div>
      </button>
    );
  }

  return (
    // Storing all hours in a container
    <div className="hours-container">
      {
        events.map(event => (
            <div 
            key={event.id} 
            className="event-block" 
            style={calculateEventBlockStyle(event)}
            // other props and handlers
            >
            {/* Event content */}
            </div>
  ))
}

    </div>
  );
}
