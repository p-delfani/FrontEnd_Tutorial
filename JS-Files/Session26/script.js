// OOP : Object Oriented Programming 
// OOP is the programming paradign based on the concept of "objects"
/*
const quiz1 = {
    question : "Question Text 1?",
    answers : ["one","two","three","four"],
    correcAnswers : 2,
    showQuestion(){
        console.log(this.question)
    },
    chechAnswer(){
        console.log("Show the Answer",this.answers[2]);
    }
};

const quiz2 = {
    question : "Question Text 2 ?",
    answers : ["one","two","three","four"],
    correcAnswers : 2,
    showQuestion(){
        console.log(this.question)
    },
    chechAnswer(){
        console.log("Show the Answer",this.answers[2]);
    }
};


console.log(quiz1.question);
console.log(quiz2.question);
*/

/*

// Constructor Function 
// (blue print )

function Quiz (question, answer, correcranswer){
    this.question =  question;
    this.answers = answer;
    this.correcrAnswer = correcranswer; 
}


// inheritance && prototype

Quiz.prototype.showQuestion = function(){
    console.log(this.question)
};

Quiz.prototype.checkAnswer =  function () {
    console.log("Show the Answer :", this.correcrAnswer);
};


const quiz1 = new Quiz("question text 1? ",[1,2,3,4],0);
console.log(quiz1);
quiz1.showQuestion();
const quiz2 = new Quiz("question text 2? ",[5,6,7,8],2);
console.log(quiz2);

 
const data = [1,2,3];
console.log(data);

*/


// Classes 

// classes are a template(blueprint) for creating Objects 
// ES6 - Sysntatic suger of function constructor 

// 1. Class declaration

class className {};

// 2. Class expression 

const className2 = class{
};


// Instance method || Static methods : 
class Quiz {
    constructor (question,answers,correctAnswer) {
        this.question = "Q text";
        this.answers = answers  ;
        this.correctAnswer = correctAnswer;
    }
    showQuestion = function() {
        console.log(this.question);
    };
    // Instance Method:
    chechAnswer = function() {
        console.log("show the asnwer : ",this.correctAnswer);
    }
    //Static Methods
    static printSth(){
        console.log("iam static method");
    }
           
};

console.log(Quiz);
const quizz1 = new Quiz("question text 1?",[1,2,3,4],0);
console.log(quizz1);
const quizz2 = new Quiz("question text 1?",[5,6,7,8],2);
console.log(quizz2);
Quiz.printSth(); 


// inherient || super() method : 

class Category extends Quiz{
    constructor(question,answers,correctAnswer,category) {
        super();
    }
}
const category = new Category("question text 1?",[5,6,7,8],2,"geology");
console.log(category);


//  Abstraction : 
//  a way of hiding the implemention detail and showing 
//  only the funcyionality to the user 


class Animal{
    constructor(){
        if(this.constructor === Animal){
            throw new Error("Abstract classes can not be instantiated")
        }
    }


    say(){
        throw new Error("Method 'say()' must br implemented")
    }
}

/*
const animal = new Animal();
console.log(animal);
*/

class Cat extends Animal{
    say(){
        console.log("meow")
    }
}
const cat1 = new Cat();
console.log(cat1.say())


// Encapsulation : 

class Quiz2{
    #correctAnser = 2 ; //feild
}
const qu1 = new Quiz2();
console.log(qu1.correctAnser);


// Polymorphism : 
// it means one method can do many work : 

class Shoma{
    say(){
        console.log("Hi parmis");
    }
}

class Me extends Shoma{
    say(){
        console.log("Hi you !")
    }
}

const inst = new Shoma();
const inst2 = new Me();
inst.say();
inst2.say();