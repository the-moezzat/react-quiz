interface IProgress {
  currentQuestion: number;
  numQuestions: number;
  currentScore: number;
  maxScore: number;
  answer: number | null;
}
function Progress({
  currentQuestion,
  numQuestions,
  currentScore,
  maxScore,
  answer,
}: IProgress) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={currentQuestion + Number(answer !== null)}
      />
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numQuestions}
      </p>
      <p>
        {currentScore} / {maxScore}
      </p>
    </header>
  );
}

export default Progress;
