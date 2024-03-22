import './ConsultantTimesheet.css'; //Import styling

//Import components
import Status from "./Status";
import Date from './Date';
import ConsultantName from './ConsultantName';

// Consultant Timesheet component for Line Manager and Finance Team Member
export default function ConsultantTimesheet() {
    return (
        <div className="consultantTimesheet-container">
            <ConsultantName/>
            <Date/>
            <Status/>
            <Status/>
        </div>
    )
}