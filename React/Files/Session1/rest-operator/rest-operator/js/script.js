// function sum (a, b, c) {
//     console.log(arguments[0] + arguments[1] + arguments[2]);
// }

// let sum = function (a, b, c) {
//     console.log(arguments);
//     console.log(arguments[0] + arguments[1] + arguments[2]);
// }

let sum = (...sumArgs) => {
    console.log(sumArgs);

    return sumArgs.reduce((prev, current) => prev + current)

}

console.log(sum(50, 30, 20));