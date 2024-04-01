// Importing component
import TimesheetDetails from "../TimesheetDetails/TimesheetDetails"

// Displays timesheets that consultant has recieved payment for
export default function DisplayDetails({attributeChecked, value}) {

    // Retrieve timesheets and go through events to find those that match a criteria
    const pastTimesheets = JSON.parse(localStorage.getItem('pastTimesheets')) || []
    
    let pastTimesheetDetails = []
    for (const key in pastTimesheets) {
        let event = pastTimesheets[key]
        if (event[attributeChecked] === value) {
            pastTimesheetDetails.push(
            <TimesheetDetails timesheet = {pastTimesheets[key]}/>
            )
        }
    }

    return (
        <div>
            {pastTimesheetDetails}
        </div>
    )
}