function firstLogs() {
    console.log(1);
    console.log(2);
}

function middleLog(callback) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(3);
            resolve()

        }, 3000)
    })
}

function lastLogs(callback) {
    console.log(4);
    console.log(5);
}



firstLogs()

middleLog()
    .then(lastLogs)