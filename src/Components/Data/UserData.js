import Axios from 'axios';

export const fetchUserDetails = async (userIds) => {
  const userDetailPromises = userIds.map(id =>
    Axios.get(`http://localhost:8000/systemuser/${id}/`)
      .then(response => ({ id, data: response.data }))
      .catch(error => {
        console.error(`Error fetching details for user ${id}:`, error);
        return { id, data: null };
      })
  );

  const userDetailsResponses = await Promise.all(userDetailPromises);
  return userDetailsResponses.reduce((acc, { id, data }) => {
    if (data) acc[id] = data;
    return acc;
  }, {});
};

// Fetch users from the API
export const fetchUsers = async () => {
    let url = 'http://localhost:8000/systemuser/';

    try {
        const response = await Axios.get(url);
        return response.data; // Return the fetched users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error to be handled in the component
    }
}

// Create user
export const createUser = async (user) => {
    let url = 'http://localhost:8000/systemuser/';

    try {
        const response = await Axios.post(url, user);
        console.log("User created:", response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

// Function to delete a system user by ID from the backend
export const deleteUserFromBackend = async (userId) => {
  try {
    const response = await Axios.delete(`http://localhost:8000/systemuser/${userId}/`);
    console.log(`User with ID ${userId} deleted successfully`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

// Update user in the backend
export const updateUserInBackend = async (updatedUser) => {
  const { id, ...userData } = updatedUser; // Extract user ID and other data
  const url = `http://localhost:8000/systemuser/${id}/`; // Endpoint to update user

  try {
      const response = await Axios.put(url, userData);
      console.log('User updated successfully in the backend:', response.data);
      return response.data; // Return updated user data
  } catch (error) {
      console.error('Error updating user in the backend:', error);
      throw error; // Throw error for handling in calling function
  }
};
