import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Login from './Pages/Login';
// import ResetPassword from './Pages/ResetPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);

