//Import CSS
import './NavBar.css';

//Import FDM logo
import fdmIcon from './logo/fdm-new-logo-green.svg';

//Import Link component
import Link from './Link';
import LanguageMenu from './LanguageMenu';

//Navigation bar component
export default function NavBar(props){
    let view;
    switch (props.view) {
        case 'consultant':
            view = '/consultantsettings';
            break;
        default:
            view = '/settings';
            break;
    }
    return(
        <div className="navbar-container">
            <nav className="navbar">
                {/* Logo */}
                <figure className="navbar-logo">
                    <img src= {fdmIcon} alt='FDM Group Logo'/>
                </figure>
                {/* Navigation menu icons */}
                <ul className="navbar-menu">
<<<<<<< HEAD
                    <Link href='/Home' className='navbar-link'><FaHome size={40}/></Link>
                    <Link href='/Account' className='navbar-link'><VscAccount size={40} /></Link> 
                    <Link href={view} className='navbar-link'><IoMdSettings size={40} /></Link>
=======
                    <Link href='/Home' className='navbar-link'>Home</Link>
                    <Link href='/Account' className='navbar-link'>Account</Link>                   
                    <Link href='/Settings' className='navbar-link'>Settings</Link>
>>>>>>> origin
                </ul>
                {/* Language menu */}
                <LanguageMenu/>
            </nav>
        </div>
    
    )
};