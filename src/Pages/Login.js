// import React, { useState, useEffect } from 'react';
// import '../Components/Login.css';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyToken = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         // If there's no token, no need to verify it
//         return;
//       } else {
//         navigate('/dashboard');
//       }

//       // try {
//       //   const response = await fetch('http://localhost:8000/api/verify-token/', {
//       //     headers: {
//       //       'Authorization': `Token ${token}`,
//       //       'Content-Type': 'application/json',
//       //     },
//       //   });

//       //   if (response.ok) {
//       //     // Token is valid, redirect to dashboard or appropriate page
//       //     navigate('/dashboard');
//       //   } else {
//       //     // Token is invalid, clear it from local storage and maybe alert the user
//       //     localStorage.removeItem('token');
//       //     alert('Session expired. Please log in again.');
//       //   }
//       // } catch (error) {
//       //   console.error('Error verifying token:', error);
//       // }
//     };

//     verifyToken();
//   }, [navigate]);

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     console.log("Attempting login with:", email, password); // Debugging line
  
//     const response = await fetch('http://localhost:8000/api/login/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
  
//     console.log("Response status:", response.status); // Debugging line
  
//     if (response.ok) {
//       const data = await response.json();
//       localStorage.setItem('token', data.token);
//       console.log("Login successful, token:", data.token); // Debugging line
//     } else {
//       alert('Invalid credentials');
//     }
//   };
  

//   return (
//     <div className="login-container">
//       <h1 className='welcome-text'>Welcome!</h1>
//       <form className="login-box" onSubmit={handleLogin}>
//         <input 
//           placeholder="Email" 
//           className="email-input" 
//           value={email}s
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
//         <a href="#" className="forgot-password">Forgot Password?</a>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import '../Components/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If there's no token, no need to verify it
        return;
      } else {
        navigate('/dashboard');
      }

      // try {
      //   const response = await fetch('http://localhost:8000/api/verify-token/', {
      //     headers: {
      //       'Authorization': `Token ${token}`,
      //       'Content-Type': 'application/json',
      //     },
      //   });

      //   if (response.ok) {
      //     // Token is valid, redirect to dashboard or appropriate page
      //     navigate('/dashboard');
      //   } else {
      //     // Token is invalid, clear it from local storage and maybe alert the user
      //     localStorage.removeItem('token');
      //     alert('Session expired. Please log in again.');
      //   }
      // } catch (error) {
      //   console.error('Error verifying token:', error);
      // }
    };

    verifyToken();
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Attempting login with:", email, password); // Debugging line
  
    const response = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    console.log("Response status:", response.status); // Debugging line
  
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log("Login successful, token:", data.token); // Debugging line
    } else {
      alert('Invalid credentials');
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
        <a href="#" className="forgot-password">Forgot Password?</a>
      </form>
    </div>
  );
};

export default Login;