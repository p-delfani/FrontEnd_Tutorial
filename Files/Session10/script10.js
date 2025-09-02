// Math Object : 

console.log(Math);
console.log(Math.PI);

// Round | Ceil | Floor | Trunc :

const number = 5.13;
const result = Math.round(number);
console.log(result);
const result2 = Math.trunc(number);
console.log(result2);

//pow | sqrt | abs :

console.log(Math.pow(2,3));
console.log(Math.sqrt(9));
console.log(Math.abs(-10));
console.log(Math.sin(50));
console.log(Math.cos(50));
console.log(Math.log(12));


// Min | Max : 

const min =Math.min(1,3,6,8,4);
console.log(min);
const max =Math.max(1,3,6,8,4);
console.log(max);

const arr = [1,2,3,4,5,6,7,8,9,10];
const res = Math.max(...arr);
console.log(res);

// Random Number : 

const random = Math.random();  // > 0 & < 1
console.log(random *10);    
console.log(random * 100);

// Challenge Random : Generate a Random Integer: 
/*
const generaterandom = (min,max) => 
{
    const resu = Math.floor(Math.random() * max);
    return resu ; 
};

console.log(generaterandom(2,30));



const generaterandom1 = (min,max) => 
{
    const resul = Math.floor(Math.random() * (max - min + 1));
    return resul ; 
};

console.log(generaterandom(2,30));

*/
const generaterandom = (min,max) => 
{
    if(!min && !max)
    {
        return "Enter Min and Max "
    }
    if(!max)
    {
        max = min;
        min=0;
    }

    const result2= min+ Math.floor(Math.random()* (max - min +1));
    return result2;

};

console.log(generaterandom());
console.log(generaterandom(5,100));
console.log(generaterandom(100));

