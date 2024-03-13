export default function DailyHours() {

    let dailyHours = []

    for (let i = 0; i < 24; i++)
    {
        dailyHours.push(
            <div key={i} className="dailyHour">
                {String(i).padStart(2,'0')}:00
            </div>
        )
    }

    return(
        <div id='dailyHours'>
            {dailyHours}
        </div>
    )
}