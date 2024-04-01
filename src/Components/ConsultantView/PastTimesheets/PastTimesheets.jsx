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

import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import TimesheetDetails from "../TimesheetDetails/TimesheetDetails";

export default function PastTimesheets() {
    const [pastTimesheets, setPastTimesheets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        user_email = "Asus@gmail.com";

        Axios.get(`http://localhost:8000/timesheet/?user_email=${user_email}`)
            .then(response => {
                setPastTimesheets(response.data);
            })
            .catch(error => {
                console.log(error);
                setError("An error occurred while fetching the timesheets.");
            });
    }, []); 

    const renderContent = () => {
        if (error) {
            return <div>{error}</div>;
        }
        if (pastTimesheets.length === 0) {
            return <div>No past timesheets found.</div>;
        }
        return pastTimesheets.map(timesheet => (
            <TimesheetDetails key={timesheet.id} timesheet={timesheet}/>
        ));
    };

    return (
        <div>
            <h2>Past Timesheets</h2>
            {renderContent()}
        </div>
    );
}