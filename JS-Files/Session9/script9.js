// For Each:
const numbers = [2,4,5,7,3];
const newnumbers = [];

numbers.forEach((number,index)=> {
    console.log(`number : ${number}`);
    console.log(`index : ${index}`);
    console.log(numbers);
});

console.log("-----------------------");


numbers.forEach((number) => 
{
    newnumbers.push(number*2);
});

console.log(newnumbers);

console.log("-----------------------");


// Map : 

const numbers2 = [2,4,5,7,3];
const newnumbers2 = numbers2.map((num) =>
{
    return num * 2 ;
});

console.log(newnumbers); 


console.log("-----------------------");


// Find | Find Index
const numbers3 = [2,4,5,7,3];
const result = numbers3.find((number) => {
    const isequal = number === 5;
    console.log(isequal);
    return isequal;

});

console.log ("reult",result);


// Filter 

const numbers4 = [2,4,5,7,3,5];

const result2 = numbers4.filter((number) =>number === 5);
console.log(result2);

// Reduce 

const number5 = [2,4,5,7,3,5];
const result3 = number5.reduce((accumalator,currentvalue,index,array)=>
{
        const result3 = accumalator + currentvalue;
        return result3;
},0);
console.log(result3);


// every- some

const data = [1,"2",3];
const resu = data.every((item) => {
    const istrue = typeof item === "number";
    return istrue;
});

console.log(resu);


const data2 = [1,"2",3];
const resu2 = data.some((item) => {
    const istrue = typeof item === "number";
    return istrue;
});

console.log(resu2);



// Challenge 1. Find customers with age>60 and age<10
// Challenge 2. Build customer data with title and full name

let customers = [
  {
    id: 1,
    f_name: "Abby",
    l_name: "Thomas",
    gender: "M",
    married: true,
    age: 32,
    expense: 500,
    purchased: ["Shampoo", "Toys", "Book"],
  },
  {
    id: 2,
    f_name: "Jerry",
    l_name: "Tom",
    gender: "M",
    married: true,
    age: 64,
    expense: 100,
    purchased: ["Stick", "Blade"],
  },
  {
    id: 3,
    f_name: "Dianna",
    l_name: "Cherry",
    gender: "F",
    married: true,
    age: 22,
    expense: 1500,
    purchased: ["Lipstik", "Nail Polish", "Bag", "Book"],
  },
  {
    id: 4,
    f_name: "Dev",
    l_name: "Currian",
    gender: "M",
    married: true,
    age: 82,
    expense: 90,
    purchased: ["Book"],
  },
  {
    id: 5,
    f_name: "Maria",
    l_name: "Gomes",
    gender: "F",
    married: false,
    age: 7,
    expense: 300,
    purchased: ["Toys"],
  },
];
console.log("ok");


// Filter : 

// First Challenge 
const over60 = customers.filter(customers => customers.age < 10 || customers.age >60);
console.log(over60);

// Map : 

const titledCustomers = customers.map(customer => {
const title = customer.gender === "M"
  ? "Mr."
  : customer.married
    ? "Mrs."
    : "Miss";
    return {
    id: customer.id,
    fullName: `${title} ${customer.f_name} ${customer.l_name}`
  };
});

console.log(titledCustomers);

// This 

globalThis.age = 20;
console.log(this);

function showage()
{
console.log(this.age);
}

showage();


const data3 = {
  name: "parmis",
  showage2: function()
  {

    console.log(this);
  }
}

data3.showage2();


// Bind method

globalThis.name = "parmis";

function saymyname(age)
{
  console.log("age: ",age);
  console.log(`your name is ${this,name}`);
}

saymyname(20);

const dat = {name: "sara"};
saymyn = saymyname.bind(dat);
saymyname();


console.log("-------------------------")

// Call , Apply 

saymyname.call(dat,20);

saymyname.apply(dat,[20,"delfani"]);


// Setter | Getter : 


// Getter 
const data4 = {
  firstname : "Parmis",
  lastname : "Delfani",
  get fullname1() 
  {
    return `${data4.firstname} ${data4.lastname}`;
  },

  set fullname2(string) {
    this.firstname = string.split("")[0];
    this.lastname = string.split("")[1];

  },
};

//const fullname = `${data4.firstname} ${data4.lastname}`;
//console.log(fullname);
console.log(data4.fullname1);


// Setter : 

// Change Object value first way 
data4.firstname = "Sara";
data4.lastname = "Azizi";
console.log(data4);

// but with Setter way : 

data4.fullname2 = "Maryam Kazemi";
console.log(data4);

console.log("--------------------");

// Clouser- Factory Function 

// Encapsulation 

const like = () =>{
  let likecounter = 0;
  likecounter++;
  return likecounter;
};

// we don't have State  Retention
console.log(like());  //1
console.log(like());  //1
console.log(like());  //1

console.log("--------------------");


let likecounter1 = 0;
const like2 = () =>{
  likecounter1++;
  return likecounter1;

};


// Now we have State  Retention

console.log(like2()); //1
console.log(like2()); //2
console.log(like2()); //3

// we have state Retention but we don't have Encapsulation
likecounter1 += 10;
console.log(like2()); //14

console.log("--------------------");


// liek3 now is a Factory function but second function in factory function is Clouser

// Lexical Scope

function like3()
{
  let likecounter2 =0;
  return function () {
    likecounter2++;
    return likecounter2;
  }
};

// Post1 like number
// now we have state Retention and Encapsulation both of them 
const increase1 = like3();
console.log(increase1());  //1
console.log(increase1());  //2
console.log(increase1());  //3
console.log("--------------------");
// Post2 like number  
// they are different(State Retentation and Encapsulation )
const increase2 = like3();
console.log(increase2());  //1
console.log(increase2());  //2
console.log(increase2());  //3


// Pure  | Inpure Functions
// Pure :

// same input => same output 
// we don't have any Side effect here : 
const duplicatenum = (number) => number*2;
console.log(duplicatenum(2));
console.log(duplicatenum(2));
console.log(duplicatenum(2));


 