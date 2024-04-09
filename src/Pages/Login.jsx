import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    console.log('Username:', username);
    console.log('role:', role);

  }, []); // The empty array means this effect runs once on mount


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login/', { username, password });
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('role', response.data.role);

      alert('Login successful');
    } 
    catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
