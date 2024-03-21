import'../CSS/general.css'; //Import general styling

//Component to render Name and welcome message
export default function Name() {
    let name= 'Jane Smith';
    return (
        <div className='name-container'>
            <div className='welcomeMessage'>
                <h1>Hi {name} !</h1>
            </div>
        </div>
    )
}

// TEST
