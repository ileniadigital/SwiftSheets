export default function Hours() {

    let hoursArray = []
    for (let i = 0; i < 23; i ++)
    {
        i < 22 ?(
        hoursArray.push(
            <div key={i} className="hourBlock addUnderline">
            </div>
        )
        ) : (
            hoursArray.push(
                <div key = {i} className="hourBlock">
                </div>
            )
        )
    }
    return(
        <div className="hoursContainer">
            {hoursArray}
        </div>
    )
}