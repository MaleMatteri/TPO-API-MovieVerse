const getUserLists = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", token);
    myHeaders.append("Content-Type", "application/json");
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
  
    try {
      let response = await fetch("http://localhost:4000/api/movielists/lists", requestOptions);
      let jsonData = await response.json();
      console.log('Response data:', jsonData); // Add this line to log the response
      return jsonData;
    } catch (error) {
      console.error('Error fetching user by token:', error);
      throw error;
    }
  };
  
  export default getUserLists;
  