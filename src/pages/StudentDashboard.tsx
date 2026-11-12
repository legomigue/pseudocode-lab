import React from 'react';
import { 
  User, 
  Award, 
  Target, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  AlertTriangle, 
  RotateCcw, 
  Clock, 
  BarChart3,
  Flame,
  ArrowRight
} from 'lucide-react';
import { StudentProfile, AttemptRecord } from '../types/student';
import { TOPICS } from '../data/questions';
import { DifficultyBadge } from '../components/common/Badge';

interface StudentDashboardProps {
  profile: StudentProfile;
  onResetProgress: () => void;
  onNavigateToTopic?: (topicId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  onResetProgress,
  onNavigateToTopic
}) => {
  const totalAttempted = profile.history.length;
  const totalCorrect = profile.history.filter(h => h.isCorrect).length;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // Identify weak areas (topics with attempts and accuracy < 70%)
  const weakTopics = TOPICS.filter(topic => {
    const stat = profile.topicStats[topic.id];
    return stat && stat.attempted >= 1 && stat.masteryPercentage < 70;
  });

  return (
    <div className="space-y-8 py-2 max-w-5xl mx-auto">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20">
            {profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
              <DifficultyBadge level={profile.currentLevel} />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Student ID: {profile.studentId} • Pearson BTEC National Extended Diploma in Computing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your local progress history?')) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 px-3.5 py-2 rounded-xl border border-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Progress
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Questions Attempted</span>
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {totalAttempted}
          </div>
          <div className="text-[11px] text-slate-500">
            Persisted in local profile
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Correct Answers</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
            {totalCorrect}
          </div>
          <div className="text-[11px] text-slate-500">
            {totalAttempted > 0 ? `${totalAttempted - totalCorrect} incorrect or retried` : 'No attempts yet'}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Overall Accuracy</span>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {overallAccuracy}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallAccuracy}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Current Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">
            {profile.overallConsecutiveCorrect}
          </div>
          <div className="text-[11px] text-slate-500">
            {profile.overallConsecutiveCorrect >= 3 ? 'Eligible for Level Up!' : '3 needed to trigger level up'}
          </div>
        </div>

      </div>

      {/* Areas Requiring Improvement Alert */}
      {weakTopics.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>Targeted Areas Requiring Revision (&lt; 70% Accuracy)</span>
          </div>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            Our adaptive algorithm recommends focusing on the following topics before moving to Level 3 exam scenarios:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {weakTopics.map(wt => {
              const stat = profile.topicStats[wt.id];
              return (
                <div key={wt.id} className="bg-white p-3 rounded-2xl border border-amber-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800">{wt.name}</span>
                    <span className="block text-[11px] text-slate-500">
                      Score: {stat?.correct} / {stat?.attempted} ({stat?.masteryPercentage}%)
                    </span>
                  </div>
                  {onNavigateToTopic && (
                    <button
                      onClick={() => onNavigateToTopic(wt.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      Practice
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress by Topic Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Mastery Progress by Curriculum Topic
            </h2>
            <p className="text-xs text-slate-500">
              Breakdown of practice attempts and accuracy across all modules.
            </p>
          </div>
          <BarChart3 className="w-5 h-5 text-slate-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOPICS.map((topic) => {
            const stat = profile.topicStats[topic.id] || {
              attempted: 0,
              correct: 0,
              masteryPercentage: 0
            };

            return (
              <div
                key={topic.id}
                className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{topic.name}</span>
                  <span className="font-semibold text-slate-600">
                    {stat.attempted > 0 ? `${stat.masteryPercentage}% (${stat.correct}/${stat.attempted})` : 'Not attempted'}
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      stat.masteryPercentage >= 75
                        ? 'bg-emerald-500'
                        : stat.masteryPercentage >= 50
                        ? 'bg-blue-500'
                        : stat.attempted > 0
                        ? 'bg-amber-500'
                        : 'bg-transparent'
                    }`}
                    style={{ width: `${stat.masteryPercentage}%` }}
                  ></div>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {topic.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activities Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">
              Recent Practice Activity
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            {profile.history.length} logged events
          </span>
        </div>

        {profile.history.length > 0 ? (
          <div className="divide-y divide-slate-100 text-xs">
            {profile.history.slice(0, 8).map((record) => (
              <div key={record.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {record.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  )}
                  <div>
                    <span className="font-bold text-slate-800">{record.questionTitle}</span>
                    <span className="block text-[11px] text-slate-500">
                      Level {record.difficulty} • Type: {record.type.replace('-', ' ')} • {record.attemptsCount} attempt{record.attemptsCount > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400 whitespace-nowrap">
                  {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic py-4 text-center">
            No activity recorded yet. Start practising to see your recent questions here!
          </p>
        )}
      </div>

    </div>
  );
};
