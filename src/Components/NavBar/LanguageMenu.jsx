import { TbWorld } from "react-icons/tb"; //Import language icon

import './NavBar.css'; //Import CSS

//Language menu component
//To display the language menu available for selection
//DOES NOT TRANSLATE PAGE
export default function LanguageMenu(){
    const languages= ['EN', 'EN-US', 'EN-CA', 'DE', 'EN-HK', 'EN-AU', 'POL','中国人', 'EN-SG', 'FR-CA']
    return(
        <div className="language-menu">
            {/* Language Icon */}
            <TbWorld size={30} /> 
            {/* Options */}
            <select className="language-select">
                {languages.map((language, index) => (
                    <option key={index} value={language}>{language}</option>
                ))}
            </select>
        </div>
    )
}