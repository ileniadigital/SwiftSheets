// Importing CSS
import './TimesheetDetails.css'

/* Displays timesheet's details */
export default function TimesheetDetails(timesheet) {
    const viewedWeek = timesheet.timesheet.week
    const submissionStatus = timesheet.timesheet.submissionStatus
    const reviewStatus = timesheet.timesheet.reviewStatus
    const paymentStatus = timesheet.timesheet.paymentStatus


    return (
        <div className="timesheet-details-container">
            <div className='timesheet-details'>
                <div>
                    <p className='title'>Date</p>
                    {viewedWeek}
                </div>
                <div>
                    <p className='title'>Submission Status</p>
                    {submissionStatus}
                </div>
                <div>
                    <p className='title'>Review Status</p>
                    {reviewStatus}
                </div>
                <div>
                    <p className='title'>Payment Status</p>
                    {paymentStatus}
                </div>
            </div>
            {/* Button redirects user to current timesheet */}
            <button className='click'>
                Click to View
            </button>
        </div>
    )
}