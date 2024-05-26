import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}
const getRandomQuestions = (questionsPool: Question[], numQuestions: number): Question[] => {
  const shuffled = questionsPool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions);
};

const App: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsPool, setQuestionsPool] = useState<Question[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetch('/questions.json')
        .then(response => response.json())
        .then((data: Question[]) => setQuestionsPool(data));
  }, []);

  const handleNextQuestion = useCallback(() => {
    setTimeLeft(20);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      setQuizStarted(false);
    }
  }, [currentQuestionIndex, questions.length]);

  useEffect(() => {
    if (timeLeft > 0 && quizStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted) {
      handleNextQuestion();
    }
  }, [timeLeft, quizStarted, handleNextQuestion]);

  const handleStartQuiz = () => {
    const selectedQuestions = getRandomQuestions(questionsPool, 3); // todo: change to 20 when questions all added to JSON
    setQuestions(selectedQuestions);
    setQuizStarted(true);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleShare = () => {
    alert('Share button clicked!'); //Todo: Social sharing
  };

  if (!quizStarted && !quizFinished) {
    return (
        <div className="App">
          <header className="App-header">
            <h1>Welcome to the Quiz</h1>
            <button onClick={handleStartQuiz} disabled={questionsPool.length === 0}>Start Quiz</button>
          </header>
        </div>
    );
  }

  if (quizFinished) {
    return (
        <div className="App">
          <header className="App-header">
            <h1>Quiz Finished!</h1>
            <p>Your score: {score}/{questions.length}</p>
            <button onClick={handleShare}>Share on Facebook</button>
          </header>
        </div>
    );
  }

  return (
      <div className="App">
        <header className="App-header">
          <div className="timer-container">
            <div>Time Remaining</div>
            <div className="timer-circle">{timeLeft}</div>
          </div>
          <h1>{questions[currentQuestionIndex].question}</h1>
          {questions[currentQuestionIndex].options.map(option => (
              <button key={option} onClick={() => handleAnswer(option)}>
                {option}
              </button>
          ))}
        </header>
      </div>
  );
}

export default App;