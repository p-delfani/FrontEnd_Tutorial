// XMLHTTPREQUEST : 


const xhr = new XMLHttpRequest();
xhr.open("GET","https://jsonplaceholder.typicode.com/posts");
xhr.onload = () => 
{
    console.log(xhr )
}
xhr.send();

// fetch : 

fetch ("https://jsonplaceholder.typicode.com/posts")
.then((res) => res.json())
.then((data) => console.log(data)).catch(console.error())
.catch((error) => console.log(error));



// Get | Post : 

// default method for sen
$(document).ready(function(){
  $("button").click(function(){
    $.post("demo_test_post.asp",
    {
      name: "Donald Duck",
      city: "Duckburg"
    },
    function(data,status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  });
});


// Put || Patch : 
let PutRequest = () => {
// Sending PUT request with fetch API in javascript
fetch("https://reqres.in/api/users/123", {
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
    },
    method: "PUT",

    // Sending only the fields that are to be updated
    body: JSON.stringify({  
        "userId": 123,
        "name": "Updated John Doe",
        "age": 31,
        "email": "john.doe@example.com"
    })
})
    .then(function (response) {

    // console.log(response);
    return response.json();
    })
    .then(function (data) {
    console.log(data);
    });
};

PutRequest();


// Delete : 

fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE',
});

