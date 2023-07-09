import { useQuiz } from '../context/QuizContext';

function Options() {
  const { questions, answerQuestion, currentQuestion, selectedAnswers } =
    useQuiz();
  const answer = selectedAnswers[currentQuestion];

  const isAnswered = answer !== undefined;
  return (
    <div className=" options">
      {questions[currentQuestion].options.map((option, index) => (
        <button
          key={option}
          onClick={() => answerQuestion(index)}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            isAnswered &&
            (index === questions[currentQuestion].correctOption
              ? 'correct'
              : 'wrong')
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
