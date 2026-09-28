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

  const sectionLabel = 'text-xs font-semibold text-muted uppercase tracking-wide';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/40 backdrop-blur-sm flex justify-center p-3 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-4xl studio-card shadow-[var(--shadow-lift)] overflow-hidden flex flex-col my-auto">
        {/* Toolbar (hidden on print) */}
        <div className="no-print bg-surface-sunken border-b border-hairline px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-sm font-semibold text-ink">Decision support brief</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-soft hover:border-hairline-strong transition-colors"
              title="Copy brief in Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-brand" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy MD'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-soft hover:border-hairline-strong transition-colors"
              title="Download JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-strong transition-colors"
              title="Print or save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface transition-colors ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable document */}
        <div className="p-6 sm:p-10 space-y-6 bg-surface text-ink text-left overflow-y-auto max-h-[80vh]">
          {/* Status banners */}
          {isDemo && (
            <div className="flex items-center justify-between gap-3 rounded-lg bg-hati-soft border border-hati/25 p-3 text-xs">
              <div className="flex items-center gap-2 text-hati-strong font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Demonstration brief — not for operational decision-making</span>
              </div>
              <span className="text-hati-strong/80 hidden sm:inline font-mono">Data status: {assessment.dataStatus}</span>
            </div>
          )}

          {isResearchSnapshot && (
            <div className="flex items-center justify-between gap-3 rounded-lg bg-brand-soft border border-brand/20 p-3 text-xs">
              <div className="flex items-center gap-2 text-brand-strong font-semibold">
                <Check className="w-4 h-4 shrink-0" />
                <span>
                  {isReproduced
                    ? 'Reproduced research brief — not current operational evidence'
                    : 'Real / derived research evidence — claim limits apply'}
                </span>
              </div>
              <span className="text-brand-strong/75 hidden sm:inline font-mono">
                {isReproduced
                  ? 'Model outputs remain subject to their evidence ceiling'
                  : 'Environmental signal ≠ tourism impact'}
              </span>
            </div>
          )}

          {/* Header */}
          <div className="border-b border-hairline pb-5">
            <div className="meta-label mb-2">Tourism Intelligence Desk · Decision support system</div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              Territorial decision support brief
            </h1>
            <p className="mt-1 text-sm text-muted">
              Territory: {territory.title} ({territory.code}) · Sub-topic: {territory.subtitle}
            </p>

            <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-lg bg-surface-sunken p-3 text-xs">
              <div>
                <dt className="text-faint text-[10px]">Document ref</dt>
                <dd className="font-mono font-semibold text-ink break-all">{docId}</dd>
              </div>
              <div>
                <dt className="text-faint text-[10px]">Date issued</dt>
                <dd className="text-ink">{dateStr}</dd>
              </div>
              <div>
                <dt className="text-faint text-[10px]">Data status</dt>
                <dd className={`font-semibold ${isDemo ? 'text-hati-strong' : 'text-brand-strong'}`}>
                  {assessment.dataStatus}
                </dd>
              </div>
              <div>
                <dt className="text-faint text-[10px]">Evidence confidence</dt>
                <dd className="font-semibold text-ink">{assessment.confidence.level}</dd>
              </div>
            </dl>
          </div>

          {/* 1. Inquiry */}
          <section>
            <div className={sectionLabel}>1. Analytical inquiry &amp; status</div>
            <div className="mt-1.5 rounded-lg bg-surface-sunken p-3.5">
              <div className="text-sm font-medium text-ink">“{assessment.question}”</div>
              <div className="mt-1.5 text-xs text-muted">Evaluation: {assessment.statusHeadline}</div>
            </div>
          </section>

          {/* 2. Observed signal */}
          <section>
            <div className={sectionLabel}>2. Observed signal</div>
            <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{assessment.signal.observation}</p>
            <div className="mt-1.5 text-xs text-muted flex flex-wrap gap-x-4 gap-y-1">
              <span>Scope: {assessment.signal.spatialScope}</span>
              <span className="text-hairline-strong">·</span>
              <span>Window: {assessment.signal.temporalWindow}</span>
            </div>
          </section>

          {/* 3. Supporting evidence */}
          <section>
            <div className={sectionLabel}>3. Supporting evidence &amp; indicators</div>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {assessment.evidence.metrics.map((m, idx) => (
                <div key={idx} className="rounded-lg bg-surface-sunken p-2.5">
                  <div className="text-[10px] text-faint truncate">{m.label}</div>
                  <div className="mt-0.5 text-sm font-bold font-mono text-ink">{m.value} {m.unit}</div>
                  <div className="text-[10px] text-muted">{m.delta}</div>
                </div>
              ))}
            </div>
            <ul className="mt-3 space-y-1 text-sm text-ink-soft">
              {assessment.evidence.supportingDatasets.map((ds, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-muted">·</span>
                  <span>{ds}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Interpretation */}
          <section>
            <div className={sectionLabel}>4. Scientific interpretation</div>
            <ul className="mt-1.5 space-y-1 text-sm text-ink-soft">
              {assessment.interpretation.inferences.map((inf, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-data">→</span>
                  <span>{inf}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 rounded-lg bg-surface-sunken p-2.5 text-xs text-muted">
              <span className="font-semibold text-ink block mb-0.5">Physical mechanism</span>
              {assessment.interpretation.plausibleMechanisms}
            </div>
          </section>

          {/* 5. Evidence limits */}
          <section className="rounded-lg bg-hati-soft border border-hati/25 p-3.5">
            <div className="text-xs font-semibold text-hati-strong uppercase tracking-wide mb-1.5">
              5. Evidence limits (what cannot be inferred)
            </div>
            <ul className="space-y-1 text-sm text-ink-soft">
              {assessment.evidenceLimit.strictlyForbiddenInferences.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-hati-strong font-bold shrink-0">✕</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Competing explanations */}
          <section>
            <div className={sectionLabel}>6. Competing explanations / confounder screening</div>
            <div className="mt-2 space-y-2">
              {assessment.competingExplanations.map((exp, idx) => (
                <div key={idx} className="rounded-lg bg-surface-sunken p-2.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-sm font-medium text-ink">{exp.explanation}</span>
                    <span className="meta-label rounded-full border border-hairline bg-surface px-2 py-0.5">
                      {exp.evaluation}
                    </span>
                  </div>
                  <p className="text-xs text-muted">{exp.reasoning}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Decision implication */}
          <section>
            <div className={sectionLabel}>7. Decision implications for tourism management</div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg bg-surface-sunken p-3">
                <div className="text-xs font-semibold text-ink mb-1.5">Managerial considerations</div>
                <ul className="space-y-1 text-sm text-ink-soft">
                  {assessment.decisionImplication.managerialConsiderations.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-muted">{i + 1}.</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg bg-surface-sunken p-3">
                <div className="text-xs font-semibold text-ink mb-1.5">Cautions &amp; guardrails</div>
                <ul className="space-y-1 text-sm text-muted">
                  {assessment.decisionImplication.cautionsAndGuardrails.map((cg, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-hati-strong">·</span>
                      <span>{cg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 8. Data needed next */}
          <section>
            <div className={sectionLabel}>8. Data needed next (to reduce uncertainty)</div>
            <ul className="mt-1.5 space-y-1 text-sm text-ink-soft">
              {assessment.dataNeededNext.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono text-muted">{i + 1}.</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Sign-off */}
          <div className="border-t border-hairline pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted">
            <div>
              <div>System: Tourism Intelligence Desk prototype</div>
              <div>Attribution: github.com/soroushkarahrodi79-oss</div>
            </div>
            <div className="sm:text-right">
              <div>Version: Prototype v0.1</div>
              <div>Operational validation required prior to implementation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
