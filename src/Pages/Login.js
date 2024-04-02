import React, { useState } from 'react';
import '../Components/Login.css'; // Import styling

// Import logo
import logo from '../Components/NavBar/logo/fdm-new-logo-green.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    // reset error state
    setError('');

    //simple regex for email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length === 0) {
      setError('Password cannot be empty.');
      return;
    }

    // placeholder for next step; validate password with database etc
    console.log('backend goes here');
  };

  return (
    <div className="login-container">
      <div className="top-bar">
        <img src={logo} alt="Logo" className="top-logo" />
      </div>
      <h1 className='welcome-text'>Welcome!</h1>
      <div className="login-box">
        {error && <div className="error-message">{error}</div>}
        <input 
          type="email" 
          placeholder="Email" 
          className="email-input"
          value={email}
          onChange={handleEmailChange}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="password-input"
          value={password}
          onChange={handlePasswordChange}
        />
        <button 
          className="login-button"
          onClick={handleSubmit}
        >
          Login
        </button>
        <a href="#" className="forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
};

export default Login;
