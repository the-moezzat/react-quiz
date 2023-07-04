import { useEffect, useReducer } from 'react';
import Header from './Header.';
import MainContent from './MainContent';
import Loader from './Loader.';
import Error from './Error.';
import StartScreen from './StartScreen';
import { InitState, IAction, StateTypes, IQuestion } from '../types';
import Question from './Question';
import Progress from './Progress';
import NextButton from './NextButton';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Button from './Button';

function reducer(state: InitState, action: IAction): InitState {
  switch (action.type) {
    case StateTypes.DATARECEIVED:
      return {
        ...state,
        questions: action.payload as IQuestion[],
        status: 'ready',
      };
    case StateTypes.DATAFAILED:
      return {
        ...state,
        status: 'error',
      };
    case StateTypes.START:
      return {
        ...state,
        status: 'active',
        remainingSeconds: state.questions.length * 30,
      };
    case StateTypes.ANSWER:
      return {
        ...state,
        selectedAnswers: [...state.selectedAnswers, action.payload as number],
        score:
          state.questions[state.currentQuestion].correctOption ===
          action.payload
            ? state.score + state.questions[state.currentQuestion].points
            : state.score,
      };
    case StateTypes.NEXT:
      return {
        ...state,
        // selectedAnswers: [],
        currentQuestion: state.currentQuestion + 1,
      };
    case StateTypes.PREV:
      return {
        ...state,
        currentQuestion: state.currentQuestion - 1,
      };
    case StateTypes.FINISH:
      return {
        ...state,
        status: 'finished',
        highScore: Math.max(state.highScore, state.score),
      };
    case StateTypes.RESTART:
      return {
        ...initState,
        status: 'ready',
        highScore: state.highScore,
        questions: state.questions,
      };
    case StateTypes.TICK:
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? 'finished' : 'active',
      };
    default:
      throw new Error('Wrong action type');
  }
}

const initState: InitState = {
  questions: [],
  status: 'loading',
  currentQuestion: 0,
  selectedAnswers: [],
  score: 0,
  highScore: 0,
  remainingSeconds: 0,
};

function App() {
  const [
    {
      questions,
      status,
      currentQuestion,
      selectedAnswers: selectedAnswer,
      score,
      highScore,
      remainingSeconds,
    },
    dispatch,
  ] = useReducer(reducer, initState);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const date = await res.json();
        dispatch({ type: StateTypes.DATARECEIVED, payload: date });
      } catch (error) {
        dispatch({ type: StateTypes.DATAFAILED });
      }
    }

    fetchQuestions();
  }, []);

  const maxScore = questions.reduce((acc, curr) => acc + curr.points, 0);

  return (
    <div className="app">
      <Header />
      <MainContent>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              answer={selectedAnswer[currentQuestion]}
              currentQuestion={currentQuestion}
              numQuestions={questions.length}
              currentScore={score}
              maxScore={maxScore}
            />
            <Question
              question={questions[currentQuestion]}
              dispatch={dispatch}
              answer={selectedAnswer[currentQuestion]}
            />
            <footer className="footer">
              {currentQuestion > 0 && (
                <Button
                  onClick={() => dispatch({ type: StateTypes.PREV })}
                  text="Previous"
                />
              )}
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
              <NextButton
                dispatch={dispatch}
                answer={selectedAnswer[currentQuestion]}
                currentQuestion={currentQuestion}
                numQuestions={questions.length}
              />
            </footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            score={score}
            maxScore={maxScore}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </MainContent>
    </div>
  );
}

export default App;
