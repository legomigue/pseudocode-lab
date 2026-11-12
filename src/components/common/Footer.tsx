import React from 'react';
import { Code2, Heart, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Code2 className="w-5 h-5" />
              </div>
              PseudoCode Lab
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A modern, adaptive educational platform designed for UK Software Development and Computer Science students (aged 16+). Built to enhance algorithmic thinking, structure trace tables, and build confidence before Pearson BTEC assessments.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white cursor-pointer">Interactive Pseudocode Editor</span></li>
              <li><span className="hover:text-white cursor-pointer">Adaptive Level Progression</span></li>
              <li><span className="hover:text-white cursor-pointer">Desk Checking & Trace Tables</span></li>
              <li><span className="hover:text-white cursor-pointer">Teacher Analytics Portal</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Educational Standards
            </h4>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldAlert className="w-4 h-4" />
                Pearson BTEC Notice
              </div>
              <p className="text-[11px] text-slate-400">
                Specification pending verification. Exercise conventions follow general UK computing baseline.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PseudoCode Lab. Developed for UK Vocational & BTEC Computing Education.</p>
          <div className="flex items-center gap-1">
            <span>Built with React, Vite & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
