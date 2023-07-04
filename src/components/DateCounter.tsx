import { useReducer, useState } from 'react';

enum CounterActionTypes {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  SET = 'SET',
  RESET = 'RESET',
  STEP = 'STEP',
}

interface InitState {
  count: number;
  step: number;
}

interface CountAction {
  type: CounterActionTypes;
  payload?: number;
}

function reducer(state: InitState, action: CountAction) {
  switch (action.type) {
    case CounterActionTypes.INCREASE:
      return { ...state, count: state.count + state.step };
    case CounterActionTypes.DECREASE:
      return { ...state, count: state.count - state.step };
    case CounterActionTypes.SET:
      return { ...state, count: action.payload };
    case CounterActionTypes.RESET:
      return { count: 0, step: 1 };
    case CounterActionTypes.STEP:
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function DateCounter() {
  const initState = {
    count: 0,
    step: 1,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: CounterActionTypes.DECREASE });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: CounterActionTypes.INCREASE });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: CounterActionTypes.SET, payload: +e.target.value });
  };

  const defineStep = function (e) {
    dispatch({ type: CounterActionTypes.STEP, payload: +e.target.value });
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: CounterActionTypes.RESET });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
