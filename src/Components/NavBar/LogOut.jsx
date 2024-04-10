import React from 'react';
import { useNavigate } from 'react-router-dom';

//Component to render Name and welcome message
const LogOut = () => {

    const clearData = () => {
        // Clear local storage
        localStorage.setItem('username', '');
        localStorage.setItem('role', '');
        localStorage.setItem('user_id', '');
        localStorage.setItem('name', '');
        localStorage.setItem('loggedin', false);
    };

    return (
        <div className='name-container'>
            <button onClick={clearData}>Log out</button>
        </div>
    );
};

export default LogOut;
