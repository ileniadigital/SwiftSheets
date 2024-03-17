// Import stylesheets
import './CSS/general.css';

// Import components 
import NavBar from './Components/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/Settings';
import ConsultantView from './Pages/ConsultantView';
import Home from './Pages/Home';
import LineManagerView from './Pages/LineManagerView';
// Main App component
function App() {
  // Render page based on location
  let page
  switch (window.location.pathname) {
    case "/Home":
      page= <Home/>
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
  }
  return (
    <>
        <NavBar/>
        {page}
    </>
  )
}

export default App;
