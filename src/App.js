// Import stylesheets
import './Components/general.css';

// Import components 
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/Settings';
import ConsultantHome from './Pages/ConsultantView/ConsultantHome'
import Timesheet from './Pages/ConsultantView/Timesheet';
import Home from './Pages/Home';
import LineManagerView from './Pages/LineManagerView';
import Name from './Components/NavBar/Name';
import ConsultantSettings from './Pages/ConsultantView/ConsultantSettings';

// Main App component
export default function App() {

  // Render page based on location
  let page
  switch (window.location.pathname) {
    default:
      page= <Home/>
      break
    case "/Home":
      page= <Home/>
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
      page = <LineManagerView/>
      break
    case "/consultantsettings":
      page = <ConsultantSettings/>
      break
  }
  return (
    <>
        <NavBar/>
        <Name/>
        {page}
    </>
  )
}