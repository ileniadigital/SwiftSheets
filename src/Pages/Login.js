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

/* import React, { useState } from 'react';
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

export default Login; */

/* import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Components/Login.css';

// You can adjust the baseURL to match your backend service address
const baseURL = "http://127.0.0.1:8000";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Directly using axios here without setting defaults for cookies
      const response = await axios.post(`${baseURL}/myapp/login`, {
        email: email,
        password: password
      });

      if (response.status === 200) {
        console.log(response.data);
        // Assuming the backend sends back a token in response. Adjust based on your backend.
        localStorage.setItem('token', response.data.token);
        //setIsAuthenticated(true);
        navigate('/dashboard'); // Redirect to the dashboard or another page on successful login
      } else {
        setError("Failed to login. Please check your credentials and try again.");
      }
    } catch (err) {
      // Catch and display errors from the login process
      setError(err.response?.data?.detail || "An error occurred during the login process. Please try again later.");
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
 */


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Components/Login.css';

// Adjust LOGIN_URL to match your actual backend endpoint for login
const LOGIN_URL = "http://127.0.0.1:8000/myapp/login";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clearing any previous errors

    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      });

      // Assuming the backend sends a token in the response
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Storing the received token
        setIsAuthenticated(true); // Update the authentication state
        navigate('/home'); // Redirect to home page
      } else {
        setError('Login failed. No token received.'); // Handling case without token
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
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
