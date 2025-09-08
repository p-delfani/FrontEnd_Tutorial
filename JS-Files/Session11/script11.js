// Time in Js 

const date = new Date();
console.log(date);
console.log(date.getTime());


// How to introduce Date in Our Program 


const dat1 = new Date(1997,5,9);
console.log(dat1.getTime());

    

const dat2 = new Date("2021 dec 3");
console.log(dat2.getTime());


const dat3 = new Date(8885415452124);
console.log(dat3.getTime());

const dat = new Date();
console.log(dat)

const days = ["sun","mon","tue"];

console.log(dat.getFullYear());
console.log(dat.getMonth());
console.log(dat.getDate());
console.log(dat.getHours());
console.log(dat.getMinutes());
console.log(dat.getSeconds());
console.log(dat.getMilliseconds());
console.log(dat.getTime());
console.log(dat.getDay());

// toLocaleTimeString | toLocaleDateString
const fullDate = new Date();
console.log(fullDate);

const year = fullDate.getFullYear();
const month = fullDate.getMonth();
const datt = fullDate.getDate();



console.log(`${month + 1} / ${date} / ${year}`);
console.log(fullDate.toLocaleDateString());
console.log(fullDate.toLocaleTimeString());


// setTimeout | setInterval 
 
let counter = 0;
const count = () =>
{
    counter++;
    console.log("log :",counter);
    if (counter >= 5)
    {
        clearInterval(interval);
    }
};

const interval = setInterval(count,1000);


// Challenge : Determine age based on day: 


const determineage = (birthday) => 
{
    const birthdatems = new Date(birthday).getTime();
    const now = new Date().getTime();
    const ageMs = now - birthdatems;
    const oneday = 24 * 60 * 60 * 1000;
    const age = Math.floor(ageMs / oneday);
    return age;
};

console.log(determineage("5/9/1997"));
