import React from 'react';

import './NavBar.css'; // Import Styling

const LogOut = () => {

  const clearData = () => {
    localStorage.setItem('username', '');
    localStorage.setItem('role', '');
    localStorage.setItem('user_id', '');
    localStorage.setItem('name', '');
    localStorage.setItem('loggedin', false);

    window.location.href = '/Login';
  };

  return (
    <div className='log-out'>
      <button onClick={clearData}>Log out</button>
    </div>
  );
};

export default LogOut;
