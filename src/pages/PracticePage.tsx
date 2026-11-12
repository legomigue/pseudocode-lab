import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Shuffle, 
  Award,
  Layers
} from 'lucide-react';
import { Question, TopicId, DifficultyLevel } from '../types/questions';
import { TOPICS } from '../data/questions';
import { ExerciseContainer } from '../components/exercises/ExerciseContainer';
import { AdaptiveDifficultyBanner } from '../components/adaptive/AdaptiveDifficultyBanner';
import { AdaptiveEngineState } from '../hooks/useAdaptiveLearning';

interface PracticePageProps {
  questions: Question[];
  adaptive: AdaptiveEngineState;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  questions,
  adaptive
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Filter questions by level and topic
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesLevel = q.difficulty === adaptive.currentLevel;
      const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
      return matchesLevel && matchesTopic;
    });
  }, [questions, adaptive.currentLevel, selectedTopic]);

  // Safe index within filtered questions
  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    const randomIdx = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentIndex(randomIdx);
  };

  const handleTopicChange = (topic: TopicId | 'all') => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
  };

  const handleLevelChange = (lvl: DifficultyLevel) => {
    adaptive.setLevel(lvl);
    setCurrentIndex(0);
  };

  return (
    <div className="space-y-6 py-2 max-w-4xl mx-auto">
      
      {/* Adaptive Recommendation Banner */}
      <AdaptiveDifficultyBanner
        levelUpPrompt={adaptive.levelUpPrompt}
        remedialSupportPrompt={adaptive.remedialSupportPrompt}
        currentLevel={adaptive.currentLevel}
        consecutiveCorrect={adaptive.consecutiveCorrect}
        consecutiveIncorrect={adaptive.consecutiveIncorrect}
        onAcceptLevelUp={adaptive.applyLevelUp}
        onDismissLevelUp={adaptive.dismissLevelUpPrompt}
        onAcceptSimplerLevel={adaptive.applySimplerLevel}
        onDismissSupport={adaptive.dismissSupportPrompt}
      />

      {/* Practice Header & Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Interactive Practice Exercises
            </h1>
            <p className="text-xs text-slate-500">
              Practise multiple-choice questions, missing blanks, error debugging, and instruction sequencing.
            </p>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                  adaptive.currentLevel === lvl
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Level {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Filter Pills */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Topics:
            </span>
            <button
              onClick={() => handleTopicChange('all')}
              className={`px-3 py-1 rounded-xl whitespace-nowrap font-medium transition ${
                selectedTopic === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Topics
            </button>
            {TOPICS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTopicChange(t.id)}
                className={`px-3 py-1 rounded-xl whitespace-nowrap font-medium transition ${
                  selectedTopic === t.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Exercise Card or Empty State */}
      {filteredQuestions.length > 0 && currentQ ? (
        <div className="space-y-4">
          
          {/* Pagination bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                Exercise {currentIndex + 1} of {filteredQuestions.length}
              </span>
              <span>•</span>
              <span className="capitalize text-teal-600 font-medium">
                Type: {currentQ.type.replace('-', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition"
                title="Previous Question"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleShuffle}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition"
                title="Random Question"
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition"
                title="Next Question"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Exercise Container */}
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
            onNextQuestion={handleNext}
          />

        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">No exercises for this filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No questions are currently loaded for Level {adaptive.currentLevel} in topic "{selectedTopic}". Try choosing "All Topics" or switching difficulty level.
          </p>
          <button
            onClick={() => setSelectedTopic('all')}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl"
          >
            Show All Topics
          </button>
        </div>
      )}

    </div>
  );
};
