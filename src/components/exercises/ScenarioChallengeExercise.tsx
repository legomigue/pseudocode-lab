import React, { useState } from 'react';
import { FileText, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Question } from '../../types/questions';
import { PseudocodeEditor } from '../editor/PseudocodeEditor';
import { SelfAssessmentChecklist } from '../editor/SelfAssessmentChecklist';

interface ScenarioChallengeExerciseProps {
  question: Question;
  onSubmitAnswer: (code: string) => void;
  disabled?: boolean;
}

export const ScenarioChallengeExercise: React.FC<ScenarioChallengeExerciseProps> = ({
  question,
  onSubmitAnswer,
  disabled = false
}) => {
  const scenario = question.scenarioDetails;
  const starterCode = scenario?.starterCode || '// Write your pseudocode algorithm here\n';
  const [code, setCode] = useState<string>(starterCode);
  const [hasAttempted, setHasAttempted] = useState(false);

  const handleSubmit = () => {
    setHasAttempted(true);
    onSubmitAnswer(code);
  };

  const handleReset = () => {
    setCode(starterCode);
  };

  if (!scenario) return null;

  return (
    <div className="space-y-6">
      {/* Problem Scenario Brief */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
            <FileText className="w-5 h-5" />
          </span>
          <h3 className="font-bold text-slate-800 text-base">
            Scenario Problem Statement
          </h3>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200">
          {scenario.problemStatement}
        </div>

        {/* Input / Output requirements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-200/80">
            <span className="font-bold text-blue-900 block mb-1">Expected Ingress (Inputs):</span>
            <p className="text-blue-800">{scenario.inputDescription}</p>
          </div>
          <div className="bg-teal-50/60 p-3.5 rounded-2xl border border-teal-200/80">
            <span className="font-bold text-teal-900 block mb-1">Expected Egress (Outputs):</span>
            <p className="text-teal-800">{scenario.outputDescription}</p>
          </div>
        </div>

        {scenario.constraints && scenario.constraints.length > 0 && (
          <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-bold block flex items-center gap-1.5 text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Algorithmic Constraints:
            </span>
            <ul className="list-disc pl-5 space-y-0.5 text-amber-800">
              {scenario.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Dedicated Code Editor */}
      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>Write your pseudocode using standard keywords:</span>
          <span className="text-teal-600 font-medium">Model Solution unlocked on attempt</span>
        </div>
        <PseudocodeEditor
          value={code}
          onChange={setCode}
          onSubmit={handleSubmit}
          onReset={handleReset}
          modelSolution={scenario.modelSolution}
          allowModelSolution={hasAttempted}
        />
      </div>

      {/* Self Assessment Checklist */}
      {scenario.selfAssessmentCriteria && scenario.selfAssessmentCriteria.length > 0 && (
        <SelfAssessmentChecklist
          criteria={scenario.selfAssessmentCriteria}
        />
      )}
    </div>
  );
};
