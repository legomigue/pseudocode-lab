import { StudentProfile, AttemptRecord } from '../types/student';
import { DifficultyLevel, Question, TopicId } from '../types/questions';
import { INITIAL_QUESTIONS, TOPICS } from '../data/questions';

const PROFILE_KEY = 'pseudocode_lab_student_profile';
const QUESTIONS_KEY = 'pseudocode_lab_custom_questions';

const defaultTopicStats = (): Record<TopicId, { attempted: number; correct: number; consecutiveCorrect: number; consecutiveIncorrect: number; masteryPercentage: number }> => {
  const stats: any = {};
  TOPICS.forEach(topic => {
    stats[topic.id] = {
      attempted: 0,
      correct: 0,
      consecutiveCorrect: 0,
      consecutiveIncorrect: 0,
      masteryPercentage: 0
    };
  });
  return stats;
};

export const defaultStudentProfile: StudentProfile = {
  studentId: 'std_demo_01',
  name: 'Alex Morgan',
  currentLevel: 1,
  diagnosticCompleted: false,
  overallConsecutiveCorrect: 0,
  overallConsecutiveIncorrect: 0,
  topicStats: defaultTopicStats(),
  history: [],
  createdAt: Date.now(),
  lastActive: Date.now()
};

export const storageService = {
  // Student Profile Storage
  getStudentProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse student profile from localStorage', e);
    }
    return defaultStudentProfile;
  },

  saveStudentProfile(profile: StudentProfile): void {
    try {
      profile.lastActive = Date.now();
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save student profile to localStorage', e);
    }
  },

  recordAttempt(record: AttemptRecord): StudentProfile {
    const profile = this.getStudentProfile();
    
    // Add to history
    profile.history.unshift(record);

    // Update topic stats
    const topicStat = profile.topicStats[record.topic] || {
      attempted: 0,
      correct: 0,
      consecutiveCorrect: 0,
      consecutiveIncorrect: 0,
      masteryPercentage: 0
    };

    topicStat.attempted += 1;
    if (record.isCorrect) {
      topicStat.correct += 1;
      topicStat.consecutiveCorrect += 1;
      topicStat.consecutiveIncorrect = 0;
      profile.overallConsecutiveCorrect += 1;
      profile.overallConsecutiveIncorrect = 0;
    } else {
      topicStat.consecutiveIncorrect += 1;
      topicStat.consecutiveCorrect = 0;
      profile.overallConsecutiveIncorrect += 1;
      profile.overallConsecutiveCorrect = 0;
    }

    topicStat.masteryPercentage = Math.round((topicStat.correct / topicStat.attempted) * 100);
    profile.topicStats[record.topic] = topicStat;

    this.saveStudentProfile(profile);
    return profile;
  },

  setStudentLevel(level: DifficultyLevel): StudentProfile {
    const profile = this.getStudentProfile();
    profile.currentLevel = level;
    this.saveStudentProfile(profile);
    return profile;
  },

  resetStudentProgress(): StudentProfile {
    const fresh = { ...defaultStudentProfile, createdAt: Date.now(), lastActive: Date.now() };
    this.saveStudentProfile(fresh);
    return fresh;
  },

  // Question Bank
  getAllQuestions(): Question[] {
    try {
      const custom = localStorage.getItem(QUESTIONS_KEY);
      if (custom) {
        const parsed: Question[] = JSON.parse(custom);
        return [...INITIAL_QUESTIONS, ...parsed];
      }
    } catch (e) {
      console.error('Failed to read questions from localStorage', e);
    }
    return INITIAL_QUESTIONS;
  },

  addCustomQuestion(question: Question): void {
    try {
      const existing = localStorage.getItem(QUESTIONS_KEY);
      const parsed: Question[] = existing ? JSON.parse(existing) : [];
      parsed.push(question);
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(parsed));
    } catch (e) {
      console.error('Failed to save custom question', e);
    }
  }
};
