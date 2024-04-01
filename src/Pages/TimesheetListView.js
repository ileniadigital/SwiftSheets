import '../Components/TimesheetListView/TimesheetListView.css'; //Import styling
import ConsultantTimesheet from '../Components/TimesheetListView/ConsultantTimesheet/ConsultantTimesheet';

//MODIFY TO HAVE FILTERS AT THE TOP
const timesheets=[
  {
    "name": "John Doe",
    "dates": "01/01/2021 - 01/07/2021",
    "reviewStatus": "Pending",
    "paymentStatus": "Pending"
  },
  {
    "name": "Jane Smith",
    "dates": "01/01/2021 - 01/07/2021",
    "reviewStatus": "Pending",
    "paymentStatus": "Rejected"
  },
  {
    "name": "John Smith",
    "dates": "01/01/2021 - 01/07/2021",
    "reviewStatus": "Approved",
    "paymentStatus": "Pending"
  },
  {
    "name": "Jonny Smith",
    "dates": "01/01/2021 - 01/07/2021",
    "reviewStatus": "Pending",
    "paymentStatus": "Rejected"
  },
  {
    "name": "John Doe",
    "dates": "01/01/2021 - 01/07/2021",
    "reviewStatus": "Pending",
    "paymentStatus": "Pending"
  },
  {
    "name": "Jane Smith",
    "dates": "01/01/2021 - 01/07/2021",
    "reviewStatus": "Pending",
    "paymentStatus": "Rejected"
  },
  {
    "name": "John Doe",
    "dates": "01/01/2021 - 01/07/2021",
    "reviewStatus": "Pending",
    "paymentStatus": "Pending"
  },
  {
    "name": "Jane Smith",
    "dates": "01/01/2021 - 01/07/2021",
    "reviewStatus": "Pending",
    "paymentStatus": "Rejected"
  },
]



//LineManagerView component
export default function TimesheetListView({role}) {
  return (
    <div className='list-container'>
      {/* Categories */}
      <div className="categories-container">
        <div className="category">
          <h2>Name</h2>
        </div>
        <div className="category">
          <h2>Dates </h2>
        </div>
        <div className="category-review">
          <h2>Review Status</h2>
        </div>
        <div className="category-payment">
          <h2>Payment Status</h2>
        </div>
      </div>
      {/* Displaying consultant timesheets */}
      <div className='timesheet-container'>
        {timesheets.map((timesheet, index) => (
          <ConsultantTimesheet key={index} name={timesheet.name} dates={timesheet.dates} reviewStatus={timesheet.reviewStatus} paymentStatus={timesheet.paymentStatus} role={role}/>
        ))}
      </div>
    </div>
  );
}
