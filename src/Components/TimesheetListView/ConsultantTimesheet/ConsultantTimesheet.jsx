import { GrView } from 'react-icons/gr';
import '../TimesheetListView.css';
//Import components
import Status from "./Status";
import Date from './Date';
import ConsultantName from './ConsultantName';

// Consultant Timesheet component for Line Manager and Finance Team Member
export default function ConsultantTimesheet(props) {
    const { id, name, dates, reviewStatus, paymentStatus, role, onUpdateStatus } = props;
  
    const handleStatusUpdate = (newStatus) => {
      onUpdateStatus(id, newStatus); // Call the parent function with the timesheet id and new status
    };
    console.log("ID is:",id);
    return (
      <div className="consultantTimesheet-container">
        <h1 className="black-text">{id}</h1>
        <button className="view-icon">
          <GrView size={30} className="icon" />
        </button>
        <ConsultantName name={name} />
        <Date dates={dates} />
        {/* Review status */}
        <Status
          status={reviewStatus}
          editable={role === 'linemanager'}
          onUpdateStatus={handleStatusUpdate} // Pass the callback function
        />
        {/* Payment status */}
        <Status status={paymentStatus} editable={role !== 'linemanager'} onUpdateStatus={handleStatusUpdate} />
      </div>
    );
  }
  