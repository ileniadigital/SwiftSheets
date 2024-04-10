//Importing CSS
import './AddUser.css';

// Importing Components
import { IoClose } from "react-icons/io5";

// Importing useState
import { useState } from 'react';

export default function AddUser({ addUserMenuHandler, handleAddUserSubmit }) {
    const [name, setName] = useState(null)

    // Makes sure name isnt empty
    function validateName(event) {
        const name = event.target.value.trim(); 
        if (name.trim() === "") {
            event.target.setCustomValidity('Enter a name');
        } else {
            // If value is resolved, clear any existing error message
            event.target.setCustomValidity('');
            setName(name)
        }
    }

    const [username, setUsername] = useState(null)
    function validateUsername(event) {
        const email = event.target.value.trim();
        // Email is checked against regex to see whether it's valid
        const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        if (email.trim() === "") {
            event.target.setCustomValidity('Enter an email address');
        } else if (!emailPattern.test(email)) {    
            event.target.setCustomValidity('Enter a valid email address');
        } else {
            // If value is resolved, clear any existing error message
            event.target.setCustomValidity('')
            setUsername(email)
        }
    }

    const [userType, setUserType] = useState(null)
    // Makes sure the userType is not left blank
    function setType(event) {
        const userType = event.target.value.trim();
        if (userType === "") {
            event.target.setCustomValidity('Select a role');
        } else {
            // If value is resolved, clear any existing error message
            event.target.setCustomValidity('')
            setUserType(userType)
        }
    }

    const [errorMessage, setErrorMessage] = useState(null)
    // Handles validation after submit button has been pressed
    function handleSubmitValidation(event) {
        event.preventDefault(); // Prevent submission until validation is complete, also stops page from reloading
        
        if (name === null || username === null || userType === null) { // if any field hasn't been filled, stop the submission
            setErrorMessage('Complete the form')
            return
        }
        setErrorMessage(null)
        handleAddUserSubmit(name, username, userType) // Pass the correct information to the handler function
    }

    return (
        <div id='addUserMenu' onSubmit={handleSubmitValidation}>
            <button className = "closeWindow" onClick={() => addUserMenuHandler()}><IoClose /></button>
            <h1 className='addUserHeading'>Add User</h1>
            <form action="" id='addUserForm'>
                {/* Name text input*/}
                <div className="input">
                    <label htmlFor="name" className='label'>Full Name</label>
                    <input type="text" name="name" id='name' class='inputBox' required onChange={validateName}/>
                </div>
                {/* Username text input*/}
                <div className="input">
                    <label htmlFor="username" className='label'>Email</label>
                    <input type="text" name="username" id='username' class='inputBox' required onChange={validateUsername}/>
                </div>
                {/* User role dropdown*/}
                <div className="input">
                    <label htmlFor="userType" className='label'>Role</label>
                    <select name="userType" id='userType' defaultValue={""} class='inputBox' required onChange={setType}>
                        <option value="" selected disabled hidden>Select a role</option>
                        <option value="Consultant">Consultant</option>
                        <option value="LineManager">Line Manager</option>
                        <option value="FinanceTeamMember">Finance Team Member</option>
                        <option value="Administrator">Administrator</option>
                    </select>
                </div>
                {/* Submit button*/}
                <input type="submit" value={"Add User"} class='addUserButton'/>
                { (errorMessage !== null) && <span className='errorMessage'>{errorMessage}</span> }
            </form>
        </div>
    );
}