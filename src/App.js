// Import stylesheets
import './Components/general.css';

// Import components 
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Timesheet from './Pages/ConsultantView/Timesheet/Timesheet';
import Home from './Pages/Home';
import Name from './Components/NavBar/Name';
import Settings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import Dashboard from './Pages/ConsultantView/ConsultantDashboard/ConsultantDashboard';

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter



// Main App component
export default function App() {
  const role='consultant';

  return (
    <React.Fragment>
      <NavBar/>
      <Name/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home role={role} />} />
          <Route path="/Home" element={<Home role={role} />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/Account" element={<Account />} />
          <Route path="/Settings" element={<Settings />} />
          {/* Route to a timesheet based on ID */}
          <Route path="/timesheet/:timesheetId" element={<Timesheet />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
