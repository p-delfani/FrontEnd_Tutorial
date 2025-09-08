// Sysmbol : 

const sym1 = Symbol("last name");
const sym2 = Symbol();
console.log(typeof sym1.description);
console.log(typeof sym2);

// Use Sysmbol : 

const age = Symbol("age");

const data = 
{
    name : "parmis",
    lastname : "delfani",
};

data[age] = 20;
console.log(data);

for(const i in data)
{
    console.log(i);
}

// Shared Sysmbol

const sy1 = Symbol.for("age");
const sy2 = Symbol.for("age2");
console.log(sy1 === sy2);

const data2 = {
    name: "parmis",
};

const add = ()=>{
const age2 = Symbol.for("age2");
data2[age2]=20;
}
add();

const age2 = Symbol.for("age2");
console.log(data2[age2]);