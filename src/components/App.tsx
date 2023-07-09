import Header from './Header.';
import MainContent from './MainContent';
import Loader from './Loader.';
import Error from './Error.';
import StartScreen from './StartScreen';
import Question from './Question';
import Progress from './Progress';
import NextButton from './NextButton';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Button from './Button';
import { useQuiz } from '../context/QuizContext';

function App() {
  const { status, currentQuestion, handlePrev } = useQuiz();

  return (
    <div className="app">
      <Header />
      <MainContent>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <footer className="footer">
              {currentQuestion > 0 && (
                <Button onClick={handlePrev} text="Previous" />
              )}
              <Timer />
              <NextButton />
            </footer>
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </MainContent>
    </div>
  );
}

export default App;
