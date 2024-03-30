//Import CSS
import './NavBar.css';

//Import FDM logo
import fdmIcon from './logo/fdm-new-logo-green.svg';
import fdmIconBlack from './logo/fdm-new-logo.svg';

//Import Link component
import Link from './Link';
import LanguageMenu from './LanguageMenu';

//Navigation bar component
export default function NavBar(props){
    let view;

    {/* Changing FDM logo colour based on page theme */}
    let fdmLogo;
    switch (window.location.pathname) {
        // case "/timesheet":
        //     fdmLogo = fdmIconBlack;
        //     break
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
                    {props.view === 'consultant' &&                
                     <Link href='/consultantsettings' className='navbar-link'>Settings</Link> }
                </ul>
                {/* Language menu */}
                <LanguageMenu/>
            </nav>
        </div>
    
    )
};