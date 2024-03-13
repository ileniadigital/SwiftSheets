import { useState } from 'react';

export default function AddEvent({addEventHandler}) {

    return(
        <div id='addEvent'>
            <button className = "closeEvent" onClick={addEventHandler}>X</button>
            Event Name:
            Event Date:
            Event Duration:
            Event 
        </div>
    )
}