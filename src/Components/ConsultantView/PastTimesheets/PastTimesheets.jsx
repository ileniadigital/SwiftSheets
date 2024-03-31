// import TimesheetDetails from "../TimesheetDetails/TimesheetDetails";

// export default function PastTimesheets() {

//     const pastTimesheets = JSON.parse(localStorage.getItem('pastTimesheets')) || []
    

//     let pastTimesheetDetails = []
//     for (const key in pastTimesheets) {
//         pastTimesheetDetails.push(
//         <TimesheetDetails timesheet = {pastTimesheets[key]}/>
//         )
//     }

//     return (
//         <div>
//             {pastTimesheetDetails}
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import TimesheetDetails from "../TimesheetDetails/TimesheetDetails";

export default function PastTimesheets() {
    const [pastTimesheets, setPastTimesheets] = useState([]);

    useEffect(() => {
        // const userId = localStorage.getItem('userId');
        const userId = 'Sandeep@gmail.com';
        Axios.get(`http://localhost:8000/timesheet/?user_email=Sandeep@gmail.com`)
        .then(response => {
                setPastTimesheets(response.data);
            })
            .catch(error => console.log(error));
    }, []); 

    console.log(pastTimesheets);

    let pastTimesheetDetails = pastTimesheets.map(timesheet => (
        <TimesheetDetails key={timesheet.id} timesheet={timesheet}/>
    ));

    return (
        <div>
            {pastTimesheetDetails}
        </div>
    );
}
