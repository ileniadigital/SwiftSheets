import '../../CSS/LineManagerView/ConsultantTimesheet.css'; //Import styling


//Status component for Consultant Timesheet
//For Review and Payment Component
export default function Status() {
    return (
        <div className="status-container">
            {/* Drop down menu for Payment Status */}
            <select className="status-dropdown">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
        </div>
    )
}