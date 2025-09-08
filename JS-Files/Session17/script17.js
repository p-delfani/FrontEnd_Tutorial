// DOM => Document Object Model 

console.log(document);
// Single Selector : 

//const element = document.querySelector("h1");
//const element = document.querySelector("p");
//const element = document.querySelector(".container");
const element = document.querySelector("#para");

console.log(element);

// Multi Selectors :

const elemntlist = document.querySelectorAll("p");
console.log(elemntlist);
console.log(elemntlist[0]);

// Parent | Sibling | Children : 

console.log(document.body.children);
console.log(document.body.parentElement);
console.log(element.previousElementSibling);

console.log("----------------")

// Change element : 

const element2 = document.querySelector("a");
element2.href ="";
console.dir(element2);


 
// Change CSS Style in Js 

const element3 = document.querySelector("h1");
/*element3.style.color = "green";
element3.style.width = "600px";
element3.style.fontSize = "3.5rem";
element3.style.backgroundColor = "silver";

*/



// Add and Change element to DOM : 

//const elem = document.querySelector("div");
//elem.innerHTML = "<Span>Removed</Span>";
//elem.innerText = "<Span>Removed</Span>";
//console.dir(elem);
/*
const spantag = document.createElement("Span");
spantag.innerText  = "Hi, iam inserted";
spantag.style.color = "aqua";
//elem.appendChild(spantag); // add really element
elem.append(spantag); // add every element
console.log(spantag);
*/



// Delete From Dom : 

const elem = document.querySelector("div");
elem.remove();
// Or : 
elem.removeChild(elem.children[0]);



// Intro and add Event : 

//Event 

const btn = document.querySelector("button");
const showhandler = () =>{
console.log("Hello World");
}


// Event Type : 
/*
btn.addEventListener("click",showhandler);
btn.addEventListener("mouseup",showhandler);
btn.addEventListener("mousedown",showhandler);
btn.addEventListener("mouseover",showhandler);
btn.addEventListener("mouseenter",showhandler);
btn.addEventListener("mouseleave",showhandler);
btn.addEventListener("mousemove",showhandler);
*/

// Keys Event Type : 

/*
btn.addEventListener("keyup",showhandler);
btn.addEventListener("keydown",showhandler);


const input = document.querySelector("input");

const showhandl = () =>
{
    console.log("show message");

}

input.addEventListener("change",showhandl);
input.addEventListener("focus",showhandl);
input.addEventListener("blur",showhandl);

// Window Event : 
window.addEventListener("load",showhandl);
window.addEventListener("unload",showhandl);

*/


// Target  :
// that is element which we click that 


// Delete Event : 

const divshowhandler = (event)=> {
btn.removeEventListene("click",showhandler);
}

// check Data Set : 

const h1 = document.querySelector("h1");
console.log(h1.dataset);

// Size of a Element : 

const btnn = document.querySelector("button");

console.log(btnn.clientTop);
console.log(btnn.offsetTop);
console.log(btnn.offsetHeight);
console.log(btnn.clientHeight);
console.log(btnn.offsetWidth);
console.log(btnn.clientWidth);
console.log(btnn.offsetLeft);
console.log(btnn.clientLeft);
console.log(btn.scrollHeight);







