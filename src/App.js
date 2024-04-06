// // Import stylesheets
// import './Components/general.css';

// // Import components 
// import NavBar from './Components/NavBar/NavBar';
// import Account from './Pages/Account';
// import Timesheet from './Pages/ConsultantView/Timesheet/Timesheet';
// import ConsultantDashboard from './Pages/ConsultantView/ConsultantDashboard/ConsultantDashboard';
// import Home from './Pages/Home';
// import Name from './Components/NavBar/Name';
// import SystemAdminView from './Pages/SystemAdminView';
// import ConsultantSettings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
// import TimesheetListView from './Pages/TimesheetListView';

// import { useState, useEffect } from 'react';
// import getDate from './Components/ConsultantView/getDate';
// import Reminder from './Components/ConsultantView/Reminder/Reminder';

// //ADD ROUTING BASED ON ROLE FROM DB
// const role='linemanager';

// // Main App component
// export default function App() {

//   // State to manage completion reminder
//   const [completionReminderDate, setCompletionReminderDate] = useState(() => {
//     let date = localStorage.getItem('completionReminderDate');
//     if (date === null) {
//       localStorage.setItem('completionReminderDate', '')
//       date = ''
//     }
//     return date;
//   });

//   const [completionReminderTime, setCompletionReminderTime] = useState(() => {
//     let time = localStorage.getItem('completionReminderTime');
//     if (time === null) {
//       localStorage.setItem('completionReminderTime', '')
//       time = ''
//     }
//     return time;
//   });
//   const [timesheetCompletionReminder, setTimesheetCompletionReminder] = useState(completionReminderDate !== '' && completionReminderTime !== '');

//   if (role === 'consultant') {
//     // Keeps track of whether timesheet reminder was sent
//     if (localStorage.getItem('reminderSent') === null) {
//       localStorage.setItem('reminderSent', 'false')
//     }
//   }

//   // Setting reminder message and whether it should be shown
//   const [reminder, setReminder] = useState(false)
//   const [reminderMessage, setReminderMessage] = useState('')

//   // Updating local storage values on change
//   useEffect(() => {
//       if (role === 'consultant') { 
//           setTimesheetCompletionReminder(completionReminderDate !== '' && completionReminderTime !== '');
//           localStorage.setItem('completionReminderDate', completionReminderDate);
//           localStorage.setItem('completionReminderTime', completionReminderTime);
//       }
//     }, [completionReminderDate, completionReminderTime]);

//   // Provides timesheet completion to reminder if set up
//   useEffect(() => {
//     if (role === 'consultant') { 
//       let timeoutId;
//       if (timesheetCompletionReminder && role === 'consultant') {
//         // Function to trigger the alert
//         function timesheetCompletionReminderStart(completionReminderTimeHours, completionReminderTimeMins) {
//             const completionReminderDate1 = new Date(completionReminderDate)
            
//             // Time difference calculated to delay time between now and the timesheet completion reminder
//             const timeDifference = new Date(completionReminderDate1.getFullYear(), 
//             completionReminderDate1.getMonth(), completionReminderDate1.getDate(), completionReminderTimeHours, completionReminderTimeMins).getTime() 
//             - new Date().getTime();

//             if (timeDifference > 0) {
//                 timeoutId = setTimeout(function() {
//                   // Refresh completion reminder time
//                   setCompletionReminderTime('')
//                   setReminder(true)
//                   setReminderMessage("Don't forget to complete your timesheet!")
//                 }, timeDifference);
//             } 
//         }

//         const completionReminderTimeHours = parseInt(completionReminderTime.slice(0,2))
//         const completionReminderTimeMins = parseInt(completionReminderTime.slice(3,5))
        
//         // Setting reminder so works no matter what page consultant is on
//         timesheetCompletionReminderStart(completionReminderTimeHours, completionReminderTimeMins);

//         // Clear timeout when component unmounts or reminder turns off; prevents same timeout displaying multiple times
//         return () => clearTimeout(timeoutId);
//       }
//     }}, [timesheetCompletionReminder, completionReminderDate, completionReminderTime])

//     // Setting up timesheet completion reminder (if unsubmitted) and autosubmission
//     useEffect(() => {
//       if (role === 'consultant') { 
        
//           // Dummy data - delete
//           const timesheetData = {
//             week: "25/03/24 – 31/03/24",
//             submissionStatus: "Unsubmitted",
//             reviewStatus: "Approved",
//             paymentStatus: "Pending",
//             isSubmitted: false,
//             submissionTime: null,
//             events: {
//                 event1: {
//                     startTime: '13:00',
//                     endTime: '15:00',
//                 },
//                 event2: {
//                     startTime: '13:00',
//                     endTime: '15:00',
//                 },
//                 event3: {
//                     startTime: '13:24',
//                     endTime: '15:36',
//                 },
//                 event4: {
//                     startTime: '13:00',
//                     endTime: '15:00',
//                 },
//                 event5: {
//                     startTime: '13:00',
//                     endTime: '15:00',
//                 },
//                 event6: {
//                     startTime: '13:00',
//                     endTime: '15:00',
//                 },
//                 event7: {
//                     startTime: '13:00',
//                     endTime: '11:00',
//                 },
//             }
//         };

//         localStorage.setItem('currentTimesheet', JSON.stringify(timesheetData));
//         const currentTimesheet = JSON.parse(localStorage.getItem('currentTimesheet'))

      
//       // Set reminder for consultant to submit timesheet on Sunday whenever they open the app
//       if (new Date().getDay() === 0 && localStorage.getItem('reminderSent') !== 'true') {
//         const time = new Date()
//         time.setSeconds(new Date().getSeconds()+1)
//         const submissionReminderTime = time.getTime() - new Date().getTime(); // Remind consultant when they open the app
          
