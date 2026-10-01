import React from 'react';
import { EvidenceAssessment, EvidenceConfidence } from '../types';
import {
  Activity,
  Lightbulb,
  AlertOctagon,
  Database,
  FileText,
  AlertTriangle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useLocale } from '../i18n/LocaleProvider';
import { localizeConfidenceLabel, localizeDataStatusLabel, localizeEvaluationLabel } from '../i18n/ui';

interface EvidenceAssessmentPanelProps {
  assessment: EvidenceAssessment;
  onOpenDecisionBrief: () => void;
}

const confidenceStyle = (level: EvidenceConfidence): string => {
  switch (level) {
    case 'High':
      return 'text-brand-strong bg-brand-soft border-brand/25';
    case 'Moderate':
      return 'text-hati-strong bg-hati-soft border-hati/25';
    case 'Low':
      return 'text-muted bg-surface-sunken border-hairline';
  }
};

export const EvidenceAssessmentPanel: React.FC<EvidenceAssessmentPanelProps> = ({
  assessment,
  onOpenDecisionBrief
}) => {
  const { locale, t } = useLocale();
  const isInsufficient = assessment.status === 'INSUFFICIENT_EVIDENCE';
  const isCorrelationWarning = assessment.status === 'CORRELATION_WARNING';
  const isBoundedData = assessment.dataStatus === 'Demonstration' || assessment.dataStatus === 'Proxy';
  const confidenceLabel = localizeConfidenceLabel(assessment.confidence.level, locale);

  return (
    <div className="studio-card overflow-hidden">
      {/* Status header */}
      <div className="p-4 sm:p-5 border-b border-hairline">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${confidenceStyle(
              assessment.confidence.level
            )}`}
          >
            {locale === 'es'
              ? `Confianza ${confidenceLabel}`
              : `${assessment.confidence.level} confidence`}
          </span>
          <span
            className={`meta-label rounded-full border px-2 py-0.5 ${
              isBoundedData ? 'border-hati/30 text-hati-strong' : 'border-hairline'
            }`}
          >
            {localizeDataStatusLabel(assessment.dataStatus, locale)}
          </span>
          <span className="meta-label ml-auto">{assessment.id}</span>
        </div>

        <h3 className="text-[15px] font-bold text-ink leading-snug">
          {assessment.statusHeadline}
        </h3>
        <p className="mt-1.5 text-xs text-muted leading-relaxed">
          {t('evidencePanel.hypothesis')} <span className="text-ink-soft">“{assessment.question}”</span>
        </p>

        {(isInsufficient || isCorrelationWarning) && (
          <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-hati-soft border border-hati/25 p-3">
            {isInsufficient ? (
              <AlertOctagon className="w-4 h-4 text-hati-strong shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-hati-strong shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-semibold text-hati-strong">
                {isInsufficient
                  ? t('evidencePanel.epistemicSafeguardTitle')
                  : t('evidencePanel.correlationRuleTitle')}
              </div>
              <p className="mt-0.5 text-xs text-hati-strong/85 leading-relaxed">
                {isInsufficient
                  ? t('evidencePanel.epistemicSafeguardBody')
                  : t('evidencePanel.correlationRuleBody')}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onOpenDecisionBrief}
          className="mt-3.5 w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-strong transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>{t('evidencePanel.generateBriefBtn')}</span>
        </button>
      </div>

      {/* Primary reasoning — the mental model */}
      <div className="p-4 sm:p-5 space-y-5">
        <ReasoningStep
          icon={<Activity className="w-4 h-4" />}
          tone="brand"
          heading={t('evidencePanel.observedSignalHeading')}
          question={t('evidencePanel.observedSignalQuestion')}
        >
          <p className="text-sm text-ink-soft leading-relaxed">{assessment.signal.observation}</p>
          <dl className="mt-2.5 grid grid-cols-1 gap-1 text-xs">
            <div className="flex gap-2">
              <dt className="text-faint shrink-0">{t('evidencePanel.spatialScope')}</dt>
              <dd className="text-muted">{assessment.signal.spatialScope}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-faint shrink-0">{t('evidencePanel.temporalWindow')}</dt>
              <dd className="text-muted">{assessment.signal.temporalWindow}</dd>
            </div>
          </dl>
        </ReasoningStep>

        <ReasoningStep
          icon={<Lightbulb className="w-4 h-4" />}
          tone="data"
          heading={t('evidencePanel.supportedInterpretationHeading')}
          question={t('evidencePanel.supportedInterpretationQuestion')}
        >
          <ul className="space-y-1.5">
            {assessment.interpretation.inferences.map((inf, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-ink-soft leading-relaxed">
                <ChevronRight className="w-3.5 h-3.5 text-data shrink-0 mt-1" />
                <span>{inf}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 rounded-lg bg-surface-sunken p-2.5">
            <div className="text-[11px] font-semibold text-ink mb-0.5">{t('evidencePanel.physicalMechanism')}</div>
            <p className="text-xs text-muted leading-relaxed">
              {assessment.interpretation.plausibleMechanisms}
            </p>
          </div>
        </ReasoningStep>

        <ReasoningStep
          icon={<AlertOctagon className="w-4 h-4" />}
          tone="hati"
          heading={t('evidencePanel.evidenceLimitHeading')}
          question={t('evidencePanel.evidenceLimitQuestion')}
        >
          <ul className="space-y-1.5">
            {assessment.evidenceLimit.strictlyForbiddenInferences.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-ink-soft leading-relaxed">
                <span className="text-hati-strong font-bold shrink-0 mt-px">✕</span>
                <span>{lim}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 grid grid-cols-1 gap-2 text-xs">
            <div className="rounded-lg bg-surface-sunken p-2.5">
              <div className="text-[11px] font-semibold text-ink mb-1">{t('evidencePanel.unobservedVariables')}</div>
              <ul className="list-disc list-inside space-y-0.5 text-muted">
                {assessment.evidenceLimit.unobservedVariables.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-surface-sunken p-2.5">
              <div className="text-[11px] font-semibold text-ink mb-1">{t('evidencePanel.spatialTemporalGaps')}</div>
              <p className="text-muted leading-relaxed">
                {assessment.evidenceLimit.spatialTemporalGaps}
              </p>
            </div>
          </div>
        </ReasoningStep>

        <ReasoningStep
          icon={<Database className="w-4 h-4" />}
          tone="brand"
          heading={t('evidencePanel.nextEvidenceHeading')}
          question={t('evidencePanel.nextEvidenceQuestion')}
        >
          <ol className="space-y-1.5">
            {assessment.dataNeededNext.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-ink-soft leading-relaxed">
                <span className="font-mono text-xs text-brand shrink-0 mt-0.5">{idx + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </ReasoningStep>
      </div>

      {/* Decision implication */}
      <div className="px-4 sm:px-5 pb-5">
        <div className="rounded-xl border border-brand/20 bg-brand-soft/50 p-4">
          <h4 className="text-sm font-semibold text-brand-strong mb-2.5">{t('evidencePanel.decisionImplicationHeading')}</h4>
          <div className="space-y-3">
            <div>
              <div className="text-[11px] font-semibold text-ink mb-1">{t('evidencePanel.considerationsLabel')}</div>
              <ul className="space-y-1">
                {assessment.decisionImplication.managerialConsiderations.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-ink-soft leading-relaxed">
                    <span className="text-brand shrink-0">·</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-ink mb-1">{t('evidencePanel.cautionsLabel')}</div>
              <ul className="space-y-1">
                {assessment.decisionImplication.cautionsAndGuardrails.map((cg, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                    <span className="text-hati-strong shrink-0">·</span>
                    <span>{cg}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary — progressive disclosure */}
      <div className="border-t border-hairline divide-y divide-hairline">
        <Disclosure label={t('evidencePanel.supportingEvidenceDisclosure')}>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {assessment.evidence.metrics.map((m, idx) => (
              <div key={idx} className="rounded-lg bg-surface-sunken p-2.5">
                <div className="text-[10px] text-faint truncate" title={m.label}>{m.label}</div>
                <div className="mt-0.5 text-sm font-bold font-mono text-ink">
                  {m.value} <span className="text-[11px] font-normal text-muted">{m.unit}</span>
                </div>
                <div className="text-[10px] text-muted truncate">{m.delta}</div>
                {m.isDemonstration && (
                  <div className="mt-1 text-[9px] text-hati-strong">{t('evidencePanel.demonstrationValueTag')}</div>
                )}
              </div>
            ))}
          </div>
          <ul className="space-y-1.5 mb-3">
            {assessment.evidence.supportingDatasets.map((ds, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-ink-soft leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-data shrink-0" />
                <span>{ds}</span>
              </li>
            ))}
          </ul>
          <dl className="text-[11px] text-muted space-y-1">
            <div className="flex justify-between gap-3">
              <dt className="text-faint">{t('evidencePanel.sampleRecordsLabel')}</dt>
              <dd className="text-right">{assessment.evidence.sampleSize}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-faint">{t('evidencePanel.locationLabel')}</dt>
              <dd className="text-right">{assessment.evidence.spatialCoordinates}</dd>
            </div>
          </dl>
        </Disclosure>

        <Disclosure label={t('evidencePanel.competingExplanationsDisclosure')}>
          <div className="space-y-2">
            {assessment.competingExplanations.map((exp, idx) => (
              <div key={idx} className="rounded-lg bg-surface-sunken p-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold text-ink">{exp.explanation}</span>
                  <span className="meta-label rounded-full border border-hairline bg-surface px-2 py-0.5">
                    {localizeEvaluationLabel(exp.evaluation, locale)}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">{exp.reasoning}</p>
                <p className="mt-1 text-[11px] text-ink-soft">
                  <span className="text-faint">{t('evidencePanel.investigationNeededLabel')} </span>
                  {exp.investigationNeeded}
                </p>
              </div>
            ))}
          </div>
        </Disclosure>

        <Disclosure label={t('evidencePanel.evidenceConfidenceDisclosure')}>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold mb-2.5 ${confidenceStyle(
              assessment.confidence.level
            )}`}
          >
            {locale === 'es' ? `Confianza ${confidenceLabel}` : `${assessment.confidence.level} confidence`}
          </span>
          <ul className="space-y-1.5 mb-2">
            {assessment.confidence.justification.map((just, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-ink-soft leading-relaxed">
                <span className="text-muted">·</span>
                <span>{just}</span>
              </li>
            ))}
          </ul>
          {assessment.confidence.marginOrInterval && (
            <div className="flex justify-between gap-3 rounded-lg bg-surface-sunken p-2.5 text-[11px]">
              <span className="text-faint">{t('evidencePanel.boundQualificationLabel')}</span>
              <span className="text-muted text-right">{assessment.confidence.marginOrInterval}</span>
            </div>
          )}
        </Disclosure>

        <Disclosure label={t('evidencePanel.provenanceDisclosure').replace('{n}', String(assessment.provenance.length))}>
          <div className="space-y-2">
            {assessment.provenance.map((prov, idx) => (
              <div key={idx} className="rounded-lg bg-surface-sunken p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-ink">{prov.sensorOrPlatform}</span>
                  <span className="meta-label rounded-full border border-hairline bg-surface px-2 py-0.5">
                    {localizeDataStatusLabel(prov.dataStatus || 'Proxy', locale)}
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-muted leading-relaxed">
                  {t('evidencePanel.authorityLabel')} {prov.sourceAuthority} · {t('evidencePanel.resolutionLabel')} {prov.spatialResolution} · {t('evidencePanel.processingLabel')}{' '}
                  {prov.processingLevel}
                </div>
                {prov.citationUrl && (
                  <a
                    href={prov.citationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-data hover:text-data-strong"
                  >
                    <span>{t('evidencePanel.referenceLink')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Disclosure>
      </div>
    </div>
  );
};

type Tone = 'brand' | 'data' | 'hati';

const TONE: Record<Tone, { chip: string }> = {
  brand: { chip: 'bg-brand-soft text-brand' },
  data: { chip: 'bg-data-soft text-data' },
  hati: { chip: 'bg-hati-soft text-hati-strong' }
};

interface ReasoningStepProps {
  icon: React.ReactNode;
  tone: Tone;
  heading: string;
  question: string;
  children: React.ReactNode;
}

const ReasoningStep: React.FC<ReasoningStepProps> = ({ icon, tone, heading, question, children }) => {
  const t = TONE[tone];
  return (
    <section className="relative">
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`grid place-items-center w-7 h-7 rounded-lg ${t.chip}`}>{icon}</span>
        <div>
          <h4 className="text-sm font-semibold text-ink leading-tight">{heading}</h4>
          <p className="text-[11px] text-faint leading-tight">{question}</p>
        </div>
      </div>
      <div className="mt-1.5">{children}</div>
    </section>
  );
};

const Disclosure: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <details className="group">
    <summary className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 cursor-pointer list-none">
      <span className="text-sm font-medium text-ink-soft">{label}</span>
      <ChevronRight className="w-4 h-4 text-muted transition-transform group-open:rotate-90" />
    </summary>
    <div className="px-4 sm:px-5 pb-4">{children}</div>
  </details>
);
