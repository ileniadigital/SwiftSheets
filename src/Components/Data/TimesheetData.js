import Axios from 'axios';
import { fetchUserDetails } from './UserData';

export const fetchTimesheetsAndUsers = async (setTimesheets, setUsers, filter, role) => {
  let url = 'http://localhost:8000/timesheet/';

  if (filter !== 'all') {
    if(role === 'linemanager') {
      url += `?review_status=${filter}`;
    } else {
      url += `?payment_status=${filter}`;
    }
  }

  try {
    const response = await Axios.get(url);
    setTimesheets(response.data);
    console.log("Timesheets:", response.data);
    const userIds = new Set(response.data.map(ts => ts.user));
    const userDetails = await fetchUserDetails(Array.from(userIds));
    setUsers(userDetails);
  } catch (error) {
    console.error('Error fetching timesheets:', error);
  }
};
