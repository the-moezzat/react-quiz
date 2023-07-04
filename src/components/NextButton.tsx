import { StateTypes } from '../types';
import Button from './Button';

function NextButton({ dispatch, answer, currentQuestion, numQuestions }) {
  const isAnswered = answer === undefined;

  return (
    <div>
      {currentQuestion < numQuestions - 1 && !isAnswered && (
        <Button
          onClick={() => dispatch({ type: StateTypes.NEXT })}
          text="Next"
        />
      )}
      {currentQuestion === numQuestions - 1 && (
        <Button
          onClick={() => dispatch({ type: StateTypes.FINISH })}
          text="Finish"
        />
      )}
    </div>
  );
}

export default NextButton;
