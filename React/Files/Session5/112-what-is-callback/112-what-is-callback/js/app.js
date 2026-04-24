function showValue (number, callback) {

    let power = number ** 2
    callback()
    return power 
}


// function showLog () {
//     console.log('محاسبه انجام شد');
// }


let powerResult = showValue(3, function () {
    console.log("محاسبه انجام شد");
}) // 9

console.log(powerResult);


document.body.addEventListener('load', function () {})

[1, 4, 9].map(function () {

})