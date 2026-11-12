import React, { useState } from 'react';
import { Table, Play, RotateCcw, StepForward, CheckCircle2, Info } from 'lucide-react';

interface TraceStep {
  line: number;
  instruction: string;
  variables: Record<string, string | number>;
  output?: string;
  explanation: string;
}

interface TraceAlgorithm {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  code: string;
  variableNames: string[];
  steps: TraceStep[];
}

const SAMPLE_ALGORITHMS: TraceAlgorithm[] = [
  {
    id: 'trace_1',
    title: 'Counter & Accumulator Loop Trace',
    difficulty: 'Intermediate',
    code: `1: SET total = 0
2: FOR count = 1 TO 3
3:   SET total = total + (count * 2)
4: NEXT count
5: OUTPUT "Final total: ", total`,
    variableNames: ['count', 'total', 'OUTPUT'],
    steps: [
      {
        line: 1,
        instruction: 'SET total = 0',
        variables: { count: '-', total: 0, OUTPUT: '-' },
        explanation: 'Initialise the accumulator variable total to 0.'
      },
      {
        line: 2,
        instruction: 'FOR count = 1 TO 3 (Iteration 1)',
        variables: { count: 1, total: 0, OUTPUT: '-' },
        explanation: 'Loop begins. count is initialised to 1.'
      },
      {
        line: 3,
        instruction: 'SET total = total + (1 * 2)',
        variables: { count: 1, total: 2, OUTPUT: '-' },
        explanation: 'total becomes 0 + 2 = 2.'
      },
      {
        line: 2,
        instruction: 'FOR count = 2 TO 3 (Iteration 2)',
        variables: { count: 2, total: 2, OUTPUT: '-' },
        explanation: 'Loop counter increments to 2.'
      },
      {
        line: 3,
        instruction: 'SET total = total + (2 * 2)',
        variables: { count: 2, total: 6, OUTPUT: '-' },
        explanation: 'total becomes 2 + 4 = 6.'
      },
      {
        line: 2,
        instruction: 'FOR count = 3 TO 3 (Iteration 3)',
        variables: { count: 3, total: 6, OUTPUT: '-' },
        explanation: 'Final iteration. count is 3.'
      },
      {
        line: 3,
        instruction: 'SET total = total + (3 * 2)',
        variables: { count: 3, total: 12, OUTPUT: '-' },
        explanation: 'total becomes 6 + 6 = 12.'
      },
      {
        line: 5,
        instruction: 'OUTPUT "Final total: ", total',
        variables: { count: 3, total: 12, OUTPUT: 'Final total: 12' },
        explanation: 'Loop terminates because upper bound 3 was completed. Output message is displayed.'
      }
    ]
  },
  {
    id: 'trace_2',
    title: 'WHILE Loop with Sentinel Condition',
    difficulty: 'Intermediate',
    code: `1: SET n = 16
2: SET steps = 0
3: WHILE n > 2 DO
4:   SET n = n / 2
5:   SET steps = steps + 1
6: ENDWHILE
7: OUTPUT steps`,
    variableNames: ['n', 'steps', 'OUTPUT'],
    steps: [
      {
        line: 1,
        instruction: 'SET n = 16',
        variables: { n: 16, steps: '-', OUTPUT: '-' },
        explanation: 'Variable n is set to 16.'
      },
      {
        line: 2,
        instruction: 'SET steps = 0',
        variables: { n: 16, steps: 0, OUTPUT: '-' },
        explanation: 'Counter steps is initialised to 0.'
      },
      {
        line: 3,
        instruction: 'WHILE n > 2 (16 > 2 is TRUE)',
        variables: { n: 16, steps: 0, OUTPUT: '-' },
        explanation: 'Condition 16 > 2 is TRUE, so we enter the loop.'
      },
      {
        line: 4,
        instruction: 'SET n = n / 2',
        variables: { n: 8, steps: 0, OUTPUT: '-' },
        explanation: 'n is divided by 2: 16 / 2 = 8.'
      },
      {
        line: 5,
        instruction: 'SET steps = steps + 1',
        variables: { n: 8, steps: 1, OUTPUT: '-' },
        explanation: 'steps increments to 1.'
      },
      {
        line: 3,
        instruction: 'WHILE n > 2 (8 > 2 is TRUE)',
        variables: { n: 8, steps: 1, OUTPUT: '-' },
        explanation: 'Condition 8 > 2 is TRUE, re-enter loop.'
      },
      {
        line: 4,
        instruction: 'SET n = n / 2',
        variables: { n: 4, steps: 1, OUTPUT: '-' },
        explanation: 'n becomes 4.'
      },
      {
        line: 5,
        instruction: 'SET steps = steps + 1',
        variables: { n: 4, steps: 2, OUTPUT: '-' },
        explanation: 'steps increments to 2.'
      },
      {
        line: 3,
        instruction: 'WHILE n > 2 (4 > 2 is TRUE)',
        variables: { n: 4, steps: 2, OUTPUT: '-' },
        explanation: 'Condition 4 > 2 is TRUE, re-enter loop.'
      },
      {
        line: 4,
        instruction: 'SET n = n / 2',
        variables: { n: 2, steps: 2, OUTPUT: '-' },
        explanation: 'n becomes 2.'
      },
      {
        line: 5,
        instruction: 'SET steps = steps + 1',
        variables: { n: 2, steps: 3, OUTPUT: '-' },
        explanation: 'steps increments to 3.'
      },
      {
        line: 3,
        instruction: 'WHILE n > 2 (2 > 2 is FALSE)',
        variables: { n: 2, steps: 3, OUTPUT: '-' },
        explanation: 'Condition 2 > 2 is FALSE! Loop terminates.'
      },
      {
        line: 7,
        instruction: 'OUTPUT steps',
        variables: { n: 2, steps: 3, OUTPUT: '3' },
        explanation: 'Final output: 3.'
      }
    ]
  }
];

