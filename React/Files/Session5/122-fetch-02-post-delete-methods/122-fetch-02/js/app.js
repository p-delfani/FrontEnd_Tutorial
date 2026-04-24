let newPost = {
    userId: 21,
    body: 'Fetch in js',
    title: 'js'
}

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify(newPost)
// }).then(response => response.json())
//     .then(data => console.log(data))

fetch('https://jsonplaceholder.typicode.com/posts/10', {
    method: 'DELETE'
}).then(response => response.json())
    .then(data => console.log(data))