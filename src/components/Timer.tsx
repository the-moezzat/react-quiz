import { useEffect } from 'react';
import { StateTypes } from '../types';

function Timer({ dispatch, remainingSeconds }) {
  const minutes = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0');
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: StateTypes.TICK });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {minutes}:{seconds}
    </div>
  );
}

export default Timer;
