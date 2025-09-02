// Array 

const firstArray = [1,2,3];
console.log(firstArray);

// Or

const secondArray = Array(4,5,6);
console.log(secondArray);

// Or

const ThirdArray = new Array(7,8,9);
console.log(ThirdArray);

// Index in Array 

const MyArray = ["sara","azizi",55];
console.log(MyArray[0]);
console.log(MyArray[1]);
console.log(MyArray[2 ]);

// Nested Array 

const MyArray2 = [
    [1,2,3],
    [4,5,6],
];

console.log(MyArray2);


//  Access Index in Array 

const MyArray3 = ["javascript","botostart","session4"];
MyArray3[0] = "milad";
console.log(MyArray3[0]);
console.log(MyArray3[1]);
console.log(MyArray3[2]);
MyArray3[3] = "sara";
console.log(MyArray3[3]);

// Array Push - Unshift - Pop - Delete

const myarray = ["parmis","Delfani",20];
console.log(myarray.push(1)); //last index
console.log(myarray.unshift(5)); //first index
myarray.pop(); //pop(delete) from Array
myarray.pop();
//delete myarray[0];
myarray[1] ="sara";
console.log(myarray);


// Array Flat- Concat- Join 

//Join
const string = myarray.join();
console.log(string);
//Concat
const myarray2 = [1,2,3];
const newarray  = myarray.concat(myarray2);
console.log(newarray);
//Flat 
const myarrayn3 = [
    [1,2,3],
    [4,5,6]
];

const finalarray = myarrayn3.flat();
console.log(finalarray);


// Array Indexof - Includes Methods
const textarray = ["hello","world"];
console.log(textarray.indexOf("hello"));
console.log(textarray.includes(2));
console.log(textarray.includes("world"));


// Array Slice - Splice method 

const arraynew = ["parmis","delfani",54];
const newfinal = arraynew.slice(0,2);
const newfinal2 = arraynew.slice(-1);
const delarr = myarray.splice(0,1);
console.log(arraynew);
console.log(newfinal);
console.log(newfinal2);
console.log(delarr);


// Array Sort - Reverse 

const arraynum = [5,6,7,8,2,1,0];
console.log(arraynum.sort());
console.log(arraynum.reverse());


/* Challenge : 
1. Create an array 
2. Add your favorite sports
3. use this in a text 
4. remove the last item from the list 
5. Create a new array for the first two items then replace 
*/

const sports = [];
sports.push("football");
sports.push("volleyball");
sports.push("basketball");
sports.push("video game");
const stringsports = sports.join(", ");
const text = `my favorite sports are ${stringsports}`;
const lastindex = sports.length -1;
sports.splice(lastindex);
const firstsport = sports.slice(0,2);
sports.splice(0,2,firstsport)
console.log(firstsport);
console.log(sports);



// Challenge: Array Destructuring 

const fullstack = 
[
    ["HTML","CSS","JS","React"],
    ["Node","Express","MongoDB"]
];



const [frontend,backend] = fullstack;
const [,css,,react] = frontend;
console.log(frontend,backend);
    