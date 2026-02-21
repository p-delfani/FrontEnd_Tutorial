let numbers = [2, 12, 34, 90, 18, 26]

let filteredNumbers = numbers.filter(function (number) {
    return number > 25
})

// console.log(filteredNumbers);

let sumNumbers = numbers.reduce(function (prev, current) { // prev = 182    current = 26
    return prev + current
})

///////////////////////////////////////////////////

let shoppingCart = [
    {id: 1, name: 'LapTop', price: 12_000_000},
    {id: 2, name: 'Phone', price: 7_000_000},
    {id: 3, name: 'CoolPad', price: 500_000},
]

let totalPrice = shoppingCart.reduce(function (prev, current) {
    console.log(prev, current);
    if (prev.price) {
        return prev.price + current.price
    }
    return prev + current.price
})

console.log('Total Price: ' + totalPrice);