import TimesheetDetails from "../TimesheetDetails/TimesheetDetails";

export default function PastTimesheets() {

    const pastTimesheets = JSON.parse(localStorage.getItem('pastTimesheets')) || []
    

    let pastTimesheetDetails = []
    for (const key in pastTimesheets) {
        pastTimesheetDetails.push(
        <TimesheetDetails key ={key} timesheet = {pastTimesheets[key]}/>
        )
    }

    return (
        <div>
            {pastTimesheetDetails}
        </div>
    )
}

