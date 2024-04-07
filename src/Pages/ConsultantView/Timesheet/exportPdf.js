// Importing to create pdf
import html2pdf from 'html2pdf.js';
 
// Export file as PDF
export default function exportPdf() {
    const clone = document.querySelector('.consultant-view').cloneNode(true); // Clone the entire container so changes aren't made to the page itself

    clone.style.paddingTop = '2rem'

    // Remove add event button and buttons
    const addEventButton = clone.querySelector('.add-event-button');
    const buttons = clone.querySelector('.buttons');
    const reminder = clone.querySelector('.completion-reminder')

    if (addEventButton) {
        addEventButton.remove()
    } 
    if (buttons) {
        buttons.remove()
    }
    if (reminder) {
        reminder.remove()
    }

    // Setting image dimensions to window size
    const height = window.innerHeight;
    const width = window.innerWidth

    const options = {
        filename: 'timesheet.pdf', // Set the PDF file name
        jsPDF: { // Configure jsPDF options
            orientation: 'landscape',
            unit: 'px',
            format: [width, height],
        }
    };

    // Saving pdf
    html2pdf().from(clone).set(options).save(); 
}