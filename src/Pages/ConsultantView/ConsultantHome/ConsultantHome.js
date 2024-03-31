// Importing CSS
import './ConsultantHome.css'
import '../../../Components/general.css'

// Importing dropdown menu icons
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

// Importing Components
import TimesheetDetails from '../../../Components/ConsultantView/TimesheetDetails/TimesheetDetails'
import PastTimesheets from '../../../Components/ConsultantView/PastTimesheets/PastTimesheets'

// Importing useState and useEffect
import { useState, useEffect } from 'react';

// Provides home page to user
export default function ConsultantHome() {

    // Testing retrieval of current timesheet
    // Store the timesheet data in local storage
    const timesheetData = {
        week: "25/03/24 – 31/03/24",
        submissionStatus: "Unsubmitted",
        reviewStatus: "Approved",
        paymentStatus: "Pending",
        isSubmitted: true,
        submissionTime: null,
        events: {
            event1: {
                startTime: '13:00',
                endTime: '15:00',
            },
            event2: {
                startTime: '13:00',
                endTime: '15:00',
            },
            event3: {
                startTime: '13:24',
                endTime: '15:36',
            },
            event4: {
                startTime: '13:00',
                endTime: '15:00',
            },
            event5: {
                startTime: '13:00',
                endTime: '15:00',
            },
            event6: {
                startTime: '13:00',
                endTime: '15:00',
            },
            event7: {
                startTime: '13:00',
                endTime: '11:00',
            },
        }
    };
  
    localStorage.setItem('currentTimesheet', JSON.stringify(timesheetData));

    const timesheets = {
        timesheetData1: {
            week: "18/02/30 – 25/02/30",
            submissionStatus: "saved",
            reviewStatus: "Approved",
            paymentStatus: "Pending"
        },

        timesheetData2: {
            week: "18/02/30 – 25/02/30",
            submissionStatus: "saved",
            reviewStatus: "Approved",
            paymentStatus: "Approved"
        },

        timesheetData3: {
            week: "18/02/30 – 25/02/30",
            submissionStatus: "saved",
            reviewStatus: "Approved",
            paymentStatus: "Approved"
        },

        timesheetData4: {
            week: "18/02/30 – 25/02/30",
            submissionStatus: "saved",
            reviewStatus: "Pending",
            paymentStatus: "Approved"
        },

        timesheetData5: {
            week: "18/02/30 – 25/02/30",
            submissionStatus: "saved",
            reviewStatus: "Pending",
            paymentStatus: "Approved"
        },

        timesheetData6: {
            week: "18/02/30 – 25/02/30",
            submissionStatus: "saved",
            reviewStatus: "Pending",
            paymentStatus: "Approved"
        },

        timesheetData7: {
            week: "18/02/30 – 25/02/30",
            submissionStatus: "saved",
            reviewStatus: "Pending",
            paymentStatus: "Approved"
        },

        timesheetData8: {
            week: "18/02/30 – 25/02/30",
            submissionStatus: "saved",
            reviewStatus: "Pending",
            paymentStatus: "Approved"
        },

        timesheetData9: {
            week: "18/02/30 – 25/02/30",
            submissionStatus: "saved",
            reviewStatus: "Pending",
            paymentStatus: "Pending"
        }
    };
  
    localStorage.setItem('pastTimesheets', JSON.stringify(timesheets));


    const currentTimesheet = JSON.parse(localStorage.getItem('currentTimesheet'));


    // Initialising database values on component mount if values do not exist
    useEffect(() => {
        if (!localStorage.getItem('daysWorked')) {
            localStorage.setItem('daysWorked', JSON.stringify([0, 1, 2, 3, 4, 5, 6]))
        }

        if (!localStorage.getItem('startWorkHours')) {
            localStorage.setItem('startWorkHours', "00:00")
        }

        if (!localStorage.getItem('endWorkHours')) {
            localStorage.setItem('endWorkHours', "23:00")
        }

        if (!localStorage.getItem('24HoursWorked')) {
            localStorage.setItem('24HoursWorked', false)    
        }
    }, [])

    // Stores whether button has been clicked; determines whether to show timesheet data
    const [isCurrentTimesheetClicked, setIsCurrentTimesheetClicked] = useState(true)
    const [isPastTimesheetsClicked, setIsPastTimesheetsClicked] = useState(true)

    return (
        <div className='consultant-home'>
            {/* Displaying current week's timesheet based on whether dropdown is clicked */}
            <div className='current-timesheet-container'>
                <div className='dropdown-menu'>
                    <p>Current Timesheet</p>
                    <button className='dropdown' onClick={() => setIsCurrentTimesheetClicked(!isCurrentTimesheetClicked)}>
                        {isCurrentTimesheetClicked ? <IoIosArrowDropupCircle/> : <IoIosArrowDropdownCircle /> }
                    </button>
                </div>
                { isCurrentTimesheetClicked && 
                    <div className='current-timesheet'>
                        <TimesheetDetails timesheet={currentTimesheet}/>
                    </div> 

                }
            </div>

            {/* Displaying past timesheets based on whether dropdown is clicked */}
            <div className='past-timesheets'>
                <div className='dropdown-menu'>
                    <p>Past Timesheets</p>
                    <button className='dropdown' onClick={() => setIsPastTimesheetsClicked(!isPastTimesheetsClicked)}>
                        {isPastTimesheetsClicked ? <IoIosArrowDropupCircle/> : <IoIosArrowDropdownCircle /> }
                    </button>
                </div>
                <div className='past-timesheet'>
                    {isPastTimesheetsClicked && <PastTimesheets/>}
                </div>
            </div>
        </div>

    )
}