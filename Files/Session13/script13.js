// Data Structure : 

// Map | ES6 : 

const mymap = new Map();
mymap.set("name","parmis");
mymap.set([1,2,3,4,5,6,7,8,9,10],5);
console.log(mymap);

const re1 = mymap.get("name");
const re2 = mymap.size;
const re3 = mymap.delete("name");
const re4 = mymap.has("name");



console.log(re1);
console.log(re2);
console.log(re3);
console.log(re4);

// Iteration : (Loop)

const keys = mymap.keys();

for(const key of keys)
{
    console.log(key);
}

// Set : 

const myset = new Set([1,2,"parmis"]);

myset.add(90);
const result02 = myset.size;
const result03 = myset.delete("parmis");
const result04 = myset.clear();
console.log(myset);
console.log(result02);
console.log(result03);

// We don't have keys in Set but we can do Iterration
// we don't have duplicated value in Set


const arr = [1,2,3,5,5,8,2];

const newset = new Set(arr);
const newarr2 = [... newset];
console.log(newarr2);

const newarr = [...new Set(arr)];
