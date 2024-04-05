import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ConsultantTimesheet from '../Components/TimesheetListView/ConsultantTimesheet/ConsultantTimesheet';
import '../Components/TimesheetListView/TimesheetListView.css'; // Import styling
import Filters from '../Components/TimesheetListView/Filters/Filters';
import { fetchTimesheetsAndUsers } from '../Components/Data/TimesheetData'; // Adjust the path as necessary

export default function TimesheetListView({ role }) {
  const [timesheets, setTimesheets] = useState([]);
  const [users, setUsers] = useState({});
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    fetchTimesheetsAndUsers(setTimesheets, setUsers, filter);
  }, [filter]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  //old fetch
// export default function TimesheetListView({ role }) {
//   const [timesheets, setTimesheets] = useState([]);
//   const [users, setUsers] = useState({});
//   const [filter, setFilter] = useState("pending"); // Default filter

//   useEffect(() => {
//     fetchTimesheets();
//   }, [filter]); // Re-fetch timesheets when the filter changes

//   const fetchTimesheets = () => {
//     let url = 'http://localhost:8000/timesheet/';
//     if (filter !== 'all') {
//       url += `?review_status=${filter}`;
//     }

//     Axios.get(url)
//       .then(response => {
//         setTimesheets(response.data);
//         // After fetching timesheets, fetch user details for each timesheet
//         fetchUserDetails(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching timesheets:', error);
//       });
//   };

//   const fetchUserDetails = (timesheets) => {
//     // Create a unique set of user IDs to minimize API calls
//     const userIds = new Set(timesheets.map(ts => ts.user));

//     // Fetch details for each user ID
//     userIds.forEach(userId => {
//       Axios.get(`http://localhost:8000/systemuser/${userId}/`) // Adjust this URL to your API's user detail endpoint
//         .then(response => {
//           setUsers(prevUsers => ({
//             ...prevUsers,
//             [userId]: response.data
//           }));
//         })
//         .catch(error => {
//           console.error(`Error fetching details for user ${userId}:`, error);
//         });
//     });
//   };

  // const handleFilterChange = (selectedFilter) => {
  //   setFilter(selectedFilter);
  // };

  return (
    <div className='container'>
      <div className='menu-container'>
        <Filters onFilterChange={handleFilterChange} className='filters' />
        <button className='save-button'>Save</button>
      </div>
      <div className='list-container'>
        {/* Categories */}
        <div className="categories-container">
          <div className="category-name">
            <h2>Name</h2>
          </div>
          <div className="category-dates">
            <h2>Dates </h2>
          </div>
          <div className="category-status">
            <div className="category">
              <h2>Review Status</h2>
            </div>
            <div className="category">
              <h2>Payment Status</h2>
            </div>
          </div>
      </div>
      {/* Displaying consultant timesheets */}
        <div className='timesheet-container'>
          {timesheets.map(timesheet => (
            <ConsultantTimesheet
              key={timesheet.id}
              name={`${users[timesheet.user]?.firstname} ${users[timesheet.user]?.lastname}`} 
              dates={`${new Date(timesheet.start_date).toLocaleDateString()} - ${new Date(timesheet.end_date).toLocaleDateString()}`}
              reviewStatus={timesheet.review_status}
              paymentStatus={timesheet.payment_status}
              role={role}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

