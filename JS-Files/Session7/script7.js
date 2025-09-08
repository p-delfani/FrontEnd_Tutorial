// Conditional Statement 

const number  = 9;

if(number > 5){
    console.log(`${number} is bigger than 5` );
}

else{
    console.log(`${number} is less than 5` );

}


// Positive & Negative number with conditional statement 

const num = -9;

if(num >0)
{
    console.log(`${num} is positive` );

}

else{
    console.log(`${num} is negative` );

}

// Positive & Negative number with conditional statement  if-else

const testnum = 80;

if(testnum > 0)
    {
        console.log(`${testnum} is positive` );
    }
    else if(testnum === 0)
    {
        console.log(`${testnum} is zero` );
    }
else
{
    console.log(`${testnum} can not find your number` );
}

// Challege : Check the triangel 

const side1 = 5;
const side2 = 8;
const side3 = 5;

if (side1 === side2 && side2 === side3)
{
    console.log("motevali azla");
}

else if (side1 === side2 || side2 === side3 || side1 === side3)
{
    console.log("motevali sagain");
}
else
{
    console.log("nothing ");
}

// Switch :

const name = "ali";
switch(name)
{
    case "parmis":
    console.log(`your name is parmis`);
    break;

    case "sara":
    console.log(`your name is sara`);
    break

    case "ali":
    console.log(`your name is not define`);
    break;
}


// Loops: 
// For loops: 

for(let i = 0; i<=3;i++)
{
console.log(i);
}

console.log("*************")

const myarray = [1,2,3,4,5];

for (let j = 0; j<=myarray.length;j++){
    console.log(j);
    // Or 
    console.log(myarray);
}

// For - of
const array2 = [2,6,5];

for(const k of array2)
{
    console.log(k);
    // Or 
    console.log(k+5);

}

// For - in 

const array3 = {name:"parmis", lastname:"delfani", age:20};

for (const key in array3)
{
    console.log(key);
}

// access value : 

for (const key in array3)
{
    console.log(array3[key]);
}


// while 

let status = true;

let m =1;
while (status)
{
    console.log(m);
    m++;
    if((m=10))
    {
        status = false;
    }
}

// do-While 

do {
    console.log(m);
    m++;

}
while(m<5)

console.log("---------------");

// break- countinue

const array4 = [1,2,"is",3,4,5,6];

for (const n of array4)
{
    if (typeof n !== "number")
    {
        continue;
    }
    console.log(n);
}

console.log("---------------");


// Or 

for (const n of array4)
{
    if (typeof n !== "number")
    {
        break;
    }
    console.log(n);
}

console.log("---------------");


// Challenge : write a Js code to print even numbers in given array 

const numbersarray = [12,13,14,15,16,17,18,19,20];

for (let u= 0 ; u< numbersarray.length;u++)
{
    if(numbersarray[u] % 2 === 0 )
    {
        console.log(numbersarray[u]);
    }
}

// Challenge : Write a Js code to print below pattern 

// 1
// 1 2 
// 1 2 3 
// 1 2 3 4
// 1 2 3 4 5

for (let b =1; b<=5;b++)
{
    let string1 = "";
    for(let c = 1 ; c <= b; c++)
    {
        
        string1 +=c;
        console.log(string1);
    }
}


// Challenge : Write a Js code to remove duplicate values in a given array 

const array = [4,2,36,4,1,12,1,4];
const newarray = [];

for (let x=0 ; x < array.length; x++)

{
    if(newarray.indexOf(array[x])=== -1)
    {
        newarray.push(array[x]);
    }
}

console.log(newarray);