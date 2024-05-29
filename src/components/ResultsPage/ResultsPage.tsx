import React from 'react';
import './ResultsPage.css';

interface ResultsPageProps {
    score: number;
    totalQuestions: number;
    onShare: () => void;
}

// ResultsPage component: displays the final score and a share button
const ResultsPage: React.FC<ResultsPageProps> = ({ score, totalQuestions, onShare }) => {
    return (
        <div className="results-page">
            <h1>Quiz Finished!</h1>
            <p>Your score: {score}/{totalQuestions}</p>
            <button onClick={onShare}>Share on Facebook</button>
        </div>
    );
}

export default ResultsPage;
