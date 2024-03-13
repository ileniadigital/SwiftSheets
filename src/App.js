import NavBar from './Components/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/Settings';
import ConsultantView from './Pages/ConsultantView';
import Home from './Pages/Home';
function App() {
  let page
  switch (window.location.pathname) {
    case "/":
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
  }
  return (
    <>
        <NavBar/>
        {page}
    </>
  )
}

export default App;
