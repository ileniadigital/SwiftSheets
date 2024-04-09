import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Update with your API base URL

export const createTimesheet = async (timesheetData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_timesheet/`, timesheetData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createEvents = async (timesheetId, eventsData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_events/${timesheetId}/`, { events: eventsData });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