export const TraceTableVisualizer: React.FC = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>(SAMPLE_ALGORITHMS[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const algo = SAMPLE_ALGORITHMS.find(a => a.id === selectedAlgoId) || SAMPLE_ALGORITHMS[0];
  const currentStep = algo.steps[currentStepIndex];

  const handleStepForward = () => {
    if (currentStepIndex < algo.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Header and selector */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <Table className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-800">
              Interactive Trace Table Visualizer
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            A core exam skill for Pearson BTEC Unit 1. Step through algorithm executions and see variable states change line-by-line.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-500 font-medium whitespace-nowrap">Choose Algorithm:</label>
          <select
            value={selectedAlgoId}
            onChange={(e) => {
              setSelectedAlgoId(e.target.value);
              setCurrentStepIndex(0);
            }}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SAMPLE_ALGORITHMS.map(a => (
              <option key={a.id} value={a.id}>
                {a.title} ({a.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Code with Active Line Highlight */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-lg flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Pseudocode Algorithm
            </span>
            <span className="text-[11px] text-slate-400">
              Current Line: {currentStep ? currentStep.line : 1}
            </span>
          </div>

          <div className="space-y-1 font-mono text-xs leading-6 flex-1">
            {algo.code.split('\n').map((codeLine, idx) => {
              const lineNum = idx + 1;
              const isActive = currentStep && currentStep.line === lineNum;
              return (
                <div
                  key={idx}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center ${
                    isActive
                      ? 'bg-blue-600/30 text-teal-200 border border-blue-500/50 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <span className="w-6 text-slate-600 select-none text-right mr-3">{lineNum}</span>
                  <span className="flex-1 whitespace-pre">{codeLine.replace(/^\d+:\s*/, '')}</span>
                  {isActive && (
                    <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded ml-2">
                      Executing
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Stepper Controls */}
          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-2 rounded-xl border border-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                Step {currentStepIndex + 1} of {algo.steps.length}
              </span>
              <button
                disabled={currentStepIndex >= algo.steps.length - 1}
                onClick={handleStepForward}
                className="flex items-center gap-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl transition shadow-md shadow-teal-600/20"
              >
                Next Step
                <StepForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Trace Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">
                Desk Check Trace Table (Exam Style)
              </h3>
              <span className="text-xs text-slate-500">
                Variables recorded per state change
              </span>
            </div>

            {/* Trace Table HTML */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs mb-4">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Step</th>
                    <th className="py-2.5 px-3">Line #</th>
                    {algo.variableNames.map((name) => (
                      <th key={name} className="py-2.5 px-3 font-mono">
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {algo.steps.slice(0, currentStepIndex + 1).map((step, idx) => {
                    const isLatest = idx === currentStepIndex;
                    return (
                      <tr
                        key={idx}
                        className={`transition ${
                          isLatest ? 'bg-teal-50/80 font-bold text-teal-900' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2 px-3 text-slate-400 text-[11px]">{idx + 1}</td>
                        <td className="py-2 px-3 text-blue-600 font-semibold">L{step.line}</td>
                        {algo.variableNames.map((name) => (
                          <td key={name} className="py-2 px-3">
                            {step.variables[name] !== undefined ? String(step.variables[name]) : '-'}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Step Explanation Banner */}
            {currentStep && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>Execution Analysis:</span>
                </div>
                <p className="text-slate-600 leading-relaxed pl-6">
                  {currentStep.explanation}
                </p>
              </div>
            )}
          </div>

          {currentStepIndex >= algo.steps.length - 1 && (
            <div className="mt-4 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Trace Complete!</strong> All loop iterations and final outputs have been desk checked.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
