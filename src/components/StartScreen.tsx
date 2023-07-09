import { useQuiz } from '../context/QuizContext';

function StartScreen() {
  const { questions, startApp } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questions.length} Questions to test your react mastery</h3>
      <button className="btn btn-ui" onClick={startApp}>
        let's start
      </button>
    </div>
  );
}

export default StartScreen;
