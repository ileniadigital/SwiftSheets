// Importing CSS
import './ConsultantHome.css'

// Importing dropdown menu icons
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

// Importing Components
import TimesheetDetails from '../../../Components/ConsultantView/TimesheetDetails/TimesheetDetails'
import PastTimesheets from '../../../Components/ConsultantView/PastTimesheets/PastTimesheets'

// Importing useState and useEffect
import { useState, useEffect } from 'react';
import { fetchTimesheetsbyID} from '../../../Components/Data/TimesheetData';
// Provides home page to user
export default function ConsultantHome() {
    //Retrieve timesheet data
    const id = 6; // Placeholder for user ID
    const [timesheets, setTimesheets] = useState([]);
    const [pastTimesheets, setPastTimesheets] = useState([]);

    // Stores whether button has been clicked; determines whether to show timesheet data
    const [isCurrentTimesheetClicked, setIsCurrentTimesheetClicked] = useState(true)
    const [isPastTimesheetsClicked, setIsPastTimesheetsClicked] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTimesheetsbyID(id);
                console.log("Data:", data);
                
                // Filter current and past timesheets based on end date and submission status
                const currentDate = new Date();
                const currentTimesheets = data.filter(ts => {
                    const endDate = new Date(ts.end_date);
                    return endDate >= currentDate && !ts.is_submitted;
                });
                const pastTimesheets = data.filter(ts => !currentTimesheets.includes(ts));

                setTimesheets(currentTimesheets);
                setPastTimesheets(pastTimesheets);
            } catch (error) {
                console.error('Error fetching timesheets:', error);
            }
        };

        fetchData();
    }, []);

    // Define currentTimesheets and pastTimesheets
    const currentTimesheets = timesheets.filter(ts => ts.current);
    const pastTimesheetsFiltered = pastTimesheets.filter(ts => !ts.current);

    // console.log("Timesheets:", timesheets);
    // timesheets.map(timesheet => console.log("Timesheet after fetching:", timesheet.id));
    
    return (
        <div className='main-con-home'>
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
                            <TimesheetDetails timesheet={currentTimesheets}/>
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
                        {isPastTimesheetsClicked && <PastTimesheets  pastTimesheets={pastTimesheetsFiltered}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
