import React from 'react';
import {
  ArrowRight,
  Check,
  FileCheck2,
  GitCommitHorizontal,
  ShieldCheck,
  Target
} from 'lucide-react';
import { TerritoryId } from '../types';

interface ProfessionalOverviewProps {
  onRunGuidedQuestion: (territoryId: TerritoryId, question: string) => void;
  onOpenMethodology: () => void;
  onOpenDecisionBrief: () => void;
}

const capabilities = [
  {
    icon: Target,
    title: 'Problem',
    body:
      'Tourism dashboards can turn a real environmental signal into a stronger causal or management claim than the evidence supports.'
  },
  {
    icon: ShieldCheck,
    title: 'What this builds',
    body:
      'A deterministic evidence-governance layer that separates observation, derivation, modelling, reproduction, validation and decision authorization.'
  },
  {
    icon: GitCommitHorizontal,
    title: 'Why it is auditable',
    body:
      'Every represented research case is bounded by explicit claim limits and pinned to immutable source snapshots instead of mutable “latest” evidence.'
  }
];

interface GuidedPath {
  step: string;
  kicker: string;
  title: string;
  cue: string;
  territory: TerritoryId;
  question: string;
  accent: string;
}

const guidedPaths: GuidedPath[] = [
  {
    step: '01',
    kicker: 'Reproduced result',
    title: 'Inspect what HATI actually demonstrated',
    cue: 'Run evidence assessment',
    territory: 'madrid-hati',
    question: 'What did the HATI-Madrid pilot actually demonstrate?',
    accent: 'text-hati-strong'
  },
  {
    step: '02',
    kicker: 'Causal boundary',
    title: 'Try the tempting NDVI → tourism claim',
    cue: 'See why the system refuses',
    territory: 'guadarrama-snto',
    question: 'Does the Maliciosa-Porrones NDVI decline prove tourism damage?',
    accent: 'text-snto-strong'
  },
  {
    step: '03',
    kicker: 'Decision ceiling',
    title: 'Test a high-consequence management request',
    cue: 'Inspect the L5a boundary',
    territory: 'guadarrama-snto',
    question: 'Can SNTO justify closing trails or restricting visitor quotas?',
    accent: 'text-brand'
  }
];

export const ProfessionalOverview: React.FC<ProfessionalOverviewProps> = ({
  onRunGuidedQuestion,
  onOpenMethodology,
  onOpenDecisionBrief
}) => {
  return (
    <section className="border-b border-hairline bg-surface px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.7fr] gap-8 xl:gap-12 items-start">
          {/* What it is */}
          <div>
            <div className="eyebrow">In 30 seconds</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
              Evidence governance before recommendation.
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Tourism Intelligence Desk is a research-engineering prototype for analysts who need to
              move from geospatial and environmental evidence to a decision without hiding
              uncertainty or inventing causality.
            </p>

            <ul className="mt-5 space-y-2.5">
              {[
                <>Two evidence-backed cases with different epistemic states and decision ceilings.</>,
                <>
                  Deterministic guardrails: unsupported claims return{' '}
                  <span className="font-semibold text-ink">insufficient evidence</span>.
                </>,
                <>Decision briefs expose evidence, limits, competing explanations, next data and provenance.</>
              ].map((node, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft leading-relaxed">
                  <Check className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span>{node}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                onClick={onOpenDecisionBrief}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3.5 py-2 text-sm font-semibold text-white hover:bg-brand-strong transition-colors"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>View decision brief</span>
              </button>
              <button
                onClick={onOpenMethodology}
                className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-3.5 py-2 text-sm font-medium text-ink-soft hover:border-hairline-strong transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-brand" />
                <span>Inspect evidence rules</span>
              </button>
            </div>
          </div>

          {/* Capabilities + guided evaluation */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {capabilities.map(({ icon: Icon, title, body }) => (
                <div key={title}>
                  <div className="inline-grid place-items-center w-9 h-9 rounded-lg bg-brand-soft text-brand mb-2.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <div className="studio-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-ink">60-second evaluation path</h3>
                  <p className="text-xs text-muted mt-0.5">
                    The cases that reveal the system’s strongest behaviour: calibrated claims and
                    explicit refusal.
                  </p>
                </div>
                <span className="meta-label rounded-full border border-hairline px-2.5 py-1">
                  No LLM used for scientific claims
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {guidedPaths.map((p) => (
                  <button
                    key={p.step}
                    onClick={() => onRunGuidedQuestion(p.territory, p.question)}
                    className="group text-left rounded-xl border border-hairline bg-surface p-3.5 hover:border-hairline-strong hover:shadow-[var(--shadow-card)] transition-all"
                  >
                    <div className={`text-[11px] font-semibold ${p.accent}`}>
                      {p.step} · {p.kicker}
                    </div>
                    <div className="mt-1.5 text-sm font-medium text-ink leading-snug">{p.title}</div>
                    <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] text-muted group-hover:text-ink">
                      <span>{p.cue}</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
