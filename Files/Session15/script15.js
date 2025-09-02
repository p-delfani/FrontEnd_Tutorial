// Challenge Game : 

const Chioces = ["rock","paper","scissors"];
let playerscore =0;
let computerscore =0;
const Checkwinner = (player , computer)=>
{
if(player === computer)
{
    return "Draw";
}
// ternary operator
else if(player === "rock")
{
    return computer === "scissors" ? "player": "computer";
}
else if(player === "paper")
{
    return computer === "rock" ? "player" : "computer";
}
else 
{
    return computer === "paper" ? "player" : "computer";
}
};

const showresult = (result) =>

{
   

    if(result === "player")
    {
        console.log("you win");
        playerscore++;
    }
    else if(result === "computer")
    {
        console.log("you lose!");
        computerscore++;
    }
    else
    {
        console.log("it is tie");
    }

    console.log(`your score is : ${playerscore}`);
    console.log(`computer score is : ${computerscore}`);
    console.log("............");
}
const play = () => 
{

const playerchoice = prompt("Choose rock,paper or scissors");
console.log(playerchoice);

if( Chioces.indexOf(playerchoice?.toLowerCase()) !== -1)
{
    console.log(`you choose ${playerchoice}`);
}
else
{
    console.log("you cheated");
    return;
}

const randomnum = Math.floor(Math.random()* Chioces.length);
const computerchoices = Chioces[randomnum];
console.log(`computer Chooses ${computerchoices}`);

const gameresult = Checkwinner(playerchoice,computerchoices);
showresult(gameresult);
play();
};

play();

