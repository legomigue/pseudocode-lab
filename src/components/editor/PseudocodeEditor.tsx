import React, { useState, useRef, useEffect } from 'react';
import { 
  RotateCcw, 
  Trash2, 
  Send, 
  HelpCircle, 
  Eye, 
  Copy, 
  Check, 
  FileCode2,
  Info
} from 'lucide-react';
import { BASELINE_KEYWORDS } from '../../data/conventions';

interface PseudocodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  modelSolution?: string;
  allowModelSolution?: boolean;
  minLines?: number;
  readOnly?: boolean;
}

export const PseudocodeEditor: React.FC<PseudocodeEditorProps> = ({
  value,
  onChange,
  onSubmit,
  onReset,
  modelSolution,
  allowModelSolution = false,
  minLines = 10,
  readOnly = false
}) => {
  const [showModelSolution, setShowModelSolution] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Calculate line numbers
  const lines = value.split('\n');
  const lineCount = Math.max(lines.length, minLines);

  // Handle Tab and Enter indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);

      onChange(newValue);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    } else if (e.key === 'Enter') {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const lineBeforeCursor = value.substring(0, start).split('\n').pop() || '';
      const matchIndent = lineBeforeCursor.match(/^\s+/);
      const indent = matchIndent ? matchIndent[0] : '';

      // Check if current line starts a block that warrants extra indent (e.g. IF, WHILE, FOR)
      const trimmed = lineBeforeCursor.trim().toUpperCase();
      const addsIndent = 
        trimmed.startsWith('IF ') || 
        trimmed.startsWith('WHILE ') || 
        trimmed.startsWith('FOR ') || 
        trimmed.endsWith('THEN') || 
        trimmed.endsWith('DO');

      const extraIndent = addsIndent ? '  ' : '';

      if (indent.length > 0 || extraIndent.length > 0) {
        e.preventDefault();
        const insertion = '\n' + indent + extraIndent;
        const newValue = value.substring(0, start) + insertion + value.substring(start);
        onChange(newValue);

        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + insertion.length;
          }
        }, 0);
      }
    }
  };

  const handleCopyModel = () => {
    if (modelSolution) {
      navigator.clipboard.writeText(modelSolution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl flex flex-col font-mono text-sm">
      {/* Editor Header Bar */}
      <div className="bg-slate-800/90 px-4 py-2.5 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <FileCode2 className="w-4 h-4 text-teal-400" />
          <span className="text-slate-300 font-semibold text-xs tracking-wide">
            algorithm.pseudo
          </span>
          <span className="hidden sm:inline text-[11px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            Auto-Indent: ON (2 spaces)
          </span>
        </div>

        {/* Editor Controls */}
        <div className="flex items-center gap-2">
          {modelSolution && (
            <button
              onClick={() => setShowModelSolution(!showModelSolution)}
              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition ${
                showModelSolution 
                  ? 'bg-teal-900/60 text-teal-300 border-teal-500' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {showModelSolution ? 'Hide Model Solution' : 'View Model Solution'}
            </button>
          )}

          <button
            onClick={onReset}
            title="Reset to starter code"
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          <button
            onClick={() => onChange('')}
            title="Clear all code"
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 border border-slate-700 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex relative min-h-[280px] max-h-[500px] overflow-auto bg-slate-950">
        {/* Line Numbers */}
        <div 
          aria-hidden="true"
          className="select-none py-3 px-3 text-right bg-slate-900 text-slate-600 border-r border-slate-800 w-12 flex-shrink-0 text-xs font-mono"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editable Text Area */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck={false}
          placeholder="// Type your pseudocode here...
// Keywords like INPUT, OUTPUT, SET, IF, WHILE, FOR will be checked."
          className="w-full h-full min-h-[280px] p-3 bg-transparent text-slate-100 font-mono text-sm leading-6 resize-none outline-none focus:ring-0 border-none selection:bg-blue-600/40"
        />
      </div>

      {/* Model Solution Sliding Modal */}
      {showModelSolution && modelSolution && (
        <div className="bg-slate-900 border-t border-teal-500/40 p-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              <span className="text-teal-400 font-semibold text-xs uppercase tracking-wider">
                Exemplar Model Solution
              </span>
            </div>
            <button
              onClick={handleCopyModel}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-2 py-1 rounded border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-teal-200 text-xs font-mono leading-5 overflow-x-auto whitespace-pre">
            {modelSolution}
          </pre>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
            <span>Note: Equivalent naming or alternative conditional branches may also receive marks.</span>
          </div>
        </div>
      )}

      {/* Editor Footer Bar */}
      <div className="bg-slate-850 px-4 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span>{lines.length} lines</span>
          <span>•</span>
          <span>{value.length} characters</span>
        </div>

        <button
          onClick={onSubmit}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-semibold text-sm px-5 py-2 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition transform"
        >
          <Send className="w-4 h-4" />
          Submit Answer
        </button>
      </div>
    </div>
  );
};
