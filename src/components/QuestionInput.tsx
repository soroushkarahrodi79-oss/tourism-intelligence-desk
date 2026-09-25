import React, { useState } from 'react';
import { TerritoryCase } from '../types';
import { ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';

interface QuestionInputProps {
  territory: TerritoryCase;
  activeQuestion: string;
  onAskQuestion: (question: string) => void;
  isLoading: boolean;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  territory,
  activeQuestion,
  onAskQuestion,
  isLoading
}) => {
  const [customInput, setCustomInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onAskQuestion(customInput.trim());
    }
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 sm:p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
            Analytical Question Input
          </span>
          <span className="text-zinc-600">·</span>
          <span className="text-xs text-zinc-400 font-normal">Evidence-First Decision Query</span>
        </div>

        {/* Scientific Rule Safeguards Badge */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-Causality Guard Active</span>
          </span>
        </div>
      </div>

      {/* Curated Questions Selector */}
      <div className="mb-4">
        <div className="text-xs text-zinc-400 mb-2 font-medium">Curated Analytical Inquiries:</div>
        <div className="flex flex-wrap gap-2">
          {territory.sampleQuestions.map((q, idx) => {
            const isSelected = activeQuestion.trim().toLowerCase() === q.trim().toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => onAskQuestion(q)}
                className={`text-left text-xs px-3 py-1.5 rounded border transition-all ${
                  isSelected
                    ? 'bg-zinc-800 border-zinc-500 text-zinc-100 font-medium'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100'
                }`}
              >
                <span>{q}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Question Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={`Ask an analytical question for ${territory.shortName} (e.g. "NDVI decreased 18%. Are tourists damaging the park?")...`}
            className="w-full bg-zinc-950 border border-zinc-700 rounded pl-3.5 pr-28 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-sans"
          />
          <button
            type="submit"
            disabled={!customInput.trim() || isLoading}
            className="absolute right-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 disabled:opacity-40 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{isLoading ? 'Assessing...' : 'Run Query'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scientific Rule Notice Below Input */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
            <span>Anti-Causality Rule: Never convert correlation into causation. If evidence is lacking, system responds "INSUFFICIENT EVIDENCE".</span>
          </div>
        </div>
      </form>
    </div>
  );
};
