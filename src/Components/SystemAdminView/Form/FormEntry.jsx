// Importing CSS
import './FormEntry.css'

export default function FormEntry ({ formData, viewFormHandler }) {
    let type = formData.type
    let subject = formData.subject
    return (
        <div className="formEntryContainer">
            <div className='formEntry'>
                <div className= 'user'>
                </div>
                <div className='username'>
                    {/* Add users name and surname here */}
                    Jane Smith
                </div>
                <div>
                    {subject}
                </div>
            </div>
            {/* Button redirects user to current timesheet */}
            <div className='viewForm' onClick={() => viewFormHandler(formData)}>
                <button className='click'>Click to View</button>
            </div>
        </div>
    )
}