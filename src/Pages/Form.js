import { useState } from 'react'
import '../Components/Form.css'; // Import styling

// Allows users to create a form for reporting bugs/requesting additional functionality
export default function Form() {

    // Storing inputs
    const [formType, setFormType] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')


    // Handles submission of form
    const handleSubmit = (e) => {
        // Add values to database: formType, subject, text
        e.preventDefault();

        // Perform validation
        if (!formType || !subject || !text) {
            alert('Please fill in all fields');
            return;
        }

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
        window.location.href = '/Home';
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
                    <textarea cols="30" rows="10" placeholder='Enter Text Here' required onChange={(event) => setText(event.target.value)}></textarea>
                </div>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}