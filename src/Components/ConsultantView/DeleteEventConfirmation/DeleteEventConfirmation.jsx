// Importing CSS
import './DeleteEventConfirmation.css'

// Displays pop-up to confirm that user wants to delete an event
export default function DeleteEventConfirmation({event, setOpenPopup}) {

    // Delete event
    const deleteEvent = () => {
        const events = JSON.parse(localStorage.getItem('events'))
        const newEvents = {}; // Initialize an empty object for updated events
            for (const key in events) {
                if (events[key].id !== event) { // Exclude the event to delete
                    newEvents[key] = events[key]; // Copy non-deleted events to the updated object
                }
            }
        localStorage.setItem('events', JSON.stringify(newEvents))
        setOpenPopup(false)
    }

    return (
        <div className='popup-container' onClick={(event) => event.stopPropagation()}>
            <div className='popup'>
                <p>Are you sure you want to delete this event? This action cannot be undone. </p>
                <div className='popup-buttons'>
                    <button onClick={deleteEvent}>
                        Yes
                    </button>
                    <button onClick={() => setOpenPopup(false)}>
                        No
                    </button>
                </div>    
            </div>
        </div>
    )
}