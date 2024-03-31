// Importing CSS
import './DeleteEventConfirmation.css'

// Displays pop-up to confirm that user wants to delete an event
export default function DeleteEventConfirmation({event, setOpenPopup}) {

    // Delete event
    const deleteEvent = () => {
        const events = JSON.parse(localStorage.getItem('events'))
        const newEvents = { ...events}; // Copying events
        delete newEvents[event]
        localStorage.setItem('events', JSON.stringify(newEvents))
        setOpenPopup(false)
        window.location.reload(); // Reload screen to update events
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