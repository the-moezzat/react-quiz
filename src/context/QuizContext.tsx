import { createContext, useContext, useEffect, useReducer } from 'react';
import { InitState, IAction, StateTypes, IQuestion } from '../types';

interface IQuizContext extends InitState {
  maxScore: number;
  startApp: () => void;
  handleRestart: () => void;
  handlePrev: () => void;
  handleNext: () => void;
  handleFinish: () => void;
  handleTick: () => void;
  answerQuestion: (index: number) => void;
}

const QuizContext = createContext<IQuizContext>({
  questions: [],
  status: 'loading',
  currentQuestion: 0,
  selectedAnswers: [],
  score: 0,
  highScore: 0,
  remainingSeconds: 0,
  maxScore: 0,
  startApp: () => null,
  answerQuestion: () => null,
  handleRestart: () => null,
  handlePrev: () => null,
  handleNext: () => null,
  handleFinish: () => null,
  handleTick: () => null,
});

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

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [
    {
      questions,
      status,
      currentQuestion,
      selectedAnswers,
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

  function startApp() {
    dispatch({ type: StateTypes.START });
  }

  function answerQuestion(index: number) {
    dispatch({ type: StateTypes.ANSWER, payload: index });
  }

  function handleRestart() {
    dispatch({ type: StateTypes.RESTART });
  }

  function handlePrev() {
    dispatch({ type: StateTypes.PREV });
  }

  function handleNext() {
    dispatch({ type: StateTypes.NEXT });
  }

  function handleFinish() {
    dispatch({ type: StateTypes.FINISH });
  }

  function handleTick() {
    dispatch({ type: StateTypes.TICK });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        currentQuestion,
        selectedAnswers,
        score,
        highScore,
        remainingSeconds,
        maxScore,
        startApp,
        answerQuestion,
        handleRestart,
        handlePrev,
        handleNext,
        handleFinish,
        handleTick,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("You've used the context outside the quiz provider");
  }
  return context;
}

export { QuizContext, QuizProvider, useQuiz };
