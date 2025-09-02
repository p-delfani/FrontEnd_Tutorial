const formatdata = (questionData) => { 
    console.log(questionData);
    const result = questionData.map((item) => { 
        const questionObject = { question: item.question }; 
        const answers = [...item.incorrect_answers];
        const correctAnswerIndex = Math.floor(Math.random() * 4); 
        answers.splice(correctAnswerIndex, 0, item.correct_answer);
        console.log(answers, correctAnswerIndex); 
        questionObject.answers = answers;
        questionObject.correctAnswerIndex = correctAnswerIndex; // A بزرگ
        return questionObject;
    });
    return result;
};

export default formatdata;
