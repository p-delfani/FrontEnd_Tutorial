// HOF

let numbers = [1, 5, 10, 12, 9, 6]

numbers.forEach(function (number, index) {
    // console.log(`Number ${index + 1}: ${number}`);
})

let filteredNumbers = numbers.filter(number => number > 9)
// console.log(filteredNumbers);

function getUserInfos (username) {
    let isLogin = false

    if (username.toLowerCase() === 'amin') {
        isLogin = true
    }

    return () => {
        console.log('In tabe nashon mide ke user login hast ya na');
    }
}

console.log(getUserInfos('amin')());