
// Object 

const key = "Sports";

const data =
{
    name: "parmis",
    lastname: "delfani",
    age : 20,
    skills :["Js","C#"] ,
    [key]: "my favorite Sports",
    adreess : {
        country : "IR",
        provinces : {
            name: "Lorestan",
            city : "Khoramabad"
        },
    },
}; 

console.log(data);

// Access item in Object 
console.log(data.name);
// Or 
console.log(data["lastname"]);


// Add item with dynamic Method
console.log(data.key);

// Change item value in Object 
data.name = "Sara";

// Delete item from Object
console.log(data.name);
delete data.name;
console.log(data);

// Clear item in Objct 

data.skills = null;
console.log(data);


// Optional Chaining , Chaining Operator 

console.log(data.adreess);
// Or 
console.log(data.adreess.country);
console.log(data.adreess.province);
console.log(data.adreess.provinces.name);

// Optional Chaining \ .

// console.log(data.adreess.province.name); 
// We get Error : 
// Uncaught TypeError: Cannot read properties of undefined (reading 'name')
// For solve this Problem we use :
// Optional Chaining Operator \ ?.
console.log(data.adreess.province ?.name);


// Keyword => to check a keyword in Object

console.log("name" in data); //false
console.log("skills" in data); //true

// Object.values , Object.keys

const keys = Object.keys(data);
const values = Object.values(data);
console.log(keys);
console.log(values);


// Spread Operators 
const newdata = {...data};
data.name = "maryam";
console.log(data);
console.log(newdata); 


// Object destructuring 

const {name: name2,adreess : {country, provinces}, ...other} = data;
// we have all item beside name beacuse we destructuring name 
console.log(other);
console.log(name); //no result
console.log(name2); // maryam
console.log(provinces);
console.log(country);



// Challenge : Destructure data 

const data2 = [
    {
        identity:{
            name:"parmis",
            lastname: "Delfani",
            city:"Khoramabad",
            age : 20,
        
        },
    },
    {
        skills : ["Js","C","kotlin"]
    },
];

const [identity , skills] = data2;
const {identity : {name,city,lastname}} = identity;
console.log(skills);
console.log(identity);

const {
    skills : [Js,C,kotlin],

} = skills;
console.log(Js,C,kotlin);

