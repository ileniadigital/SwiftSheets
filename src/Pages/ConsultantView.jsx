import'../CSS/consultantView.css';
import WeekDay from '../Components/ConsultantView/WeekDay';

export default function ConsultantView() {

    // Function that retrieves the first day of the week (assumed to be monday)
    function getWeekDay(currentWeek, dayToRetrieve)
    {
        let weekDay = new Date(currentWeek); // Creates copy of current week

        /* Subtracts curent day of week to get 'Sunday' (start of the week)
           Adds daysToRetrrieve to get the target day */
           weekDay.setDate(weekDay.getDate() - weekDay.getDay() + dayToRetrieve) 
        
        /* Series of function calls to return the date in the desired format  
           .padStart() used to add leading zeroes to the day & month */

        let day = weekDay.getDate().toString().padStart(2, '0');
        let month = (weekDay.getMonth() + 1).toString().padStart(2,'0'); // + 1 due to 0 indexing
        let year = weekDay.getFullYear();

        let formattedDate = `${day}/${month}/${year}`
        return formattedDate 
    }


    let currentWeek = new Date();
    const weekBeginning = getWeekDay(currentWeek, 1)
    const weekEnd = getWeekDay(currentWeek, 7)
    

    return(
    <div id = 'consultantView'>
        <div>
            <div>
                <img src="src/images/consultantView/previous.svg" alt="Previous" />
            </div>
            <div className=''>
                <h1 className='welcomeMessage'>Hi !</h1>
                <h2 className='currentWeek'>{weekBeginning} - {weekEnd}</h2>
            </div>
        </div>
        <div id = 'weekContainer'>
            <WeekDay day='MON'/>
            <WeekDay day='TUE'/>
            <WeekDay day='WED'/>
            <WeekDay day='THU'/>
            <WeekDay day='FRI'/>
            <WeekDay day='SAT'/>
            <WeekDay day='SUN'/>
        </div>
    </div> 
    )
}