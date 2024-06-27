const createMovieList = async (token ,title) => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", token);
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "title": title,
      
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include" // To include cookies if using session-based auth
    };
  
    try {
      let response = await fetch("http://localhost:4000/api/movielists/create", requestOptions);
      console.log(response);
      let jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error creating list:', error);
      throw error;
    }
  }
  
  export default createMovieList;
  