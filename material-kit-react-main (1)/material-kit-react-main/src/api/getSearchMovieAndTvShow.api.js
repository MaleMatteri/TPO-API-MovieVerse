const BASE_URL = 'http://localhost:4000/api';

const searchMoviesAndTvShows = async (query) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(`${BASE_URL}/data_api/search?query=${encodeURIComponent(query)}`, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies and TV shows:', error);
    throw error;
  }
}

export default searchMoviesAndTvShows;
