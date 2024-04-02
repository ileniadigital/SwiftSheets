import Axios from 'axios';

export const updateTimesheetStatus = async (timesheetId, newStatus) => {
  const url = `http://localhost:8000/timesheet/${timesheetId}/`;

  try {
    const response = await Axios.patch(url, {
      review_status: newStatus
    });
    console.log('Timesheet status updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating timesheet status:', error);
    throw error;
  }
};
