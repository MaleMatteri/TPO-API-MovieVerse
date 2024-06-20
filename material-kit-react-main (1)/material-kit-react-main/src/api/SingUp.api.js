const singUp = async (name, surname, email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw  = JSON.stringify({
        "name": name,
        "surname": surname,
        "email": email,
        "password": password
    });

    var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    let response = await fetch("http://localhost:4000/api/users/registration", requestOptions)
    let jsonData = await response.json();

    return jsonData;
}
export default singUp;