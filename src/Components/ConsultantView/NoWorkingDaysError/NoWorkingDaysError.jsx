// Importing css
import './NoWorkingDaysError.css'

// Displays error message when a user has selected no working days in settings
export default function NoWorkingDaysError() {

    return (
        <div className="error-container">
                Enter settings and select at least 1 working day to be able to fill in the timesheet
        </div>
    )
}