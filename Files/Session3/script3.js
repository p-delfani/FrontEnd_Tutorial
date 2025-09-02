// operator 

// 1. Arthemetic Operator


//const x  =50;
//const y = 4;

//const result = x + y;
//const result = x - y;
//const result = x * y;
//const result = x / y;
//const result = x % y;
//const result = x ** y; //tavan
//x++;
//x--;

//console.log(result);


// Assigment Operator 

let x = 5;
const y = 3;
x = x+5;
//console.log(x);

// or 

x += 8;
x *= 8;
x /= 8;
x -= 8;

//console.log(x);

// Comparision Operator

const z =5;
const d =3;
const b = 8;
/*console.log(z == d);
console.log(z != d);
console.log(z === d);
console.log(z !== d);
console.log(z > b);
console.log(z >= b);
console.log(z < b);
console.log(z <= b);*/


// Logical Operator

//console.log(true && false);
//console.log(true  || false);

console.log(z > d && z == d);
console.log(z > d || z == d);
console.log(!z > d);


// String Operator 

let firstname = "parmis";
let lastname = "delfani";
//const finaltext = firstname+ lastname;
//console.log(finaltext);   //parmisdelfani
//const finaltext2  = "Hi, iam"+" "+firstname+" "+lastname;
//console.log(finaltext2);   //parmis delfani

//or 
 /*firstname = firstname + lastname;
 console.log(firstname);*/

//or 

firstname += lastname;
 console.log(firstname);


// Unary Operator 

const value = "5";
// Unary Plus
console.log(+value);


// Unary negative
console.log(-value);
 

// Nullish Coalescing Operator 

let name = null;
let number;
console.log(name ?? number)



// Ternary Operator 

/*const a = 4;
const k = 5;
console.log(true ? "yes":"no");
console.log(false ? "yes":"no");
console.log(a >= k ? "yes":"no");
console.log(a <= k ? "yes":"no");
console.log(a == k ? "yes":"no");
console.log(a != k ? "yes":"no");
console.log(a === k ? "yes":"no");
console.log(a !== k ? "yes":"no");
*/


// Truthy and Falsy values 

/*console.log(0 ? "Truthy" : "falsy");
console.log(1 ? "Truthy" : "falsy");
console.log(null ? "Truthy" : "falsy");
console.log(undefined ? "Truthy" : "falsy");
console.log(Object ? "Truthy" : "falsy");
console.log([] ? "Truthy" : "falsy");
console.log([5,6] ? "Truthy" : "falsy");*/


// Challenge: Check order details 

/* 
1. Create 3 variable to store an item price.
the last price 2 items were ordered(multiplication)
2.Tell the user what the total price is before discount
3. inform the user what the average price of item is before discount.
4. inform them to the final price after saving 5% dollers with promo code:
"i got 5 on it"
5.comapare final price with hsi/her accoutn belance,
6.log a message to tell user what he/she can buy or not*/


const price1 = 10;
const price2 = 15;
const price3 = 18;
const belance = 60;


const totalprice = price1 + price2 + price3 * 2;
console.log("your total price is : "+totalprice);

const averageprice = totalprice / 4;
console.log("average price",averageprice);

const finalprice = totalprice * 0.95;
console.log("final price",finalprice);

const canbuy = belance >= finalprice;
console.log("can buy",canbuy);

const message = canbuy ? "you can buy " : "you can't buy";
console.log(message);























