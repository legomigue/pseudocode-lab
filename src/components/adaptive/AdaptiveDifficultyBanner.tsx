import React from 'react';
import { Sparkles, HelpCircle, ArrowUpCircle, ArrowDownCircle, X } from 'lucide-react';
import { DifficultyLevel } from '../../types/questions';

interface AdaptiveDifficultyBannerProps {
  levelUpPrompt: boolean;
  remedialSupportPrompt: boolean;
  currentLevel: DifficultyLevel;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  onAcceptLevelUp: () => void;
  onDismissLevelUp: () => void;
  onAcceptSimplerLevel: () => void;
  onDismissSupport: () => void;
}

export const AdaptiveDifficultyBanner: React.FC<AdaptiveDifficultyBannerProps> = ({
  levelUpPrompt,
  remedialSupportPrompt,
  currentLevel,
  consecutiveCorrect,
  consecutiveIncorrect,
  onAcceptLevelUp,
  onDismissLevelUp,
  onAcceptSimplerLevel,
  onDismissSupport
}) => {
  if (levelUpPrompt && currentLevel < 3) {
    const nextLevel = currentLevel + 1;
    const nextLevelName = nextLevel === 2 ? 'Level 2 (Intermediate)' : 'Level 3 (Advanced)';

    return (
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-lg flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base">Ready for a Challenge?</span>
              <span className="bg-yellow-400 text-blue-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase">
                {consecutiveCorrect} In A Row!
              </span>
            </div>
            <p className="text-xs text-blue-100">
              You've mastered this tier! Would you like to advance to <strong>{nextLevelName}</strong>?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onAcceptLevelUp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition shadow-sm"
          >
            <ArrowUpCircle className="w-4 h-4 text-blue-600" />
            Advance Level
          </button>
          <button
            onClick={onDismissLevelUp}
            aria-label="Dismiss level up recommendation"
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (remedialSupportPrompt) {
    return (
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-lg flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base">Extra Learning Support Triggered</span>
              <span className="bg-white/30 text-white font-semibold text-[10px] px-2 py-0.5 rounded-full">
                Adaptive System
              </span>
            </div>
            <p className="text-xs text-amber-50">
              {consecutiveIncorrect >= 2 && currentLevel > 1
                ? 'We noticed a few tricky questions. Would you like to switch to simpler practice or review core concepts?'
                : 'Need some guidance? Hints and worked examples are always available below.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {currentLevel > 1 && (
            <button
              onClick={onAcceptSimplerLevel}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-amber-900 font-bold text-xs hover:bg-amber-50 transition shadow-sm"
            >
              <ArrowDownCircle className="w-4 h-4 text-amber-700" />
              Practice Simpler
            </button>
          )}
          <button
            onClick={onDismissSupport}
            aria-label="Dismiss support recommendation"
            className="p-1.5 rounded-lg text-amber-100 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};
