let articles = [
    {id: 1, title: 'Callbacks in js', createdAt: '1400-10-10'},
    {id: 2, title: 'Ajax in React js', createdAt: '1400-10-20'},
]


function articlesLog () {
    articles.forEach(article => {
        console.log(article);
    })
}

function addArticle (callback) {
    let newArticle = {
        id: 3,
        title: 'Console.table in js',
        createdAt: '1400-10-20'
    }

    setTimeout(() => {
        articles.push(newArticle)
        callback()
    }, 3000);

}

addArticle(articlesLog)