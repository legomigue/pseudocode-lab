import React, { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Question } from '../../types/questions';

interface MultipleChoiceExerciseProps {
  question: Question;
  onSubmitAnswer: (selectedOptionId: string) => void;
  disabled?: boolean;
}

export const MultipleChoiceExercise: React.FC<MultipleChoiceExerciseProps> = ({
  question,
  onSubmitAnswer,
  disabled = false
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (disabled) return;
    setSelectedId(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId) {
      onSubmitAnswer(selectedId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const isSelected = selectedId === option.id;
          const letter = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`p-4 rounded-2xl border text-sm flex items-start gap-3.5 cursor-pointer transition select-none ${
                isSelected
                  ? 'bg-blue-50/90 border-blue-500 text-blue-950 font-medium shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              } ${disabled ? 'opacity-80 cursor-default' : ''}`}
            >
              <div
                className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {letter}
              </div>
              <div className="flex-1 leading-relaxed">
                {option.text}
              </div>
            </div>
          );
        })}
      </div>

      {!disabled && (
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={!selectedId}
            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-500/20 transition"
          >
            Submit Answer
          </button>
        </div>
      )}
    </form>
  );
};
