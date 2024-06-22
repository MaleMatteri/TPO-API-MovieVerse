const getUserByMail = async (email, token) => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "password": password
    });

    var requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    let response = await fetch("http://localhost:4000/api/users/userByMail", requestOptions);
    console.log('ESTA ES LA RESPONSE', response);
    let jsonData = await response.json();

    return jsonData;
}

export default getUserByMail;
