import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { ValidationResult } from '../../services/validatorService';

interface EducationalFeedbackProps {
  result: ValidationResult;
  onRetry: () => void;
  onNextQuestion?: () => void;
  learningObjective: string;
  ruleReference: string;
  modelAnswer?: string;
}

export const EducationalFeedback: React.FC<EducationalFeedbackProps> = ({
  result,
  onRetry,
  onNextQuestion,
  learningObjective,
  ruleReference,
  modelAnswer
}) => {
  const [showDetailedChecks, setShowDetailedChecks] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 ${
        result.isCorrect
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
          : 'bg-amber-50/70 border-amber-200 text-amber-950'
      }`}
    >
      {/* Feedback Header Banner */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              result.isCorrect
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
            }`}
          >
            {result.isCorrect ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <XCircle className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">
              {result.isCorrect ? 'Well Done! Correct Solution' : 'Keep Going! Algorithmic Adjustment Needed'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Objective: {learningObjective}
            </p>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              result.isCorrect
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {result.scorePercentage}% Match
          </span>
        </div>
      </div>

      {/* 1. What was correct (Positive reinforcement) */}
      {result.whatWasCorrect && (
        <div className="bg-white/90 rounded-xl p-3.5 border border-slate-200/80 text-xs text-slate-800 space-y-1 shadow-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>What you got right:</span>
          </div>
          <p className="leading-relaxed pl-5 text-slate-700">
            {result.whatWasCorrect}
          </p>
        </div>
      )}

      {/* 2. Explain the mistake (Concept explanation) */}
      {!result.isCorrect && result.mistakeExplanation && (
        <div className="bg-white/90 rounded-xl p-3.5 border border-amber-200/80 text-xs text-slate-800 space-y-1 shadow-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-800">
            <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Why this needs adjustment:</span>
          </div>
          <p className="leading-relaxed pl-5 text-slate-700">
            {result.mistakeExplanation}
          </p>
        </div>
      )}

      {/* 3. Useful hint for retry */}
      {!result.isCorrect && result.hint && (
        <div className="bg-amber-100/60 rounded-xl p-3.5 border border-amber-300/60 text-xs text-amber-900 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold block">Targeted Learning Hint:</span>
            <p className="leading-relaxed text-amber-800">
              {result.hint}
            </p>
          </div>
        </div>
      )}

      {/* Detailed Check Breakdown dropdown */}
      {result.detailedChecks && result.detailedChecks.length > 0 && (
        <div className="border border-slate-200 rounded-xl bg-white/70 overflow-hidden text-xs">
          <button
            onClick={() => setShowDetailedChecks(!showDetailedChecks)}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-left text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            <span>Detailed Marking Criteria ({result.detailedChecks.filter(c => c.passed).length}/{result.detailedChecks.length} passed)</span>
            {showDetailedChecks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showDetailedChecks && (
            <div className="p-3.5 pt-1 space-y-2 border-t border-slate-100 bg-white">
              {result.detailedChecks.map((check, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  {check.passed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <span className="font-medium text-slate-800">{check.label}: </span>
                    <span className={check.passed ? 'text-slate-600' : 'text-rose-700 font-medium'}>
                      {check.feedback}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Model Answer Toggle */}
      {modelAnswer && (
        <div>
          <button
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 underline flex items-center gap-1"
          >
            <Award className="w-3.5 h-3.5" />
            {showModelAnswer ? 'Hide Exemplar Answer' : 'Show Exemplar Model Answer'}
          </button>
          {showModelAnswer && (
            <div className="mt-2 bg-slate-900 text-teal-200 p-3.5 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-5">
              <pre>{modelAnswer}</pre>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons: Retry and Next */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60">
        <span className="text-[11px] text-slate-500">
          Ref: {ruleReference}
        </span>

        <div className="flex items-center gap-2">
          {!result.isCorrect && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Again
            </button>
          )}

          {onNextQuestion && (
            <button
              onClick={onNextQuestion}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              Next Question
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
