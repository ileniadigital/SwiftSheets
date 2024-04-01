// Importing CSS
import './UserList.css';

//Importing components
import User from './User'; 


//need to figure out format of user information from django
export default function UserList({ userList, manageUserHandler }) {
    // Creates a list of user components using the JSON data from userList
    return (
        <div id="userContainer">
            {userList.map((user, i) =>(
                <User class='user' id={userList[i]} index={i} userList={userList} manageUserHandler={manageUserHandler}/>
            ))}
        </div>
    )
}