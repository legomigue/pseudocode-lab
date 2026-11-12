import { DifficultyLevel, QuestionType, TopicId } from './questions';

export interface AttemptRecord {
  id: string;
  questionId: string;
  questionTitle: string;
  topic: TopicId;
  difficulty: DifficultyLevel;
  type: QuestionType;
  timestamp: number;
  isCorrect: boolean;
  attemptsCount: number;
  hintsUsed: number;
  feedbackNote?: string;
}

export interface TopicProgress {
  attempted: number;
  correct: number;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  masteryPercentage: number;
}

export interface StudentProfile {
  studentId: string;
  name: string;
  currentLevel: DifficultyLevel;
  diagnosticCompleted: boolean;
  diagnosticScore?: number;
  overallConsecutiveCorrect: number;
  overallConsecutiveIncorrect: number;
  topicStats: Record<TopicId, TopicProgress>;
  history: AttemptRecord[];
  createdAt: number;
  lastActive: number;
}
