//Import CSS
import '../CSS/NavBar.css';

//Import icons
import { VscAccount } from "react-icons/vsc";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

//Import FDM logo
import fdmIcon from '../images/fdm-logo.svg';

//Import Link component
import Link from './Link';

//Navigation bar component
export default function NavBar(){
    return(
        <div className="navbar-container">
            <nav className="navbar">
                <figure className="navbar-logo">
                    <img src= {fdmIcon} alt='FDM Group Logo'/>
                </figure>
                {/* Navigation menu icons */}
                <ul className="navbar-menu">
                    <Link href='/Home' className='navbar-link'><FaHome size={40}/></Link>
                    <Link href='/Account' className='navbar-link'><VscAccount size={40} /></Link>                   
                    <Link href='/Settings' className='navbar-link'><IoMdSettings size={40} /></Link>
                </ul>
            </nav>
        </div>
    
    )
};