// Importing CSS
import './DailyHours.css'

export default function DailyHours() {

    // Retrieve start and end time from database 
    let startWorkHours = parseInt(localStorage.getItem('startWorkHours').slice(0,3))
    let endWorkHours = parseInt(localStorage.getItem('endWorkHours').slice(0,3))

    console.log(startWorkHours, endWorkHours)
    // Array created to store hours in a day, represented as time
    let dailyHours = []

    /* endworkhours adds 1 in the for the end time of the block, if it's 23 then 
       there is no need for 24 to be shown as 00 is at the top */
    if (endWorkHours === 23) {
        endWorkHours = 22
    }

    for (let i = startWorkHours; i <= endWorkHours+1; i++) {
        dailyHours.push(
            <div key={i} className="daily-hour">
                {String(i).padStart(2,'0')}:00
            </div>
        )
    }

    // Hours in a day stored in a parent div
    return(
        <div className='daily-hours'>
            {dailyHours}
        </div>
    )
}