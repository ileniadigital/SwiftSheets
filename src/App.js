// Import stylesheets
import './Components/general.css';

// Import components 
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/Settings';
import ConsultantView from './Pages/ConsultantView';
import Home from './Pages/Home';
import LineManagerView from './Pages/LineManagerView';
import Name from './Components/NavBar/Name';
import SystemAdminView from './Pages/SystemAdminView';

//ADD ROUTING BASED ON ROLE FROM DB
const role='systemadmin';

// Main App component
function App() {
  // Render page based on location
  let page
  switch (window.location.pathname) {
    // default:
    //   page= <LogIn/>
    //   break
    case "/Home":
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
      page = <LineManagerView/>
      break
    case "/systemadminview":
      page = <SystemAdminView/>
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
