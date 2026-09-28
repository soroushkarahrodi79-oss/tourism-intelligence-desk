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
    <div className="studio-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
        <h3 className="text-sm font-semibold text-ink">Analytical question</h3>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Anti-causality guard active</span>
        </span>
      </div>

      {/* Curated questions */}
      <div className="mb-4">
        <div className="text-xs text-muted mb-2">Curated inquiries</div>
        <div className="flex flex-wrap gap-2">
          {territory.sampleQuestions.map((q, idx) => {
            const isSelected = activeQuestion.trim().toLowerCase() === q.trim().toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => onAskQuestion(q)}
                aria-pressed={isSelected}
                className={`text-left text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  isSelected
                    ? 'bg-brand-soft border-brand/30 text-brand-strong font-medium'
                    : 'bg-surface border-hairline text-ink-soft hover:border-hairline-strong'
                }`}
              >
                {q}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom question */}
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={`Ask an analytical question for ${territory.shortName}…`}
            className="w-full bg-surface border border-hairline rounded-lg pl-3.5 pr-[7.5rem] py-2.5 text-sm text-ink placeholder-faint focus:outline-none focus:border-brand transition-colors"
          />
          <button
            type="submit"
            disabled={!customInput.trim() || isLoading}
            className="absolute right-1.5 inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-strong disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span>{isLoading ? 'Assessing…' : 'Run query'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-2.5 flex items-start gap-1.5 text-[11px] text-muted leading-relaxed">
          <AlertTriangle className="w-3.5 h-3.5 text-hati shrink-0 mt-px" />
          <span>
            Anti-causality rule: correlation is never converted into causation. If evidence is
            lacking, the system responds “insufficient evidence”.
          </span>
        </div>
      </form>
    </div>
  );
};
