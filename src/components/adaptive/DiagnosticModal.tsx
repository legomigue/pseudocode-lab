import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Award,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { DifficultyLevel } from '../../types/questions';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (recommendedLevel: DifficultyLevel) => void;
}

interface DiagnosticQuestion {
  id: string;
  level: DifficultyLevel;
  question: string;
  code?: string;
  options: { id: string; text: string }[];
  correctId: string;
  explanation: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    level: 1,
    question: 'What will be displayed after executing the following pseudocode?',
    code: `SET num1 = 15
SET num2 = 5
SET answer = num1 / num2
OUTPUT "Result: ", answer`,
    options: [
      { id: 'a', text: 'Result: 3' },
      { id: 'b', text: 'Result: 20' },
      { id: 'c', text: 'Result: 15 / 5' },
      { id: 'd', text: 'An error occurs' }
    ],
    correctId: 'a',
    explanation: '15 divided by 5 equals 3. The calculated result is printed alongside the string.'
  },
  {
    id: 'diag_2',
    level: 2,
    question: 'How many times will the message "Computing" be displayed in this loop?',
    code: `FOR counter = 1 TO 4
  OUTPUT "Computing"
NEXT counter`,
    options: [
      { id: 'a', text: '3 times' },
      { id: 'b', text: '4 times' },
      { id: 'c', text: '5 times' },
      { id: 'd', text: 'Infinite times' }
    ],
    correctId: 'b',
    explanation: 'A FOR loop from 1 TO 4 runs for values 1, 2, 3, and 4 (inclusive), executing exactly 4 times.'
  },
  {
    id: 'diag_3',
    level: 2,
    question: 'What is the role of the variable total in this algorithm?',
    code: `SET total = 0
FOR i = 1 TO 5
  INPUT score
  SET total = total + score
NEXT i`,
    options: [
      { id: 'a', text: 'A counter that counts iterations' },
      { id: 'b', text: 'An accumulator that calculates a running sum' },
      { id: 'c', text: 'A boolean flag' },
      { id: 'd', text: 'An array index' }
    ],
    correctId: 'b',
    explanation: 'total accumulates the sum of input scores by adding each new score to its previous value.'
  },
  {
    id: 'diag_4',
    level: 3,
    question: 'What value is printed at the end of this array traversal?',
    code: `SET data = [12, 45, 9, 31]
SET target = data[0]
FOR k = 1 TO 3
  IF data[k] > target THEN
    SET target = data[k]
  ENDIF
NEXT k
OUTPUT target`,
    options: [
      { id: 'a', text: '9 (the minimum value)' },
      { id: 'b', text: '12 (the first element)' },
      { id: 'c', text: '45 (the maximum value)' },
      { id: 'd', text: '31 (the last element)' }
    ],
    correctId: 'c',
    explanation: 'This is the standard algorithm for finding the maximum value in an array; target ends up holding 45.'
  }
];

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = DIAGNOSTIC_QUESTIONS[currentIndex];

  const handleSelectOption = (optId: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: optId });
  };

  const handleNext = () => {
    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Determine starting level based on answers
  const calculateResult = (): { level: DifficultyLevel; score: number; title: string; rationale: string } => {
    let score = 0;
    DIAGNOSTIC_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctId) {
        score += 1;
      }
    });

    if (score >= 4) {
      return {
        level: 3,
        score,
        title: 'Level 3 — Advanced',
        rationale: 'You demonstrated strong knowledge of selection, loops, accumulators, and array traversal. Starting at Level 3 will challenge you with complex scenario algorithms and exam-style problems.'
      };
    } else if (score >= 2) {
      return {
        level: 2,
        score,
        title: 'Level 2 — Intermediate',
        rationale: 'You have a good grasp of variables and straightforward iteration. Starting at Level 2 will help you master IF/ELSE structures, nested loops, trace tables, and error spotting.'
      };
    } else {
      return {
        level: 1,
        score,
        title: 'Level 1 — Beginner',
        rationale: 'Starting at Level 1 will build a rock-solid foundation in pseudocode basics, variables, input/output flow, and simple arithmetic before tackling complex branches.'
      };
    }
  };

  const result = calculateResult();

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">
                Diagnostic Placement Assessment
              </h3>
              <p className="text-xs text-slate-500">
                Calibrate your starting difficulty (Takes ~2 minutes)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close diagnostic modal"
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          <div>
            {/* Progress indicators */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Question {currentIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}</span>
              <span className="font-medium text-teal-600">Testing Tier: L{currentQ.level}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-teal-500 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <h4 className="font-semibold text-slate-900 text-sm sm:text-base mb-3 leading-snug">
              {currentQ.question}
            </h4>

            {/* Code Snippet if applicable */}
            {currentQ.code && (
              <pre className="bg-slate-900 text-teal-300 font-mono text-xs p-3.5 rounded-2xl mb-4 border border-slate-800 leading-relaxed overflow-x-auto">
                {currentQ.code}
              </pre>
            )}

            {/* Options */}
            <div className="space-y-2.5 mb-6">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-3.5 rounded-2xl border text-xs sm:text-sm text-left flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 text-blue-900 font-semibold shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span>{opt.text}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ml-2 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={onClose}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Skip Assessment
              </button>
              <button
                disabled={!selectedAnswers[currentQ.id]}
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/20 transition"
              >
                {currentIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? 'Calculate Placement' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-3xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center shadow-md shadow-teal-500/10">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">
                Diagnostic Complete • Score: {result.score} / {DIAGNOSTIC_QUESTIONS.length}
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Recommended Placement: {result.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left">
              {result.rationale}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onComplete(result.level);
                  onClose();
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition"
              >
                Accept & Start at {result.title}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
