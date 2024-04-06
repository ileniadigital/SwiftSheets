// Importing CSS
import '../Components/SystemAdminView/SystemAdminView.css';

// Import Components

// Import useState
import { useState } from 'react'
import UserList from '../Components/SystemAdminView/UserList/UserList';
import AddUser from '../Components/SystemAdminView/AddUser/AddUser';
import ManageUser from '../Components/SystemAdminView/Manage User/ManageUser'

// Turn this into a state


export default function SystemAdminView() {

    // Get dummy list data from JSON file
    // To be changed to integrate backend
    const [userList, setUserList] = useState(require('../Components/SystemAdminView/UserList/DummyUsers'));
    
    // Enables relevant screen to be displayed when the + button is clicked 
    const [manageUserClicked, setManageUserClicked] = useState(false);
    const [componentIndex, setComponentIndex] = useState(null);
    const [addUserMenuClicked, setAddUserMenuClicked] = useState(false);

    // When Manage User is clicked, user management screen is shown, with the details based on the component it is called by
    // The parameters are the userList array and the index of the component
    const manageUserHandler = (componentIndexParam, userListParam) => {
        if(!addUserMenuClicked) {
            if (!manageUserClicked) {
                setComponentIndex(componentIndexParam)
                setUserList(userListParam)
                }
                setManageUserClicked(!manageUserClicked)
        }
        
    }

    // Toggles the add user menu
    const addUserMenuHandler = () => {
        if (!manageUserClicked){
            setAddUserMenuClicked(!addUserMenuClicked)
        }
    }

    // Update User List (can't update dummy file from frontend)
    const removeUserHandler = (componentIndexParam, userListParam) => {
        userListParam.splice(componentIndexParam, 1)
        setUserList(userListParam)
        setManageUserClicked(!manageUserClicked)
    }

    // Converts the given data into JSON and adds it to the user list (can't update dummy file from frontend)
    const handleAddUserSubmit = (name, username, userType) => {
        var newUserList = [...userList]
        var newEntry = `{ "name":"${name}" , "username":"${username}" , "userType":"${userType}" }`
        var jsonEntry = JSON.parse(newEntry)
        newUserList.push(jsonEntry)
        setUserList(newUserList)
        addUserMenuHandler()
    }
    
    return(
        <div>
            {/*add user button*/}
            <div id='addUser' onClick={() => addUserMenuHandler(userList)}>
                <p id='addUserStyle'>Add User</p>
            </div>
            {/*only opens add user menu if manage user menu is closed*/}
            {addUserMenuClicked && 
            !manageUserClicked && (
                <AddUser
                addUserMenuHandler={addUserMenuHandler}
                handleAddUserSubmit={handleAddUserSubmit}
            />
            )}
            {/*users container*/}
            <UserList userList={userList} manageUserHandler={manageUserHandler}/>
            {/*only opens manage user menu if add user menu is closed*/}
            {manageUserClicked && 
            !addUserMenuClicked && (
                <ManageUser
                index={componentIndex}
                manageUserHandler={manageUserHandler} 
                userList={userList}
                removeUserHandler={removeUserHandler}
            />
            )}
        </div>
    );
}