//         if (submissionReminderTime > 0) {
//         const timeoutId = setTimeout(function() {
//                 if (!currentTimesheet.isSubmitted) {
//                     setReminder(true)
//                     setReminderMessage("Don't forget to complete your timesheet!")
//                     localStorage.setItem('reminderSent', 'true')
//                 }
//             }, submissionReminderTime);
//             return () => clearTimeout(timeoutId);

//         } 
//       }

//       // Finding end of week
//       let endOfWeek1 = getDate(new Date(), 7)

//       // Setting reminder for Sunday 00:00
//       let endOfWeekReminder = new Date(`${endOfWeek1[2]}-${endOfWeek1[1]}-${endOfWeek1[0]}`)

//       // Setting automatic submission for end of week 23:59:59
//       let automaticSubmissionTime = new Date(endOfWeekReminder)
//       automaticSubmissionTime.setHours(23);
//       automaticSubmissionTime.setMinutes(59);
//       automaticSubmissionTime.setSeconds(59);

//       const autoSubmit = automaticSubmissionTime.getTime() - new Date().getTime();

//       if (autoSubmit > 0) {
//           const timeoutId = setTimeout(function() {
//                   const numberOfEvents = Object.keys(JSON.parse(localStorage.getItem('events'))).length
//                   if (numberOfEvents !== 0 && !currentTimesheet.isSubmitted) {
//                       const timesheetSubmissionDateandTime = new Date() // Storing date and time of timesehet submission
//                       // setTimesheetStatus('Submitted') // Update value in database
//                       setReminder(true)
//                       setReminderMessage("Timesheet Submitted!")
//                   }
//               }, autoSubmit);
//           return () => clearTimeout(timeoutId);
//           } 
//         }
//     }, []);

//   // Render page based on location
//   let page
//   switch (window.location.pathname) {
//     // default:
//     //   page= <LogIn/>
//     //   break
//     case "/Home":
//     case "/":
//       page= <Home view={role}/>
//       break
//     case "/Account":
//       page= <Account/>
//       break
//     case "/Settings":
//       page= <ConsultantSettings/>
//       break
//     case "/timesheet":
//       page = <Timesheet
//       completionReminderDate={completionReminderDate}
//       setCompletionReminderDate = {setCompletionReminderDate} 
//       completionReminderTime={completionReminderTime}
//       setCompletionReminderTime={setCompletionReminderTime}
//       timesheetCompletionReminder = {timesheetCompletionReminder}
//       setTimesheetCompletionReminder={setTimesheetCompletionReminder}
//       />
//       break
//     case "/consultantdashboard":
//       page = <ConsultantDashboard/>
//       break
//     case "/systemadminview":
//       page = <SystemAdminView/>
//       break
//   }

//   return (
//     <>
//         <NavBar view={role}/>
//         <Name/>
//         {page}
//         {role === 'consultant' && reminder && <Reminder message={reminderMessage} setReminder={setReminder}/>}
//     </>
//   )
// }

// import React from 'react';
// import NavBar from './Components/NavBar/NavBar';
// import Account from './Pages/Account';
// import Settings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
// import Home from './Pages/Home';
// import Login from './Pages/Login';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <React.Fragment>
//       <NavBar/>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/home" element={<Home />} />
//           <Route path="/" element={<Login />} />
//           <Route path="/account" element={<Account />} />
//           <Route path="/settings" element={<Settings />} />
//         </Routes>
//       </BrowserRouter>
//     </React.Fragment>
//   );
// }

// export default App;
/* 
import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <React.Fragment>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App; */

/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import Home from './Pages/Home';
import Login from './Pages/Login';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000" // Adjust according to your backend server
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    // Check if user is authenticated on component mount
    client.get("/myapp/user")
      .then(function (res) {
        setIsAuthenticated(true);
      })
      .catch(function (error) {
        setIsAuthenticated(false);
      });
  }, []);

  const loginHandler = (email, password) => {
    client.post("/myapp/login", { email, password })
      .then(function (response) {
        localStorage.setItem('token', response.data.token); // Adjust according to your response structure
        setIsAuthenticated(true);
      })
      .catch(function (error) {
        console.error("Login failed:", error);
      });
  };

  const logoutHandler = () => {
    client.post("/myapp/logout")
      .then(function (response) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      })
      .catch(function (error) {
        console.error("Logout failed:", error);
      });
  };

  return (
    <React.Fragment>
      <NavBar isAuthenticated={isAuthenticated} logoutHandler={logoutHandler} />
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login loginHandler={loginHandler} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Account from './Pages/Account';
import Settings from './Pages/ConsultantView/ConsultantSettings/ConsultantSettings';
import Home from './Pages/Home';

// Adjust this URL to match your backend login endpoint
const LOGIN_URL = "http://127.0.0.1:8000/myapp/login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Automatically check token presence to adjust isAuthenticated state
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token
        setIsAuthenticated(true);
      } else {
        setLoginError("Login failed, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <React.Fragment>
      <NavBar isAuthenticated={isAuthenticated} logoutHandler={handleLogout} />
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <Route 
              path="/" 
              element={
                <div>
                  <h2>Login</h2>
                  <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                    {loginError && <p>{loginError}</p>}
                  </form>
                </div>
              } 
            />
          )}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
