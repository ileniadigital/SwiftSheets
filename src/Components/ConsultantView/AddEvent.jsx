export default function AddEvent({addEventHandler}) {

    return(
        <div id='addEvent'>
            <button className = "closeEvent" onClick={addEventHandler}>X</button>
            <p>Event Name:</p>
            <p>Date:</p>
            <p>Event Duration:</p>
            <p>Event Type:</p>
            <p>Event Category:</p>
        </div>
    )
}