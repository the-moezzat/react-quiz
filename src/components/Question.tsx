import { IAction, IQuestion } from '../types';
import Options from './Options';

function Question({
  question,
  dispatch,
  answer,
}: {
  question: IQuestion;
  dispatch: (action: IAction) => void;
  answer: number | undefined;
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
