
import React from 'react';
import '../Components/Login.css'; //Import styling

//Import logo
import logo from '../Components/NavBar/logo/fdm-new-logo-green.svg';

const Login = () => {
  return (
    <div className="login-container">
      <div className="top-bar">
        <img src={logo} alt="Logo" className="top-logo"/>
      </div>
      <h1 className = 'welcome-text'>Welcome!</h1>
      <div className="login-box">
        <input type="email" placeholder="Email" className="email-input" />
        <input type="password" placeholder="Password" className="password-input" />
        <button className="login-button">Login</button>
        <a href="#" className="forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
};

export default Login;