import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

function Timer() {
  // dispatch={dispatch} remainingSeconds={remainingSeconds}
  const { remainingSeconds, handleTick } = useQuiz();

  const minutes = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0');
  useEffect(
    function () {
      const id = setInterval(function () {
        handleTick();
      }, 1000);
      return () => clearInterval(id);
    },
    [handleTick]
  );
  return (
    <div className="timer">
      {minutes}:{seconds}
    </div>
  );
}

export default Timer;
