import'../general.css'; //Import general styling

//Component to render Name and welcome message
export default function Name() {
    let name = localStorage.getItem('name') || 'Login to use the website';
    return (
        <div className='name-container'>
            <div className='welcome-message'>
                <h1>Hi {name} !</h1>
            </div>
        </div>
    )
}
