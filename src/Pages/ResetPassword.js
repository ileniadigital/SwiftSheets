import React, { useState } from 'react';
import '../Components/Login.css';

import logo from '../Components/NavBar/logo/fdm-new-logo-green.svg';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
    } else {
      setMessage('A link to reset your password has been sent to your email.');
      setEmail('');
    }
  };

  return (
    <div className="login-container">
      <div className="top-bar">
        <img src={logo} alt="Logo" className="top-logo"/>
      </div>
      {message && <div className="success-message">{message}</div>}
      <div className="login-box">
        <h1 className='welcome-text'>Reset Password</h1>
        <p className="instruction-text">Please enter your email address to receive a password reset link.</p>
        {error && <div className="error-message">{error}</div>}
        <input 
          type="email" 
          placeholder="Email" 
          className="email-input"
          value={email}
          onChange={handleEmailChange}
        />
        <button className="login-button" onClick={handleSubmit}>Send Reset Link</button>
      </div>
    </div>
  );
};

export default ResetPassword;
