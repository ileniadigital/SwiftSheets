// Importing CSS
import './SystemAdminForm.css';

// Importing icons
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

// Importing Components
import FormList from "../../../Components/SystemAdminView/FormList/FormList"
import ViewForm from "../../../Components/SystemAdminView/ViewForm/ViewForm"

// Import useState
import { useState } from 'react'

export default function SystemAdminForm() {
    let dummyForms = [
        {
            type: "Bug",
            subject: "Problems with form page",
            text: "this is purely a test to see how the functionality works and whether it is functional"
        },
        {
            type: "Bug",
            subject: "Problems with form page",
            text: "this is purely a test to see how the functionality works and whether it is functional"
        },
        {
            type: "Request",
            subject: "Addition to form page",
            text: "this is purely a test to see how the functionality works and whether it is functional"
        },
        {
            type: "Request",
            subject: "Addition to form page",
            text: "this is purely a test to see how the functionality works and whether it is functional"
        },
    ]
    localStorage.setItem('forms', JSON.stringify(dummyForms))
    // Stores whether button has been clicked; determines whether to show form data
    const [isBug, setIsBug] = useState(true)
    const [isRequest, setIsRequest] = useState(true)
    const [componentData, setComponentData] = useState(null)
    const [viewFormClicked, setViewFormClicked] = useState(false)

    const [formList, setFormList] = useState(() => {
        let list = JSON.parse(localStorage.getItem('forms'))
        if (list === null) {
            list = ''
        }
        return list
    });

    const viewFormHandler = (formData) => {
        if (!viewFormClicked) {
            setComponentData(formData)
            }
            setViewFormClicked(!viewFormClicked)
        
    }

    return (
        <div className='mainForm'>
            <div className='formContainer'>
                <div className='submittedForms'>
                    <h1>Submitted Forms</h1>
                </div>
                <div className='container'>
                    <div className='dropdown-menu'>
                        <p>Bug Report</p>
                        <button className='dropdown' onClick={() => setIsBug(!isBug)}>
                            {isBug ? <IoIosArrowDropupCircle/> : <IoIosArrowDropdownCircle /> }
                        </button>
                    </div>
                    { isBug && 
                        <div className='data'>
                            <FormList type={"Bug"} formList={formList} viewFormHandler={viewFormHandler} />
                        </div>
                    }
                </div>

                <div className='container'>
                    <div className='dropdown-menu'>
                        <p>Feature Request</p>
                        <button className='dropdown' onClick={() => setIsRequest(!isRequest)}>
                            {isRequest ? <IoIosArrowDropupCircle/> : <IoIosArrowDropdownCircle /> }
                        </button>
                    </div>
                    { isRequest && 
                        <div className='data'>
                            <FormList type={"Request"} formList={formList} viewFormHandler={viewFormHandler} />
                        </div> 
                    }
                </div>
            </div>
            {viewFormClicked && (
                <ViewForm formData={componentData} viewFormHandler={viewFormHandler} />
            )}
        </div> 
    )
}