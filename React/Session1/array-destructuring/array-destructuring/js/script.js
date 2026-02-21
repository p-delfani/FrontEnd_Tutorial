// let array = [12, 'ali', true, 21, 'babak']

// // let item1 = array[0]
// // let item2 = array[1]
// // let item3 = array[2]

// let [item1, item2, , item3, item4] = array

// console.log(item1, item2, item3, item4);


const makeNumbers = () => {
    return [40, 80]
}

// let [a = 5, b = 12] = []
let [a = 5, b = 12] = makeNumbers() // [40, 80]

console.log(a, b);