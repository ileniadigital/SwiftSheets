// Importing CSS
import '../../CSS/ConsultantView/Hours.css';

export default function Hours({addEventHandler}) {

    let hoursArray = []
    for (let i = 0; i < 24; i ++)
    {
        i < 23 ?(
        hoursArray.push(
            <button key={i} className="hourBlock addUnderline" onClick={addEventHandler}>
            </button>
        )
        ) : (
            hoursArray.push(
                <button key = {i} className="hourBlock" onClick={addEventHandler}>
                </button>
            )
        )
    }
    return(
        <div className="hoursContainer">
            {hoursArray}
        </div>
    )
}