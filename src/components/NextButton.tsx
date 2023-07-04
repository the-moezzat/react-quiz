import { StateTypes } from '../types';

function NextButton({ dispatch, answer, currentQuestion, numQuestions }) {
  const isAnswered = answer !== null;

  return (
    <div>
      {currentQuestion < numQuestions - 1 && isAnswered && (
        <button
          className=" btn btn-ui"
          onClick={() => dispatch({ type: StateTypes.NEXT })}
        >
          Next
        </button>
      )}
      {currentQuestion === numQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: StateTypes.FINISH })}
        >
          Finish
        </button>
      )}
      {currentQuestion > 0 && (
        <button
          className=" btn btn-ui"
          onClick={() => dispatch({ type: StateTypes.NEXT })}
        >
          Previous
        </button>
      )}
    </div>
  );
}

export default NextButton;
