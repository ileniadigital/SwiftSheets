import'../general.css'; //Import general styling

//Component to render Name and welcome message
const LogOut = () => {
    const clearData = () => {
        localStorage.setItem('username', '');
        localStorage.setItem('role', '');
    }
    return (
        <div className='name-container'>
            <button onClick={clearData}>Log out</button>
        </div>
    )
}
export default LogOut;