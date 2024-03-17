//Payment Status component for Consultant Timesheet
export default function ReviewStatus() {
    return (
        <div className="reviewStatus-container">
            {/* Drop down menu for Payment Status */}
            <select className="reviewStatus-dropdown">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
        </div>
    )
}