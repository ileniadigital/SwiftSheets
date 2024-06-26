import './Components/general.css';
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Timesheet from './Pages/ConsultantView/Timesheet/Timesheet';
import Home from './Pages/Home';
import Name from './Components/NavBar/Name';
import Settings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import SystemAdminForm from './Pages/SystemAdminView/SystemAdminForm/SystemAdminForm';
import Dashboard from './Pages/ConsultantView/ConsultantDashboard/ConsultantDashboard';
import LogOut from './Components/NavBar/LogOut';
import Login from './Pages/Login';
import Form from './Pages/Form';
import ResetPassword from './Pages/ResetPassword';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

// Main App component
export default function App() {
  const [role, setRole] = useState('');
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const user_role = localStorage.getItem('role');
    const loggedin = localStorage.getItem('loggedin') === 'true';

    setRole(user_role);
    setLoggedin(loggedin);
  }, []);

  return (
    <React.Fragment>
      <NavBar view={role}/>
      <Name/>
      <BrowserRouter>
        <Routes>
          {!loggedin && <Route path="/*" element={<Login />} />}
          {loggedin && (
            <>
              <Route path="/Home" element={<Home role={role} />} />
              <Route path="/Account" element={<Account />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/timesheet/:timesheetId" element={<Timesheet />} />
              <Route path="/SystemAdminForm" element={<SystemAdminForm />} />
              <Route path="/LogOut" element={<LogOut />} />
              <Route path="/Form" element={<Form/>} />
            </>
          )}
          <Route path="/Login" element={<Login />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
