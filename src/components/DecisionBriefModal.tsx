import React, { useState } from 'react';
import { EvidenceAssessment, TerritoryCase } from '../types';
import {
  X,
  Printer,
  Copy,
  Download,
  Check,
  AlertTriangle
} from 'lucide-react';

interface DecisionBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: EvidenceAssessment;
  territory: TerritoryCase;
}

export const DecisionBriefModal: React.FC<DecisionBriefModalProps> = ({
  isOpen,
  onClose,
  assessment,
  territory
}) => {
  const [copied, setCopied] = useState(false);
  const assessmentRef = assessment.id.split('-').at(-1)?.toUpperCase() ?? 'ASSESSMENT';
  const docId = `TID-DSB-${territory.code}-${new Date().getFullYear()}-${assessmentRef}`;

  if (!isOpen) return null;
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const isDemo = assessment.dataStatus === 'Demonstration' || assessment.dataStatus === 'Proxy';
  const isReproduced = assessment.dataStatus === 'Reproduced' || assessment.dataStatus === 'Model-derived';
  const isObservedResearch = assessment.dataStatus === 'Observed' || assessment.dataStatus === 'Derived' || assessment.dataStatus === 'Validated';
  const isResearchSnapshot = isReproduced || isObservedResearch;

  const generateMarkdown = () => {
    return `# TERRITORIAL DECISION SUPPORT BRIEF
${isDemo ? '> **DEMONSTRATION BRIEF — NOT FOR OPERATIONAL DECISION-MAKING**\n' : ''}${isReproduced ? '> **REPRODUCED RESEARCH BRIEF — NOT CURRENT OPERATIONAL EVIDENCE**\n' : ''}${isObservedResearch ? '> **REAL / DERIVED RESEARCH EVIDENCE — CHECK CLAIM-SPECIFIC LIMITS BEFORE OPERATIONAL USE**\n' : ''}
**DOCUMENT REF:** ${docId}
**TERRITORY:** ${territory.title} (${territory.code})
**CASE / PROJECT:** ${territory.shortName}
**DATE:** ${dateStr}
**DATA STATUS:** ${assessment.dataStatus.toUpperCase()}
**EVIDENCE CONFIDENCE:** ${assessment.confidence.level.toUpperCase()} (${assessment.confidence.marginOrInterval || 'N/A'})

---

## 1. ANALYTICAL INQUIRY
> "${assessment.question}"

**STATUS:** ${assessment.statusHeadline}

---

## 2. OBSERVED SIGNAL
${assessment.signal.observation}
- **Spatial Scope:** ${assessment.signal.spatialScope}
- **Temporal Window:** ${assessment.signal.temporalWindow}

---

## 3. SUPPORTING EVIDENCE
${assessment.evidence.metrics.map((m) => `- **${m.label}:** ${m.value} ${m.unit} (Baseline: ${m.baseline} | Delta: ${m.delta})`).join('\n')}

### Datasets & Indicators:
${assessment.evidence.supportingDatasets.map((ds) => `- ${ds}`).join('\n')}

---

## 4. INTERPRETATION
${assessment.interpretation.inferences.map((inf) => `- ${inf}`).join('\n')}
*Physical Mechanism:* ${assessment.interpretation.plausibleMechanisms}

---

## 5. EVIDENCE LIMIT (WHAT CANNOT BE INFERRED)
${assessment.evidenceLimit.strictlyForbiddenInferences.map((lim) => `- ❌ ${lim}`).join('\n')}

---

## 6. COMPETING EXPLANATIONS / CONFOUNDERS
${assessment.competingExplanations.map((exp) => `- **[${exp.evaluation}] ${exp.explanation}**: ${exp.reasoning} (Investigation: ${exp.investigationNeeded})`).join('\n')}

---

## 7. EVIDENCE CONFIDENCE
- **Confidence Level:** ${assessment.confidence.level}
${assessment.confidence.justification.map((j) => `- ${j}`).join('\n')}

---

## 8. DECISION IMPLICATION
### Managerial Considerations:
${assessment.decisionImplication.managerialConsiderations.map((c, i) => `${i + 1}. ${c}`).join('\n')}

### Cautions & Guardrails:
${assessment.decisionImplication.cautionsAndGuardrails.map((cg, i) => `${i + 1}. ${cg}`).join('\n')}

---

## 9. DATA NEEDED NEXT
${assessment.dataNeededNext.map((d, i) => `${i + 1}. ${d}`).join('\n')}

---

## 10. PROVENANCE & LIMITATIONS
${assessment.provenance.map((p) => `- ${p.sensorOrPlatform} | Authority: ${p.sourceAuthority} | Res: ${p.spatialResolution} | Status: ${p.dataStatus || 'Proxy'}`).join('\n')}

**Limitations:** Generated for decision-support and research evaluation. Does not replace formal field validation, environmental assessment, or institutional decision procedures.
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(assessment, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${docId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto text-zinc-100">
        {/* Modal Top Actions Toolbar (Hidden on print) */}
        <div className="no-print bg-zinc-900 border-b border-zinc-800 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
              Decision Support Brief Generator
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy Brief in Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy MD'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="p-6 sm:p-10 space-y-6 bg-zinc-950 text-zinc-100 print:text-black print:bg-white text-left font-sans overflow-y-auto max-h-[80vh]">
          {/* Demonstration Watermark Banner */}
          {isDemo && (
            <div className="p-3 rounded bg-zinc-900 border border-zinc-700 text-xs flex items-center justify-between font-mono">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>DEMONSTRATION BRIEF — NOT FOR OPERATIONAL DECISION-MAKING</span>
              </div>
              <span className="text-zinc-400 hidden sm:inline">DATA STATUS: DEMONSTRATION / PROXY</span>
            </div>
          )}

          {isResearchSnapshot && (
            <div className="p-3 rounded bg-zinc-900 border border-emerald-800/60 text-xs flex items-center justify-between font-mono">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <Check className="w-4 h-4 shrink-0" />
                <span>
                  {isReproduced
                    ? 'REPRODUCED RESEARCH BRIEF — NOT CURRENT OPERATIONAL EVIDENCE'
                    : 'REAL / DERIVED RESEARCH EVIDENCE — CLAIM LIMITS APPLY'}
                </span>
              </div>
              <span className="text-zinc-400 hidden sm:inline">
                {isReproduced
                  ? 'MODEL OUTPUTS REMAIN SUBJECT TO THEIR EVIDENCE CEILING'
                  : 'ENVIRONMENTAL SIGNAL ≠ TOURISM IMPACT OR FIELD VALIDATION'}
              </span>
            </div>
          )}
          {/* Header Block */}
          <div className="border-b border-zinc-800 print:border-black pb-5">
            <div className="text-xs font-mono text-zinc-400 print:text-zinc-600 mb-2">
              TOURISM INTELLIGENCE DESK · DECISION SUPPORT SYSTEM
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100 print:text-black">
              Territorial Decision Support Brief
            </h1>
            <p className="mt-1 text-sm text-zinc-300 print:text-zinc-700">
              Territory: {territory.title} ({territory.code}) · Sub-Topic: {territory.subtitle}
            </p>

            {/* Metadata Strip */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono bg-zinc-900/60 print:bg-zinc-100 p-2.5 rounded border border-zinc-800 print:border-zinc-300">
              <div>
                <span className="text-zinc-400 block text-[10px]">DOCUMENT REF</span>
                <span className="text-zinc-200 print:text-black font-semibold">{docId}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px]">DATE ISSUED</span>
                <span className="text-zinc-200 print:text-black">{dateStr}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px]">DATA STATUS</span>
                <span className={`${isDemo ? 'text-amber-300' : 'text-emerald-300'} print:text-black font-semibold`}>{assessment.dataStatus.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px]">EVIDENCE CONFIDENCE</span>
                <span className="text-zinc-200 print:text-black font-semibold">{assessment.confidence.level.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Analytical Inquiry */}
          <div>
            <div className="text-xs font-mono font-semibold text-zinc-400 uppercase mb-1">
              1. Analytical Inquiry & Status
            </div>
            <div className="p-3.5 rounded bg-zinc-900/70 print:bg-zinc-100 border border-zinc-800 print:border-zinc-300">
              <div className="text-xs sm:text-sm font-medium text-zinc-200 print:text-black">
                "{assessment.question}"
              </div>
              <div className="mt-1.5 text-xs font-mono text-zinc-300 print:text-black">
                Evaluation: {assessment.statusHeadline}
              </div>
            </div>
          </div>

          {/* Section 2: Observed Signal */}
          <div>
            <div className="text-xs font-mono font-semibold text-zinc-400 uppercase mb-1">
              2. Observed Signal
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
              {assessment.signal.observation}
            </p>
            <div className="mt-1.5 text-xs font-mono text-zinc-400 print:text-zinc-600 flex flex-wrap gap-4">
              <span>Scope: {assessment.signal.spatialScope}</span>
              <span>·</span>
              <span>Window: {assessment.signal.temporalWindow}</span>
            </div>
          </div>

          {/* Section 3: Supporting Evidence */}
          <div>
            <div className="text-xs font-mono font-semibold text-zinc-400 uppercase mb-1.5">
              3. Supporting Evidence & Indicators
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {assessment.evidence.metrics.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded bg-zinc-900/60 print:bg-zinc-100 border border-zinc-800 print:border-zinc-300 font-mono text-xs">
                  <div className="text-[10px] text-zinc-400 uppercase truncate">{m.label}</div>
                  <div className="text-sm font-semibold text-zinc-100 print:text-black mt-0.5">
                    {m.value} {m.unit}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{m.delta}</div>
                </div>
              ))}
            </div>
            <ul className="space-y-1 text-xs text-zinc-300 print:text-zinc-800">
              {assessment.evidence.supportingDatasets.map((ds, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-zinc-400">·</span>
                  <span>{ds}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Interpretation & Mechanism */}
          <div>
            <div className="text-xs font-mono font-semibold text-zinc-400 uppercase mb-1">
              4. Scientific Interpretation
            </div>
            <ul className="space-y-1 text-xs text-zinc-300 print:text-zinc-800 mb-2">
              {assessment.interpretation.inferences.map((inf, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-zinc-400">→</span>
                  <span>{inf}</span>
                </li>
              ))}
            </ul>
            <div className="p-2.5 rounded bg-zinc-900/50 print:bg-zinc-100 text-xs text-zinc-400 print:text-zinc-700">
              <span className="font-semibold text-zinc-300 print:text-black font-mono text-[11px] block">
                Physical Mechanism:
              </span>
              {assessment.interpretation.plausibleMechanisms}
            </div>
          </div>

          {/* Section 5: Evidence Limits */}
          <div className="p-3.5 rounded bg-zinc-900 border border-zinc-700 print:border-zinc-300">
            <div className="text-xs font-mono font-semibold text-amber-300 print:text-amber-800 uppercase mb-1.5">
              5. Evidence Limits (What Cannot Be Inferred)
            </div>
            <ul className="space-y-1 text-xs text-zinc-300 print:text-zinc-900">
              {assessment.evidenceLimit.strictlyForbiddenInferences.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold shrink-0">✕</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: Competing Explanations */}
          <div>
            <div className="text-xs font-mono font-semibold text-zinc-400 uppercase mb-1.5">
              6. Competing Explanations / Confounder Screening
            </div>
            <div className="divide-y divide-zinc-800 print:divide-zinc-300 border border-zinc-800 print:border-zinc-300 rounded overflow-hidden">
              {assessment.competingExplanations.map((exp, idx) => (
                <div key={idx} className="p-2.5 bg-zinc-900/40 print:bg-zinc-50 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-medium text-zinc-200 print:text-black">{exp.explanation}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 print:bg-zinc-200 text-zinc-300 print:text-black">
                      {exp.evaluation}
                    </span>
                  </div>
                  <p className="text-zinc-400 print:text-zinc-700 text-xs">{exp.reasoning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Decision Implication */}
          <div>
            <div className="text-xs font-mono font-semibold text-zinc-400 uppercase mb-1.5">
              7. Decision Implications for Tourism Management
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded bg-zinc-900/60 print:bg-zinc-100 border border-zinc-800 print:border-zinc-300">
                <div className="text-xs font-semibold text-zinc-200 print:text-black mb-1.5 font-mono">
                  Managerial Considerations:
                </div>
                <ul className="space-y-1 text-xs text-zinc-300 print:text-zinc-800">
                  {assessment.decisionImplication.managerialConsiderations.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-zinc-400">{i + 1}.</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded bg-zinc-900/60 print:bg-zinc-100 border border-zinc-800 print:border-zinc-300">
                <div className="text-xs font-semibold text-zinc-200 print:text-black mb-1.5 font-mono">
                  Cautions & Guardrails:
                </div>
                <ul className="space-y-1 text-xs text-zinc-400 print:text-zinc-700">
                  {assessment.decisionImplication.cautionsAndGuardrails.map((cg, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-zinc-500">·</span>
                      <span>{cg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 8: Data Needed Next */}
          <div>
            <div className="text-xs font-mono font-semibold text-zinc-400 uppercase mb-1">
              8. Data Needed Next (To Reduce Uncertainty)
            </div>
            <ul className="space-y-1 text-xs text-zinc-300 print:text-zinc-800">
              {assessment.dataNeededNext.map((d, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-zinc-400 font-mono">{i + 1}.</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sign-Off Footer */}
          <div className="border-t border-zinc-800 print:border-zinc-300 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400 print:text-zinc-600">
            <div>
              <div>System: Tourism Intelligence Desk Prototype</div>
              <div>Attribution: github.com/soroushkarahrodi79-oss</div>
            </div>
            <div className="text-right">
              <div>Version: Prototype v0.1</div>
              <div>Operational Validation Required Prior to Implementation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
