import './ConsultantTimesheet.css'; //Import styling
//Status component for Consultant Timesheet
//For Review and Payment Component
export default function Status({status}) {
    return (
        <div className="status-container">
            {/* Drop down menu for Payment Status */}
            <select className="status-dropdown" value={status}>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
            </select>
        </div>
    )
}