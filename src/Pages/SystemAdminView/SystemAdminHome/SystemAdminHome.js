// Importing CSS
import './SystemAdminHome.css';

// Import Components
import UserList from '../../../Components/SystemAdminView/UserList/UserList';
import AddUser from '../../../Components/SystemAdminView/AddUser/AddUser';
import ManageUser from '../../../Components/SystemAdminView/Manage User/ManageUser'

// Import useState
import { useState } from 'react'



export default function SystemAdminView() {

    // Get dummy list data from localStorage or file if not yet set
    // To be changed to integrate backend
    const [userList, setUserList] = useState(() => {
        let list = JSON.parse(localStorage.getItem('userList'))
        if (list === null) {
            list = require('../../../Components/SystemAdminView/UserList/DummyUsers.json')
            localStorage.setItem('userList', JSON.stringify(list))
        }
        return list
    });
    
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
        localStorage.setItem('userList', JSON.stringify(userListParam))
        setManageUserClicked(!manageUserClicked)
    }

    // Converts the given data into JSON and adds it to the user list (updates local storage)
    const handleAddUserSubmit = (firstname, lastname, username, userType, password) => {
        var newUserList = [...userList]
        var newEntry = `{ "firstname":"${firstname}" , "lastname":"${lastname}" , "username":"${username}" , "userType":"${userType}", "password":"${password}" }`
        var jsonEntry = JSON.parse(newEntry)
        newUserList.push(jsonEntry)
        setUserList(newUserList)
        localStorage.setItem('userList', JSON.stringify(newUserList))
        addUserMenuHandler()
    }

    // Changes the userType and password of the user of the given index and updates local storage
    const handleUpdateUserSubmit = (index, userType, password) => {
        var newUserList = [...userList]
        if (userType != null) {
            newUserList[index].userType = userType
        }
        if (password != null) {
            newUserList[index].password = password
        }

        setUserList(newUserList)
        localStorage.setItem('userList', JSON.stringify(newUserList))
        manageUserHandler(index, userList)
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
                handleUpdateUserSubmit={handleUpdateUserSubmit}
            />
            )}
        </div>
    );
}