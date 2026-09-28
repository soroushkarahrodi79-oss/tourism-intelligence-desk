import React, { useState } from 'react';
import { TerritoryId, MonitoringStation, SpatialFeature, EvidenceAssessment } from './types';
import { TERRITORY_CASES, EVIDENCE_ASSESSMENTS } from './data/cases';
import { EVIDENCE_MANIFEST } from './data/evidenceManifest';
import { Header } from './components/Header';
import { CaseCardHero } from './components/CaseCardHero';
import { ProfessionalOverview } from './components/ProfessionalOverview';
import { MapWorkspace } from './components/MapWorkspace';
import { QuestionInput } from './components/QuestionInput';
import { EvidenceAssessmentPanel } from './components/EvidenceAssessmentPanel';
import { DecisionBriefModal } from './components/DecisionBriefModal';
import { MethodologyModal } from './components/MethodologyModal';
import { useLocale } from './i18n/LocaleProvider';
import { localizeAssessment, localizeTerritory } from './i18n/localize';
import { evaluateLocalizedQuestion } from './i18n/questionRouting';
import {
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Satellite,
  GitCommitHorizontal,
  Lock
} from 'lucide-react';

export default function App() {
  const { locale, t } = useLocale();
  const [activeTerritoryId, setActiveTerritoryId] = useState<TerritoryId>('madrid-hati');
  const [activeQuestion, setActiveQuestion] = useState<string>(
    TERRITORY_CASES['madrid-hati'].sampleQuestions[0]
  );
  // `assessment` is always kept as the CANONICAL (English) EvidenceAssessment.
  // Localization happens only at render time so a language switch never
  // resets or re-routes the underlying case/answer.
  const [assessment, setAssessment] = useState<EvidenceAssessment>(
    EVIDENCE_ASSESSMENTS['madrid-hati-q1']
  );
  const [selectedStation, setSelectedStation] = useState<MonitoringStation | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<SpatialFeature | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modals state
  const [isDecisionBriefOpen, setIsDecisionBriefOpen] = useState<boolean>(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);

  const currentTerritory = localizeTerritory(TERRITORY_CASES[activeTerritoryId], locale);
  const currentEvidenceManifest = EVIDENCE_MANIFEST[activeTerritoryId];
  const isHati = activeTerritoryId === 'madrid-hati';
  const isBoundedData =
    currentTerritory.dataStatus === 'Demonstration' || currentTerritory.dataStatus === 'Proxy';

  // Full literal class strings so the Tailwind JIT can see them.
  const accent = isHati
    ? { dot: 'bg-hati', text: 'text-hati-strong', chip: 'border-hati/30 bg-hati-soft text-hati-strong' }
    : { dot: 'bg-snto', text: 'text-snto-strong', chip: 'border-snto/25 bg-snto-soft text-snto-strong' };

  // Handler when user switches territory
  const handleSelectTerritory = (id: TerritoryId) => {
    setActiveTerritoryId(id);
    setSelectedStation(null);
    setSelectedFeature(null);

    // Default to the first curated question for the selected evidence case.
    const defaultQ = TERRITORY_CASES[id].sampleQuestions[0];
    setActiveQuestion(defaultQ);

    const defaultAssessmentKey = id === 'madrid-hati' ? 'madrid-hati-q1' : 'guadarrama-snto-q1';
    setAssessment(EVIDENCE_ASSESSMENTS[defaultAssessmentKey]);
  };

  const handleRunGuidedQuestion = (id: TerritoryId, question: string) => {
    setActiveTerritoryId(id);
    setSelectedStation(null);
    setSelectedFeature(null);
    setActiveQuestion(question);
    setAssessment(evaluateLocalizedQuestion(id, question, locale));
    setIsLoading(false);

    window.setTimeout(() => {
      document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  // Handler when user asks a question
  const handleAskQuestion = (question: string) => {
    setActiveQuestion(question);
    setIsLoading(true);

    // Controlled assessment synthesis
    setTimeout(() => {
      const result = evaluateLocalizedQuestion(activeTerritoryId, question, locale);
      setAssessment(result);
      setIsLoading(false);
    }, 220);
  };

  const referenceSourceLabel =
    currentTerritory.dataStatus === 'Reproduced'
      ? 'AEMET · OSM · IGN/CNIG · EUMETSAT'
      : currentTerritory.dataStatus === 'Derived'
        ? 'Sentinel-2 · OAPN · PRUG'
        : 'Copernicus / Earth Observation Reference';

  const evidenceLayerLabel =
    currentTerritory.dataStatus === 'Reproduced'
      ? t('app.evidenceLayerLockedHati')
      : currentTerritory.dataStatus === 'Derived'
        ? t('app.evidenceLayerRealDerived')
        : t('app.evidenceLayerDemo');

  // The displayed assessment is derived at render time from the canonical
  // state, never stored localized — this is what makes a language switch
  // change only the displayed strings, not the underlying case/answer.
  const displayedAssessment = localizeAssessment(assessment, locale, currentTerritory);

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col">
      {/* 1. Header — brand, persistent territory switcher, primary actions */}
      <Header
        activeTerritoryId={activeTerritoryId}
        onSelectTerritory={handleSelectTerritory}
        onOpenDecisionBrief={() => setIsDecisionBriefOpen(true)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
      />

      {/* 2. Hero + research case cards */}
      <CaseCardHero
        activeTerritoryId={activeTerritoryId}
        onSelectTerritory={handleSelectTerritory}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
      />

      <ProfessionalOverview
        onRunGuidedQuestion={handleRunGuidedQuestion}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenDecisionBrief={() => setIsDecisionBriefOpen(true)}
      />

      {/* 3. Analysis workspace — spatial (≈65%) + decision assessment (≈35%) */}
      <main
        id="workspace"
        className="flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 scroll-mt-20"
      >
        {/* Workspace title bar */}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow flex items-center gap-2">
              <span>{t('app.activeWorkspace')}</span>
              <span className="text-hairline-strong">/</span>
              <span className="font-mono text-muted">{currentTerritory.code}</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold text-ink">
              {currentTerritory.title}
            </h2>
            <p className="mt-1.5 text-sm text-muted max-w-3xl leading-relaxed">
              {currentTerritory.subtitle}
            </p>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
              isBoundedData ? 'border-hati/30 bg-hati-soft text-hati-strong' : accent.chip
            }`}
            title={currentTerritory.dataStatusNote}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isBoundedData ? 'bg-hati' : accent.dot}`}
            />
            <span>{t('app.dataStatusPrefix')} {currentTerritory.dataStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 items-start">
          {/* ================= SPATIAL COLUMN (≈65%) ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* Spatial canvas */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                  <Satellite className="w-4 h-4 text-brand" />
                  {t('app.spatialContext')}
                </h3>
                <span className="text-xs text-faint">{t('app.spatialContextHint')}</span>
              </div>

              <MapWorkspace
                territory={currentTerritory}
                selectedStation={selectedStation}
                onSelectStation={setSelectedStation}
                selectedFeature={selectedFeature}
                onSelectFeature={setSelectedFeature}
              />

              {/* Always-visible epistemic safeguard — the causal boundary must
                  never be hidden behind disclosure. Calm, secondary, not an alert. */}
              <div className="flex items-start gap-2.5 rounded-lg border border-data/20 bg-data-soft/40 px-3.5 py-2.5">
                <ShieldCheck className="w-4 h-4 text-data shrink-0 mt-0.5" />
                <p className="text-xs text-ink-soft leading-relaxed">
                  <span className="font-semibold text-ink">
                    {t('app.safeguardBold')}
                  </span>{' '}
                  {t('app.safeguardExplain')}{' '}
                  <button
                    onClick={() => setIsMethodologyOpen(true)}
                    className="font-medium text-data hover:text-data-strong underline-offset-2 hover:underline"
                  >
                    {t('app.readCharter')}
                  </button>
                </p>
              </div>
            </div>

            {/* Analytical question */}
            <QuestionInput
              territory={currentTerritory}
              activeQuestion={activeQuestion}
              onAskQuestion={handleAskQuestion}
              isLoading={isLoading}
            />

            {/* Territorial indicators — quiet stat row, no boxed sidebar */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-sm font-semibold text-ink">{t('app.territorialIndicators')}</h3>
                <span className="meta-label">
                  {isBoundedData ? t('app.demonstrationValues') : t('app.evidenceBoundedValues')}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentTerritory.keyIndicators.map((item, idx) => (
                  <div key={idx} className="studio-card p-3.5">
                    <div className="text-xs text-muted leading-snug min-h-[2rem]">{item.name}</div>
                    <div className="mt-1.5 text-lg font-bold text-ink font-mono">
                      {item.value}
                    </div>
                    <div className="text-[11px] text-faint">{item.unit}</div>
                    <div className={`mt-1 text-[11px] ${accent.text}`}>{item.change}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Provenance & context — progressive disclosure, content preserved */}
            <details className="studio-card group overflow-hidden">
              <summary className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 cursor-pointer list-none">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <GitCommitHorizontal className="w-4 h-4 text-data" />
                  {t('app.evidenceSourcesDisclosure')}
                </span>
                <ChevronRight className="w-4 h-4 text-muted transition-transform group-open:rotate-90" />
              </summary>

              <div className="border-t border-hairline px-4 sm:px-5 py-5 space-y-6">
                {/* Data status note */}
                <div className="rounded-lg bg-surface-sunken p-3.5">
                  <div className="text-xs font-semibold text-ink mb-1">
                    {currentTerritory.dataStatus === 'Reproduced'
                      ? t('app.reproducedSnapshotLabel')
                      : currentTerritory.dataStatus === 'Derived'
                        ? t('app.realObservationsLabel')
                        : currentTerritory.dataStatus}
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {currentTerritory.dataStatusNote}
                  </p>
                </div>

                {/* Reference evidence sources */}
                <div>
                  <h4 className="text-xs font-semibold text-ink mb-2">{t('app.referenceEvidenceSources')}</h4>
                  <ul className="space-y-1.5">
                    {currentTerritory.satelliteBands.map((band, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-ink-soft leading-relaxed"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-data shrink-0" />
                        <span>{band}</span>
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[11px]">
                    <div className="flex justify-between gap-3">
                      <dt className="text-faint">{t('app.referenceSource')}</dt>
                      <dd className="font-mono text-muted text-right">{referenceSourceLabel}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-faint">{t('app.evidenceLayer')}</dt>
                      <dd className="font-mono text-muted text-right">{evidenceLayerLabel}</dd>
                    </div>
                  </dl>
                </div>

                {/* Audit snapshot */}
                <div className="border-t border-hairline pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-3.5 h-3.5 text-data" />
                    <h4 className="text-xs font-semibold text-ink">{t('app.auditSnapshot')}</h4>
                    <span className="ml-auto meta-label text-data">{t('app.immutable')}</span>
                  </div>
                  <dl className="space-y-2 text-xs">
                    <div>
                      <dt className="text-faint text-[11px]">{t('app.evidenceRole')}</dt>
                      <dd className="text-ink-soft">{currentEvidenceManifest.snapshotRole}</dd>
                    </div>
                    <div>
                      <dt className="text-faint text-[11px]">{t('app.pinnedCommit')}</dt>
                      <dd
                        className="font-mono text-data break-all"
                        title={currentEvidenceManifest.primaryCommit}
                      >
                        {currentEvidenceManifest.primaryCommit.slice(0, 12)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-faint text-[11px]">{t('app.evidenceBoundary')}</dt>
                      <dd className="text-muted leading-relaxed">
                        {currentEvidenceManifest.evidenceBoundary}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={currentEvidenceManifest.primarySourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-[11px] font-medium text-ink-soft hover:border-data/40 hover:text-data transition-colors"
                    >
                      <span>{t('app.openPinnedSource')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={currentEvidenceManifest.archivalRecord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-[11px] font-medium text-ink-soft hover:border-data/40 hover:text-data transition-colors"
                    >
                      <span>{t('app.openArchivalRecord')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </details>
          </div>

          {/* ================= ASSESSMENT COLUMN (≈35%) ================= */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">{t('app.evidenceAssessment')}</h3>
              <span className="meta-label">{t('app.decisionSupport')}</span>
            </div>
            <EvidenceAssessmentPanel
              assessment={displayedAssessment}
              onOpenDecisionBrief={() => setIsDecisionBriefOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="border-t border-hairline bg-surface px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span>Tourism Intelligence Desk</span>
              <span className="text-hairline-strong">·</span>
              <span className="text-muted font-normal">{t('app.footerTagline')}</span>
            </div>
            <p className="text-xs text-muted mt-1 max-w-xl leading-relaxed">
              {t('app.footerDescription')}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsMethodologyOpen(true)}
              className="text-muted hover:text-ink transition-colors"
            >
              {t('app.footerCharterBtn')}
            </button>
            <span className="text-hairline-strong">·</span>
            <a
              href="https://github.com/soroushkarahrodi79-oss/tourism-intelligence-desk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted hover:text-ink transition-colors"
            >
              <span>{t('app.footerSourceRepo')}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* 5. Modals */}
      <DecisionBriefModal
        isOpen={isDecisionBriefOpen}
        onClose={() => setIsDecisionBriefOpen(false)}
        assessment={displayedAssessment}
        territory={currentTerritory}
      />

      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
