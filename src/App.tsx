import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { PracticePage } from './pages/PracticePage';
import { ChallengesPage } from './pages/ChallengesPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { TraceTableVisualizer } from './components/trace/TraceTableVisualizer';
import { DiagnosticModal } from './components/adaptive/DiagnosticModal';
import { useAdaptiveLearning } from './hooks/useAdaptiveLearning';
import { storageService } from './services/storageService';
import { Question } from './types/questions';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [questions, setQuestions] = useState<Question[]>(() => storageService.getAllQuestions());
  const [diagnosticOpen, setDiagnosticOpen] = useState<boolean>(false);

  // Initialize Adaptive Learning Engine
  const adaptive = useAdaptiveLearning(questions);

  const handleAddQuestion = (newQuestion: Question) => {
    setQuestions(prev => [newQuestion, ...prev]);
  };

  const handleDiagnosticComplete = (recommendedLevel: 1 | 2 | 3) => {
    adaptive.setLevel(recommendedLevel);
    // Mark diagnostic completed in profile
    const profile = storageService.getStudentProfile();
    profile.diagnosticCompleted = true;
    storageService.saveStudentProfile(profile);
    setActiveTab('practice');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLevel={adaptive.currentLevel}
        setLevel={adaptive.setLevel}
        onOpenDiagnostic={() => setDiagnosticOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={setActiveTab}
            onOpenDiagnostic={() => setDiagnosticOpen(true)}
            currentLevel={adaptive.currentLevel}
          />
        )}

        {activeTab === 'learn' && (
          <LearnPage />
        )}

        {activeTab === 'practice' && (
          <PracticePage
            questions={questions}
            adaptive={adaptive}
          />
        )}

        {activeTab === 'challenges' && (
          <ChallengesPage
            questions={questions}
            adaptive={adaptive}
          />
        )}

        {activeTab === 'trace' && (
          <div className="py-2 max-w-5xl mx-auto">
            <TraceTableVisualizer />
          </div>
        )}

        {activeTab === 'student-progress' && (
          <StudentDashboard
            profile={adaptive.profile}
            onResetProgress={adaptive.resetProgress}
            onNavigateToTopic={(topicId) => {
              adaptive.setSelectedTopic(topicId as any);
              setActiveTab('practice');
            }}
          />
        )}

        {activeTab === 'teacher-dashboard' && (
          <TeacherDashboard
            questions={questions}
            onAddQuestion={handleAddQuestion}
          />
        )}
      </main>

      {/* Global Diagnostic Assessment Modal */}
      <DiagnosticModal
        isOpen={diagnosticOpen}
        onClose={() => setDiagnosticOpen(false)}
        onComplete={handleDiagnosticComplete}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
