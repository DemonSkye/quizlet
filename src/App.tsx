import React, { useState, useEffect, useCallback } from 'react';
import questionsData from './questions.json';
import LandingPage from './components/LandingPage/LandingPage';
import Question from './components/Question/Question';
import ResultsPage from './components/ResultsPage/ResultsPage';

// Define the structure of a QuizQuestion object
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

// Function to get a random subset of questions from the question pool
const getRandomQuestions = (questionsPool: QuizQuestion[], numQuestions: number): QuizQuestion[] => {
  const shuffled = questionsPool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions);
};

// Main App component
const App: React.FC = () => {
  // State variables
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Callback to handle moving to the next question
  const handleNextQuestion = useCallback(() => {
    setTimeLeft(20);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      setQuizStarted(false);
    }
  }, [currentQuestionIndex, questions.length]);

  // Effect to handle countdown timer
  useEffect(() => {
    if (timeLeft > 0 && quizStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted) {
      handleNextQuestion();
    }
  }, [timeLeft, quizStarted, handleNextQuestion]);

  // Function to handle starting the quiz
  const handleStartQuiz = () => {
    const selectedQuestions = getRandomQuestions(questionsData, 3); // Change 3 to 20 when you have a larger pool
    setQuestions(selectedQuestions);
    setQuizStarted(true);
  };

  // Function to handle user's answer
  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  // Function to handle share button click
  const handleShare = () => {
    alert('Share button clicked! Implement sharing logic here.');
  };

  // Render the appropriate component based on the quiz state
  if (!quizStarted && !quizFinished) {
    return (
        <LandingPage onStart={handleStartQuiz} hasQuestions={questionsData.length > 0} />
    );
  }

  if (quizFinished) {
    return (
        <ResultsPage score={score} totalQuestions={questions.length} onShare={handleShare} />
    );
  }

  return (
      <Question
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          timeLeft={timeLeft}
          onAnswer={handleAnswer}
      />
  );
}

export default App;
