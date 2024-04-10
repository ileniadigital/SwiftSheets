import Axios from 'axios';
import { fetchUserDetails } from './UserData';

// Fetch timesheets and users from the API
export const fetchTimesheetsAndUsers = async (setTimesheets, setUsers, filter, role) => {
  let url = 'http://localhost:8000/timesheet/';

  if (filter !== 'all') {
    if(role === 'LineManager') {
      url += `?review_status=${filter}`;
    } else {
      url += `?payment_status=${filter}`;
    }
  }

  try {
    const response = await Axios.get(url);
    setTimesheets(response.data);
    //console.log("Timesheets:", response.data);
    const userIds = new Set(response.data.map(ts => ts.user));
    const userDetails = await fetchUserDetails(Array.from(userIds));
    setUsers(userDetails);
  } catch (error) {
    console.error('Error fetching timesheets:', error);
  }
};

// Fetch timesheets by user ID
export const fetchTimesheetsbyID = async (id) => {
  let url = 'http://localhost:8000/timesheet/';

  if (id) {
    url += `?user_id=${id}`;
    console.log('url', url);
  }

  try {
    const response = await Axios.get(url);
    //console.log("Timesheets by id:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching timesheets:', error);
  }
}

// Function to create a new timesheet
export const createTimesheet = async (userId) => {
  const url = 'http://localhost:8000/timesheet/';
  const currentTime = new Date().toISOString();
  const submission_date = currentTime.split('T')[0];
  const submission_time = currentTime.split('T')[1].split('.')[0];

  const data = {
    user: userId,
    submission_date: submission_date,
    submission_time: submission_time,
    // You can add other fields if needed
  };

  try {
    await Axios.post(url, data);
    console.log("Timesheet created successfully!");
  } catch (error) {
    console.error('Error creating timesheet:', error);
  }
};

// Function to delete a system user by ID from the backend
export const deleteUserFromBackend = async (userId) => {
  try {
    const response = await Axios.delete(`http://localhost:8000/systemuser/${userId}/`);
    console.log(`User with ID ${userId} deleted successfully`);
    return response.data;
  } 
  catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};