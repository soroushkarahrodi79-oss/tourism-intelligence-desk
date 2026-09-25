import React, { useState } from 'react';
import { EvidenceAssessment, EvidenceConfidence } from '../types';
import {
  Activity,
  BarChart3,
  Lightbulb,
  AlertOctagon,
  FileCheck2,
  Database,
  ShieldAlert,
  FileText,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface EvidenceAssessmentPanelProps {
  assessment: EvidenceAssessment;
  onOpenDecisionBrief: () => void;
}

export const EvidenceAssessmentPanel: React.FC<EvidenceAssessmentPanelProps> = ({
  assessment,
  onOpenDecisionBrief
}) => {
  const [isLimitsExpanded, setIsLimitsExpanded] = useState(true);
  const [isConfoundersExpanded, setIsConfoundersExpanded] = useState(true);
  const [isProvenanceExpanded, setIsProvenanceExpanded] = useState(false);

  const getConfidenceBadge = (confidence: EvidenceConfidence) => {
    switch (confidence) {
      case 'High':
        return 'text-emerald-300 bg-emerald-950/40 border-emerald-700/50';
      case 'Moderate':
        return 'text-amber-300 bg-amber-950/40 border-amber-700/50';
      case 'Low':
        return 'text-zinc-300 bg-zinc-800/80 border-zinc-700';
    }
  };

  const isInsufficient = assessment.status === 'INSUFFICIENT_EVIDENCE';
  const isCorrelationWarning = assessment.status === 'CORRELATION_WARNING';

  return (
    <div className="space-y-4">
      {/* Top Banner: Status, Data Status & Evidence Confidence */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-zinc-400">DATA STATUS:</span>
              <span className={`px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-semibold text-[11px] ${
                assessment.dataStatus === 'Reproduced' || assessment.dataStatus === 'Model-derived'
                  ? 'text-emerald-300'
                  : 'text-amber-300'
              }`}>
                {assessment.dataStatus.toUpperCase()}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">ID: {assessment.id}</span>
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-zinc-100 leading-snug">
              {assessment.statusHeadline}
            </h3>

            <div className="text-xs text-zinc-400 font-sans">
              Hypothesis: <span className="text-zinc-200">"{assessment.question}"</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center sm:flex-col sm:items-end gap-2.5 shrink-0">
            {/* Strict distinction: Evidence Confidence */}
            <div className={`px-2.5 py-1 rounded border text-xs font-mono flex items-center gap-1.5 ${getConfidenceBadge(assessment.confidence.level)}`}>
              <span className="text-zinc-400 font-normal">CONFIDENCE:</span>
              <span className="font-semibold">{assessment.confidence.level.toUpperCase()}</span>
            </div>

            {/* Generate Decision Brief Button */}
            <button
              onClick={onOpenDecisionBrief}
              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Generate Decision Brief</span>
            </button>
          </div>
        </div>

        {/* Warning Banners */}
        {isInsufficient && (
          <div className="mt-3.5 p-3 rounded bg-zinc-950 border border-zinc-700/80 text-xs flex items-start gap-2.5">
            <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-zinc-200 font-mono text-[11px] uppercase tracking-wide">
                EPISTEMIC SAFEGUARD: INSUFFICIENT EVIDENCE
              </div>
              <div className="mt-0.5 text-zinc-400 leading-relaxed">
                The analytical engine refuses causal leap. Current observational evidence is inadequate or temporally confounded to attribute this phenomenon to tourism. Recommendations are limited to targeted monitoring.
              </div>
            </div>
          </div>
        )}

        {isCorrelationWarning && (
          <div className="mt-3.5 p-3 rounded bg-zinc-950 border border-zinc-700/80 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-zinc-200 font-mono text-[11px] uppercase tracking-wide">
                SCIENTIFIC RULE: CORRELATION DOES NOT ESTABLISH CAUSATION
              </div>
              <div className="mt-0.5 text-zinc-400 leading-relaxed">
                Spatial or temporal co-location between visitors and environmental conditions does not establish tourism as the causative mechanism. Physical and meteorological explanations must be evaluated first.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 8-Part Epistemic Reasoning Sections */}
      <div className="space-y-3.5">
        {/* SECTION 1: OBSERVED SIGNAL */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="p-1 rounded bg-zinc-800 text-zinc-300">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                1. OBSERVED SIGNAL
              </h4>
              <p className="text-[11px] text-zinc-400">What changed or was detected in the territory</p>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed mb-3">
            {assessment.signal.observation}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-400 bg-zinc-950/70 p-2.5 rounded border border-zinc-800/80">
            <div>
              <span className="text-zinc-400">Spatial Scope:</span> {assessment.signal.spatialScope}
            </div>
            <div>
              <span className="text-zinc-400">Temporal Window:</span> {assessment.signal.temporalWindow}
            </div>
          </div>
        </div>

        {/* SECTION 2: SUPPORTING EVIDENCE */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="p-1 rounded bg-zinc-800 text-zinc-300">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                2. SUPPORTING EVIDENCE
              </h4>
              <p className="text-[11px] text-zinc-400">Datasets, sensors, and indicators supporting the signal</p>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5">
            {assessment.evidence.metrics.map((m, idx) => (
              <div key={idx} className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800 font-mono text-xs">
                <div className="text-[10px] text-zinc-400 uppercase truncate" title={m.label}>
                  {m.label}
                </div>
                <div className="text-sm font-semibold text-zinc-100 mt-0.5">
                  {m.value} <span className="text-[11px] font-normal text-zinc-400">{m.unit}</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5 truncate">{m.delta}</div>
                {m.isDemonstration && (
                  <div className="text-[9px] text-amber-400/80 mt-1 uppercase">Demonstration value</div>
                )}
              </div>
            ))}
          </div>

          <ul className="space-y-1.5 mb-3">
            {assessment.evidence.supportingDatasets.map((ds, idx) => (
              <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-zinc-400 mt-2 shrink-0"></span>
                <span>{ds}</span>
              </li>
            ))}
          </ul>

          <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950/70 p-2.5 rounded border border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
            <div>Sample / Records: {assessment.evidence.sampleSize}</div>
            <div>Location: {assessment.evidence.spatialCoordinates}</div>
          </div>
        </div>

        {/* SECTION 3: INTERPRETATION */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="p-1 rounded bg-zinc-800 text-zinc-300">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                3. INTERPRETATION
              </h4>
              <p className="text-[11px] text-zinc-400">What can reasonably be inferred</p>
            </div>
          </div>

          <ul className="space-y-1.5 mb-2.5">
            {assessment.interpretation.inferences.map((inf, idx) => (
              <li key={idx} className="text-xs text-zinc-200 leading-relaxed flex items-start gap-2">
                <span className="text-zinc-400 font-bold shrink-0">→</span>
                <span>{inf}</span>
              </li>
            ))}
          </ul>

          <div className="p-2.5 rounded bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300 font-mono text-[11px] uppercase block mb-1">
              Physical Mechanism:
            </span>
            {assessment.interpretation.plausibleMechanisms}
          </div>
        </div>

        {/* SECTION 4: EVIDENCE LIMIT (CRITICAL EPISTEMIC GUARDRAIL) */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 sm:p-5">
          <div
            onClick={() => setIsLimitsExpanded(!isLimitsExpanded)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-zinc-800 text-amber-400">
                <AlertOctagon className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
                  4. EVIDENCE LIMIT
                </h4>
                <p className="text-[11px] text-zinc-400">What CANNOT be concluded from available evidence</p>
              </div>
            </div>
            <button className="text-zinc-400 hover:text-zinc-200 p-1">
              {isLimitsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {isLimitsExpanded && (
            <div className="mt-3.5 space-y-3">
              <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
                <div className="text-[11px] font-mono font-semibold text-zinc-300 uppercase tracking-wide mb-1.5">
                  Prohibited Inferences:
                </div>
                <ul className="space-y-1.5">
                  {assessment.evidenceLimit.strictlyForbiddenInferences.map((lim, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-400 font-bold shrink-0">✕</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-400">
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400 block mb-1">Unobserved Variables:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-zinc-300 text-[11px]">
                    {assessment.evidenceLimit.unobservedVariables.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400 block mb-1">Spatial / Temporal Gaps:</span>
                  <span className="text-zinc-300 text-[11px] leading-relaxed block">
                    {assessment.evidenceLimit.spatialTemporalGaps}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: COMPETING EXPLANATIONS / CONFOUNDERS */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 sm:p-5">
          <div
            onClick={() => setIsConfoundersExpanded(!isConfoundersExpanded)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-zinc-800 text-zinc-300">
                <ShieldAlert className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  5. COMPETING EXPLANATIONS / CONFOUNDERS
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Screening alternative non-tourism explanations (meteorology, drought, phenology, urban morphology)
                </p>
              </div>
            </div>
            <button className="text-zinc-400 hover:text-zinc-200 p-1">
              {isConfoundersExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {isConfoundersExpanded && (
            <div className="mt-3.5 space-y-2">
              {assessment.competingExplanations.map((exp, idx) => (
                <div key={idx} className="p-3 rounded bg-zinc-950 border border-zinc-800 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-zinc-200">{exp.explanation}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-zinc-700 bg-zinc-900 text-zinc-300">
                      {exp.evaluation}
                    </span>
                  </div>
                  <div className="text-zinc-400 text-xs leading-relaxed">{exp.reasoning}</div>
                  <div className="mt-1 text-[11px] font-mono text-zinc-400">
                    <span className="text-zinc-300">Investigation Needed:</span> {exp.investigationNeeded}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 6: EVIDENCE CONFIDENCE */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-zinc-800 text-zinc-300">
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  6. EVIDENCE CONFIDENCE
                </h4>
                <p className="text-[11px] text-zinc-400">Confidence level and epistemic justification</p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded text-xs font-mono font-semibold border ${getConfidenceBadge(assessment.confidence.level)}`}>
              {assessment.confidence.level.toUpperCase()} CONFIDENCE
            </span>
          </div>

          <ul className="space-y-1 mb-2.5">
            {assessment.confidence.justification.map((just, idx) => (
              <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed">
                <span className="text-zinc-400 font-mono">·</span>
                <span>{just}</span>
              </li>
            ))}
          </ul>

          {assessment.confidence.marginOrInterval && (
            <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span className="text-zinc-400">Bound / Qualification:</span>
              <span className="text-zinc-300">{assessment.confidence.marginOrInterval}</span>
            </div>
          )}
        </div>

        {/* SECTION 7: DECISION IMPLICATION */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="p-1 rounded bg-zinc-800 text-emerald-400">
              <FileCheck2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                7. DECISION IMPLICATION
              </h4>
              <p className="text-[11px] text-zinc-400">Proportional guidance for destination managers, analysts & researchers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
              <div className="text-[11px] font-mono font-semibold text-zinc-200 uppercase tracking-wide mb-1.5">
                Considerations to Investigate / Test:
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {assessment.decisionImplication.managerialConsiderations.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-mono">·</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
              <div className="text-[11px] font-mono font-semibold text-zinc-200 uppercase tracking-wide mb-1.5">
                Cautions & Policy Guardrails:
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                {assessment.decisionImplication.cautionsAndGuardrails.map((cg, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-mono">·</span>
                    <span>{cg}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 8: DATA NEEDED NEXT */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 rounded bg-zinc-800 text-zinc-300">
              <Database className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                8. DATA NEEDED NEXT
              </h4>
              <p className="text-[11px] text-zinc-400">Additional evidence required to materially reduce uncertainty</p>
            </div>
          </div>

          <ul className="space-y-1.5">
            {assessment.dataNeededNext.map((item, idx) => (
              <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                <span className="text-zinc-400 font-mono font-semibold">8.{idx + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* PROVENANCE & AUDIT TRAIL (COLLAPSIBLE) */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4">
          <div
            onClick={() => setIsProvenanceExpanded(!isProvenanceExpanded)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Provenance & Data Lineage ({assessment.provenance.length} Sources)
              </span>
            </div>
            <button className="text-zinc-400 hover:text-zinc-200 p-1">
              {isProvenanceExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {isProvenanceExpanded && (
            <div className="mt-3 divide-y divide-zinc-800 border border-zinc-800 rounded overflow-hidden bg-zinc-950">
              {assessment.provenance.map((prov, idx) => (
                <div key={idx} className="p-2.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-zinc-200 flex items-center gap-2">
                      <span>{prov.sensorOrPlatform}</span>
                      <span className="px-1.5 py-0.2 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 text-[10px] font-mono">
                        {prov.dataStatus?.toUpperCase() || 'PROXY'}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      Authority: {prov.sourceAuthority} · Resolution: {prov.spatialResolution} · Processing: {prov.processingLevel}
                    </div>
                  </div>
                  {prov.citationUrl && (
                    <a
                      href={prov.citationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-zinc-200 text-[11px] font-mono flex items-center gap-1 shrink-0"
                    >
                      <span>Reference</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
