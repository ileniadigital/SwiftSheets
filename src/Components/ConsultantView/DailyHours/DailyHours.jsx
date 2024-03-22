// Importing CSS
import './DailyHours.css'

export default function DailyHours() {

    // Array created to store hours in a day, represented as time
    let dailyHours = []
    for (let i = 0; i < 24; i++)
    {
        dailyHours.push(
            <div key={i} className="daily-hour">
                {String(i).padStart(2,'0')}:00
            </div>
        )
    }

    // Hours in a day stored in a parent div
    return(
        <div>
            {dailyHours}
        </div>
    )
}