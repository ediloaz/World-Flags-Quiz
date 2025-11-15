export type Difficulty = "famous" | "mixed";

export type GameSize = 10 | 25;

export interface GameConfig {
  difficulty: Difficulty;
  size: GameSize;
}

export interface FlagQuestion {
  countryCode: string;
  countryName: string;
  options: string[];
  correctAnswer: string;
}

export interface GameResult {
  score: number;
  time: number; // tiempo en segundos
  correctAnswers: number;
  totalQuestions: number;
  difficulty: Difficulty;
  size: GameSize;
  captchaToken?: string;
}

export interface RankingEntry {
  id?: string;
  playerName: string;
  score: number;
  time: number;
  correctAnswers: number;
  totalQuestions: number;
  difficulty: Difficulty;
  size: GameSize;
  timestamp?: string;
  rank?: number;
}

export interface GameState {
  currentQuestion: number;
  questions: FlagQuestion[];
  score: number;
  startTime: number;
  endTime?: number;
  answers: boolean[];
  isFinished: boolean;
}

