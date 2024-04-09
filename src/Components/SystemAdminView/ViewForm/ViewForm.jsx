// Importing CSS
import './ViewForm.css'

// Importing Components
import { IoClose } from "react-icons/io5";

// Importing useState
import { useState } from 'react';

export default function ViewForm ({ formData, viewFormHandler }) {

    return (
        <div id='viewFormMenu'>
            <button className = "closeWindow" onClick={() => viewFormHandler()}><IoClose /></button>
            <div id='viewFormContent'>
                <h1 className='viewFormHeading'>{formData.type} Form</h1>
                {/* Name text input*/}
                <div className="input">
                    <label htmlFor="subject" className='label'>Subject</label>
                    <p id='subject'>{formData.subject}</p>
                </div>
                <div className='input'>
                    <textarea name="text" id='text' class='inputBox' value={formData.text} disabled />
                </div>
            </div>
        </div>
    )
}