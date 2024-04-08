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

        // Adding to local storage temporarily
        if (!localStorage.getItem("forms")) {
            const newForm = {
                0: { 
                    type: formType,
                    subject: subject,
                    text: text
                }
            }
            localStorage.setItem("forms", JSON.stringify(newForm))
        } else {
            let forms = JSON.parse(localStorage.getItem("forms"))
            let formSize = Object.keys(forms).length
            forms[formSize] = {
                    type: formType,
                    subject: subject,
                    text: text
            }
            localStorage.setItem("forms", JSON.stringify(forms))
        }
    }

    return (
        <div id='form-container' className='form-item1'>
            <form>
                <legend>Share Your Opinion</legend>
                <div className='form-item1'>
                    <label>Form Type</label>
                    <select defaultValue="" onChange={(event) => setFormType(event.target.value)} required>
                        <option disabled hidden value="">Select Type</option>
                        <option>Report Bug</option>
                        <option>Request Functionality</option>
                    </select>
                </div>
            
                <div className='subject form-item1'>
                    <label>Subject</label>
                    <input type="text" placeholder='Subject' onChange={(event) => setSubject(event.target.value)} required/>
                </div>

                <div className='form-item1'>
                    <label>Message</label>
                    <textarea cols="30" rows="10" placeholder='Enter Text Here' required onChange={(event) => setText(event.target.value)}></textarea>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}