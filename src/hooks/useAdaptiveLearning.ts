import { useState, useEffect, useCallback } from 'react';
import { DifficultyLevel, Question, TopicId } from '../types/questions';
import { StudentProfile, AttemptRecord } from '../types/student';
import { storageService } from '../services/storageService';

export interface AdaptiveEngineState {
  profile: StudentProfile;
  currentLevel: DifficultyLevel;
  selectedTopic: TopicId | 'all';
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  levelUpPrompt: boolean;
  remedialSupportPrompt: boolean;
  recommendedQuestionId?: string;
  setLevel: (level: DifficultyLevel) => void;
  setSelectedTopic: (topic: TopicId | 'all') => void;
  recordAnswer: (record: Omit<AttemptRecord, 'id' | 'timestamp'>) => void;
  dismissLevelUpPrompt: () => void;
  dismissSupportPrompt: () => void;
  applyLevelUp: () => void;
  applySimplerLevel: () => void;
  resetProgress: () => void;
}

export function useAdaptiveLearning(allQuestions: Question[]): AdaptiveEngineState {
  const [profile, setProfile] = useState<StudentProfile>(() => storageService.getStudentProfile());
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(profile.currentLevel);
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>('all');
  const [levelUpPrompt, setLevelUpPrompt] = useState(false);
  const [remedialSupportPrompt, setRemedialSupportPrompt] = useState(false);

  // Sync profile when currentLevel changes
  const setLevel = useCallback((level: DifficultyLevel) => {
    setCurrentLevel(level);
    const updated = storageService.setStudentLevel(level);
    setProfile(updated);
    setLevelUpPrompt(false);
    setRemedialSupportPrompt(false);
  }, []);

  const recordAnswer = useCallback(
    (attemptData: Omit<AttemptRecord, 'id' | 'timestamp'>) => {
      const fullRecord: AttemptRecord = {
        ...attemptData,
        id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        timestamp: Date.now()
      };

      const updatedProfile = storageService.recordAttempt(fullRecord);
      setProfile(updatedProfile);

      // Check transparent adaptive rules
      if (fullRecord.isCorrect) {
        // 3 consecutive correct -> level up trigger if not at max level
        if (updatedProfile.overallConsecutiveCorrect >= 3 && currentLevel < 3) {
          setLevelUpPrompt(true);
        }
        setRemedialSupportPrompt(false);
      } else {
        // 2 consecutive incorrect -> remedial support trigger
        if (updatedProfile.overallConsecutiveIncorrect >= 2) {
          setRemedialSupportPrompt(true);
        }
        setLevelUpPrompt(false);
      }
    },
    [currentLevel]
  );

  const applyLevelUp = useCallback(() => {
    if (currentLevel < 3) {
      const nextLevel = (currentLevel + 1) as DifficultyLevel;
      setLevel(nextLevel);
    }
    setLevelUpPrompt(false);
  }, [currentLevel, setLevel]);

  const applySimplerLevel = useCallback(() => {
    if (currentLevel > 1) {
      const prevLevel = (currentLevel - 1) as DifficultyLevel;
      setLevel(prevLevel);
    }
    setRemedialSupportPrompt(false);
  }, [currentLevel, setLevel]);

  const dismissLevelUpPrompt = useCallback(() => {
    setLevelUpPrompt(false);
  }, []);

  const dismissSupportPrompt = useCallback(() => {
    setRemedialSupportPrompt(false);
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = storageService.resetStudentProgress();
    setProfile(fresh);
    setCurrentLevel(1);
    setLevelUpPrompt(false);
    setRemedialSupportPrompt(false);
  }, []);

  return {
    profile,
    currentLevel,
    selectedTopic,
    consecutiveCorrect: profile.overallConsecutiveCorrect,
    consecutiveIncorrect: profile.overallConsecutiveIncorrect,
    levelUpPrompt,
    remedialSupportPrompt,
    setLevel,
    setSelectedTopic,
    recordAnswer,
    dismissLevelUpPrompt,
    dismissSupportPrompt,
    applyLevelUp,
    applySimplerLevel,
    resetProgress
  };
}
