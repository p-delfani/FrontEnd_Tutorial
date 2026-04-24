
function firstLogs () {
    console.log(1);
    console.log(2);
}

function middleLog (callback) {
    setTimeout(() => {
        console.log(3);
        callback(function (callback) {

        })
    }, 3000)
}

function lastLogs (callback) {
    console.log(4);
    console.log(5);
}



firstLogs()
middleLog(lastLogs)

// button.addEventListener('click', clickHandler)