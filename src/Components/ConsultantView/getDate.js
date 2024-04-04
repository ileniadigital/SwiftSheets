// Function retrieves the day, month and year of a date
export default function getDate(week, dayToRetrieve) {
    let tempDay = new Date(week)

    if (tempDay.getDay() === 0) {
        tempDay.setDate(tempDay.getDate()-1 - 6 + dayToRetrieve)
    } else {
         /* Subtracts curent day of week to get 'Sunday' (start of the week)
       Adds dayToRetrrieve to get the target day */
        tempDay.setDate(tempDay.getDate() - tempDay.getDay() + dayToRetrieve)  
    }

   
    // Going to beginning of week and adding number of days passed as parameter to get day's date
    
    let day = tempDay.getDate().toString().padStart(2, '0');
    let month = (tempDay.getMonth() + 1).toString().padStart(2,'0'); // + 1 due to 0 indexing
    let year = tempDay.getFullYear();

    return [day,month,year] 
}