import formatdata from "./helper.js";

const level = localStorage.getItem("level") || "medium ";
const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const questionNumber = document.getElementById("question-number");
const finishButton = document.getElementById("finish-button");
const error = document.getElementById("error");



const CORRECT_BONUS = 10;

const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formatteddata = null;
let questionIndex = 0;
let correctAnswer = null;
let score =0;
let isAccepted = true;

const fetchdata = async () => {
    try{
    const response = await fetch(URL);
    const json = await response.json();
    formatteddata = formatdata(json.results);
    start();
    }

    catch(err)
    {
        loader.style.display = "none";
        error.style.display = "block";
    }
};

const start = () => {
    loader.style.display = "none";
    container.style.display = "block";
    showQuestion();
};


const showQuestion = () => {
    questionNumber.innerText = questionIndex+1;
    const { question, answers, correctAnswerIndex } = 
    formatteddata[questionIndex];
    correctAnswer = correctAnswerIndex;
    questionText.innerText = question;

    answerList.forEach((button, index) => {
        button.innerText = answers[index];
    });
};


const checkAnswer = (event,index) =>{
    if(!isAccepted) return;
    isAccepted = false;
    const isCorrect = index === correctAnswer?true : false;
    if(isCorrect)
    {
        event.target.classList.add("correct");
        score+= CORRECT_BONUS;
        scoreText.innerHTML = score;
    }
    else
    {
        event.target.classList.add("incorrect");
        answerList[correctAnswer].classList.add("correct");

    } 
};


const nextHandler = () => {
    questionIndex++;
    console.log(questionIndex);

    if (questionIndex < formatteddata.length) {
        isAccepted=true;
        removeClasses(); 
        showQuestion();
    } else {
        finishhandler();
    }
};

const removeClasses = () =>{
    answerList.forEach((button)=> (button.className = "answer-text"));
}

const finishhandler = () =>{
    localStorage.setItem("score",JSON.stringify(score));
    window.location.assign("End.html")
}

window.addEventListener("load", fetchdata);
nextButton.addEventListener("click",nextHandler)
finishButton.addEventListener("click",finishhandler)
answerList.forEach((button, index) => {
    button.addEventListener("click", (event)=> checkAnswer(event,index));
});


