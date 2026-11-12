import React, { useState } from 'react';
import { Bug, AlertTriangle, Send } from 'lucide-react';
import { Question } from '../../types/questions';

interface FindMistakeExerciseProps {
  question: Question;
  onSubmitAnswer: (selectedLineNumber: number) => void;
  disabled?: boolean;
}

export const FindMistakeExercise: React.FC<FindMistakeExerciseProps> = ({
  question,
  onSubmitAnswer,
  disabled = false
}) => {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  const lines = (question.codeSnippet || '').split('\n');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLine !== null) {
      onSubmitAnswer(selectedLine);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-rose-400 font-semibold">
            <Bug className="w-4 h-4" />
            <span>Click on the line containing the logic error:</span>
          </div>
          {selectedLine !== null && (
            <span className="text-teal-400 font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              Selected: Line {selectedLine}
            </span>
          )}
        </div>

        <div className="space-y-1.5 font-mono text-xs sm:text-sm">
          {lines.map((line, index) => {
            const lineNum = index + 1;
            const isSelected = selectedLine === lineNum;
            // Clean out prefix number if present in string
            const cleanText = line.replace(/^\d+:\s*/, '');

            return (
              <div
                key={lineNum}
                onClick={() => !disabled && setSelectedLine(lineNum)}
                className={`flex items-center px-3 py-2 rounded-xl cursor-pointer transition select-none ${
                  isSelected
                    ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-100 font-semibold shadow-xs'
                    : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                } ${disabled ? 'cursor-default' : ''}`}
              >
                <span className="w-6 text-slate-500 text-xs select-none text-right mr-3 font-mono">
                  {lineNum}
                </span>
                <span className="flex-1 whitespace-pre">{cleanText}</span>
                {isSelected && (
                  <span className="text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded-full ml-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Bug Identified
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!disabled && (
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={selectedLine === null}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-500/20 transition"
          >
            <Send className="w-4 h-4" />
            Submit Error Identification
          </button>
        </div>
      )}
    </form>
  );
};
