let users1 = ['ali', 'amin', 'amir']
let users2 = ['mobin', 'babak', 'hasan']

let allUsers = [...users1, ...users2]

// console.log(allUsers);

function showUsers (...users) { // Rest Operator -> item => array
    users.forEach(user => console.log(user))
}

showUsers(...users1) // Spread Syntax -> array => item