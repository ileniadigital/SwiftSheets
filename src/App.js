import React from 'react';
import NavBar from './Components/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/Settings';
import ConsultantView from './Pages/ConsultantView';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/consultantview" element={<ConsultantView />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
