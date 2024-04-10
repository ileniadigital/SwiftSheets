import './Components/general.css';
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Timesheet from './Pages/ConsultantView/Timesheet/Timesheet';
import Home from './Pages/Home';
import Name from './Components/NavBar/Name';
import Settings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import SystemAdminForm from './Pages/SystemAdminView/SystemAdminForm/SystemAdminForm';

import Login from './Pages/Login';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

// Main App component
export default function App() {
  const [role, setRole] = useState('');
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {;
    const user_role = localStorage.getItem('role');
    const loggedin = localStorage.getItem('loggedin');

    setRole(user_role);
    setLoggedin(loggedin); // Parse the string to boolean
                   //comment
    
    console.log(user_role);
  }, []); // The empty array means this effect runs once on mount

  return (
    <React.Fragment>
      <NavBar view={role}/>
      <Name/>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home role={role} />} />
          <Route path="/Home" element={<Home role={role} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Settings" element={<Settings />} />
          {/* Route to a timesheet based on ID */}
          <Route path="/timesheet/:timesheetId" element={<Timesheet />} />
          <Route path="/systemadminform" element={<SystemAdminForm />} />
          <Route path="/systemadminform" element={<SystemAdminForm />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}