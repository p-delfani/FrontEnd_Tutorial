// let numbers = [2, 4, 1, 10, 12, 18, 22, 19]

// let filteredNumbers = numbers.filter(function (number) {
//     console.log(number);
//     return number > 10
// })

// console.log(filteredNumbers);

let allProducts = [
    {id: 1, name: 'laptop', price: 7_000_000},
    {id: 2, name: 'phone', price: 5_000_000},
    {id: 3, name: 'water', price: 7_000},
    {id: 4, name: 'pencil', price: 19_000},
    {id: 5, name: 'milk', price: 35_000},
]

let filteredProdcuts = allProducts.filter(function (product) {
    console.log(product);
    return product.price < 1_000_000
})

console.log(filteredProdcuts);