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
