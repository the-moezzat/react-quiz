import { useQuiz } from '../context/QuizContext';
import { StateTypes } from '../types';

function FinishScreen() {
  const { score, maxScore, highScore, handleRestart } = useQuiz();
  return (
    <>
      <p className=" result">
        You scored {score} out of {maxScore} (
        {((score / maxScore) * 100).toFixed(0)}%)
      </p>
      <p className="highscore">(High score: {highScore} points)</p>
      <button className="btn btn-ui" onClick={handleRestart}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
