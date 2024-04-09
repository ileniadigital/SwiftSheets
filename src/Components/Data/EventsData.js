import Axios from 'axios';

// Fetch events by timesheet ID
export const fetchEventsByTimesheetID = async (timesheetID) => {
  let url = 'http://localhost:8000/event/';

  if (timesheetID) {
    url += `?timesheet_id=${timesheetID}`;
  }

  try {
    const response = await Axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

// //Create events
// export const createEvents = async (timesheetID) => {
//   const dummyEvents = [
//     {
//       date: "2024-04-09",
//       start_time: "09:00:00",
//       end_time: "11:00:00",
//       duration: 2.0,
//       name: "Dummy Event 1",
//       type: "Normal",
//       category: "Planning",
//       is_recurring: false,
//       note: "Dummy event for testing",
//     },
//     {
//       date: "2024-04-10",
//       start_time: "14:00:00",
//       end_time: "16:00:00",
//       duration: 2.0,
//       name: "Dummy Event 2",
//       type: "Normal",
//       category: "Meeting",
//       is_recurring: false,
//       note: "Dummy event for testing",
//     },
//   ];

//   let url = 'http://localhost:8000/event/';

//   if (timesheetID) {
//     url += `?timesheet=${timesheetID}`;
//   }

//   try {
//     const response = await Axios.post(url, dummyEvents);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating events:', error);
//   }
// };

export const createEvents = async (timesheetID, eventData) => { // Accept event data as parameter
  let url = 'http://localhost:8000/event/';

  if (timesheetID) {
    url += `?timesheet=${timesheetID}`;
  }

  try {
    const response = await Axios.post(url, eventData);
    console.log("Sent data") // Send eventData to the backend
    return response.data;
  } catch (error) {
    console.error('Error creating events:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
};


// Destroy events by IDs
export const destroyEvents = async () => {
  try {
    const eventIDsToDelete = [12, 13, 14, 15]; // Dummy array of event IDs to delete
    const url = 'http://localhost:8000/event/delete/'; // Update the URL to match the new pattern
    const response = await Axios.post(url, { event_ids: eventIDsToDelete });
    return response.data;
  } catch (error) {
    console.error('Error destroying events:', error);
    throw error;
  }
};