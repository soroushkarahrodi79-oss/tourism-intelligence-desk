import React, { useState } from 'react';
import { TerritoryId, MonitoringStation, SpatialFeature, EvidenceAssessment } from './types';
import { TERRITORY_CASES, EVIDENCE_ASSESSMENTS } from './data/cases';
import { evaluateAnalyticalQuestion } from './services/analysisEngine';
import { Header } from './components/Header';
import { CaseCardHero } from './components/CaseCardHero';
import { MapWorkspace } from './components/MapWorkspace';
import { QuestionInput } from './components/QuestionInput';
import { EvidenceAssessmentPanel } from './components/EvidenceAssessmentPanel';
import { DecisionBriefModal } from './components/DecisionBriefModal';
import { MethodologyModal } from './components/MethodologyModal';
import {
  MapPin,
  Satellite,
  Activity,
  ShieldCheck,
  FileText,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeTerritoryId, setActiveTerritoryId] = useState<TerritoryId>('madrid-hati');
  const [activeQuestion, setActiveQuestion] = useState<string>(
    'Is this area experiencing a meaningful environmental change?'
  );
  const [assessment, setAssessment] = useState<EvidenceAssessment>(
    EVIDENCE_ASSESSMENTS['madrid-hati-q1']
  );
  const [selectedStation, setSelectedStation] = useState<MonitoringStation | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<SpatialFeature | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modals state
  const [isDecisionBriefOpen, setIsDecisionBriefOpen] = useState<boolean>(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);

  const currentTerritory = TERRITORY_CASES[activeTerritoryId];

  // Handler when user switches territory
  const handleSelectTerritory = (id: TerritoryId) => {
    setActiveTerritoryId(id);
    setSelectedStation(null);
    setSelectedFeature(null);

    // Default question for selected territory
    const defaultQ = 'Is this area experiencing a meaningful environmental change?';
    setActiveQuestion(defaultQ);

    const defaultAssessmentKey = id === 'madrid-hati' ? 'madrid-hati-q1' : 'guadarrama-snto-q1';
    setAssessment(EVIDENCE_ASSESSMENTS[defaultAssessmentKey]);
  };

  // Handler when user asks a question
  const handleAskQuestion = (question: string) => {
    setActiveQuestion(question);
    setIsLoading(true);

    // Controlled assessment synthesis
    setTimeout(() => {
      const result = evaluateAnalyticalQuestion(activeTerritoryId, question);
      setAssessment(result);
      setIsLoading(false);
    }, 220);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-zinc-800 selection:text-zinc-100">
      {/* 1. Header with Brand, Territory Switcher, and Nav Actions */}
      <Header
        activeTerritoryId={activeTerritoryId}
        onSelectTerritory={handleSelectTerritory}
        onOpenDecisionBrief={() => setIsDecisionBriefOpen(true)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
      />

      {/* 2. Hero with Interactive Case Study Cards */}
      <CaseCardHero
        activeTerritoryId={activeTerritoryId}
        onSelectTerritory={handleSelectTerritory}
      />

      {/* 3. Main Analysis Workspace: LEFT / CENTER / RIGHT */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {/* Workspace Title Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
              <span>ACTIVE TERRITORIAL WORKSPACE</span>
              <span className="text-zinc-600">/</span>
              <span>{currentTerritory.code}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <span>{currentTerritory.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl">
              {currentTerritory.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>DATA STATUS: DEMONSTRATION</span>
            </div>
            <button
              onClick={() => setIsDecisionBriefOpen(true)}
              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Decision Support Brief</span>
            </button>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* =========================================================================
              LEFT COLUMN (3 cols): Territory / Case Selector & Territorial Indicators
             ========================================================================= */}
          <div className="lg:col-span-3 space-y-4">
            {/* Case Selector Card */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2.5 flex items-center justify-between">
                <span>Territory Selector</span>
                <span className="text-zinc-500">Step 1</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleSelectTerritory('madrid-hati')}
                  className={`w-full text-left p-3 rounded border transition-all flex items-start gap-2.5 ${
                    activeTerritoryId === 'madrid-hati'
                      ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="p-1 rounded bg-zinc-900 border border-zinc-700 text-amber-400 mt-0.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-xs text-zinc-100 flex items-center justify-between">
                      <span>Madrid (HATI)</span>
                      <span className="text-[10px] font-mono text-amber-400">Urban Core</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
                      Urban Heat & Pedestrian Exposure
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTerritory('guadarrama-snto')}
                  className={`w-full text-left p-3 rounded border transition-all flex items-start gap-2.5 ${
                    activeTerritoryId === 'guadarrama-snto'
                      ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="p-1 rounded bg-zinc-900 border border-zinc-700 text-emerald-400 mt-0.5 shrink-0">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-xs text-zinc-100 flex items-center justify-between">
                      <span>Sierra de Guadarrama</span>
                      <span className="text-[10px] font-mono text-emerald-400">Mountain Area</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
                      Environmental & Satellite Monitoring
                    </div>
                  </div>
                </button>
              </div>

              {/* Data Status Disclaimer with Tooltip */}
              <div className="mt-3.5 p-2.5 rounded bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
                <div className="flex items-center gap-1.5 text-zinc-300 font-semibold mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>DEMONSTRATION DATA</span>
                </div>
                <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                  Illustrative values used to demonstrate the analytical workflow. Not an operational project result.
                </p>
              </div>
            </div>

            {/* Territorial Key Indicators */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2.5 flex items-center justify-between">
                <span>Territorial Indicators</span>
                <span className="text-[10px] text-amber-400 font-normal">Demonstration Values</span>
              </div>

              <div className="space-y-2">
                {currentTerritory.keyIndicators.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-zinc-950 border border-zinc-800 font-mono"
                  >
                    <div className="text-[11px] text-zinc-400 truncate">{item.name}</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-sm font-semibold text-zinc-100">
                        {item.value} <span className="text-[11px] font-normal text-zinc-400">{item.unit}</span>
                      </span>
                      <span className="text-[10px] text-zinc-400">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reference Evidence Sources */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Satellite className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Reference Evidence Sources</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                  Reference Only
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Target satellite bands and observation platforms intended for operational integration:
              </p>
              <ul className="space-y-1 text-xs font-mono text-zinc-300">
                {currentTerritory.satelliteBands.map((band, idx) => (
                  <li key={idx} className="flex items-center justify-between text-[11px] text-zinc-400 py-0.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-zinc-500"></span>
                      <span>{band}</span>
                    </span>
                    <span className="text-[10px] text-zinc-500">Intended Spec</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 pt-2.5 border-t border-zinc-800/80 space-y-1 text-[11px] font-mono text-zinc-400">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-zinc-500">Reference Source:</span>
                  <span className="text-zinc-400">Copernicus / USGS Public Archives</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-zinc-500">Supplied Dataset:</span>
                  <span className="text-zinc-400">Curated Territorial Demonstration Vector</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-zinc-500">Prototype Input:</span>
                  <span className="text-zinc-400">Curated Demonstration Geometry & Station Records</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-zinc-500">Data Status:</span>
                  <span className="text-amber-400 font-medium">Demonstration Value</span>
                </div>
              </div>
            </div>

            {/* Anti-Causality Reminder Card */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-lg p-3.5 text-xs">
              <div className="flex items-center gap-2 text-zinc-300 font-medium mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Anti-Causality Rule Active</span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Correlation is never converted into causation. Environmental changes (such as NDVI decline or urban heat) consider all competing hypotheses: meteorology, drought, phenology, wildfire, land management, and sensor effects.
              </p>
              <button
                onClick={() => setIsMethodologyOpen(true)}
                className="mt-2 text-zinc-300 hover:text-white text-[11px] font-medium flex items-center gap-1 font-mono cursor-pointer underline"
              >
                <span>Read Epistemic Charter</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* =========================================================================
              CENTER COLUMN (5 cols): Spatial Context & Question Input
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            {/* Spatial Context / GIS Map */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-300 uppercase tracking-wider">Spatial Context</span>
                  <span className="text-zinc-600">·</span>
                  <span>GIS Analytical Workspace</span>
                </div>
                <div className="text-[11px] text-zinc-400">Click polygons or nodes to inspect</div>
              </div>

              <MapWorkspace
                territory={currentTerritory}
                selectedStation={selectedStation}
                onSelectStation={setSelectedStation}
                selectedFeature={selectedFeature}
                onSelectFeature={setSelectedFeature}
              />
            </div>

            {/* Analytical Question Input (Step 2) */}
            <QuestionInput
              territory={currentTerritory}
              activeQuestion={activeQuestion}
              onAskQuestion={handleAskQuestion}
              isLoading={isLoading}
            />
          </div>

          {/* =========================================================================
              RIGHT COLUMN (4 cols): Structured Evidence Assessment Panel
             ========================================================================= */}
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-300 uppercase tracking-wider">Evidence Assessment</span>
                <span className="text-zinc-600">·</span>
                <span>Decision Support</span>
              </div>
              <span className="text-zinc-300 font-medium">8 Sections</span>
            </div>

            <EvidenceAssessmentPanel
              assessment={assessment}
              onOpenDecisionBrief={() => setIsDecisionBriefOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 px-4 sm:px-6 lg:px-8 py-7 mt-10 text-xs text-zinc-400 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <span>TOURISM INTELLIGENCE DESK</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Evidence → Decision → Action</span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">
              Decision-support interface for destination management organisations, tourism analysts, sustainability teams, and researchers.
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsMethodologyOpen(true)}
              className="text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
            >
              Epistemic Charter & Standards
            </button>
            <span className="text-zinc-700">·</span>
            <a
              href="https://github.com/soroushkarahrodi79-oss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white flex items-center gap-1 underline"
            >
              <span>github.com/soroushkarahrodi79-oss</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* 5. Modals */}
      <DecisionBriefModal
        isOpen={isDecisionBriefOpen}
        onClose={() => setIsDecisionBriefOpen(false)}
        assessment={assessment}
        territory={currentTerritory}
      />

      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
