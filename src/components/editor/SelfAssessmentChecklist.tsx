import React, { useState } from 'react';
import { CheckSquare, Square, Award } from 'lucide-react';
import { SelfAssessmentCriterion } from '../../types/questions';

interface SelfAssessmentChecklistProps {
  criteria: SelfAssessmentCriterion[];
  onCompleteMarks?: (marksAwarded: number, totalMarks: number) => void;
}

export const SelfAssessmentChecklist: React.FC<SelfAssessmentChecklistProps> = ({
  criteria,
  onCompleteMarks
}) => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const totalPossible = criteria.reduce((sum, item) => sum + item.marks, 0);
  const currentMarks = criteria.reduce((sum, item) => (checkedIds[item.id] ? sum + item.marks : sum), 0);

  const toggleCheck = (id: string) => {
    const updated = { ...checkedIds, [id]: !checkedIds[id] };
    setCheckedIds(updated);
    const updatedTotal = criteria.reduce((sum, item) => (updated[item.id] ? sum + item.marks : sum), 0);
    if (onCompleteMarks) {
      onCompleteMarks(updatedTotal, totalPossible);
    }
  };

  const percentage = Math.round((currentMarks / totalPossible) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-teal-600" />
          <h3 className="font-bold text-slate-800 text-sm">
            Self-Assessment Marking Scheme
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 block">Self-Assessed Score</span>
          <span className="font-bold text-slate-800 text-sm">
            {currentMarks} / {totalPossible} marks ({percentage}%)
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Review your written pseudocode against standard Pearson assessment criteria. Tick each objective your code successfully satisfies:
      </p>

      <div className="space-y-2.5">
        {criteria.map((item) => {
          const isChecked = !!checkedIds[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition select-none ${
                isChecked
                  ? 'bg-teal-50/70 border-teal-200 text-teal-900'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <button 
                type="button" 
                aria-label={`Toggle criteria: ${item.criterion}`}
                className="mt-0.5 text-teal-600 flex-shrink-0"
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 fill-teal-600 text-white" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </button>
              <div className="flex-1 font-medium leading-relaxed">
                {item.criterion}
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold text-[10px] flex-shrink-0">
                +{item.marks} mark{item.marks > 1 ? 's' : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
