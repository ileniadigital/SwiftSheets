import Axios from 'axios';
import { fetchUserDetails } from './UserData';

export const fetchTimesheetsAndUsers = async (setTimesheets, setUsers, filter) => {
  let url = 'http://localhost:8000/timesheet/';
  if (filter !== 'all') {
    url += `?review_status=${filter}`;
  }

  try {
    const response = await Axios.get(url);
    setTimesheets(response.data);
    const userIds = new Set(response.data.map(ts => ts.user));
    console.log(response.data);
    const userDetails = await fetchUserDetails(Array.from(userIds));
    setUsers(userDetails);
  } catch (error) {
    console.error('Error fetching timesheets:', error);
  }
};
