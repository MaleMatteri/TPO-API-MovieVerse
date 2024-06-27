const createMovieList = async (title, items) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      title: title,
      items: items
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include" // To include cookies if using session-based auth
    };
  
    try {
      const response = await fetch("http://localhost:4000/api/movielists/create", requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error creating movie list:', error);
      throw error;
    }
  }
  
  export default createMovieList;
  