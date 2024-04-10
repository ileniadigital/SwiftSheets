import '../Components/general.css'; //Import styling
import '../Components/Account/Account.css'; //Import styling

//Import Components
import Setting from '../Components/Account/Setting/Setting';
import UpdatePassword from '../Components/Account/UpdatePassword/UpdatePassword';

//Account page to view user's information and change their password
export default function Account() {
    // FETCH THIS DATA FROM THE DATABASE
    let name = localStorage.getItem('name');
    let email = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    let role = localStorage.getItem('role');
    return (
        <div className='account-container'>
            {/* Name of the user */}
            <Setting setting='Name' value={name}/>
            {/* Email address of the user */}
            <Setting setting='Email address' value={email}/>
            {/* role of the user */}
            <Setting setting='Role' value={role}/>
            {/* Password of the user */}
            {/* <Setting setting='Password' value={password} /> */}
            {/* Password update link  */}
            <UpdatePassword />
        </div>
    );
}
