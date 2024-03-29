// Importing CSS
import './UserList.css';

//Importing components
import { IoPerson } from "react-icons/io5";
import User from './User';
//function requires props to give list of user information
//also requires prop for event handler 


//need to figure out format of user information from django
export default function UserList({ userList, manageUserHandler }) {

    return (
        <div id="userContainer">
            {userList.map((user, i) =>(
                <User class='user' index={i} userList={userList} manageUserHandler={manageUserHandler}/>
            ))}
        </div>
    )
}