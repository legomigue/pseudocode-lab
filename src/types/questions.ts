export type DifficultyLevel = 1 | 2 | 3;

export type QuestionType =
  | 'multiple-choice'
  | 'complete-code'
  | 'find-mistake'
  | 'arrange-instructions'
  | 'scenario-challenge';

export type TopicId =
  | 'variables-io'
  | 'selection'
  | 'iteration'
  | 'counters-accumulators'
  | 'arrays'
  | 'trace-tables'
  | 'errors-debugging'
  | 'algorithms-scenarios';

export interface TopicInfo {
  id: TopicId;
  name: string;
  description: string;
  difficultyLevel: DifficultyLevel;
  iconName: string;
}

export type ConventionStatus = 'generic_demo' | 'pearson_verified';

export interface QuestionOption {
  id: string;
  text: string;
  explanation?: string;
}

export interface ScrambledLine {
  id: string;
  text: string;
  indent?: number;
}

export interface SelfAssessmentCriterion {
  id: string;
  criterion: string;
  marks: number;
}

export interface ScenarioDetails {
  problemStatement: string;
  inputDescription: string;
  outputDescription: string;
  constraints?: string[];
  starterCode?: string;
  modelSolution: string;
  requiredKeywords: string[];
  selfAssessmentCriteria: SelfAssessmentCriterion[];
}

export interface Question {
  id: string;
  title: string;
  topic: TopicId;
  difficulty: DifficultyLevel;
  type: QuestionType;
  prompt: string;
  learningObjective: string;
  pseudocodeRuleRef: string;
  conventionStatus: ConventionStatus;
  pearsonNotice?: string;
  hints: string[];
  explanation: string;

  // Type A: Multiple choice
  options?: QuestionOption[];
  correctOptionId?: string;

  // Type B: Complete code
  blankTemplate?: string;
  expectedBlanks?: Record<string, string[]>; // e.g. { "blank_1": ["OUTPUT", "PRINT", "DISPLAY"] }

  // Type C: Find mistake
  codeSnippet?: string;
  errorLineNumber?: number;
  identifiedMistakeExplanation?: string;

  // Type D: Arrange instructions
  scrambledLines?: ScrambledLine[];
  correctOrderIds?: string[];

  // Type E: Scenario challenge
  scenarioDetails?: ScenarioDetails;
}
