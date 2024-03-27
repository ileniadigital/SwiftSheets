// Import stylesheets
import './Components/general.css';

// Import components 
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/Settings';
import ConsultantView from './Pages/ConsultantView';
import Home from './Pages/Home';
import Name from './Components/NavBar/Name';
import TimesheetListView from './Pages/TimesheetListView';

//ADD ROUTING BASED ON ROLE FROM DB
const role='consultant';

// Main App component
function App() {
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
      page= <Settings/>
      break
    case "/consultantview":
      page = <ConsultantView/>
      break
    case "/linemanagerview":
      page = <TimesheetListView/>
      break
    case "/financeteamview":
      page = <TimesheetListView/>
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

export default App;
