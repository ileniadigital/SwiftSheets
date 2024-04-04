// Importing CSS
import { useState } from 'react'
import './Form.css'

// Allows users to create a form for reporting bugs/requesting additional functionality
export default function Form() {

    // Storing inputs
    const [formType, setFormType] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')


    // Handles submission of form
    const handleSubmit = () => {
        // Add values to database: formType, subject, text
    }

    return (
        <div className='form-container form-item'>
            <form>
                <legend>Share Your Opinion</legend>
                <div className='form-item'>
                    <label>Form Type</label>
                    <select defaultValue="" onChange={(event) => setFormType(event.target.value)} required>
                        <option disabled hidden value="">Select Type</option>
                        <option>Report Bug</option>
                        <option>Request Functionality</option>
                    </select>
                </div>
            
                <div className='subject form-item'>
                    <label>Subject</label>
                    <input type="text" placeholder='Subject' onChange={(event) => setSubject(event.target.value)} required/>
                </div>

                <div className='form-item'>
                    <label>Message</label>
                    <textarea cols="30" rows="10" placeholder='Enter Text Here' required></textarea>
                </div>
                <button onClick={() => handleSubmit}>Submit</button>
            </form>
        </div>
    )
}