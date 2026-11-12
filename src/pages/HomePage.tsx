import React from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Trophy, 
  User, 
  GraduationCap, 
  Sparkles, 
  Layers, 
  Code2, 
  Table, 
  Compass,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { TOPICS } from '../data/questions';
import { DifficultyLevel } from '../types/questions';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onOpenDiagnostic: () => void;
  currentLevel: DifficultyLevel;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenDiagnostic,
  currentLevel
}) => {
  return (
    <div className="space-y-16 py-4">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Interactive Learning Platform for Pearson BTEC Students</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Master Algorithmic Thinking in{' '}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              PseudoCode Lab
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Designed specifically for UK vocational computing learners (aged 16+). Practise structured pseudocode, desk check algorithms with interactive trace tables, and build assessment confidence through transparent rules-based adaptive progression.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('practice')}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition transform"
            >
              Start Practising Now
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenDiagnostic}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-teal-200 border border-teal-500/30 font-semibold text-sm transition"
            >
              <Compass className="w-4 h-4 text-teal-400" />
              Take 2-Min Diagnostic Quiz
            </button>
          </div>

          {/* Quick stats banner */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-400 block">Initial Difficulty</span>
              <span className="font-bold text-teal-300 text-sm">
                Level {currentLevel}: {currentLevel === 1 ? 'Beginner' : currentLevel === 2 ? 'Intermediate' : 'Advanced'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Assessment Alignment</span>
              <span className="font-bold text-white text-sm">Pearson BTEC UK</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 block">Adaptive Engine</span>
              <span className="font-bold text-emerald-400 text-sm">Rules-Based & Transparent</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Modules Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Platform Features & Learning Modules
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything required to progress from fundamental I/O to multi-step exam algorithms.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Learn Pseudocode */}
          <div 
            onClick={() => onNavigate('learn')}
            className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                Learn Pseudocode
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear reference guides covering assignment, relational operators, nested selection, indefinite iteration, and array operations.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-600">
              <span>Explore Reference Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: Practice by Topic */}
          <div 
            onClick={() => onNavigate('practice')}
            className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-400 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-105 transition">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition">
                Practice by Topic
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                5 distinct exercise formats: Multiple Choice, Complete the Code, Find the Mistake, Instruction Sequencing, and Scenarios.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-teal-600">
              <span>Start Exercises</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: Trace Tables */}
          <div 
            onClick={() => onNavigate('trace')}
            className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-400 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition">
                <Table className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition">
                Trace Tables & Desk Checks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step interactive variable tracking simulator to test algorithms and verify termination bounds without running real code.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-purple-600">
              <span>Open Trace Simulator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Difficulty Level Pathways */}
      <section className="bg-slate-100 rounded-3xl p-8 border border-slate-200 space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
            Adaptive Learning Progression
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Three Progressive Difficulty Tiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Our transparent rules adjust automatically: 3 correct answers prompt you to advance; 2 mistakes trigger targeted revision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs space-y-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Level 1 — Beginner
            </span>
            <h4 className="font-bold text-slate-800 text-sm">Core Foundations</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li>Understanding pseudocode rules</li>
              <li>Variables and identifiers</li>
              <li>Input and Output operations</li>
              <li>Arithmetic and assignment</li>
              <li>Simple condition comparisons</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-xs space-y-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Level 2 — Intermediate
            </span>
            <h4 className="font-bold text-slate-800 text-sm">Control Flow & Structures</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li>IF / ELSE and nested decisions</li>
              <li>Definite iteration (FOR loops)</li>
              <li>Indefinite iteration (WHILE loops)</li>
              <li>Counters and running accumulators</li>
              <li>Desk checking with trace tables</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-xs space-y-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
              Level 3 — Advanced
            </span>
            <h4 className="font-bold text-slate-800 text-sm">Exam-Style Scenarios</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li>Combining complex loops and conditions</li>
              <li>1D array traversals and search</li>
              <li>Boundary condition validation</li>
              <li>Time efficiency and best/worst cases</li>
              <li>Full scenario-based problem solving</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Dashboards Preview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Student Progress Box */}
        <div 
          onClick={() => onNavigate('student-progress')}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Student Progress Analytics
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track question attempts, accuracy percentage, mastery by topic, and pinpoint weak areas requiring targeted revision.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-700">
            <span>View My Progress Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Teacher Dashboard Box */}
        <div 
          onClick={() => onNavigate('teacher-dashboard')}
          className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-6 sm:p-8 border border-teal-200 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Teacher & Lecturer Portal
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fictional cohort performance analytics, common student misconceptions, suggested revision lessons, and a live Question Bank inspector.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-teal-700">
            <span>Enter Teacher Portal</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </section>

    </div>
  );
};
