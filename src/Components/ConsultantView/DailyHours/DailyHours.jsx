// Importing CSS
import './DailyHours.css'

export default function DailyHours() {

    // Retrieve start and end time from database 
    let startWorkHours = parseInt(localStorage.getItem('startWorkHours').slice(0,2))
    let startWorkMins = parseInt(localStorage.getItem('startWorkHours').slice(3,5))
    let endWorkHours = parseInt(localStorage.getItem('endWorkHours').slice(0,2))
    let endWorkMins = parseInt(localStorage.getItem('endWorkHours').slice(3,5))

    // Providing whole day as time slots if working hours extend across multiple days
    if (localStorage.getItem('24HoursWorked') === "true" || startWorkHours > endWorkHours || startWorkHours === endWorkHours && startWorkMins > endWorkMins) {
        startWorkHours = 0
        endWorkHours = 23
    }

    // No need to show hour block for hour that ends
    if (endWorkMins == 0) {
        endWorkHours-=1
    }

    console.log(startWorkHours, endWorkHours)
    // Array created to store hours in a day, represented as time
    let dailyHours = []

    for (let i = startWorkHours; i <= endWorkHours; i++) {
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