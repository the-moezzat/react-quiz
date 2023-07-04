import { StateTypes } from '../types';

function NextButton({ dispatch, answer, currentQuestion, numQuestions }) {
  if (answer === null) return;

  if (currentQuestion < numQuestions - 1)
    return (
      <button
        className=" btn btn-ui"
        onClick={() => dispatch({ type: StateTypes.NEXT })}
      >
        Next
      </button>
    );

  if (currentQuestion === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: StateTypes.FINISH })}
      >
        Finish
      </button>
    );
}

export default NextButton;
