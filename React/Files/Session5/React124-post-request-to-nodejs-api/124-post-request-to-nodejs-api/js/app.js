let newUser = {
    fullName: 'Babak',
    password: 'babak1243',
    email: 'babak@yahoo.com'
}

fetch('http://localhost:3000/api/users', {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
}).then(response => response.json())
    .then(data => console.log(data))