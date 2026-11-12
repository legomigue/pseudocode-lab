import React, { useState } from 'react';
import { Lightbulb, BookOpen, Sparkles, CheckCircle, RotateCcw } from 'lucide-react';
import { Question, ScrambledLine } from '../../types/questions';
import { DifficultyBadge, ConventionBadge } from '../common/Badge';
import { validatorService, ValidationResult } from '../../services/validatorService';
import { EducationalFeedback } from '../feedback/EducationalFeedback';
import { MultipleChoiceExercise } from './MultipleChoiceExercise';
import { CompleteCodeExercise } from './CompleteCodeExercise';
import { FindMistakeExercise } from './FindMistakeExercise';
import { ArrangeInstructionsExercise } from './ArrangeInstructionsExercise';
import { ScenarioChallengeExercise } from './ScenarioChallengeExercise';

interface ExerciseContainerProps {
  question: Question;
  onRecordAnswer: (isCorrect: boolean, attempts: number, hintsUsed: number) => void;
  onNextQuestion?: () => void;
}

export const ExerciseContainer: React.FC<ExerciseContainerProps> = ({
  question,
  onRecordAnswer,
  onNextQuestion
}) => {
  const [feedbackResult, setFeedbackResult] = useState<ValidationResult | null>(null);
  const [attemptsCount, setAttemptsCount] = useState<number>(0);
  const [hintsVisible, setHintsVisible] = useState<boolean>(false);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);

  const handleShowHint = () => {
    if (!hintsVisible) {
      setHintsVisible(true);
      setHintsUsedCount(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    setFeedbackResult(null);
  };

  const processSubmission = (result: ValidationResult) => {
    const nextAttempts = attemptsCount + 1;
    setAttemptsCount(nextAttempts);
    setFeedbackResult(result);
    onRecordAnswer(result.isCorrect, nextAttempts, hintsUsedCount);
  };

  // Specific Type Submit Handlers
  const handleMultipleChoiceSubmit = (selectedOptionId: string) => {
    const res = validatorService.validateMultipleChoice(question, selectedOptionId);
    processSubmission(res);
  };

  const handleCompleteCodeSubmit = (answers: Record<string, string>) => {
    const res = validatorService.validateBlanks(question, answers);
    processSubmission(res);
  };

  const handleFindMistakeSubmit = (selectedLineNumber: number) => {
    const res = validatorService.validateMistake(question, selectedLineNumber);
    processSubmission(res);
  };

  const handleArrangeSubmit = (ordered: ScrambledLine[]) => {
    const res = validatorService.validateOrdering(question, ordered);
    processSubmission(res);
  };

  const handleScenarioSubmit = (code: string) => {
    const res = validatorService.validateScenarioAlgorithm(question, code);
    processSubmission(res);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header with badges and topic */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge level={question.difficulty} />
          <ConventionBadge status={question.conventionStatus} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShowHint}
            disabled={hintsVisible || question.hints.length === 0}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition ${
              hintsVisible
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-slate-50 text-slate-600 hover:text-amber-700 hover:bg-amber-50 border-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            {hintsVisible ? 'Hint Active' : 'Need a Hint?'}
          </button>
        </div>
      </div>

      {/* Question Title & Prompt */}
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
          {question.title}
        </h2>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          {question.prompt}
        </p>
      </div>

      {/* Hints Card if opened */}
      {hintsVisible && question.hints.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1.5 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 font-bold text-amber-800">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Targeted Hint:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-amber-800/90">
            {question.hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Exercise Content according to type */}
      <div className="pt-2">
        {question.type === 'multiple-choice' && (
          <MultipleChoiceExercise
            question={question}
            onSubmitAnswer={handleMultipleChoiceSubmit}
            disabled={feedbackResult !== null && feedbackResult.isCorrect}
          />
        )}

        {question.type === 'complete-code' && (
          <CompleteCodeExercise
            question={question}
            onSubmitAnswer={handleCompleteCodeSubmit}
            disabled={feedbackResult !== null && feedbackResult.isCorrect}
          />
        )}

        {question.type === 'find-mistake' && (
          <FindMistakeExercise
            question={question}
            onSubmitAnswer={handleFindMistakeSubmit}
            disabled={feedbackResult !== null && feedbackResult.isCorrect}
          />
        )}

        {question.type === 'arrange-instructions' && (
          <ArrangeInstructionsExercise
            question={question}
            onSubmitAnswer={handleArrangeSubmit}
            disabled={feedbackResult !== null && feedbackResult.isCorrect}
          />
        )}

        {question.type === 'scenario-challenge' && (
          <ScenarioChallengeExercise
            question={question}
            onSubmitAnswer={handleScenarioSubmit}
            disabled={feedbackResult !== null && feedbackResult.isCorrect}
          />
        )}
      </div>

      {/* Educational Feedback Panel */}
      {feedbackResult && (
        <div className="pt-4">
          <EducationalFeedback
            result={feedbackResult}
            onRetry={handleRetry}
            onNextQuestion={onNextQuestion}
            learningObjective={question.learningObjective}
            ruleReference={question.pseudocodeRuleRef}
            modelAnswer={question.scenarioDetails?.modelSolution}
          />
        </div>
      )}
    </div>
  );
};
