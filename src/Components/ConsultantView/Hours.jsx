export default function Hours() {

    let hoursArray = []
    for (let i = 0; i < 24; i ++)
    {
        hoursArray.push(
            <div className="hourBlock">
            </div>
        )
    }
    return(
        <div className="hoursContainer">
            {hoursArray}
        </div>
    )
}