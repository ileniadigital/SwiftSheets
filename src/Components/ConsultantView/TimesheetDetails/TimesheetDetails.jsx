// Importing CSS
import './TimesheetDetails.css'

/* Displays timesheet's details */
export default function TimesheetDetails({timesheet}) {

    return (
        <div className="timesheet-details-container">
            <div className='timesheet-details'>
                <div>
                    <p className='title'>Date</p>
                    {timesheet.start_date} - {timesheet.end_date}
                </div>
                <div>
                    <p className='title'>Submission Status</p>
                    {timesheet.is_submitted ? "Submitted" : "Not Submitted"}
                </div>
                <div>
                    <p className='title'>Review Status</p>
                    {timesheet.review_status}
                </div>
                <div>
                    <p className='title'>Payment Status</p>
                    {timesheet.payment_status}
                </div>
            </div>
            {/* Button redirects user to current timesheet */}
            <a className = 'click' href="/timesheet">Click to View</a>
            
        </div>
    )
}