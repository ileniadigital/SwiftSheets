import './Components/general.css';
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Timesheet from './Pages/ConsultantView/Timesheet/Timesheet';
import Home from './Pages/Home';
import Name from './Components/NavBar/Name';
import Settings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import Login from './Pages/Login';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

// Main App component
export default function App() {
  const [role, setRole] = useState('');
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const user_role = localStorage.getItem('role');
    // Correctly parse the 'loggedin' state as a boolean
    const isLoggedin = localStorage.getItem('loggedin') === 'true';

    setRole(user_role);
    setLoggedin(isLoggedin);
    
    console.log(user_role);
  }, []); // The empty array means this effect runs once on mount

  return (
    <React.Fragment>
      <NavBar/>
      <Name/>
      <BrowserRouter>
        <Routes>
          {/* Redirect to Login if not logged in */}
          <Route path="/" element={!loggedin ? <Navigate to="/Login" /> : <Navigate to="/Home" />} />
          <Route path="/Home" element={loggedin ? <Home role={role} /> : <Navigate to="/Login" />} />
          <Route path="/Account" element={loggedin ? <Account /> : <Navigate to="/Login" />} />
          <Route path="/Settings" element={loggedin ? <Settings /> : <Navigate to="/Login" />} />
          <Route path="/timesheet/:timesheetId" element={loggedin ? <Timesheet /> : <Navigate to="/Login" />} />

          {/* Redirect to Home if already logged in and trying to access Login page */}
          <Route path="/Login" element={!loggedin ? <Login /> : <Navigate to="/Home" />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
