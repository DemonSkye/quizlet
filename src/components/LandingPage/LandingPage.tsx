import React from 'react';
import './LandingPage.css';

interface LandingPageProps {
    onStart: () => void;
    hasQuestions: boolean;
}

// LandingPage component: displays a welcome message and a start button

const LandingPage: React.FC<LandingPageProps> = ({ onStart, hasQuestions }) => {
    return (
        <div className="landing-page">
            <h1>Welcome to the Quiz</h1>
            <button onClick={onStart} disabled={!hasQuestions}>Start Quiz</button>
        </div>
    );
}

export default LandingPage;
