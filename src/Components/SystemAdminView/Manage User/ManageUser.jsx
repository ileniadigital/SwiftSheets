// Importing CSS
import './ManageUser.css'

// Importing Components
import { IoClose } from "react-icons/io5";
import RemoveUser from '../RemoveUser/RemoveUser'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

// Importing useState
import { useState } from 'react';

export default function ManageUser ({ index, manageUserHandler, userList, removeUserHandler, handleUpdateUserSubmit}) {
    let user = userList[index];

    const [showPassword, setShowPassword] = useState(false)
    function handleToggleVisibility() {
        setShowPassword(!showPassword)
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
        
        if (userType === null && password === null) { // if any field hasn't been filled, stop the submission
            setErrorMessage('At least one field needs to be changed and not blank')
            return
        }
        setErrorMessage(null)
        handleUpdateUserSubmit(index, userType, password) // Pass the correct information to the handler function
    }

    return (
        <div id='manageUser'>
            {/* Adds close button that toggles the window*/}
            <button className = "closeWindow" onClick={() => manageUserHandler(index, userList)}><IoClose /></button>
            <h1 className='manageUserHeading'>Manage User</h1>
            <h2 className ='detailsHeading'>Personal Details</h2>
            {/* Creates a 2 column table for the user data*/}
            
            <form action="" id='manageUserForm' onSubmit={handleSubmitValidation}>
                <div className="manageUserInput">
                    <label class='label'>First Name</label>
                    <div>{user.firstname}</div>
                </div>
                <div className="manageUserInput">
                    <label class='label'>Last Name</label>
                    <div>{user.lastname}</div>
                </div>
                <div className="manageUserInput">
                    <label class='label'>Username</label>
                    <div>{user.username}</div>
                </div>
                <div className="manageUserInput">
                    <label htmlFor='userType' class='formInputLabel'>Role</label>
                    <select name="userType" id='userType' defaultValue={user.userType} class='inputBox' required onChange={setType}>
                        <option value="Consultant">Consultant</option>
                        <option value="LineManager">Line Manager</option>
                        <option value="FinanceTeamMember">Finance Team Member</option>
                        <option value="Administrator">Administrator</option>
                    </select>
                </div>
                <div className="manageUserInput">
                    <label htmlFor='password' class='formInputLabel'>Password</label>
                    <div id='passDiv'>
                        {/* Switches between text field and password field to toggle visibility */}
                        <input 
                            type={
                            showPassword
                                ? 'text'
                                : 'password'
                            } 
                            placeholder="password" 
                            defaultValue={user.password} 
                            name ='password' 
                            id='password' 
                            class='inputBox' 
                            required onChange={validatePassword}
                        />
                        {/* Toggles icon and visibility status on click */}
                        <div class='icon'>
                            {showPassword ? (
                                <FaRegEyeSlash class='eye' onClick={() => handleToggleVisibility()}/>
                            ) : (
                                <FaRegEye class='eye' onClick={() => handleToggleVisibility()} />
                            )}   
                        </div>
                    </div>
                </div>
                { (errorMessage !== null) && <span className='errorMessage'>{errorMessage}</span> }
                <div class='buttonFlex'>
                    <RemoveUser index={index} userList={userList} removeUserHandler={removeUserHandler} class='removeUserButton'/>
                    {/* Submit button*/}
                    <input type="submit" value={"Update User"} class='updateUserButton'/>
                </div>
            </form>
        </div>
    )
}