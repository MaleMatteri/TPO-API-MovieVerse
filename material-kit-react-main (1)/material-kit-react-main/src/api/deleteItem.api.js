const deleteItemFromList = async (token, listId, itemId) => {
  var myHeaders = new Headers();
  myHeaders.append("x-access-token", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "listId": listId,
    "itemId": itemId   
  });

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  console.log(requestOptions);
  try {
    let response = await fetch("http://localhost:4000/api/movielists/deleteItem", requestOptions);
    let jsonData = await response.json();
    console.log('Response data:', jsonData);
    return jsonData;
  } catch (error) {
    console.error('Error deleting item from list:', error);
    throw error;
  }
};

export default deleteItemFromList;
