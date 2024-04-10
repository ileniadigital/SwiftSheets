import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import '../Components/Login.css'; // Import Styling 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username_val = localStorage.getItem('username');
    const user_role = localStorage.getItem('role');
    const user_id = localStorage.getItem('user_id');
    const name = localStorage.getItem('name');

    setId(user_id);
    setUsername(username_val);
    setRole(user_role);
    setName(name);
    console.log(user_role);
  }, []); // The empty array means this effect runs once on mount


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login/', { username, password });

      localStorage.setItem('username', response.data.username);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('user_id', response.data.id);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('loggedin', true);

      setId(response.data.id);
      setUsername(response.data.username);
      setRole(response.data.role);
      setName(response.data.name);


      console.log(response.data.role);
      console.log(response.data.id);  
      console.log(response.data.username);
      console.log(response.data.name);

      window.location.href="/Home";
    } 
    catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='login-container'>
        <input className='email-input' type="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className='password-input'type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <Link to="/ResetPassword" className='forgot-password'>Forgot Password?</Link>
        <button className='login-button' type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
