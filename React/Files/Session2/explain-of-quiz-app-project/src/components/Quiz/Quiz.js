import React from 'react';
import './Quiz.css'

export default class Quiz extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            questions: [
                {
                    questionText: 'What is the capital of France?',
                    answerOptions: [
                        { answerText: 'New York', isCorrect: false },
                        { answerText: 'London', isCorrect: false },
                        { answerText: 'Paris', isCorrect: true },
                        { answerText: 'Dublin', isCorrect: false },
                    ],
                },
                {
                    questionText: 'Who is CEO of Tesla?',
                    answerOptions: [
                        { answerText: 'Jeff Bezos', isCorrect: false },
                        { answerText: 'Elon Musk', isCorrect: true },
                        { answerText: 'Bill Gates', isCorrect: false },
                        { answerText: 'Tony Stark', isCorrect: false },
                    ],
                },
                {
                    questionText: 'The iPhone was created by which company?',
                    answerOptions: [
                        { answerText: 'Apple', isCorrect: true },
                        { answerText: 'Intel', isCorrect: false },
                        { answerText: 'Amazon', isCorrect: false },
                        { answerText: 'Microsoft', isCorrect: false },
                    ],
                },
                {
                    questionText: 'How many Harry Potter books are there?',
                    answerOptions: [
                        { answerText: '1', isCorrect: false },
                        { answerText: '4', isCorrect: false },
                        { answerText: '6', isCorrect: false },
                        { answerText: '7', isCorrect: true },
                    ],
                },
            ],
            currentQuestion: 0,
            showScore: false,
            score: 0
        }
    }

    render() {
        return (
            <div className='app'>
                {/* next div is for showing user score */}
                    {/* <div className='score-section'>
                        You scored 0 out of 4
                    </div> */}
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question 1</span>/ 4
                            </div>
                            <div className='question-text'>Where is Iran capital?</div>
                        </div>
                        <div className='answer-section'>
                                <button>Tehran</button>
                                <button>Tabriz</button>
                                <button>Gorgan</button>
                                <button>Shiraz</button>
                        </div>
            </div>
        )
    }
}
