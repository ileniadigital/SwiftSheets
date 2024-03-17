//Payment Status component for Consultant Timesheet
export default function PaymentStatus() {
    return (
        <div className="paymentStatus-container">
            {/* Drop down menu for Payment Status */}
            <select className="paymentStatus-dropdown">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
        </div>
    )
}