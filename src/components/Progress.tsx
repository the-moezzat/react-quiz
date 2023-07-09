import { useQuiz } from '../context/QuizContext';

function Progress() {
  const { currentQuestion, questions, score, maxScore, selectedAnswers } =
    useQuiz();
  return (
    <header className="progress">
      <progress
        max={questions.length}
        value={
          currentQuestion +
          Number(selectedAnswers[currentQuestion] !== undefined)
        }
      />
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {questions.length}
      </p>
      <p>
        {score} / {maxScore}
      </p>
    </header>
  );
}

export default Progress;
