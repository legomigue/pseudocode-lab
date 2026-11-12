import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  PlusCircle, 
  Filter, 
  Search,
  BookOpen,
  Info,
  Layers,
  FileCode2,
  Trash2,
  Plus
} from 'lucide-react';
import { Question, TopicId, DifficultyLevel, QuestionType } from '../types/questions';
import { TOPICS } from '../data/questions';
import { DifficultyBadge, ConventionBadge } from '../components/common/Badge';
import { storageService } from '../services/storageService';

interface TeacherDashboardProps {
  questions: Question[];
  onAddQuestion: (q: Question) => void;
}

// Clearly labelled fictional demonstration data
const DEMO_STUDENTS = [
  { id: 'std_01', name: 'Jordan Smith', level: 2, completed: 34, accuracy: 82, lastActive: '10 mins ago' },
  { id: 'std_02', name: 'Amara Patel', level: 3, completed: 48, accuracy: 91, lastActive: '25 mins ago' },
  { id: 'std_03', name: 'Liam O\'Connor', level: 1, completed: 19, accuracy: 63, lastActive: '1 hour ago' },
  { id: 'std_04', name: 'Chloe Davies', level: 2, completed: 28, accuracy: 75, lastActive: '2 hours ago' },
  { id: 'std_05', name: 'Mohammed Al-Mansoor', level: 3, completed: 42, accuracy: 88, lastActive: 'Yesterday' },
  { id: 'std_06', name: 'Sophie Taylor', level: 1, completed: 15, accuracy: 58, lastActive: 'Yesterday' }
];

