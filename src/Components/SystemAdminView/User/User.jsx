// Importing CSS
import './User.css';

export default function User({ userList, index, manageUserHandler }) {
    // Creates the section for each user
    return (
        <div class='user'>
            <div id="icon"/>
            <p className='name'>{userList[index].firstname} {userList[index].lastname}</p>
            <div className='manageUser' onClick={() => manageUserHandler(index, userList)}>
                <button class='manage-button'>Manage User</button>
            </div>
        </div>
    )
}