import Axios from 'axios';

// Fetch events by timesheet ID
export const fetchEventsByTimesheetID = async (timesheetID) => {
  let url = 'http://localhost:8000/event/';

  if (timesheetID) {
    url += `?timesheet=${timesheetID}`;
  }

  try {
    const response = await Axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};