// Importing CSS
import './User.css';

// Importing Components

export default function User({ userList, index, manageUserHandler }) {

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