// Importing css
import './ConsultantDashboard.css'

// Importing dropdown menu icons
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import { useState } from 'react';
import DisplayDetails from '../../../Components/ConsultantView/DisplayDetails/DisplayDetails';

// Displays dashboard for consultant
export default function ConsultantDashboard() {
    // Stores whether button has been clicked; determines whether to show timesheet data
    const [isPaymentsReceived, setIsPaymentsReceived] = useState(true)
    const [isPendingApprovals, setIsPendingApprovals] = useState(true)

    const getWeeklyHours = () => {
        let weeklyHours = 0;
        // replace with iteration that goes through each event and extracts the duration (startTime-endTime)
        const timesheet = JSON.parse(localStorage.getItem('currentTimesheet')).events
        for (const event in timesheet) {
            const currentEvent = timesheet[event];
            let startTimeHours = parseInt(currentEvent.startTime.slice(0,2))
            let startTimeMins = parseInt(currentEvent.startTime.slice(3,5))
            let startTimeInMins = (startTimeHours*60) + startTimeMins 
            let endTimeHours = parseInt(currentEvent.endTime.slice(0,2))
            let endTimeMins= parseInt(currentEvent.endTime.slice(3,5))
            let endTimeInMins = (endTimeHours*60) + endTimeMins 

            let duration = (endTimeInMins-startTimeInMins)/60

            // Cases where consultant worked for more that one day
            if (duration < 0) {
                duration+=24
            }
            weeklyHours += duration
        }
        return weeklyHours;
    }

    return (
        <div className='dashboard-container'>
            <div className='weekly-hours'>
                <p>Weekly Hours Logged </p>
                <span className='hours'>{getWeeklyHours()}</span>
            </div>
            <div className='container'>
                <div className='dropdown-menu'>
                    <p>Payments Received</p>
                    <button className='dropdown' onClick={() => setIsPaymentsReceived(!isPaymentsReceived)}>
                        {isPaymentsReceived ? <IoIosArrowDropupCircle/> : <IoIosArrowDropdownCircle /> }
                    </button>
                </div>
                { isPaymentsReceived && 
                    <div className='data'>
                        <DisplayDetails attributeChecked={"paymentStatus"} value={'Approved'} />
                    </div>
                }
            </div>

            <div className='container'>
                <div className='dropdown-menu'>
                    <p>Pending Timesheet Approvals</p>
                    <button className='dropdown' onClick={() => setIsPendingApprovals(!isPendingApprovals)}>
                        {isPendingApprovals ? <IoIosArrowDropupCircle/> : <IoIosArrowDropdownCircle /> }
                    </button>
                </div>
                { isPendingApprovals && 
                    <div className='data'>
                        <DisplayDetails attributeChecked={"reviewStatus"} value={'Pending'} />
                    </div> 
                }
            </div>
        </div>
    )
}