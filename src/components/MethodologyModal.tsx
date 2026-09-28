import React from 'react';
import { X, ShieldCheck, AlertTriangle, ExternalLink, GitCommitHorizontal } from 'lucide-react';
import { EVIDENCE_MANIFEST, EVIDENCE_MANIFEST_VERSION } from '../data/evidenceManifest';
import { BUILD_INFO, shortBuildSha } from '../data/buildInfo';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EPISTEMIC_STEPS: { label: string; tone?: string }[] = [
  { label: '1. Observed signal' },
  { label: '2. Supporting evidence' },
  { label: '3. Interpretation' },
  { label: '4. Evidence limit', tone: 'text-hati-strong' },
  { label: '5. Competing explanations' },
  { label: '6. Evidence confidence' },
  { label: '7. Decision implication', tone: 'text-brand-strong' },
  { label: '8. Data needed next' }
];

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
              <h3 className="text-sm font-bold text-ink">Scientific integrity &amp; epistemic charter</h3>
              <p className="text-xs text-muted">Methodological standards for tourism decision support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-sm text-ink-soft leading-relaxed overflow-y-auto max-h-[75vh]">
          {/* 1. Structure */}
          <section>
            <h4 className="text-sm font-semibold text-ink mb-2">
              1. The 8-part epistemic reasoning structure
            </h4>
            <p className="text-muted">
              The Tourism Intelligence Desk is designed for destination management organisations
              (DMOs), sustainability directors, tourism analysts, and researchers. It enforces a
              strict 8-part sequence for every analytical output:
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
              2. Strict distinction: data status vs. evidence confidence
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-ink block mb-1">Data status (the nature of the input)</span>
                <ul className="space-y-1 text-muted">
                  <li><strong className="text-ink-soft">Demonstration:</strong> Illustrative values used to test the analytical pipeline.</li>
                  <li><strong className="text-ink-soft">Proxy:</strong> Indirect evidence that is not equivalent to direct observation.</li>
                  <li><strong className="text-ink-soft">Derived:</strong> Indicator or statistic computed from observed evidence (for example NDVI or a trend test); derivation does not establish cause or field validation.</li>
                  <li><strong className="text-ink-soft">Model-derived:</strong> Output computed by an explicit physical or analytical model; not automatically observed or field validated.</li>
                  <li><strong className="text-ink-soft">Reproduced:</strong> A committed analysis chain was independently re-executed and matched its locked references.</li>
                  <li><strong className="text-ink-soft">Observed:</strong> Directly observed or measured data from a documented source.</li>
                  <li><strong className="text-ink-soft">Validated:</strong> Evidence that has passed a stated validation threshold for the specific claim.</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-ink block mb-1">Evidence confidence (support for this claim)</span>
                <ul className="space-y-1 text-muted">
                  <li><strong className="text-ink-soft">Low:</strong> The specific claim is weakly supported or substantially confounded.</li>
                  <li><strong className="text-ink-soft">Moderate:</strong> The claim has meaningful support but important uncertainty or evidence gaps remain.</li>
                  <li><strong className="text-ink-soft">High:</strong> The specific bounded claim is strongly supported by the available evidence; this does not upgrade the underlying data to a different status.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Anti-causality */}
          <section className="rounded-xl bg-hati-soft border border-hati/20 p-4">
            <div className="flex items-center gap-2 text-hati-strong font-semibold text-sm mb-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>3. Anti-causality rule: never convert correlation into causation</span>
            </div>
            <p className="text-xs text-ink-soft leading-relaxed">
              Environmental signals frequently co-occur with tourism without tourism being the causal mechanism.
            </p>
            <div className="mt-2 text-xs space-y-1.5 text-muted">
              <div className="flex items-start gap-2">
                <span className="text-hati-strong font-bold">•</span>
                <span>
                  <strong className="text-ink-soft">NDVI vegetation depletion:</strong> Must NOT automatically be interpreted as tourist trampling. The system systematically audits competing hypotheses including meteorological drought, extreme temperatures, phenology, wildfire, forestry/grazing management, and sensor/cloud shadow effects.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-hati-strong font-bold">•</span>
                <span>
                  <strong className="text-ink-soft">Urban heat island (UHI):</strong> Co-location of pedestrian crowds in mineral plazas does not establish pedestrian body heat as the source of the anomaly. Solar irradiance and thermal inertia of granite dominate metabolic flux by orders of magnitude.
                </span>
              </div>
            </div>
          </section>

          {/* 4. Insufficient evidence mandate */}
          <section className="rounded-xl bg-surface-sunken p-4">
            <h4 className="text-sm font-semibold text-ink mb-1.5">4. The “insufficient evidence” mandate</h4>
            <p className="text-xs text-muted leading-relaxed">
              When empirical data is insufficient, uncalibrated, or confounded, the system explicitly returns:
            </p>
            <div className="mt-2 rounded-lg bg-surface border border-hati/25 p-2.5 font-mono text-xs text-hati-strong">
              “INSUFFICIENT EVIDENCE — Available evidence does not establish causation”
            </div>
            <p className="mt-2 text-xs text-muted">
              The system refuses to force an unjustified recommendation or invent a conclusion.
            </p>
          </section>

          {/* 5. Immutable provenance */}
          <section className="rounded-xl bg-surface-sunken p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                <GitCommitHorizontal className="w-4 h-4 text-data shrink-0" />
                <span>5. Immutable evidence provenance</span>
              </div>
              <span className="meta-label">{EVIDENCE_MANIFEST_VERSION}</span>
            </div>
            <p className="text-xs text-muted mb-3">
              Evidence links in the decision engine are pinned to full Git commit SHAs rather than
              mutable <code className="text-data">main</code> URLs. A later source-repository edit
              therefore cannot silently change the evidence snapshot represented by this build.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(EVIDENCE_MANIFEST).map((entry) => {
                const primaryCommit = Object.values(entry.immutableCommits).at(-1) || '';
                const primaryUrl = Object.values(entry.immutableSources)[0];
                return (
                  <div key={entry.caseId} className="rounded-lg bg-surface border border-hairline p-3">
                    <div className="text-xs font-semibold text-ink">
                      {entry.caseId === 'madrid-hati' ? 'HATI Madrid' : 'SNTO Guadarrama'}
                    </div>
                    <div className="mt-1 text-[10px] text-faint">{entry.snapshotRole}</div>
                    <div className="mt-2 text-[10px] font-mono text-muted break-all">
                      SHA: <span className="text-data">{primaryCommit}</span>
                    </div>
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-data hover:text-data-strong"
                    >
                      <span>Open immutable source snapshot</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-hairline flex flex-wrap items-center justify-between gap-2 meta-label">
              <span>App v{BUILD_INFO.appVersion} · build {shortBuildSha}</span>
              <span>Deployment: {BUILD_INFO.deployment}</span>
            </div>
          </section>

          {/* Attribution */}
          <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
            <div>
              <span>Research project repository: </span>
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
