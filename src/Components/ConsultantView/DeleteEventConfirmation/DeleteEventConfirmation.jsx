// Importing CSS
import './DeleteEventConfirmation.css'

// Displays pop-up to confirm that user wants to delete an event
export default function DeleteEventConfirmation({event, setOpenPopup}) {

    // Delete event
    const deleteEvent = () => {

        setOpenPopup(false)
        // window.location.reload(); // Reload screen to update events
    }

    return (
        <div className='popup-container' onClick={(event) => event.stopPropagation()}>
            <div className='popup'>
                <p>Are you sure you want to delete this event? This action cannot be undone. </p>
                <div className='popup-buttons'>
                    <div className='button' onClick={deleteEvent}>
                        Yes
                    </div>
                    <div className='button' onClick={() => setOpenPopup(false)}>
                        No
                    </div>
                </div>    
            </div>
        </div>
    )
}