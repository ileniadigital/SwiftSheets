// Importing to create pdf
import html2pdf from 'html2pdf.js';
 
// Export file as PDF
export default function exportPdf(body) {
    const clone = body.cloneNode(true); // Clone the entire container so changes aren't made to the page itself
    
    // Removing name container margins
    const nameContainer = clone.querySelector('.name-container');
    nameContainer.style.margin = '0'; 

    // Removing consultant view margins
    const consultantView = clone.querySelector('.consultant-view'); 
    consultantView.style.margin = '0'; 

    // Remove navbar, add event button and buttons
    const navbar = clone.querySelector('.navbar-container');
    const addEventButton = clone.querySelector('.add-event-button');
    const buttons = clone.querySelector('.buttons');
    if (navbar) {
        navbar.remove();
    }
    if (addEventButton) {
        addEventButton.remove()
    } 
    if (buttons) {
        buttons.remove()
    }

    const options = {
        filename: 'timesheet.pdf', // Set the PDF file name
        jsPDF: { // Configure jsPDF options
            unit: 'px', // Specify the unit for dimensions
            format: [2000, 1323], // Specify the page dimensions
            orientation: 'landscape'
        }
    };

    // Saving pdf
    html2pdf().from(clone).set(options).save(); 
}