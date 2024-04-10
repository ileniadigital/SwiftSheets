import './ConsultantTimesheet.css'; //Import styling

//ConsultantName component
//To display the name of the consultant
export default function ConsultantName({ name }) { 
    if (name === null) {
        name= "Consultant Name";
    } 
    return(
        <div className="consultantName-container">
            <p className="consultantName">{name}</p>
        </div>
    );
}