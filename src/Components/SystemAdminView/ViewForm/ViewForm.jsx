// Importing CSS
import './ViewForm.css'

// Importing Components
import { IoClose } from "react-icons/io5";

export default function ViewForm ({ formData, viewFormHandler }) {

    return (
        <div id='viewFormMenu'>
            <button className = "closeWindow" onClick={() => viewFormHandler()}><IoClose /></button>
            <div id='viewFormContent'>
                {/* Add Report to name if it is a bug, otherwise Request */}
                {
                    formData.type === 'Bug' ? (
                        <h1 className='viewFormHeading'>Bug Report</h1>

                    ) :
                    (
                        <h1 className='viewFormHeading'>Request</h1>
                    )
                }
                {/* Name text input*/}
                <div className="input">
                    <p id='subject' className='inputBox'>{formData.subject}</p>
                </div>
                <div className='input'>
                    <textarea name="text" id='text' class='inputBox' value={formData.text} disabled />
                </div>
            </div>
        </div>
    )
}