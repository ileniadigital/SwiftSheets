import'../CSS/general.css';
export default function Home() {
    let name= 'Jane Smith';
    return (
        <div className='home-container'>
            <div className='welcomeMessage'>
                <h1>Hi {name} !</h1>
            </div>
        </div>
    )
}

//Add something that renders the right view based on user