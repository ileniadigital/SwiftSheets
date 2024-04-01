import './ConsultantTimesheet.css'; //Import styling

//Import components
import Status from "./Status";
import Date from './Date';
import ConsultantName from './ConsultantName';

// Consultant Timesheet component for Line Manager and Finance Team Member
export default function ConsultantTimesheet(props) {
    const {name, dates, reviewStatus, paymentStatus, role} = props;
    return (
        <div className="consultantTimesheet-container">
            <ConsultantName name={name}/>
            <Date dates={dates}/>
            {/* Review status */}
            <Status status={reviewStatus} editable={role==='linemanager'}/>
            {/* Payment status */}
            <Status status={paymentStatus} editable={role!=='linemanager'}/>
        </div>
    )
}