import React, { useState } from 'react';
import { Trophy, FileCode, CheckCircle, Sparkles, BookOpen } from 'lucide-react';
import { Question } from '../types/questions';
import { ExerciseContainer } from '../components/exercises/ExerciseContainer';
import { AdaptiveEngineState } from '../hooks/useAdaptiveLearning';

interface ChallengesPageProps {
  questions: Question[];
  adaptive: AdaptiveEngineState;
}

export const ChallengesPage: React.FC<ChallengesPageProps> = ({
  questions,
  adaptive
}) => {
  const scenarioQuestions = questions.filter(q => q.type === 'scenario-challenge');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    scenarioQuestions[0]?.id || ''
  );

  const currentQ = scenarioQuestions.find(q => q.id === selectedScenarioId) || scenarioQuestions[0];

  return (
    <div className="space-y-6 py-2 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Trophy className="w-4 h-4" />
          <span>Exam-Style Algorithmic Scenarios</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Scenario Problem Challenges
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
          Real-world scenarios mirroring Pearson BTEC Level 3 assessments. Construct complete multi-step algorithms using sequence, multi-way selection, loops, accumulators, and structured output formatting.
        </p>

        {/* Scenario Selection Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          {scenarioQuestions.map((sc, index) => (
            <button
              key={sc.id}
              onClick={() => setSelectedScenarioId(sc.id)}
              className={`text-xs px-4 py-2 rounded-xl font-semibold transition ${
                sc.id === selectedScenarioId
                  ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Challenge {index + 1}: {sc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Render Active Scenario Challenge */}
      {currentQ ? (
        <ExerciseContainer
          key={currentQ.id}
          question={currentQ}
          onRecordAnswer={(isCorrect, attempts, hints) => {
            adaptive.recordAnswer({
              questionId: currentQ.id,
              questionTitle: currentQ.title,
              topic: currentQ.topic,
              difficulty: currentQ.difficulty,
              type: currentQ.type,
              isCorrect,
              attemptsCount: attempts,
              hintsUsed: hints
            });
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl p-8 text-center text-slate-500">
          No scenario challenges currently loaded.
        </div>
      )}

    </div>
  );
};
