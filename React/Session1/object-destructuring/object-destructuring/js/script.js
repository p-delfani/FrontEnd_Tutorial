let user = {
    id: 1,
    name: 'Mohammad',
    family: 'Ahmadi',
    age: 23,
}

// let id = user.id
// let name = user.name
// let family = user.family
// let age = user.age

//  let id 

let [a, b] = [1, 2]

let {name, id: userId, age, family} = user

console.log(userId, name, family, age);