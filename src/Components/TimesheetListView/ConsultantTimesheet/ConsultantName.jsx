import './ConsultantTimesheet.css'; //Import styling

//ConsultantName component
//To display the name of the consultant
export default function ConsultantName({ name }) { 
    if (name === null) {
        console.log("Name is null");
    } else { console.log(name) }

    return(
        <div className="consultantName-container">
            <p className="consultantName">{name}</p>
        </div>
    );
}