const COMMON_MISCONCEPTIONS = [
  {
    topic: 'Iteration (Loops)',
    issue: 'Off-by-one errors & inverted loop conditions',
    frequency: '38% of students',
    remedy: 'Reinforce desk checking trace tables before coding. Emphasise that FOR i = 1 TO 5 executes 5 times, whereas WHILE count < 5 executes 4 times when initialised at 1.'
  },
  {
    topic: 'Counters & Accumulators',
    issue: 'Omitting accumulator initialisation before loop entry',
    frequency: '29% of students',
    remedy: 'Highlight that variables referenced in expressions like total = total + x must hold an initial starting value (0) in memory.'
  },
  {
    topic: 'Selection (IF / ELSE)',
    issue: 'Confusing assignment (=) with relational equality (==)',
    frequency: '24% of students',
    remedy: 'Practice writing comparison conditions in explicit verbal statements before pseudocode notation.'
  }
];

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  questions,
  onAddQuestion
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'misconceptions' | 'questions'>('overview');
  const [questionSearch, setQuestionSearch] = useState('');
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  // Add Question Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState<TopicId>('variables-io');
  const [newDifficulty, setNewDifficulty] = useState<DifficultyLevel>(1);
  const [newPrompt, setNewPrompt] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newRuleRef, setNewRuleRef] = useState('Pearson BTEC Verified Construct');
  const [newHint, setNewHint] = useState('');
  const [newExplanation, setNewExplanation] = useState('');
  // MCQ options
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOpt, setCorrectOpt] = useState('opt_a');

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(questionSearch.toLowerCase()) ||
                          q.prompt.toLowerCase().includes(questionSearch.toLowerCase());
    const matchesTopic = filterTopic === 'all' || q.topic === filterTopic;
    const matchesLevel = filterLevel === 'all' || q.difficulty === Number(filterLevel);
    return matchesSearch && matchesTopic && matchesLevel;
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrompt || !optA || !optB) {
      alert('Please fill in required fields.');
      return;
    }

    const created: Question = {
      id: `custom_${Date.now()}`,
      title: newTitle,
      topic: newTopic,
      difficulty: newDifficulty,
      type: 'multiple-choice',
      prompt: newPrompt,
      learningObjective: newObjective || 'Custom instructor objective',
      pseudocodeRuleRef: newRuleRef,
      conventionStatus: 'pearson_verified',
      hints: newHint ? [newHint] : ['Review the course notes.'],
      explanation: newExplanation || 'Teacher explanation provided.',
      options: [
        { id: 'opt_a', text: optA },
        { id: 'opt_b', text: optB },
        { id: 'opt_c', text: optC || 'Alternative option' },
        { id: 'opt_d', text: optD || 'Alternative option' }
      ],
      correctOptionId: correctOpt
    };

    onAddQuestion(created);
    storageService.addCustomQuestion(created);
    setShowAddModal(false);
    alert('Question successfully added to the Question Bank!');
  };

  return (
    <div className="space-y-8 py-2 max-w-6xl mx-auto">
      
      {/* Explicit Fictional Demo Banner Required by Specification */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-900 text-xs">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-amber-950 uppercase tracking-wider block">
            Teacher Demonstration Mode • Fictional Cohort Data
          </span>
          <p className="leading-relaxed text-amber-900/90">
            This prototype dashboard is populated with <strong>synthetic demonstration records</strong> for illustrative evaluation. It contains no real student personal data. In production, this view securely connects to Supabase authentication and institution database tables.
          </p>
        </div>
      </div>

      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">Lecturer Analytics & Question Bank</h1>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Cohort 12A
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Pearson BTEC National Extended Diploma in Computing • Unit 1 Principles of Computer Science
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl font-bold transition ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cohort Overview
          </button>
          <button
            onClick={() => setActiveTab('misconceptions')}
            className={`px-3.5 py-2 rounded-xl font-bold transition ${
              activeTab === 'misconceptions'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Common Misconceptions
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3.5 py-2 rounded-xl font-bold transition ${
              activeTab === 'questions'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Question Bank ({questions.length})
          </button>
        </div>
      </div>

      {/* TAB 1: COHORT OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* KPI Cohort Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500">Enrolled Students</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">18</div>
              <span className="text-[11px] text-teal-600 font-medium">100% Diagnostic complete</span>
            </div>
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500">Cohort Average Accuracy</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">76.4%</div>
              <span className="text-[11px] text-emerald-600 font-medium">+4.2% since last week</span>
            </div>
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500">Total Exercises Solved</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">482</div>
              <span className="text-[11px] text-slate-500">Across 8 curriculum topics</span>
            </div>
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500">Level 3 (Advanced) Students</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-600">6 (33%)</div>
              <span className="text-[11px] text-slate-500">Exam scenario ready</span>
            </div>
          </div>

          {/* Student Records Table (Fictional) */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Fictional Cohort Student Progress List
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time level placement, completion count and accuracy
                </p>
              </div>
              <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-medium">
                Demo Sample (6 of 18)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Current Level</th>
                    <th className="py-3 px-4">Questions Solved</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Last Activity</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DEMO_STUDENTS.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {std.name}
                      </td>
                      <td className="py-3 px-4">
                        <DifficultyBadge level={std.level as DifficultyLevel} size="sm" />
                      </td>
                      <td className="py-3 px-4 font-mono font-medium">
                        {std.completed} completed
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${std.accuracy >= 80 ? 'text-emerald-600' : std.accuracy >= 70 ? 'text-blue-600' : 'text-amber-600'}`}>
                          {std.accuracy}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {std.lastActive}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active Learner
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: COMMON MISCONCEPTIONS & REVISION LESSONS */}
      {activeTab === 'misconceptions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Identified Learning Misconceptions & Diagnostic Analysis
              </h2>
              <p className="text-xs text-slate-500">
                Automated error frequency analysis derived from student incorrect attempts across exercises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {COMMON_MISCONCEPTIONS.map((m, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                        {m.topic}
                      </span>
                      <span className="text-xs font-bold text-rose-600">
                        {m.frequency}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {m.issue}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                      <strong>Suggested Classroom Action:</strong> {m.remedy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: QUESTION BANK INSPECTOR & ADD CUSTOM QUESTION */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search question bank..."
                  value={questionSearch}
                  onChange={(e) => setQuestionSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-slate-700 outline-none"
              >
                <option value="all">All Topics</option>
                {TOPICS.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>

              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-slate-700 outline-none"
              >
                <option value="all">All Levels</option>
                <option value="1">Level 1 (Beginner)</option>
                <option value="2">Level 2 (Intermediate)</option>
                <option value="3">Level 3 (Advanced)</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-sm transition whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Custom Question
            </button>
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <DifficultyBadge level={q.difficulty} size="sm" />
                    <ConventionBadge status={q.conventionStatus} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {q.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {q.prompt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="capitalize font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    Type: {q.type.replace('-', ' ')}
                  </span>
                  <span>ID: {q.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Custom Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Add Question to Bank
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add teacher-authored Pearson exam questions to the platform repository.
            </p>

            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Question Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sentinel Loop Validation"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Topic</label>
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value as TopicId)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    {TOPICS.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Difficulty Level</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(Number(e.target.value) as DifficultyLevel)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    <option value={1}>Level 1 (Beginner)</option>
                    <option value={2}>Level 2 (Intermediate)</option>
                    <option value={3}>Level 3 (Advanced)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Prompt / Question Text</label>
                <textarea
                  required
                  rows={2}
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="State the problem clearly..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-800 block">Multiple Choice Options:</span>
                <input
                  type="text"
                  required
                  placeholder="Option A (e.g. Correct answer definition)"
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  required
                  placeholder="Option B"
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Option C"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Option D"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                />

                <div className="pt-2 flex items-center gap-2">
                  <span className="font-semibold">Correct Option:</span>
                  <select
                    value={correctOpt}
                    onChange={(e) => setCorrectOpt(e.target.value)}
                    className="p-1 bg-white border border-slate-300 rounded-lg"
                  >
                    <option value="opt_a">Option A</option>
                    <option value="opt_b">Option B</option>
                    <option value="opt_c">Option C</option>
                    <option value="opt_d">Option D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Targeted Educational Hint</label>
                <input
                  type="text"
                  value={newHint}
                  onChange={(e) => setNewHint(e.target.value)}
                  placeholder="Hint shown to students when stuck..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Explanation</label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Explanation shown after submission..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
