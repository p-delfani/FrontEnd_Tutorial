// Function

// Fuction Syntax : 
function showmessage()
{
    console.log("hello");
}

showmessage();

// Fuction duplicate number 

function duplicate(number) // Parametr
{
    const result = number * 2;
    console.log(result);
}

duplicate(12); // argument

// Sum 2 number with Fuctions : 

function sum(num1,num2)
{
    sum = num1 + num2;
    console.log(sum);
}


sum(2,5);

// Rertn in Function 


function sum(num1,num2)
{
    sumnum = num1 + num2;
    return sumnum;
}
console.log(sum(5,5));

// Scope in Js : 
// Global Scope 
// Local Scope
// Block Scope

// Global Scope 
const name = "Parmis";

function saymyname()
{
    console.log(name);

}

saymyname();


// Local Scope = Function Scope :

function saymyname2()
{
    const name = "Parmis";
    console.log(name);
}
saymyname2();

// Block Scope : After ES6 we have this 

if(true)
{

}


// Difference let and const and var : 

if(true)
{
    const age = 20;
    console.log(age);
    if(true)
    {
        console.log(age);
    }
}

// Hoisting : 

// in this topic variable and fanctions run before rest of the code:

saysth();
function saysth()
{
    console.log("sth");
}

// variable : 
/*
console.log(name4);
let name4 = "parmis";

// Error : Uncaught ReferenceError: Cannot access 'name4' before initialization

console.log(name5);
const name5 = "parmis";

// Error : Uncaught ReferenceError: Cannot access 'name4' before initialization

console.log(name6);
var name6 = "parmis";
*/
// Undifined 


// Strict Mode : 
// Run and Debug code very carefully and in strick mode

"use strict"; // we write this top of our code (first line)

undefined = 5;
NaN = 8;

// Error 

const number0 = 5;
delete number0;

// Error 



// Function declaration && Function Expression
// Function declaration
function saymyname2(name)
{
    console.log(`your name is ${name}`);
}

saymyname2("maryam");


// Function Expression

const Saymyname = function (n)
{
    console.log(`your name is ${n}`);
}

Saymyname("sara");


// Anonymous Function  && IIFE (Immediately Invoked Function Expression )

(function()
{

    console.log("IIFE test function");
})
();


// Arrow Function | ES6 : 

const sum2 =(numb1,numb2) => numb1 + numb2;
const res = sum2(6,8);
console.log(res);



// Callback function | Highter order function 

// Callback Function 

/*
const showmess2 = (text) => console.log(`the result is ${text}`);
function sum4(numbe1, numbe2, callback)
{

    const sumation = numbe1 + numbe2;
    const  result2  = sumation ** 2;
    callback(result2)
}

sum4(8,2,showmess2);
*/


// Challenge : Write a Function to find the count of a letter in a string 

const countletter = (str,letter) => 
{
    let counter =0;
    for(let i =0;i < str.length; i++)
    {
        if(str[i] === letter)
        {
            counter++;
        }
    }
    return counter;
};

const resof = countletter("hello parmis","l");
console.log(resof);