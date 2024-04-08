import { GrView } from 'react-icons/gr';
import '../TimesheetListView.css';
//Import components
import Status from "./Status";
import Date from './Date';
import ConsultantName from './ConsultantName';

import { useState } from 'react';
import { Link } from 'react-router-dom';

// Consultant Timesheet component for Line Manager and Finance Team Member
export default function ConsultantTimesheet(props) {
    const { id, name, dates, reviewStatus, paymentStatus, role, onUpdateStatus } = props;
    const [isTimesheetOpen, setIsTimesheetOpen] = useState(false);

    const handleViewTimesheet = () => {
        setIsTimesheetOpen(true);
        // Additional logic to fetch and display the timesheet details
        // You can pass the timesheet id to the parent component to fetch details if needed
    };
  
    const handleStatusUpdate = (newStatus) => {
      onUpdateStatus(id, newStatus); // Call the parent function with the timesheet id and new status
    };
    return (
      <div className="consultantTimesheet-container">
        <Link to={{ pathname: `/timesheet/${id}` }} className="view-icon" onClick={handleViewTimesheet}>
          <GrView size={30} className="icon" />
        </Link>
        <ConsultantName name={name} />
        <Date dates={dates} />
        {/* Review status */}
        <Status
          status={reviewStatus}
          editable={role === 'linemanager'}
          onUpdateStatus={handleStatusUpdate} // Pass the callback function
        />
        {/* Payment status */}
        <Status status={paymentStatus} editable={role === 'financeteam'} onUpdateStatus={handleStatusUpdate} />
      </div>
    );
  }
  