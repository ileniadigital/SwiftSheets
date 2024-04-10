// Importing CSS
import './SystemAdminHome.css';

// Import Components
import UserList from '../../../Components/SystemAdminView/UserList/UserList';
import AddUser from '../../../Components/SystemAdminView/AddUser/AddUser';
import ManageUser from '../../../Components/SystemAdminView/Manage User/ManageUser'

// Import useState
import { useEffect, useState } from 'react'
import { createUser, fetchUsers, deleteUserFromBackend, updateUserInBackend } from "../../../Components/Data/UserData";

export default function SystemAdminView() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchUsers();
                setUserList(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);
    
    const [manageUserClicked, setManageUserClicked] = useState(false);
    const [componentIndex, setComponentIndex] = useState(null);
    const [addUserMenuClicked, setAddUserMenuClicked] = useState(false);

    const manageUserHandler = (componentIndexParam, userListParam) => {
        if (!addUserMenuClicked) {
            if (!manageUserClicked) {
                setComponentIndex(componentIndexParam)
                setUserList(userListParam)
            }
            setManageUserClicked(!manageUserClicked)
        }
    }

    const addUserMenuHandler = () => {
        if (!manageUserClicked) {
            setAddUserMenuClicked(!addUserMenuClicked)
        }
    }

    const handleAddUserSubmit = async (firstname, lastname, username, userType, password) => {
        const newUser = {
            username: username,
            password: password,
            user_type: userType,
            firstname: firstname,
            lastname: lastname
        };

        try {
            await createUser(newUser);
            const updatedUsers = await fetchUsers();
            setUserList(updatedUsers);
        } catch (error) {
            console.error('Error creating user:', error);
        }

        window.location.reload();
        addUserMenuHandler()
    }

    const removeUserHandler = async (componentIndexParam, userListParam) => {
        const deletedUserId = userListParam[componentIndexParam].id;

        try {
            await deleteUserFromBackend(deletedUserId);
            const updatedUserList = userListParam.filter((user, index) => index !== componentIndexParam);
            setUserList(updatedUserList);
            setManageUserClicked(!manageUserClicked);
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    const removeAndCreateUser = async (componentIndexParam, userListParam, newUser) => {
        const deletedUserId = userListParam[componentIndexParam].id;

        try {
            await deleteUserFromBackend(deletedUserId);
            await createUser(newUser);
            const updatedUsers = await fetchUsers();
            setUserList(updatedUsers);
        } catch (error) {
            console.error('Error removing user or creating new user:', error);
        }
    };

    const handleUpdateUserSubmit = async (index, userType, password) => {
        const updatedUserList = [...userList];
        if (userType !== null) {
            updatedUserList[index].userType = userType;
        }
        if (password !== null) {
            updatedUserList[index].password = password;
        }

        try {
            const { firstname, lastname, username, userType, password } = updatedUserList[index];
            const newUser = { firstname, lastname, username, userType, password };
            removeAndCreateUser(index, userList, newUser);
            setUserList(updatedUserList);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
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
            {userList && (
                <UserList userList={userList} manageUserHandler={manageUserHandler} />
            )}
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
