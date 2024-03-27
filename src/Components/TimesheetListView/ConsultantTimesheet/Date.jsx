import './ConsultantTimesheet.css'; //Import styling

//Date component
//To display the date of the timesheet of the working week 
export default function Date({dates}) {
    return(
        <div className="date-container">
            <p className="date-text">{dates}</p>
        </div>
    );
}
