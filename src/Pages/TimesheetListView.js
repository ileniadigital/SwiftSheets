import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ConsultantTimesheet from '../Components/TimesheetListView/ConsultantTimesheet/ConsultantTimesheet';
import '../Components/TimesheetListView/TimesheetListView.css'; // Import styling
import Filters from '../Components/TimesheetListView/Filters/Filters';
import { fetchTimesheetsAndUsers } from '../Components/Data/TimesheetData'; // Adjust the path as necessary

export default function TimesheetListView(props) {
  const role = props.role;
  console.log("Role is:", role)
  const [timesheets, setTimesheets] = useState([]);
  const [users, setUsers] = useState({});
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    // Pass role to fetchTimesheetsAndUsers function
    fetchTimesheetsAndUsers(setTimesheets, setUsers, filter, role);
  }, [filter]); // Include role in the dependency array


  console.log("Timesheets:", timesheets);
  timesheets.map(timesheet => console.log("Timesheet:", timesheet.id));
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleStatusUpdate = (id, newStatus) => {
    // Send an API request to update the status in the database
    let updateField;
    if (role === 'linemanager') {
      updateField = 'review_status';
      //console.log("Review status updated");
    } else {
      updateField = 'payment_status';
      //console.log("Payment status updated");
    }
  
    Axios.patch(`http://127.0.0.1:8000/timesheet/${id}/`, {
      [updateField]: newStatus,
    })
      .then(response => {
        console.log("Success");
        // Update the status in the UI immediately
        setTimesheets(prevTimesheets => {
          return prevTimesheets.map(timesheet => {
            if (timesheet.id === id) {
              return {
                ...timesheet,
                [updateField]: newStatus,
              };
            } else {
              return timesheet;
            }
          });
        });
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };
  


  return (
    <div className='container'>
      <div className='menu-container'>
        <Filters onFilterChange={handleFilterChange} className='filters' />
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
              id={timesheet.id}
              name={`${users[timesheet.user]?.firstname} ${users[timesheet.user]?.lastname}`} 
              dates={`${new Date(timesheet.start_date).toLocaleDateString()} - ${new Date(timesheet.end_date).toLocaleDateString()}`}
              reviewStatus={timesheet.review_status}
              paymentStatus={timesheet.payment_status}
              role={role}
              onUpdateStatus={handleStatusUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

