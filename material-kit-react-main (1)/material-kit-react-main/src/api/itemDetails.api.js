const BASE_URL = 'http://localhost:4000/api';

const searchContentByIdAndType = async (id, type) => {
  try {
    const response = await fetch(`${BASE_URL}/data_api/searchByIdAndType?id=${encodeURIComponent(id)}&type=${encodeURIComponent(type)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching content by ID and type:', error);
    throw error;
  }
};

export default searchContentByIdAndType;

  