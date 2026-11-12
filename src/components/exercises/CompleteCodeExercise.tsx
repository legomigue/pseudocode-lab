import React, { useState } from 'react';
import { Send, FileCode } from 'lucide-react';
import { Question } from '../../types/questions';

interface CompleteCodeExerciseProps {
  question: Question;
  onSubmitAnswer: (answers: Record<string, string>) => void;
  disabled?: boolean;
}

export const CompleteCodeExercise: React.FC<CompleteCodeExerciseProps> = ({
  question,
  onSubmitAnswer,
  disabled = false
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleInputChange = (blankKey: string, val: string) => {
    setAnswers(prev => ({ ...prev, [blankKey]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitAnswer(answers);
  };

  const expectedBlankKeys = question.expectedBlanks ? Object.keys(question.expectedBlanks) : [];

  // Parse template and render inputs in place
  const template = question.blankTemplate || '';
  const lines = template.split('\n');

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800 text-slate-400 text-xs font-mono">
          <FileCode className="w-4 h-4 text-teal-400" />
          <span>Fill in the missing pseudocode instructions:</span>
        </div>

        <div className="font-mono text-sm leading-8 text-slate-100 space-y-1">
          {lines.map((line, lineIndex) => {
            // Check if line contains any ___blank_X___
            const parts = line.split(/(___blank_\d+___)/g);

            return (
              <div key={lineIndex} className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-600 text-xs w-6 select-none text-right mr-2">
                  {lineIndex + 1}
                </span>

                {parts.map((part, pIndex) => {
                  const match = part.match(/___(blank_\d+)___/);
                  if (match) {
                    const blankKey = match[1];
                    return (
                      <input
                        key={pIndex}
                        type="text"
                        disabled={disabled}
                        value={answers[blankKey] || ''}
                        onChange={(e) => handleInputChange(blankKey, e.target.value)}
                        placeholder={`[Enter instruction]`}
                        className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-800 border-2 border-teal-500/70 text-teal-300 placeholder-slate-500 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/30 transition uppercase font-semibold min-w-[140px]"
                      />
                    );
                  }
                  return <span key={pIndex}>{part}</span>;
                })}
              </div>
            );
          })}
        </div>
      </div>

      {!disabled && (
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white shadow-md shadow-blue-500/20 transition"
          >
            <Send className="w-4 h-4" />
            Check Completed Code
          </button>
        </div>
      )}
    </form>
  );
};
