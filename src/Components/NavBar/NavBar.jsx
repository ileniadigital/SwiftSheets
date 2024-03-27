//Import CSS
import './NavBar.css';

//Import FDM logo
import fdmIcon from './logo/fdm-new-logo-green.svg';

//Import Link component
import Link from './Link';
import LanguageMenu from './LanguageMenu';

//Navigation bar component
export default function NavBar(){
    return(
        <div className="navbar-container">
            <nav className="navbar">
                {/* Logo */}
                <figure className="navbar-logo">
                    <img src= {fdmIcon} alt='FDM Group Logo'/>
                </figure>
                {/* Navigation menu icons */}
                <ul className="navbar-menu">
                    <Link href='/Home' className='navbar-link'>Home</Link>
                    <Link href='/Account' className='navbar-link'>Account</Link>                   
                    <Link href='/Settings' className='navbar-link'>Settings</Link>
                </ul>
                {/* Language menu */}
                <LanguageMenu/>
            </nav>
        </div>
    
    )
};