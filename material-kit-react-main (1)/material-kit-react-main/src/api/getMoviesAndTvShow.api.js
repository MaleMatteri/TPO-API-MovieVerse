// getMoviesAndTvShow.api.js
const getMoviesAndTvShow = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow"
    };
  
    try {
      let response = await fetch("http://localhost:4000/api/data_api/popular", requestOptions);
      console.log(response);
      let jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching movies and tv shows:', error);
      throw error;
    }
  }
  
  export default getMoviesAndTvShow;
  
