// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then((response) => {
//         return response.json()
//     }).then(data => {
//         console.log(data);
//     })



fetch('https://randomuser.me/api/')
    .then((response) => {
        return response.json()
    }).then(data => {
        console.log(data.results[0]);
    })