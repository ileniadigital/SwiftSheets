// import TimesheetDetails from "../TimesheetDetails/TimesheetDetails";

// export default function PastTimesheets() {

//     const pastTimesheets = JSON.parse(localStorage.getItem('pastTimesheets')) || []
    

//     let pastTimesheetDetails = []
//     for (const key in pastTimesheets) {
//         pastTimesheetDetails.push(
//         <TimesheetDetails key ={key} timesheet = {pastTimesheets[key]}/>
//         )
//     }

//     return (
//         <div>
//             {pastTimesheetDetails}
//         </div>
//     )
// }

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


