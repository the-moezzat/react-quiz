import { IAction, IQuestion, StateTypes } from '../types';

function Options({
  question,
  dispatch,
  answer,
}: {
  question: IQuestion;
  dispatch: (action: IAction) => void;
  answer: number | undefined;
}) {
  const isAnswered = answer !== undefined;
  return (
    <div className=" options">
      {question.options.map((option, index) => (
        <button
          key={option}
          onClick={() => dispatch({ type: StateTypes.ANSWER, payload: index })}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            isAnswered &&
            (index === question.correctOption ? 'correct' : 'wrong')
          }`}
          disabled={isAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
