// Importing CSS
import './RemoveUser.css'

export default function RemoveUser({ index, userList, removeUserHandler}) {
    // Button triggers the handler function on click
    return(
        <button className='removeUser' onClick={() => removeUserHandler(index, userList)}>Remove User</button>
    )
}