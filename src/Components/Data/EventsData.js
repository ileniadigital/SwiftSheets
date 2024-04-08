import Axios from 'axios';

// Fetch events by timesheet ID
export const fetchEventsByTimesheetID = async (setEvents, timesheetID) => {
  let url = 'http://localhost:8000/events/';

  if (timesheetID) {
    url += `?timesheet_id=${timesheetID}`;
  }

  try {
    const response = await Axios.get(url);
    console.log("Events:", response.data);
    //setEvents(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};