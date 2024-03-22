import '../Components/LineManagerView/LineManagerView.css'; //Import styling
import ConsultantTimesheet from '../Components/LineManagerView/ConsultantTimesheet/ConsultantTimesheet';

//MODIFY TO MAKE SCROLLABLE PAGES
//MODIFY TO HAVE FILTERS AT THE TOP

//LineManagerView component
function LineManagerView() {
  return (
    <div className='linemanager-container'>
      {/* Categories */}
      <div className="categories-container">
        <div className="category">
          <h2>Name</h2>
        </div>
        <div className="category">
          <h2>Dates </h2>
        </div>
        <div className="category">
          <h2>Review Status</h2>
        </div>
        <div className="category">
          <h2>Payment Status</h2>
        </div>
      </div>
      {/* Displaying consultant timesheets */}
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