import React, { useState } from 'react';
import { ArrowUp, ArrowDown, GripVertical, Send, Shuffle } from 'lucide-react';
import { Question, ScrambledLine } from '../../types/questions';

interface ArrangeInstructionsExerciseProps {
  question: Question;
  onSubmitAnswer: (orderedLines: ScrambledLine[]) => void;
  disabled?: boolean;
}

export const ArrangeInstructionsExercise: React.FC<ArrangeInstructionsExerciseProps> = ({
  question,
  onSubmitAnswer,
  disabled = false
}) => {
  const [items, setItems] = useState<ScrambledLine[]>(() => [...(question.scrambledLines || [])]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (disabled || toIndex < 0 || toIndex >= items.length) return;
    const updated = [...items];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setItems(updated);
  };

  const handleShuffle = () => {
    if (disabled) return;
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitAnswer(items);
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    if (disabled) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    moveItem(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <span>Use the <strong>Up/Down buttons</strong> or drag cards to order the algorithm:</span>
        <button
          type="button"
          onClick={handleShuffle}
          disabled={disabled}
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition"
        >
          <Shuffle className="w-3.5 h-3.5" />
          Re-Shuffle
        </button>
      </div>

      <div className="space-y-2.5">
        {items.map((line, index) => {
          return (
            <div
              key={line.id}
              draggable={!disabled}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`p-3.5 rounded-2xl border bg-white shadow-xs flex items-center justify-between gap-3 transition-all ${
                draggedIndex === index
                  ? 'border-blue-500 bg-blue-50/50 shadow-md scale-[1.01]'
                  : 'border-slate-200 hover:border-slate-300'
              } ${disabled ? 'opacity-80' : ''}`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-slate-400 cursor-grab active:cursor-grabbing p-1">
                  <GripVertical className="w-4 h-4" />
                </span>
                <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <code className="font-mono text-xs sm:text-sm text-slate-800 font-medium">
                  {line.text}
                </code>
              </div>

              {!disabled && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveItem(index, index - 1)}
                    aria-label={`Move line ${index + 1} up`}
                    className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === items.length - 1}
                    onClick={() => moveItem(index, index + 1)}
                    aria-label={`Move line ${index + 1} down`}
                    className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!disabled && (
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white shadow-md shadow-blue-500/20 transition"
          >
            <Send className="w-4 h-4" />
            Check Instruction Order
          </button>
        </div>
      )}
    </form>
  );
};
