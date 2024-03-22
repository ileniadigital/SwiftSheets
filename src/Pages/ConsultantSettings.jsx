// Importing necessary components
import '../Components/general.css';
import '../Components/ConsultantSettings/ConsultantSettings.css'

export default function ConsultantSettings() {

    function test() {
        console.log("clicked")
    }

    return (
        <div className='settings'>
            <h1 className='header'>Settings</h1>
            <div className='settings-items'>
                <div className='days-of-week-worked'>
                    <p>Select Working Days</p>
                    <div className='days-of-week'>
                        <button className='day-of-week' onClick={() => test}>M</button>
                        <button className='day-of-week'>T</button>
                        <button className='day-of-week'>W</button>
                        <button className='day-of-week'>T</button>
                        <button className='day-of-week'>F</button>
                        <button className='day-of-week'>S</button>
                        <button className='day-of-week'>S</button>
                    </div>
                </div>
            </div>
        </div>
    )
}