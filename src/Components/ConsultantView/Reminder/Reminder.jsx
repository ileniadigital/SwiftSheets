// Importing css
import './Reminder.css'

export default function Reminder({message, setReminder}) {

    return (
        <div className='reminder-container'>
            <div className='reminder'>
                <p>{message}</p>
                <button onClick={() => setReminder(false)}>OK</button>
            </div>
        </div>
    )
}