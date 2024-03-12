//Import icons
import { VscAccount } from "react-icons/vsc";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

//Import Link component
import Link from './Link';
//Import CSS
import '../CSS/NavBar.css';
//Navigation bar component
function NavBar(){
    const path= window.location.pathname;
    return(
        <div className="navbar-container">
            <nav className="navbar">
                <figure className="navbar-logo">
                    <img src='src/images/test.png' alt='FDM Group Logo'/>
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
//Export NavBar component
export default NavBar;