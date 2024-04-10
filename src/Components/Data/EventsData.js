import Axios from 'axios';

// Fetch events by timesheet ID
export const fetchEventsByTimesheetID = async (timesheetID) => {
  let url = 'http://localhost:8000/event/';

  if (timesheetID) {
    url += `?timesheet_id=${timesheetID}`;
  }

  try {
    const response = await Axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

export const createEvents = async (timesheetID, eventData) => { // Accept event data as parameter
  let url = 'http://localhost:8000/event';

  if (timesheetID) {
    url += `/?timesheet=${timesheetID}`;
  }

  try {
    const response = await Axios.post(url, eventData);
    console.log("Sent data") // Send eventData to the backend
    return response.data;
  } catch (error) {
    console.error('Error creating events:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

// Destroy events by IDs
export const destroyEvents = async (eventIDToDelete) => {
  try {
    console.log("ID:", eventIDToDelete)
    let url = 'http://localhost:8000/event/';
    if (eventIDToDelete) {
      url += `${eventIDToDelete}/`; // Construct URL with event ID
    }
    console.log("URL:", url)
    const response = await Axios.delete(url);
    console.log("Deleted");
    return response.data;
  } catch (error) {
    console.error('Error destroying events:', error);
    throw error;
  }
};