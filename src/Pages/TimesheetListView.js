import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ConsultantTimesheet from '../Components/TimesheetListView/ConsultantTimesheet/ConsultantTimesheet';
import '../Components/TimesheetListView/TimesheetListView.css'; // Import styling

import Filters from '../Components/TimesheetListView/Filters/Filters';

export default function TimesheetListView({ role }) {
  const [timesheets, setTimesheets] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const userEmail = 'elizabeth@email.com'; // Replace with dynamic user email if necessary
    fetchTimesheets(userEmail); 
  }, []); // The dependency array is empty so this will run only once on mount

  const fetchTimesheets = (email) => {
    Axios.get(`http://localhost:8000/timesheet/?user_email=${encodeURIComponent(email)}`)
      .then(response => {
        setTimesheets(response.data);
        if (response.data.length > 0) {
          // Assuming the user email is the same as the one we fetched the timesheets with
          fetchUserDetails(email);
        }
      })
      .catch(error => {
        console.error('Error fetching timesheets:', error);
        setError("An error occurred while fetching the timesheets.");
      });
  };

  const fetchUserDetails = (email) => {
    Axios.get(`http://localhost:8000/systemuser/?email=${encodeURIComponent(email)}`)
      .then(response => {
        const user = response.data.find(u => u.username === email);
        setUserDetails(user || {});
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setError("An error occurred while fetching user details.");
      });
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const renderContent = () => {
    if (error) {
      return <div>{error}</div>;
    }
    if (timesheets.length === 0) {
      return <div>No timesheets found.</div>;
    }
    return timesheets.map(timesheet => (
      <ConsultantTimesheet
        key={timesheet.id}
        name={`${userDetails.firstname} ${userDetails.lastname}`} 
        dates={`${formatDate(timesheet.start_date)} - ${formatDate(timesheet.end_date)}`}
        reviewStatus={timesheet.review_status}
        paymentStatus={timesheet.payment_status}
        role={role}
      />
    ));
  };

  return (
    <div className='container'>
      {/* Menu */}
      <div className='menu-container'>
        <div className='filters'><Filters/></div>
        <button className='save-button'>Save</button>
      </div>
      {/* Categories */}
      <div className='list-container'>
        <div className="categories-container">
          <div className="category-name">
            <h2>Name</h2>
          </div>
          <div className="category-date">
            <h2>Dates </h2>
          </div>
          <div className='category-status'>
            <div className="category-review">
              <h2>Review Status</h2>
            </div>
            <div className="category-payment">
              <h2>Payment Status</h2>
            </div>
          </div>
        </div>
        {/* Displaying consultant timesheets */}
        <div className='timesheet-container'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}