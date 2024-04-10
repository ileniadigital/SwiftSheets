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
export const destroyEvents = async () => {
  try {
    const eventIDsToDelete = [12, 13, 14, 15]; // Dummy array of event IDs to delete
    const url = 'http://localhost:8000/event/delete/'; // Update the URL to match the new pattern
    const response = await Axios.post(url, { event_ids: eventIDsToDelete });
    return response.data;
  } catch (error) {
    console.error('Error destroying events:', error);
    throw error;
  }
};