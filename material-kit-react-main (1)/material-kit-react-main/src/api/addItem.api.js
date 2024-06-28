const addItemToList = async (token, listId, itemId, type) => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", token);
    myHeaders.append("Content-Type", "application/json");

    if (type === 'TV Show') {
        type = 'tv';
    } else if (type === 'Movie'){
        type = 'movie';
    }
 
    var raw = JSON.stringify({
    "listId": listId.toString(), // Asegúrate de que sea una cadena
    "tmdbId": itemId.toString(), 
    "type": type
    });

    var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    try {
        let response = await fetch("http://localhost:4000/api/movielists/addItem", requestOptions);
        console.log(response);
        let jsonData = await response.json();
    return jsonData;
    } catch (error) {
        console.error('Error creating list:', error);
        throw error;
    }
}

export default addItemToList;
