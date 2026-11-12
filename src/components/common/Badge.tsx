import React from 'react';
import { DifficultyLevel, ConventionStatus } from '../../types/questions';

export const DifficultyBadge: React.FC<{ level: DifficultyLevel; size?: 'sm' | 'md' }> = ({
  level,
  size = 'md'
}) => {
  const configs = {
    1: { label: 'Level 1: Beginner', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    2: { label: 'Level 2: Intermediate', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
    3: { label: 'Level 3: Advanced', bg: 'bg-purple-50 text-purple-700 border-purple-200' }
  };

  const current = configs[level] || configs[1];
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${current.bg} ${sizeClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
      {current.label}
    </span>
  );
};

export const ConventionBadge: React.FC<{ status: ConventionStatus }> = ({ status }) => {
  if (status === 'pearson_verified') {
    return (
      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
        <svg className="w-3.5 h-3.5 mr-1 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
        Pearson BTEC Verified
      </span>
    );
  }

  return (
    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
      <span className="w-2 h-2 rounded-full mr-1.5 bg-amber-500 animate-pulse"></span>
      Generic Demonstration Mode
    </span>
  );
};
