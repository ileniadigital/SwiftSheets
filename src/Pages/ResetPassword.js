import React, { useState } from 'react';
import '../Components/Login.css'; //Import Styling
import axios from 'axios';

const ResetPassword = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [passphrase, setPassphrase] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePassphraseChange = (e) => setPassphrase(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!/\S+@\S+\.\S+/.test(username)) {
            setError('Please enter a valid email address.');
        } else {
            setMessage('A link to reset your password has been sent to your email.');
            setUsername('');
        }

        try {
            const response = await axios.post('http://localhost:8000/change_password/', {
                username, password, passphrase
            });

            // Assuming you handle logout and alerting within your application
            alert('Password reset successfully');
            // Redirect to login after successful password update
            //navigate("/login");

        } catch (error) {
            console.error('Password change failed', error);
            alert('Password reset failed');
        }
    };

    return (
        <div className="reset-container">
            {message && <div className="success-message">{message}</div>}
            <div>
                <h1 className='welcome-text'>Reset Password</h1>
                {error && <div className="error-message">{error}</div>}
                <div className='reset-box'>
                    <input 
                        type="email" 
                        placeholder="Username" 
                        className="email-input"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <input 
                            type="password" 
                            placeholder="Password" 
                            className="password-input"
                            value={password}
                            onChange={handlePasswordChange}
                    />
                    <input 
                            type="password" 
                            placeholder="Passphrase" 
                            className="password-input"
                            value={passphrase}
                            onChange={handlePassphraseChange}
                    />
                    <button className="login-button" onClick={handleSubmit}>Reset Password</button>

                </div>
    
            </div>
        </div>
    );
};

export default ResetPassword;
