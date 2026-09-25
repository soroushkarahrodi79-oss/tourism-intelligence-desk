import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
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

export const ProfessionalOverview: React.FC<ProfessionalOverviewProps> = ({
  onRunGuidedQuestion,
  onOpenMethodology,
  onOpenDecisionBrief
}) => {
  return (
    <section className="border-b border-zinc-800 bg-zinc-950 px-4 sm:px-6 lg:px-8 py-7">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_1.95fr] gap-5 items-stretch">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 mb-2">
              Product in 30 seconds
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100">
              Evidence governance before recommendation.
            </h2>
            <p className="mt-2.5 text-sm text-zinc-300 leading-relaxed">
              Tourism Intelligence Desk is a research-engineering prototype for analysts who need to move from
              geospatial and environmental evidence to a decision without hiding uncertainty or inventing causality.
            </p>

            <div className="mt-4 space-y-2 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Two evidence-backed cases with different epistemic states and decision ceilings.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Deterministic guardrails: unsupported claims return <strong>INSUFFICIENT EVIDENCE</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Decision briefs expose evidence, limits, competing explanations, next data and provenance.</span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={onOpenDecisionBrief}
                className="inline-flex items-center gap-1.5 rounded bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-xs font-medium text-white transition-colors"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>View Decision Brief</span>
              </button>
              <button
                onClick={onOpenMethodology}
                className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-200 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inspect evidence rules</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {capabilities.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-lg border border-zinc-800 bg-zinc-900/35 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wide text-zinc-300 font-semibold">
                      {title}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                    60-second evaluation path
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Use the cases that reveal the system’s strongest behaviour: calibrated claims and explicit refusal.
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 rounded px-2 py-1">
                  NO LLM REQUIRED FOR SCIENTIFIC CLAIMS
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <button
                  onClick={() =>
                    onRunGuidedQuestion(
                      'madrid-hati',
                      'What did the HATI-Madrid pilot actually demonstrate?'
                    )
                  }
                  className="group text-left rounded border border-zinc-800 bg-zinc-950 hover:border-amber-700/70 p-3 transition-colors"
                >
                  <div className="text-[10px] font-mono text-amber-400 uppercase">01 · Reproduced result</div>
                  <div className="text-xs font-medium text-zinc-200 mt-1">Inspect what HATI actually demonstrated</div>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-zinc-500 group-hover:text-zinc-300">
                    <span>Run evidence assessment</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>

                <button
                  onClick={() =>
                    onRunGuidedQuestion(
                      'guadarrama-snto',
                      'Does the Maliciosa-Porrones NDVI decline prove tourism damage?'
                    )
                  }
                  className="group text-left rounded border border-zinc-800 bg-zinc-950 hover:border-emerald-700/70 p-3 transition-colors"
                >
                  <div className="text-[10px] font-mono text-emerald-400 uppercase">02 · Causal boundary</div>
                  <div className="text-xs font-medium text-zinc-200 mt-1">Try the tempting NDVI → tourism claim</div>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-zinc-500 group-hover:text-zinc-300">
                    <span>See why the system refuses</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>

                <button
                  onClick={() =>
                    onRunGuidedQuestion(
                      'guadarrama-snto',
                      'Can SNTO justify closing trails or restricting visitor quotas?'
                    )
                  }
                  className="group text-left rounded border border-zinc-800 bg-zinc-950 hover:border-zinc-600 p-3 transition-colors"
                >
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">03 · Decision ceiling</div>
                  <div className="text-xs font-medium text-zinc-200 mt-1">Test a high-consequence management request</div>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-zinc-500 group-hover:text-zinc-300">
                    <span>Inspect the L5a boundary</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
