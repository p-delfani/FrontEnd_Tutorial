// variable in JS


// نحوه اعلان متغیر در اکمااسکریپت 5
var age = 20; //ES5

// متغیری که مقدار ان در طول برنامه میتواند عوض شود
let name = 'parmis';

name = "sina";
console.log(name);


// متغیری که مقدار ان قابل تغییر نیست 
const lastname = "delfani";
console.log(lastname);

//lastname = "karimi";


// variable method name 

    //camel case
    let Firstname;
    let Lastname;

    //snakecase 
    //underscore sign

    let First_name;
    let Last_name;

    //kebab case 
    //hyphen sign 
    // let last-name;


    // pascal case 

    let LastName;
    let Name;

    // rules 

   /* let lastname2;
    let age = 50;
    let $name = "parmis";
    let name_ = "sara";
*/


    //data type 


    // Number : 
    const age_me = 50; //INT
    const average = 19.5; //Float
    console.log(age_me);
    console.log(average);

    //String : 
    const carname = "volvo";
    console.log(carname);


    //Boolean 

    const x = true;
    const y = false;

    console.log(x);
    console.log(y);


    //Arrays 

    const cars = new Array();

    cars[0] = "saab";
    cars[1] = "volvo";
    cars[2] = "BMW";

    console.log(cars[2]);

    // or

    const colors = new Array("blue","red","black");

    console.log(colors[2]);

    // or 

    const lesson = ["c#","python","java"];
    console.log(lesson[2]);

    //Object 

    const person = {firstname:"parmis",lastname:"delfani",age:20};

    // or 

    const person2 = {
        name : "sara",
        family : "azizi",
        id : 25
    };

    console.log(person.firstname);
    console.log(person2.id);


    // null- Undefined

    let data1 ; //مقدارش مشخص نیست
    let data2 = null;
    console.log(typeof data2);


    









