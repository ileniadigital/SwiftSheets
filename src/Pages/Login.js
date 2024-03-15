
import React from 'react';
import '../CSS/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h1>Welcome!</h1>
      <div className="login-box">
        <input type="email" placeholder="Email" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <a href="#" className="forgot-password">Forgot Password?</a>
        <button className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Login;