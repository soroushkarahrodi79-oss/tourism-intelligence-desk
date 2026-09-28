import React from 'react';
import { X, ShieldCheck, AlertTriangle, ExternalLink, GitCommitHorizontal } from 'lucide-react';
import { EVIDENCE_MANIFEST, EVIDENCE_MANIFEST_VERSION } from '../data/evidenceManifest';
import { BUILD_INFO, shortBuildSha } from '../data/buildInfo';
import { useLocale } from '../i18n/LocaleProvider';
import { localizeEvidenceManifest } from '../i18n/evidenceManifest.es';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  const { locale, t } = useLocale();
  if (!isOpen) return null;

  const EPISTEMIC_STEPS: { label: string; tone?: string }[] = [
    { label: t('methodology.step1') },
    { label: t('methodology.step2') },
    { label: t('methodology.step3') },
    { label: t('methodology.step4'), tone: 'text-hati-strong' },
    { label: t('methodology.step5') },
    { label: t('methodology.step6') },
    { label: t('methodology.step7'), tone: 'text-brand-strong' },
    { label: t('methodology.step8') }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/40 backdrop-blur-sm flex justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl studio-card shadow-[var(--shadow-lift)] overflow-hidden flex flex-col my-auto">
        {/* Header */}
        <div className="bg-surface-sunken border-b border-hairline px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-brand-soft text-brand">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-ink">{t('methodology.headerTitle')}</h3>
              <p className="text-xs text-muted">{t('methodology.headerSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface transition-colors"
            aria-label={t('decisionBrief.closeAria')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-sm text-ink-soft leading-relaxed overflow-y-auto max-h-[75vh]">
          {/* 1. Structure */}
          <section>
            <h4 className="text-sm font-semibold text-ink mb-2">
              {t('methodology.section1Title')}
            </h4>
            <p className="text-muted">
              {t('methodology.section1Body')}
            </p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              {EPISTEMIC_STEPS.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-lg bg-surface-sunken px-2.5 py-2 font-medium ${s.tone || 'text-ink-soft'}`}
                >
                  {s.label}
                </div>
              ))}
            </div>
          </section>

          {/* 2. Data status vs confidence */}
          <section className="rounded-xl bg-surface-sunken p-4">
            <h4 className="text-sm font-semibold text-ink mb-2">
              {t('methodology.section2Title')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-ink block mb-1">{t('methodology.dataStatusColumnTitle')}</span>
                <ul className="space-y-1 text-muted">
                  <li>{renderDef(t('methodology.demonstrationDef'))}</li>
                  <li>{renderDef(t('methodology.proxyDef'))}</li>
                  <li>{renderDef(t('methodology.derivedDef'))}</li>
                  <li>{renderDef(t('methodology.modelDerivedDef'))}</li>
                  <li>{renderDef(t('methodology.reproducedDef'))}</li>
                  <li>{renderDef(t('methodology.observedDef'))}</li>
                  <li>{renderDef(t('methodology.validatedDef'))}</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-ink block mb-1">{t('methodology.confidenceColumnTitle')}</span>
                <ul className="space-y-1 text-muted">
                  <li>{renderDef(t('methodology.lowDef'))}</li>
                  <li>{renderDef(t('methodology.moderateDef'))}</li>
                  <li>{renderDef(t('methodology.highDef'))}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Anti-causality */}
          <section className="rounded-xl bg-hati-soft border border-hati/20 p-4">
            <div className="flex items-center gap-2 text-hati-strong font-semibold text-sm mb-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t('methodology.section3Title')}</span>
            </div>
            <p className="text-xs text-ink-soft leading-relaxed">
              {t('methodology.section3Body')}
            </p>
            <div className="mt-2 text-xs space-y-1.5 text-muted">
              <div className="flex items-start gap-2">
                <span className="text-hati-strong font-bold">•</span>
                <span>{renderDef(t('methodology.ndviBullet'))}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-hati-strong font-bold">•</span>
                <span>{renderDef(t('methodology.uhiBullet'))}</span>
              </div>
            </div>
          </section>

          {/* 4. Insufficient evidence mandate */}
          <section className="rounded-xl bg-surface-sunken p-4">
            <h4 className="text-sm font-semibold text-ink mb-1.5">{t('methodology.section4Title')}</h4>
            <p className="text-xs text-muted leading-relaxed">
              {t('methodology.section4Body')}
            </p>
            <div className="mt-2 rounded-lg bg-surface border border-hati/25 p-2.5 font-mono text-xs text-hati-strong">
              {t('methodology.insufficientEvidenceQuote')}
            </div>
            <p className="mt-2 text-xs text-muted">
              {t('methodology.section4Note')}
            </p>
          </section>

          {/* 5. Immutable provenance */}
          <section className="rounded-xl bg-surface-sunken p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                <GitCommitHorizontal className="w-4 h-4 text-data shrink-0" />
                <span>{t('methodology.section5Title')}</span>
              </div>
              <span className="meta-label">{EVIDENCE_MANIFEST_VERSION}</span>
            </div>
            <p className="text-xs text-muted mb-3">
              {t('methodology.section5Body')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(EVIDENCE_MANIFEST).map((rawEntry) => {
                const entry = localizeEvidenceManifest(rawEntry, locale);
                const primaryCommit = Object.values(entry.immutableCommits).at(-1) || '';
                const primaryUrl = Object.values(entry.immutableSources)[0];
                return (
                  <div key={entry.caseId} className="rounded-lg bg-surface border border-hairline p-3">
                    <div className="text-xs font-semibold text-ink">
                      {entry.caseId === 'madrid-hati' ? t('methodology.hatiLabel') : t('methodology.sntoLabel')}
                    </div>
                    <div className="mt-1 text-[10px] text-faint">{entry.snapshotRole}</div>
                    <div className="mt-2 text-[10px] font-mono text-muted break-all">
                      {t('methodology.shaLabel')} <span className="text-data">{primaryCommit}</span>
                    </div>
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-data hover:text-data-strong"
                    >
                      <span>{t('methodology.openSnapshotLink')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-hairline flex flex-wrap items-center justify-between gap-2 meta-label">
              <span>App v{BUILD_INFO.appVersion} · build {shortBuildSha}</span>
              <span>{t('methodology.deploymentLabel')} {BUILD_INFO.deployment}</span>
            </div>
          </section>

          {/* Attribution */}
          <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
            <div>
              <span>{t('methodology.repoLabel')} </span>
              <a
                href="https://github.com/soroushkarahrodi79-oss"
                target="_blank"
                rel="noopener noreferrer"
                className="text-data hover:text-data-strong inline-flex items-center gap-1"
              >
                <span>github.com/soroushkarahrodi79-oss</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div>Tourism Intelligence Desk</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Renders "Label: rest of sentence" text where the label (before the first
// colon) is bolded, matching the original <strong>Label:</strong> markup.
function renderDef(text: string): React.ReactNode {
  const idx = text.indexOf(':');
  if (idx === -1) return text;
  const label = text.slice(0, idx + 1);
  const rest = text.slice(idx + 1);
  return (
    <>
      <strong className="text-ink-soft">{label}</strong>
      {rest}
    </>
  );
}
