// Importing CSS
import './User.css';

export default function User({ userList, index, manageUserHandler }) {
    // Creates the section for each user
    return (
        <div className='user'>
            <div id="icon"/>
            <p>{userList[index].name}</p>
            <div className='manageUser' onClick={() => manageUserHandler(index, userList)}>
                <p>Manage User</p>
            </div>
        </div>
    )
}