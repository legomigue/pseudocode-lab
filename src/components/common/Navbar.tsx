import React, { useState } from 'react';
import { 
  Code2, 
  BookOpen, 
  CheckCircle2, 
  Trophy, 
  User, 
  GraduationCap, 
  Menu, 
  X, 
  AlertCircle,
  Table
} from 'lucide-react';
import { DifficultyLevel } from '../../types/questions';
import { DifficultyBadge } from './Badge';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLevel: DifficultyLevel;
  setLevel: (level: DifficultyLevel) => void;
  onOpenDiagnostic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLevel,
  setLevel,
  onOpenDiagnostic
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Code2 },
    { id: 'learn', label: 'Learn Pseudocode', icon: BookOpen },
    { id: 'practice', label: 'Practice Topics', icon: CheckCircle2 },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'trace', label: 'Trace Tables', icon: Table },
    { id: 'student-progress', label: 'My Progress', icon: User },
    { id: 'teacher-dashboard', label: 'Teacher Dashboard', icon: GraduationCap }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Pearson BTEC Notice Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-slate-100 text-xs py-2 px-4 border-b border-blue-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
              Pearson BTEC Baseline Mode
            </span>
            <span className="hidden sm:inline text-slate-200">
              Configured for UK Computing qualifications. Demonstration questions active.
            </span>
          </div>
          <button
            onClick={() => setShowSpecModal(true)}
            className="text-teal-300 hover:text-teal-200 underline flex items-center gap-1 font-medium text-xs transition"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Pearson Specification Status & Rules
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition transform">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
                  PseudoCode Lab
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                  Adaptive Learning Platform
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Level Selector & Diagnostic Pill */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 border border-slate-200">
                <span className="text-xs text-slate-500 pl-2 font-medium">Difficulty:</span>
                <select
                  value={currentLevel}
                  onChange={(e) => setLevel(Number(e.target.value) as DifficultyLevel)}
                  aria-label="Select difficulty level"
                  className="text-xs bg-white text-slate-700 font-medium py-1 px-2 rounded border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  <option value={1}>L1: Beginner</option>
                  <option value={2}>L2: Intermediate</option>
                  <option value={3}>L3: Advanced</option>
                </select>
              </div>

              <button
                onClick={onOpenDiagnostic}
                className="text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 font-semibold px-3 py-1.5 rounded-lg transition"
              >
                Diagnostic Test
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Current Level:</span>
              <DifficultyBadge level={currentLevel} />
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5 text-slate-500" />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenDiagnostic();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center text-sm bg-teal-600 text-white font-medium py-2 rounded-lg"
              >
                Take Diagnostic Assessment
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Pearson Specification Modal */}
      {showSpecModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Pearson BTEC Specification Notice
                  </h3>
                  <p className="text-xs text-slate-500">
                    Curriculum Alignment & Rule Validation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSpecModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <p className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 text-xs leading-relaxed">
                <strong>Attention Lecturer:</strong> PseudoCode Lab is specifically designed not to invent or assume non-standard rules. Current questions use a baseline standard UK Computing pseudocode vocabulary (e.g., <code className="bg-amber-100/60 px-1 py-0.5 rounded font-mono">INPUT</code>, <code className="bg-amber-100/60 px-1 py-0.5 rounded font-mono">OUTPUT</code>, <code className="bg-amber-100/60 px-1 py-0.5 rounded font-mono">IF..THEN..ELSE..ENDIF</code>, <code className="bg-amber-100/60 px-1 py-0.5 rounded font-mono">FOR..TO..NEXT</code>).
              </p>

              <div className="border border-slate-200 rounded-xl p-3 space-y-2">
                <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">
                  How Pearson Rules Are Handled:
                </h4>
                <ul className="list-disc pl-5 text-xs space-y-1 text-slate-600">
                  <li>Questions are explicitly tagged as <strong>Generic Demonstration</strong> until verified.</li>
                  <li>When you provide your course's official specification or Sample Assessment Materials (SAMs), the platform's syntax highlighter and structured validator lock to Pearson's exact command names.</li>
                  <li>You can add custom Pearson exam questions directly via the Teacher Dashboard.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSpecModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
