import { IAction, StateTypes } from '../types';

function StartScreen({
  numQuestions,
  dispatch,
}: {
  numQuestions: number;
  dispatch: (action: IAction) => void;
}) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} Questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: StateTypes.START })}
      >
        let's start
      </button>
    </div>
  );
}

export default StartScreen;
