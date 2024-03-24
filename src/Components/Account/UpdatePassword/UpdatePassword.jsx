import './UpdatePassword.css'; //Import styling

//UpdatePassword Component to update user's password
export default function UpdatePassword() {
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
                <button type='submit'>Update Password</button>

            </form>
        </div>
    );      
};