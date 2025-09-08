// Nan => not a number

//console.log("parmis"/2); //Nan

// Null & Undefined

/*

let name;
let age =26;
age = null;
console.log(age); // NUll

*/
// Number Method 


/*const number =50;
console.log(number);
console.log(typeof number);
*/
// Convert Number to string 
/*
const string = number.toString();
console.log(string);
console.log(typeof string);
*/


// Number Method 

/*
const number = 3.23418767;
const fixed = number.toFixed(10);
console.log(fixed);

*/

// Convert String to Number 
/*
const string = "50";
console.log(Number(string));  //50

const number = parseInt(string);
console.log(number);   // 50
*/

// Convert String to Number(Float)
/*
const string = "50.6565";

const number = parseFloat(string);
console.log(number);   //50.6565 
*/

/*
const text = "Hi I'am Parmis";
console.log(text);


const text2 = "Hi I'am Parmis,\
 Iam from iran";
console.log(text2);


const text3 = "Hi I'am Parmis,\nIam from iran";
console.log(text3);
console.log(text.length);
*/


// Index Of Method
/*
const text = "Parmis";
console.log(text[0]);

console.log(text.indexOf("m"));
console.log(text.charAt(4));
*/

/*
const text = "Parmis";
console.log(text.includes("Par"));
console.log(text.toUpperCase());
console.log(text.toLocaleLowerCase());
console.log(text.split("i"));
console.log(text.replace("Par","Del"));

const text2 = "delfani";
console.log(text+" "+text2);
const finaltext = text.concat(" "+text2);
console.log(finaltext);
const text3 = "test     ";
console.log(text3.trim());
*/

/*
const text = "Parmis is a student";
const newtext = text.slice(0,10);
console.log(newtext);
console.log(text.substring(2,8));
console.log(text.substr(0,5));

*/


/*Challenge: Capitalizied first letter of a text*/

const text = "hi, Iam Parmis a student";
const firstletter = text.charAt(0);
const toUpperCasefirstletter = firstletter.toUpperCase();
const finaltext = text.replace(firstletter,toUpperCasefirstletter);
console.log(finaltext);

// Challenge: Replace a part of phone number

const phone = "09919454554";
/*const substring = phone.slice(4,7);
const finalphone = phone.replace(substring,"***")
console.log(finalphone);
*/

const finalphone = phone.replace(phone.slice(4,7),"***");
console.log(finalphone);


// Template Literals
// ES6

/*const name = "Parmis";
const age = 20;

const fulltext = `hello, my name is ${name} and Iam ${age} years old`;
console.log(fulltext);

*/


// Challege: Extract name and lastname 

const name = "Parmis Delfani";

const Extractname1 = name.slice(0,6);
console.log(Extractname1);
const Extractlastname = name.slice(7,14);
console.log(Extractlastname);
console.log(`your name is ${Extractname1} and your family is ${Extractlastname}`);


