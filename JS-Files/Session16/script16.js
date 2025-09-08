// Number guess project

const randomnumber =Math.ceil( Math.random() * 100);
let numberofguess = 1;

console.log(randomnumber);
const validatenumber = value =>
{
    if(isNaN(value)){
        return "Please Enter a valid number";
    }
    else if (+value <1 || +value >100){
        return "Please enter a number between 1 to 100"
    }
    play();
};
const chechguess = (guess) =>
{
    numberofguess++;
    console.log(numberofguess);
    if(guess === randomnumber){
        console.log("You guessed correctly");
    }
    else if(guess < randomnumber){
        console.log("Too low, try again");
    }
    else {
        console.log("Too hight,try again");
    }
    play();
};

const play =() =>
{
    const number = prompt("Enter a number between 1 to 100");
    if(number === null) return;

    if(numberofguess > 5){
        console.log("Game Over!");
        return;
    }
    const validation = validatenumber(number);
    if(validation){
        console.log(validation);
        return play();
    }
    chechguess(+number);
};

play();
