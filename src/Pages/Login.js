
import React from 'react';
import '../CSS/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="top-bar">
        <img src="../images/fdm-group=logo-vector.svg" alt="Logo" className="top-logo"/>
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