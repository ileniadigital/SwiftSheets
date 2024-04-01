// Import stylesheets
import './Components/general.css';

// Import components 
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Timesheet from './Pages/ConsultantView/Timesheet/Timesheet';
import Home from './Pages/Home';
import Name from './Components/NavBar/Name';
import ConsultantSettings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import TimesheetListView from './Pages/TimesheetListView';

//ADD ROUTING BASED ON ROLE FROM DB
const role='financeteam';

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
      page = <Timesheet/>
      break
    // THESE ARE TO BE REMOVED BECAUSE ONCE WE HAVE THE ROLE FROM THE DB, WE CAN USE THAT TO DETERMINE THE VIEW
    //THEY WILL BE ACCESSED VIA THE HOME PAGE
    // case "/linemanagerview":
    //   page = <TimesheetListView/>
    //   break
    // case "/financeteamview":
    //   page = <TimesheetListView/>
    //   break
  }
  return (
    <>
        <NavBar view={role}/>
        <Name/>
        {page}
    </>
  )
}