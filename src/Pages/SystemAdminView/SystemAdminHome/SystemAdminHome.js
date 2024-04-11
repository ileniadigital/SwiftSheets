import React, { useEffect, useState } from 'react';
import './SystemAdminHome.css';
import UserList from '../../../Components/SystemAdminView/UserList/UserList';
import AddUser from '../../../Components/SystemAdminView/AddUser/AddUser';
import ManageUser from '../../../Components/SystemAdminView/Manage User/ManageUser';
import { fetchUsers, createUser, deleteUserFromBackend, updateUserInBackend, updatePasswordInBackend } from "../../../Components/Data/UserData";

export default function SystemAdminView() {
    const [userList, setUserList] = useState([]);
    const [manageUserClicked, setManageUserClicked] = useState(false);
    const [componentIndex, setComponentIndex] = useState(null);
    const [addUserMenuClicked, setAddUserMenuClicked] = useState(false);

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
        addUserMenuHandler();
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

    const handleUpdateUserSubmit = async (index, updatedUserDetails) => {
        try {
            await updateUserInBackend(userList[index].id, updatedUserDetails);
            const updatedUsers = await fetchUsers();
            setUserList(updatedUsers);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

        const handleUpdateUserPassword = async (index, newPassword) => {
        try {
            await updatePasswordInBackend(userList[index].id, newPassword);
            const updatedUsers = await fetchUsers();
            setUserList(updatedUsers);
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <div>
            <div id='addUser' onClick={() => addUserMenuHandler(userList)}>
                <p id='addUserStyle'>Add User</p>
            </div>
            {addUserMenuClicked && 
            !manageUserClicked && (
                <AddUser
                addUserMenuHandler={addUserMenuHandler}
                handleAddUserSubmit={handleAddUserSubmit}
                />
            )}
            {userList && (
                <UserList userList={userList} manageUserHandler={manageUserHandler} />
            )}
            {manageUserClicked && 
            !addUserMenuClicked && (
                <ManageUser
                    index={componentIndex}
                    manageUserHandler={manageUserHandler} 
                    userList={userList}
                    removeUserHandler={removeUserHandler}
                    handleUpdateUserSubmit={handleUpdateUserSubmit} // Pass the handleUpdateUserSubmit function
                />
            )}
        </div>
    );
}
