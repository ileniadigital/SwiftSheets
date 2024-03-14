// Importing CSS
import '../../CSS/ConsultantView/Hours.css';

export default function Hours({addEventHandler}) {

    // Creating array to store each hour in day as a time slot
    let hoursArray = []
    for (let i = 0; i < 24; i ++)
    {
        /* If statement used to ensure last div does not have a line underneath; maintaining rounded
        edges of border */
        i < 23 ?(
        hoursArray.push(
            <button key={i} className="hourBlock addUnderline" onClick={addEventHandler}></button>
        )
        ) : (
            hoursArray.push(
                <button key = {i} className="hourBlock" onClick={addEventHandler}></button>
            )
        )
    }
    return(
        // Stroing all hours in a container
        <div id="hoursContainer">
            {hoursArray}
        </div>
    )
}