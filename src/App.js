// Import stylesheets
import './Components/general.css';

// Import components 
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Timesheet from './Pages/ConsultantView/Timesheet/Timesheet';
import ConsultantDashboard from './Pages/ConsultantView/ConsultantDashboard/ConsultantDashboard';
import Home from './Pages/Home';
import Name from './Components/NavBar/Name';
import SystemAdminView from './Pages/SystemAdminView';
import ConsultantSettings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import Form from './Components/Form/Form';
import CompletionReminder from './Components/ConsultantView/Reminder/CompletionReminder';
import StartReminder from './Components/ConsultantView/Reminder/StartReminder';

//ADD ROUTING BASED ON ROLE FROM DB
const role='consultant';

// Main App component
export default function App() {

  // Render page based on location
  let page
  switch (window.location.pathname) {
    // default:
    //   page= <LogIn/>
    //   break
    case "/Home":
    case "/":
      page= <Home view={role}/>
      break
    case "/Account":
      page= <Account/>
      break
    case "/Settings":
      page= <ConsultantSettings/>
      break
    case "/timesheet":
      page = <Timesheet />
      break
    case "/consultantdashboard":
      page = <ConsultantDashboard/>
      break
    case "/systemadminview":
      page = <SystemAdminView/>
      break
    case "/form":
      page = <Form/>
      break
  }

  return (
    <>
        <NavBar view={role}/>
        <Name/>
        {page}
        {role === 'consultant' && 
        <>
          <CompletionReminder/>
          <StartReminder/>
        </>
        }
    </>
  )
}