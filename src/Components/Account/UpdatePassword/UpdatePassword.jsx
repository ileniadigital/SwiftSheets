import './UpdatePassword.css'; // Import styling
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// UpdatePassword Component to update user's password
export default function UpdatePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    useEffect(() => {
        const loggedin = localStorage.getItem('loggedin');
        if (!loggedin) {
            navigate("/login");
        }
      }, []); // The empty array means this effect runs once on mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate if new password and confirm password match
        if (newPassword !== confirmPassword) {
            alert('New password does not match confirm password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/update_password/', {
                username: username,
                current_password: currentPassword,
                new_password: newPassword
            });
            localStorage.setItem('username', '');
            localStorage.setItem('role', '');
            localStorage.setItem('user_id', '');
            localStorage.setItem('name', '');
            localStorage.setItem('loggedin', false);
            // Assuming you handle logout and alerting within your application
            alert('Password changed successfully');
            // Redirect to login after successful password update
            navigate("/login");
        } catch (error) {
            console.error('Password change failed', error);
            alert('Password change failed');
        }
    };

    return (
        <div className='update-password-container'>
            <h2>Update Password</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className='field-container'>
                    <label htmlFor='current-password'>Current Password</label>
                    <input type='password' id='current-password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                </div>
                <div className='field-container'>
                    <label htmlFor='new-password'>New Password</label>
                    <input type='password' id='new-password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className='field-container'>
                    <label htmlFor='confirm-password'>Confirm New Password</label>
                    <input type='password' id='confirm-password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type='submit' className='update-button'>Update Password</button>
            </form>
        </div>
    );      
}



    // let password = 'password'; // FETCH THIS DATA FROM THE DATABASE

    // //Function to validate the password
    // function validatePassword(){
    //     let currentPassword = document.getElementById('current-password').value;
    //     let newPassword = document.getElementById('new-password').value;
    //     let confirmPassword = document.getElementById('confirm-password').value;
    //     if(currentPassword !== password){
    //         alert('Current password is incorrect');
    //         return;
    //     }
    //     if(newPassword !== confirmPassword){
    //         alert('New password does not match');
    //         return;
    //     }
    //     alert('Password updated successfully');
    //     password=newPassword;
    // }