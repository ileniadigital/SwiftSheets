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
                <div className='form-type'>
                    <label>Form Type</label>
                    <select defaultValue="" onChange={(event) => setFormType(event.target.value)}>
                        <option value="">Select Type</option>
                        <option>Report Bug</option>
                        <option>Request Additional Functionlaity</option>
                    </select>
                </div>
            
                <div className='subject form-item'>
                    <label>Subject</label>
                    <input type="text" placeholder='Subject' onChange={(event) => setSubject(event.target.value)}/>
                </div>
                <input type="textarea" placeholder='Enter Text Here' onChange={(event) => setText(event.target.value)}/>
                <button onClick={() => handleSubmit}>Submit</button>
            </form>
        </div>
    )
}