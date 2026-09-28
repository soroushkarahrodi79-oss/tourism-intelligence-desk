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
import { useLocale } from '../i18n/LocaleProvider';
import { localizeEvaluationLabel } from '../i18n/ui';

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
  const { locale, t } = useLocale();
  const [copied, setCopied] = useState(false);
  const assessmentRef = assessment.id.split('-').at(-1)?.toUpperCase() ?? 'ASSESSMENT';
  const docId = `TID-DSB-${territory.code}-${new Date().getFullYear()}-${assessmentRef}`;

  if (!isOpen) return null;
  const dateStr = new Date().toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const isDemo = assessment.dataStatus === 'Demonstration' || assessment.dataStatus === 'Proxy';
  const isReproduced = assessment.dataStatus === 'Reproduced' || assessment.dataStatus === 'Model-derived';
  const isObservedResearch = assessment.dataStatus === 'Observed' || assessment.dataStatus === 'Derived' || assessment.dataStatus === 'Validated';
  const isResearchSnapshot = isReproduced || isObservedResearch;

  const generateMarkdown = () => {
    return `${t('decisionBrief.mdTitle')}
${isDemo ? `${t('decisionBrief.mdDemoBanner')}\n` : ''}${isReproduced ? `${t('decisionBrief.mdReproducedBanner')}\n` : ''}${isObservedResearch ? `${t('decisionBrief.mdResearchBanner')}\n` : ''}
${t('decisionBrief.mdDocRef')} ${docId}
${t('decisionBrief.mdTerritory')} ${territory.title} (${territory.code})
${t('decisionBrief.mdCase')} ${territory.shortName}
${t('decisionBrief.mdDate')} ${dateStr}
${t('decisionBrief.mdDataStatus')} ${assessment.dataStatus.toUpperCase()}
${t('decisionBrief.mdConfidence')} ${assessment.confidence.level.toUpperCase()} (${assessment.confidence.marginOrInterval || 'N/A'})

---

${t('decisionBrief.mdSection1')}
> "${assessment.question}"

${t('decisionBrief.mdStatus')} ${assessment.statusHeadline}

---

${t('decisionBrief.mdSection2')}
${assessment.signal.observation}
- ${t('decisionBrief.mdSpatialScope')} ${assessment.signal.spatialScope}
- ${t('decisionBrief.mdTemporalWindow')} ${assessment.signal.temporalWindow}

---

${t('decisionBrief.mdSection3')}
${assessment.evidence.metrics.map((m) => `- **${m.label}:** ${m.value} ${m.unit} (Baseline: ${m.baseline} | Delta: ${m.delta})`).join('\n')}

${t('decisionBrief.mdDatasetsHeading')}
${assessment.evidence.supportingDatasets.map((ds) => `- ${ds}`).join('\n')}

---

${t('decisionBrief.mdSection4')}
${assessment.interpretation.inferences.map((inf) => `- ${inf}`).join('\n')}
${t('decisionBrief.mdPhysicalMechanism')} ${assessment.interpretation.plausibleMechanisms}

---

${t('decisionBrief.mdSection5')}
${assessment.evidenceLimit.strictlyForbiddenInferences.map((lim) => `- ❌ ${lim}`).join('\n')}

---

${t('decisionBrief.mdSection6')}
${assessment.competingExplanations.map((exp) => `- **[${localizeEvaluationLabel(exp.evaluation, locale)}] ${exp.explanation}**: ${exp.reasoning} (Investigation: ${exp.investigationNeeded})`).join('\n')}

---

${t('decisionBrief.mdSection7')}
- ${t('decisionBrief.mdConfidenceLevel')} ${assessment.confidence.level}
${assessment.confidence.justification.map((j) => `- ${j}`).join('\n')}

---

${t('decisionBrief.mdSection8')}
${t('decisionBrief.mdManagerialHeading')}
${assessment.decisionImplication.managerialConsiderations.map((c, i) => `${i + 1}. ${c}`).join('\n')}

${t('decisionBrief.mdCautionsHeading')}
${assessment.decisionImplication.cautionsAndGuardrails.map((cg, i) => `${i + 1}. ${cg}`).join('\n')}

---

${t('decisionBrief.mdSection9')}
${assessment.dataNeededNext.map((d, i) => `${i + 1}. ${d}`).join('\n')}

---

${t('decisionBrief.mdSection10')}
${assessment.provenance.map((p) => `- ${p.sensorOrPlatform} | Authority: ${p.sourceAuthority} | Res: ${p.spatialResolution} | Status: ${p.dataStatus || 'Proxy'}`).join('\n')}

${t('decisionBrief.mdLimitations')}
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
            <span className="text-sm font-semibold text-ink">{t('decisionBrief.toolbarTitle')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-soft hover:border-hairline-strong transition-colors"
              title={t('decisionBrief.copyMd')}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-brand" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t('decisionBrief.copied') : t('decisionBrief.copyMd')}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-soft hover:border-hairline-strong transition-colors"
              title={t('decisionBrief.jsonBtn')}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('decisionBrief.jsonBtn')}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-strong transition-colors"
              title={t('decisionBrief.printBtn')}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('decisionBrief.printBtn')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface transition-colors ml-1"
              aria-label={t('decisionBrief.closeAria')}
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
                <span>{t('decisionBrief.demoBanner')}</span>
              </div>
              <span className="text-hati-strong/80 hidden sm:inline font-mono">{t('decisionBrief.dataStatusLabel')}: {assessment.dataStatus}</span>
            </div>
          )}

          {isResearchSnapshot && (
            <div className="flex items-center justify-between gap-3 rounded-lg bg-brand-soft border border-brand/20 p-3 text-xs">
              <div className="flex items-center gap-2 text-brand-strong font-semibold">
                <Check className="w-4 h-4 shrink-0" />
                <span>
                  {isReproduced
                    ? t('decisionBrief.reproducedBanner')
                    : t('decisionBrief.realDerivedBanner')}
                </span>
              </div>
              <span className="text-brand-strong/75 hidden sm:inline font-mono">
                {isReproduced
                  ? t('decisionBrief.reproducedBannerNote')
                  : t('decisionBrief.realDerivedBannerNote')}
              </span>
            </div>
          )}

          {/* Header */}
          <div className="border-b border-hairline pb-5">
            <div className="meta-label mb-2">{t('decisionBrief.headerKicker')}</div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              {t('decisionBrief.title')}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {t('decisionBrief.territorySubtopic')
                .replace('{title}', territory.title)
                .replace('{code}', territory.code)
                .replace('{subtitle}', territory.subtitle)}
            </p>

            <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-lg bg-surface-sunken p-3 text-xs">
              <div>
                <dt className="text-faint text-[10px]">{t('decisionBrief.documentRefLabel')}</dt>
                <dd className="font-mono font-semibold text-ink break-all">{docId}</dd>
              </div>
              <div>
                <dt className="text-faint text-[10px]">{t('decisionBrief.dateIssuedLabel')}</dt>
                <dd className="text-ink">{dateStr}</dd>
              </div>
              <div>
                <dt className="text-faint text-[10px]">{t('decisionBrief.dataStatusLabel')}</dt>
                <dd className={`font-semibold ${isDemo ? 'text-hati-strong' : 'text-brand-strong'}`}>
                  {assessment.dataStatus}
                </dd>
              </div>
              <div>
                <dt className="text-faint text-[10px]">{t('decisionBrief.evidenceConfidenceLabel')}</dt>
                <dd className="font-semibold text-ink">{assessment.confidence.level}</dd>
              </div>
            </dl>
          </div>

          {/* 1. Inquiry */}
          <section>
            <div className={sectionLabel}>{t('decisionBrief.section1')}</div>
            <div className="mt-1.5 rounded-lg bg-surface-sunken p-3.5">
              <div className="text-sm font-medium text-ink">“{assessment.question}”</div>
              <div className="mt-1.5 text-xs text-muted">{t('decisionBrief.evaluationLabel')} {assessment.statusHeadline}</div>
            </div>
          </section>

          {/* 2. Observed signal */}
          <section>
            <div className={sectionLabel}>{t('decisionBrief.section2')}</div>
            <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{assessment.signal.observation}</p>
            <div className="mt-1.5 text-xs text-muted flex flex-wrap gap-x-4 gap-y-1">
              <span>{t('decisionBrief.scopeLabel')} {assessment.signal.spatialScope}</span>
              <span className="text-hairline-strong">·</span>
              <span>{t('decisionBrief.windowLabel')} {assessment.signal.temporalWindow}</span>
            </div>
          </section>

          {/* 3. Supporting evidence */}
          <section>
            <div className={sectionLabel}>{t('decisionBrief.section3')}</div>
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
            <div className={sectionLabel}>{t('decisionBrief.section4')}</div>
            <ul className="mt-1.5 space-y-1 text-sm text-ink-soft">
              {assessment.interpretation.inferences.map((inf, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-data">→</span>
                  <span>{inf}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 rounded-lg bg-surface-sunken p-2.5 text-xs text-muted">
              <span className="font-semibold text-ink block mb-0.5">{t('decisionBrief.physicalMechanismLabel')}</span>
              {assessment.interpretation.plausibleMechanisms}
            </div>
          </section>

          {/* 5. Evidence limits */}
          <section className="rounded-lg bg-hati-soft border border-hati/25 p-3.5">
            <div className="text-xs font-semibold text-hati-strong uppercase tracking-wide mb-1.5">
              {t('decisionBrief.section5')}
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
            <div className={sectionLabel}>{t('decisionBrief.section6')}</div>
            <div className="mt-2 space-y-2">
              {assessment.competingExplanations.map((exp, idx) => (
                <div key={idx} className="rounded-lg bg-surface-sunken p-2.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-sm font-medium text-ink">{exp.explanation}</span>
                    <span className="meta-label rounded-full border border-hairline bg-surface px-2 py-0.5">
                      {localizeEvaluationLabel(exp.evaluation, locale)}
                    </span>
                  </div>
                  <p className="text-xs text-muted">{exp.reasoning}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Decision implication */}
          <section>
            <div className={sectionLabel}>{t('decisionBrief.section7')}</div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg bg-surface-sunken p-3">
                <div className="text-xs font-semibold text-ink mb-1.5">{t('decisionBrief.managerialConsiderationsLabel')}</div>
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
                <div className="text-xs font-semibold text-ink mb-1.5">{t('decisionBrief.cautionsGuardrailsLabel')}</div>
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
            <div className={sectionLabel}>{t('decisionBrief.section8')}</div>
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
              <div>{t('decisionBrief.signOffSystem')}</div>
              <div>{t('decisionBrief.signOffAttribution')}</div>
            </div>
            <div className="sm:text-right">
              <div>{t('decisionBrief.signOffVersion')}</div>
              <div>{t('decisionBrief.signOffValidation')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
