// Client-side Storage : 

// Local Storage- persistent - 5MB : 

/*
localStorage.setItem("name","parmis");
console.log(localStorage);

*/

// JSON,stringify || JSON.parse
/*
const data = {name:"parmis",age:20};
const stringdata = JSON.stringify(data);
localStorage.setItem("name","parmis");
localStorage.setItem("data",stringdata);
*/


const data = localStorage.getItem("data");
const parsedata = JSON.parse(data);
console.log(data);
console.log(parsedata);
// Update in local storage : 
localStorage.setItem("name","sara");
//length :
console.log(localStorage.length);
//Key :
console.log(localStorage.key(1));
// clear localstorage : 
localStorage.clear();
// OR : 
localStorage.removeItem("name");

