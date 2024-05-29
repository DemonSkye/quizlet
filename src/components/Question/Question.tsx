
import React from 'react';
import './Question.css';

interface QuestionProps {
    question: string;
    options: string[];
    timeLeft: number;
    onAnswer: (answer: string) => void;
}

// Question component: displays a single quiz question, its options, and a countdown timer
const Question: React.FC<QuestionProps> = ({ question, options, timeLeft, onAnswer }) => {
    return (
        <div className="question">
            <div className="timer-container">
                <div>Time Remaining</div>
                <div className="timer-circle">{timeLeft}</div>
            </div>
            <h1>{question}</h1>
            {options.map(option => (
                <button key={option} onClick={() => onAnswer(option)}>
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Question;
