// Importing CSS
import './ManageUser.css'

// Importing Components
import { IoClose } from "react-icons/io5";
import RemoveUser from '../RemoveUser/RemoveUser'

export default function ManageUser ({ index, manageUserHandler, userList, removeUserHandler }) {
    let user = userList[index];
    return (
        <div id='manageUser'>
            {/* Adds close button that toggles the window*/}
            <button className = "closeWindow" onClick={() => manageUserHandler(index, userList)}><IoClose /></button>
            <h1 className='manageUserHeading'>Manage User</h1>
            <h3 className ='detailsHeading'>Personal Details</h3>
            {/* Creates a 2 column table for the user data*/}
            <table className='detailsTable'>
                <colgroup>
                    <col id='col1'></col>
                    <col id='col2'></col>
                </colgroup>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>{user.userType}</td>
                    </tr>
                </tbody>
            </table>
            <RemoveUser index={index} userList={userList} removeUserHandler={removeUserHandler}/>
        </div>
    )
}