import './ConsultantHome.css'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import TimesheetDetails from '../../../Components/ConsultantView/TimesheetDetails/TimesheetDetails'
import PastTimesheets from '../../../Components/ConsultantView/PastTimesheets/PastTimesheets'
import { useState, useEffect } from 'react';
import { fetchTimesheetsbyID, createTimesheet } from '../../../Components/Data/TimesheetData';

export default function ConsultantHome() {
    const id = 6; // Placeholder for user ID
    const [timesheets, setTimesheets] = useState([]);
    const [pastTimesheets, setPastTimesheets] = useState([]);
    const [isCurrentTimesheetClicked, setIsCurrentTimesheetClicked] = useState(true)
    const [isPastTimesheetsClicked, setIsPastTimesheetsClicked] = useState(true)
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTimesheetsbyID(id);
                const currentDate = new Date();
                const currentTimesheets = data.filter(ts => {
                    const endDate = new Date(ts.end_date);
                    const isSubmitted = ts.is_submitted;
                    return endDate >= currentDate && !isSubmitted;
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

    const isCurrentWeek = (date) => {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    };

    const refreshPage = () => {
        navigate('/');
    };

    return (
        <div className='main-con-home'>
            <div className='consultant-home'>
                <div className='current-timesheet-container'>
                    <div className='dropdown-menu'>
                        <p>Current Timesheet</p>
                        <button className='dropdown' onClick={() => setIsCurrentTimesheetClicked(!isCurrentTimesheetClicked)}>
                            {isCurrentTimesheetClicked ? <IoIosArrowDropupCircle/> : <IoIosArrowDropdownCircle /> }
                        </button>
                    </div>
                    { isCurrentTimesheetClicked && 
                        <div className='current-timesheet'>
                            {timesheets.map((timesheet, index) => (
                                <TimesheetDetails key={index} timesheet={timesheet} />
                            ))}
                            {timesheets.length === 0 && 
                                // Check if there's a submitted timesheet for the current week in past timesheets
                                (pastTimesheets.some(timesheet => isCurrentWeek(new Date(timesheet.end_date)) && timesheet.is_submitted) ? 
                                    // If there's a submitted timesheet, display it
                                    pastTimesheets.filter(timesheet => isCurrentWeek(new Date(timesheet.end_date)) && timesheet.is_submitted)
                                        .map((timesheet, index) => (
                                            <TimesheetDetails key={index} timesheet={timesheet} />
                                        ))
                                    :
                                    // If there's no submitted timesheet, display the button for creating a new timesheet
                                    <button onClick={() => { createTimesheet(id); refreshPage(); }}>Create New Timesheet</button>
                                )
                            }
                        </div> 
                    }
                </div>

                <div className='past-timesheets'>
                    <div className='dropdown-menu'>
                        <p>Past Timesheets</p>
                        <button className='dropdown' onClick={() => setIsPastTimesheetsClicked(!isPastTimesheetsClicked)}>
                            {isPastTimesheetsClicked ? <IoIosArrowDropupCircle/> : <IoIosArrowDropdownCircle /> }
                        </button>
                    </div>
                    <div className='past-timesheet'>
                        {isPastTimesheetsClicked && <PastTimesheets  pastTimesheets={pastTimesheets}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
