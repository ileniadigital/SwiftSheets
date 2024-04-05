// import React, { useState } from 'react';
// import '../Components/Login.css';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     setError('');
  
//     try {
//       const response = await fetch('http://localhost:8000/myapp/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('token', data.token);
//         navigate('/dashboard');
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       setError('An error occurred while logging in');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1 className='welcome-text'>Welcome!</h1>
//       <form className="login-box" onSubmit={handleLogin}>
//         <input 
//           placeholder="Email" 
//           className="email-input" 
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           className="password-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className="login-button">Login</button>
//         {error && <div className="error-message">{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import '../Components/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/myapp/login/', { // Adjusted to use the custom login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); 
        // Redirect here....
        window.location.href = '/home'; 
      } 
      else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to login');
      }
    } 
    catch (error) {
      console.error('Login error:', error);
      setError('Failed to login');
    }
  };
  

  return (
    <div className="login-container">
      <h1 className='welcome-text'>Welcome!</h1>
      <form className="login-box" onSubmit={handleLogin}>
        <input 
          placeholder="Email" 
          className="email-input" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Login;