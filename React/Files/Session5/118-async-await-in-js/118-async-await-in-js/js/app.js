// function firstLogs() {
//     console.log(1);
//     console.log(2);
// }

// function middleLog(callback) {

//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(3);
//             resolve()

//         }, 3000)
//     })
// }

// function lastLogs(callback) {
//     console.log(4);
//     console.log(5);
// }

// async function allLogs () {
//     firstLogs()
//     await middleLog()
//     lastLogs()
// }

// allLogs()


////////////////////////////////////////////////////////////////////////


let articles = [
    { id: 1, title: 'Callbacks in js', createdAt: '1400-10-10' },
    { id: 2, title: 'Ajax in React js', createdAt: '1400-10-20' },
]

function articlesLog() {
    articles.forEach(article => {
        console.log(article);
    })
}

function addArticle() {
    let newArticle = {
        id: 3,
        title: 'Console.table in js',
        createdAt: '1400-10-20'
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            articles.push(newArticle)
            resolve()
        }, 3000);
    })
}

async function init() {
    await addArticle()
    articlesLog()
}

init()