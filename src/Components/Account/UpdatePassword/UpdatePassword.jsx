import './UpdatePassword.css'; //Import styling

//UpdatePassword Component to update user's password
export default function UpdatePassword() {
    let password = 'password'; // FETCH THIS DATA FROM THE DATABASE

    //Function to validate the password
    function validatePassword(){
        let currentPassword = document.getElementById('current-password').value;
        let newPassword = document.getElementById('new-password').value;
        let confirmPassword = document.getElementById('confirm-password').value;
        if(currentPassword !== password){
            alert('Current password is incorrect');
            return;
        }
        if(newPassword !== confirmPassword){
            alert('New password does not match');
            return;
        }
        alert('Password updated successfully');
        password=newPassword;
    }
    return(
        <div className='update-password-container'>
            <h2>Update Password</h2>
            <form className="form-container">
                {/* Current password field */}
                <div className='field-container'>
                    <label htmlFor='current-password'>Current Password</label>
                    <input type='password' id='current-password' name='current-password' required/>
                </div>
                {/* New password field */}
                <div className='field-container'>
                    <label htmlFor='new-password'>New Password</label>
                    <input type='password' id='new-password' name='new-password' required/>
                </div>
                {/* Confirm password field */}
                <div className='field-container'>
                    <label htmlFor='confirm-password'>Confirm New Password</label>
                    <input type='password' id='confirm-password' name='confirm-password' required/>
                </div>
                {/* Submit button */}
                <button type='submit' onClick={validatePassword}>Update Password</button>

            </form>
        </div>
    );      
};