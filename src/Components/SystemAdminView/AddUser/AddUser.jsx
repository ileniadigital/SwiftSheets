//Importing CSS
import './AddUser.css';

// Importing Components
import { IoClose } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

// Importing useState
import { useState } from 'react';

export default function AddUser({ addUserMenuHandler, handleAddUserSubmit }) {
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)

    // Makes sure name isnt empty
    function validateName(event) {
        const name = event.target.value.trim(); 
        if (event.target.name == "firstname") {
            if (name.trim() === "") {
                event.target.setCustomValidity('Enter a first name');
            } else {
                // If value is resolved, clear any existing error message
                event.target.setCustomValidity('');
                setFirstName(name)
            }
        }
        else {
            if (name.trim() === "") {
                event.target.setCustomValidity('Enter a last name');
            } else {
                // If value is resolved, clear any existing error message
                event.target.setCustomValidity('');
                setLastName(name)
            }
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

    const [showPassword, setShowPassword] = useState(false)
    function handleToggleVisibility() {
        setShowPassword(!showPassword)
    }

    const [password, setPassword] = useState(null)
    function validatePassword(event) {
        const pass = event.target.value.trim(); 
        if (pass.trim() === "") {
            event.target.setCustomValidity('Enter a password');
        } else {
            // If value is resolved, clear any existing error message
            event.target.setCustomValidity('');
            setPassword(pass)
        }
    }

    const [errorMessage, setErrorMessage] = useState(null)
    // Handles validation after submit button has been pressed
    function handleSubmitValidation(event) {
        event.preventDefault(); // Prevent submission until validation is complete, also stops page from reloading
        
        if (firstName === null || lastName === null || username === null || userType === null || password === null) { // if any field hasn't been filled, stop the submission
            setErrorMessage('Complete the form')
            return
        }
        setErrorMessage(null)
        handleAddUserSubmit(firstName, lastName, username, userType, password) // Pass the correct information to the handler function
    }

    return (
        <div id='addUserMenu' onSubmit={handleSubmitValidation}>
            <button className = "closeWindow" onClick={() => addUserMenuHandler()}><IoClose /></button>
            <h1 className='addUserHeading'>Add User</h1>
            <form action="" id='addUserForm'>
                {/* Name text input*/}
                <div className="input">
                    <label htmlFor="firstname" className='label'>First Name</label>
                    <input type="text" name="firstname" id='firstname' class='inputBox' required onChange={validateName}/>
                </div>
                <div className='input'>
                    <label htmlFor="lastname" className='label'>Last Name</label>
                    <input type="text" name="lastname" id='lastname' class='inputBox' required onChange={validateName}/>
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
                <div className="input" id="passDiv">
                    {/* Switches between text field and password field to toggle visibility */}
                    <label htmlFor="password" className='label'>Password</label>
                    <input 
                        type={
                        showPassword
                            ? 'text'
                            : 'password'
                        } 
                        placeholder="password"  
                        name ='password' 
                        id='password' 
                        class='inputBox' 
                        required onChange={validatePassword}
                    />
                    {/* Toggles icon and visibility status on click */}
                    <div class='addUsericon'>
                        {showPassword ? (
                            <FaRegEyeSlash class='eye' onClick={() => handleToggleVisibility()}/>
                        ) : (
                            <FaRegEye class='eye' onClick={() => handleToggleVisibility()} />
                        )}   
                    </div>
                </div>
                {/* Submit button*/}
                <input type="submit" value={"Add User"} class='addUserButton'/>
                { (errorMessage !== null) && <span className='errorMessage'>{errorMessage}</span> }
            </form>
        </div>
    );
}