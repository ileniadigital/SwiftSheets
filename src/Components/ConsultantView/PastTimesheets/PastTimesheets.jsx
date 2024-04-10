import TimesheetDetails from "../TimesheetDetails/TimesheetDetails";

export default function PastTimesheets({ pastTimesheets }) {
    // Render past timesheet details
    const pastTimesheetDetails = pastTimesheets.map((timesheet, index) => (
        <TimesheetDetails key={index} timesheet={timesheet} />
    ));

    return (
        <div>
            {pastTimesheetDetails}
        </div>
    );
}


