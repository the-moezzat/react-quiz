export enum StateTypes {
  DATARECEIVED = 'DATARECEIVED',
  DATAFAILED = 'DATAFAILED',
  START = 'START',
  ANSWER = 'ANSWER',
  NEXT = 'NEXT',
  FINISH = 'FINISH',
  RESTART = 'RESTART',
}

export interface IQuestion {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export interface IAction {
  type: StateTypes;
  payload?: IQuestion[] | number | null;
}

export type AppStatus = 'loading' | 'active' | 'error' | 'ready' | 'finished';

export interface InitState {
  questions: IQuestion[];
  status: AppStatus;
  currentQuestion: number;
  selectedAnswer: number | null;
  score: number;
  highScore: number;
}
