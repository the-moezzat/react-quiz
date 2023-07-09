import { useQuiz } from '../context/QuizContext';
import Button from './Button';

function NextButton() {
  const {
    handleNext,
    handleFinish,
    currentQuestion,
    questions,
    selectedAnswers,
  } = useQuiz();

  const isAnswered = selectedAnswers[currentQuestion] === undefined;

  return (
    <div>
      {currentQuestion < questions.length - 1 && !isAnswered && (
        <Button onClick={handleNext} text="Next" />
      )}
      {currentQuestion === questions.length - 1 && (
        <Button onClick={handleFinish} text="Finish" />
      )}
    </div>
  );
}

export default NextButton;
