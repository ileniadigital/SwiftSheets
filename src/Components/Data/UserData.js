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
export const fetchUsers = async (setUsers) => {
    let url = 'http://localhost:8000/systemuser/';

    try {
        const response = await Axios.get(url);
        setUsers(response.data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Create user
export const createUser = async (userID, user) => {
    let url = 'http://localhost:8000/systemuser';

    if (userID) {
        url += `/?id=${userID}`;

    }

    try {
        const response = await Axios.post(url, user);
        console.log("User created:", response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
    }
};
