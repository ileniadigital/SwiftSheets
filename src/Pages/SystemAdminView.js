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
    const [componentIndex, setComponentIndex] = useState(null)

    // When Manage User is clicked, user management screen is shown, with the details based on the component it is called by
    // The parameters are the userList array and the index of the component
    const manageUserHandler = (componentIndexParam, userListParam) => {
        if (!manageUserClicked) {
        setComponentIndex(componentIndexParam)
        setUserList(userListParam)
        }
        setManageUserClicked(!manageUserClicked)
    }

    const removeUserHander = (componentIndexParam, userListParam) => {
        userListParam.splice(componentIndexParam, 1)
        setUserList(userListParam)
        setManageUserClicked(!manageUserClicked)
        var userListString = JSON.stringify(userList)
        //apparently you cant access file systems
        //need to figure out an alternate way of doing this
        /* var fs = require('fs')
        fs.writeFile('../Components/SystemAdminView/UserList/DummyUsers', userListString, function(err, result) {
            if(err) console.log("error",err)
        }) */
    }
    
    return(
        <div>
            {/*add user button*/}
            <AddUser/>
            {/*users container*/}
            <UserList userList={userList} manageUserHandler={manageUserHandler}/>
            {manageUserClicked && (
                <ManageUser
                index={componentIndex}
                manageUserHandler={manageUserHandler} 
                userList={userList}
                removeUserHandler={removeUserHander}
            />
            )}
        </div>
    );
}