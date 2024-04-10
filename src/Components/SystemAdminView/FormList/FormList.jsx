// Importing Components
import FormEntry from "../Form/FormEntry"

export default function FormList ({ type, formList, viewFormHandler }) {

    // Go through list of submitted forms to find those that match a criteria
    console.log(formList)
    let formArray = []
    for (const index in formList) {
        var form = formList[index]
        console.log(form)
        let formType = form.type
        if (formType === type) {
            formArray.push(
            <FormEntry formData = {form} viewFormHandler={viewFormHandler}/>
            )
        }
    }

    return (
        <div>
            {formArray}
        </div>
    )
}