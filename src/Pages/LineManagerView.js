import '../CSS/LineManagerView/LineManagerView.css'; //Import styling
import ConsultantTimesheet from '../Components/LineManagerView/ConsultantTimesheet';

//MODIFY TO MAKE SCROLLABLE PAGES
//MODIFY TO HAVE FILTERS AT THE TOP

//LineManagerView component
function LineManagerView() {
  return (
    <div className='linemanager-container'>
      
      <div className='timesheet-container'>
        <ConsultantTimesheet/>
        <ConsultantTimesheet/>
        <ConsultantTimesheet/>
        <ConsultantTimesheet/>
      </div>
    </div>
  );
}

//Export LineManagerView component
export default LineManagerView;