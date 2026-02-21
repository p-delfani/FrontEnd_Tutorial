// function showValue () {
//     console.log('React Js ');
// }

// let showValue = function () {
//     console.log('React Js ');
// }

// let showValue = () => {
//     console.log('React Js :)');
// }

// let sum = (num1, num2) => num1 + num2

// let doubleNumber = num => num * 2

// let makeUser = (id, name) => ({id: id, name: name})

// function User () {
//     // 
// }

// let User = () => {
//     //
// }

// let  user1 = new User()

// console.log(user1);


/////////////////////////////////////////

let users = [
    {id: 1, name: 'ali', age: 21},
    {id: 2, name: 'amin', age: 23},
    {id: 3, name: 'amir', age: 19},
    {id: 4, name: 'hasan', age: 14},
    {id: 5, name: 'babak', age: 31},
]

// users.forEach(user => console.log(user))

let mainUserItem = users.find(user => user.name === 'amir')

console.log(mainUserItem);