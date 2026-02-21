// function Car (color, name, tairCount) {
//     this.color = color
//     this.name = name
//     this.tairCount = tairCount
// }

// let peugeot405 = new Car('White', 'Peugeot405', 4)
// let parsTu5 = new Car('Gray', 'Peugeot Pars TU5', 4)

// console.log(peugeot405);
// console.log(parsTu5);


class Car {

    constructor(color, name, tairCount) {
        this.color = color
        this.name = name
        this.tairCount = tairCount
    }

}

let peugeot405 = new Car('White', '405', 4)
let peugeotPars = new Car('Gray', 'Pars', 4)

console.log(peugeot405);
console.log(peugeotPars);