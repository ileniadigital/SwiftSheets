// Import stylesheets
import './Components/general.css';

// Import components 
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/Settings';
import ConsultantHome from './Pages/ConsultantView/ConsultantHome/ConsultantHome'
import Timesheet from './Pages/ConsultantView/Timesheet/Timesheet';
import Home from './Pages/Home';
import Name from './Components/NavBar/Name';
import ConsultantSettings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import TimesheetListView from './Pages/TimesheetListView';
import Login from './Pages/Login';

//ADD ROUTING BASED ON ROLE FROM DB
const role='consultant';

// Main App component
export default function App() {

  // Render page based on location
  let page
  switch (window.location.pathname) {
    default:
      page= <Login/>
      break
    case "/Home":
    case "/":
      page= <Home view={role}/>
      break
    case "/Account":
      page= <Account/>
      break
    case "/Settings":
      page= <Settings/>
      break
    case "/consultanthome":
      page = <ConsultantHome/>
      break
    case "/timesheet":
      page = <Timesheet/>
      break
    case "/linemanagerview":
      page = <TimesheetListView/>
      break
    case "/financeteamview":
      page = <TimesheetListView/>
      break
    case "/consultantsettings":
      page = <ConsultantSettings/>
      break
  }
  return (
    <>
        <NavBar view={role}/>
        <Name/>
        {page}
    </>
  )
}