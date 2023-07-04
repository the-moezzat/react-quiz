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
      };
    case StateTypes.ANSWER:
      // const correct = state.questions[state.currentQuestion].
      return {
        ...state,
        selectedAnswer: action.payload as number,
        score:
          state.questions[state.currentQuestion].correctOption ===
          action.payload
            ? state.score + state.questions[state.currentQuestion].points
            : state.score,
      };
    case StateTypes.NEXT:
      return {
        ...state,
        selectedAnswer: null,
        currentQuestion: state.currentQuestion + 1,
      };
    case StateTypes.FINISH:
      return {
        ...state,
        status: 'finished',
        highScore: Math.max(state.highScore, state.score),
      };
    case StateTypes.RESTART:
      return {
        ...state,
        currentQuestion: 0,
        status: 'ready',
        selectedAnswer: null,
        score: 0,
      };
    default:
      throw new Error('Wrong action type');
  }
}

const initState: InitState = {
  questions: [],
  status: 'loading',
  currentQuestion: 0,
  selectedAnswer: null,
  score: 0,
  highScore: 0,
};

function App() {
  const [
    { questions, status, currentQuestion, selectedAnswer, score, highScore },
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
              answer={selectedAnswer}
              currentQuestion={currentQuestion}
              numQuestions={questions.length}
              currentScore={score}
              maxScore={maxScore}
            />
            <Question
              question={questions[currentQuestion]}
              dispatch={dispatch}
              answer={selectedAnswer}
            />

            <NextButton
              dispatch={dispatch}
              answer={selectedAnswer}
              currentQuestion={currentQuestion}
              numQuestions={questions.length}
            />
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
