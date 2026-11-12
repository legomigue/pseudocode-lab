import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Repeat, 
  GitBranch, 
  Layers, 
  Hash, 
  AlertCircle, 
  Search, 
  FileCode,
  ShieldCheck
} from 'lucide-react';
import { BASELINE_KEYWORDS, CONVENTION_NOTICE } from '../data/conventions';

export const LearnPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredKeywords = BASELINE_KEYWORDS.filter(k => {
    const matchesSearch = k.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          k.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || k.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Curriculum Reference Guide</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Learn Pseudocode & Algorithmic Conventions
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Pseudocode is an informal, language-independent way of writing algorithms using structured English and mathematical notation. This guide outlines standard UK vocational computing constructs used in PseudoCode Lab.
        </p>
      </div>

      {/* Pearson Notice Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 shadow-xs flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 text-xs text-amber-950">
          <h3 className="font-bold text-sm text-amber-900">
            {CONVENTION_NOTICE.title} ({CONVENTION_NOTICE.status})
          </h3>
          <p className="leading-relaxed text-amber-900/90">
            {CONVENTION_NOTICE.summary}
          </p>
          <p className="text-[11px] text-amber-800 italic pt-1 border-t border-amber-200">
            {CONVENTION_NOTICE.guidance}
          </p>
        </div>
      </div>

      {/* Core Constructs Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Core Algorithmic Constructs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <Terminal className="w-4 h-4" />
              1. Sequence & Variables
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Algorithms execute sequentially from top to bottom unless redirected by selection or loops. Variables must use descriptive camelCase or snake_case names.
            </p>
            <pre className="bg-slate-900 text-teal-300 p-2.5 rounded-xl font-mono text-[11px]">
{`INPUT radius
SET area = 3.14159 * (radius * radius)
OUTPUT "Circle Area: ", area`}
            </pre>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
              <GitBranch className="w-4 h-4" />
              2. Selection (Decisions)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enables branching based on boolean truth values. Always balance <code className="font-mono text-teal-700 bg-teal-50 px-1 rounded">IF</code> with <code className="font-mono text-teal-700 bg-teal-50 px-1 rounded">THEN</code> and terminate with <code className="font-mono text-teal-700 bg-teal-50 px-1 rounded">ENDIF</code>.
            </p>
            <pre className="bg-slate-900 text-teal-300 p-2.5 rounded-xl font-mono text-[11px]">
{`IF score >= 70 THEN
  OUTPUT "Distinction"
ELSE IF score >= 50 THEN
  OUTPUT "Pass"
ELSE
  OUTPUT "Referral"
ENDIF`}
            </pre>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
              <Repeat className="w-4 h-4" />
              3. Iteration (Loops)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use <strong>FOR</strong> when the number of repetitions is known in advance (definite); use <strong>WHILE</strong> when waiting for a condition or sentinel (indefinite).
            </p>
            <pre className="bg-slate-900 text-teal-300 p-2.5 rounded-xl font-mono text-[11px]">
{`SET total = 0
FOR i = 1 TO 10
  SET total = total + i
NEXT i
OUTPUT total`}
            </pre>
          </div>

        </div>
      </div>

      {/* Keywords Directory with Filter and Search */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Keyword Reference Cheat Sheet
            </h2>
            <p className="text-xs text-slate-500">
              Configured keywords checked by the editor and validation system.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {['all', 'io', 'control', 'loop', 'data', 'operator'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl font-medium capitalize transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'io' ? 'I/O Operations' : cat}
            </button>
          ))}
        </div>

        {/* Table of Keywords */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="py-3 px-4">Keyword</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Standard Purpose</th>
                  <th className="py-3 px-4">Example Syntax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredKeywords.map((kw) => (
                  <tr key={kw.keyword} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-mono font-bold text-blue-700 text-sm">
                      {kw.keyword}
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {kw.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 leading-relaxed max-w-md">
                      {kw.description}
                    </td>
                    <td className="py-3 px-4 font-mono text-teal-700 bg-slate-50/50">
                      {kw.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
