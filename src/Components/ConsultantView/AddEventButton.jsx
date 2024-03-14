// Importing CSS
import '../../CSS/ConsultantView/AddEventButton.css';

// Importing Icons
import { FaCirclePlus } from "react-icons/fa6";

// Importing Component
import AddEvent from '../../Components/ConsultantView/AddEvent';

export default function AddEventButton({addEventClicked, addEventHandler, source}) {

    return(
    <div>
        {/* Creating button */}
        <button className = {`addEventButton ${source === 'fromHoursComponent' ? 'fromHours' : ''}`} onClick={addEventHandler} >
            <FaCirclePlus />
        </button>

        {/* Display AddEvent when button has been clicked*/}
        {addEventClicked && <AddEvent addEventHandler={addEventHandler}/>} 
    </div> 
    )
}