//Import CSS
import './NavBar.css';

//Import FDM logo
import fdmIcon from './logo/fdm-new-logo.svg';

//Import Link component
import Link from './Link';
import LanguageMenu from './LanguageMenu';
import LogOut from './LogOut';

//Navigation bar component
export default function NavBar(props){
    const role=localStorage.getItem('role');

    {/* Changing FDM logo colour based on page theme */}
    let fdmLogo;
    switch (window.location.pathname) {
        default:
            fdmLogo = fdmIcon;
            break
    }

    return(
        <div className="navbar-container">
            <nav className="navbar">
                {/* Logo */}
                <figure className="navbar-logo">
                    <img src= {fdmLogo} alt='FDM Group Logo'/>
                </figure>
                {/* Navigation menu icons */}
                <ul className="navbar-menu">
                    <Link href='/Home' className='navbar-link'>Home</Link>
                    <Link href='/Account' className='navbar-link'>Account</Link>                   
                    <Link href='/Settings' className='navbar-link'>Settings</Link>
                    <Link href='/Form' className='navbar-link'> Form</Link>
                    {role=== 'Consultant' &&       
                    <>         
                     <Link href='/Dashboard' className='navbar-link'>Dashboard</Link>
                     </>}
                    {role === 'Administrator' &&       
                    <>         
                     <Link href='/SystemAdminForm' className='navbar-link'>Feedback</Link>
                     </>}
                </ul>
                {/* Language menu */}

                <LanguageMenu/>
                <LogOut/>
            </nav>
        </div>
    
    )
};