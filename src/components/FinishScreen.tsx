import { StateTypes } from '../types';

function FinishScreen({ score, maxScore, highScore, dispatch }) {
  return (
    <>
      <p className=" result">
        You scored {score} out of {maxScore} (
        {((score / maxScore) * 100).toFixed(0)}%)
      </p>
      <p className="highscore">(High score: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: StateTypes.RESTART })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
