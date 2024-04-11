import React from 'react';

import './NavBar.css'; // Import Styling

const LogOut = () => {

  const clearData = () => {
    localStorage.setItem('username', '');
    localStorage.setItem('role', '');
    localStorage.setItem('user_id', '');
    localStorage.setItem('name', '');
    localStorage.setItem('loggedin', false);
    console.log(localStorage.getItem('username'));
    console.log(localStorage.getItem('role'));
    console.log(localStorage.getItem('user_id'));
    console.log(localStorage.getItem('name'));
    console.log(localStorage.getItem('loggedin'));


    window.location.href = '/Login';
  };

  return (
    <div className='log-out'>
      <button onClick={clearData}>Log out</button>
    </div>
  );
};

export default LogOut;
