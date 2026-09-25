import React from 'react';
import { TerritoryId } from '../types';
import { TERRITORY_CASES } from '../data/cases';
import { Thermometer, Satellite, ArrowRight, ShieldCheck } from 'lucide-react';

interface CaseCardHeroProps {
  activeTerritoryId: TerritoryId;
  onSelectTerritory: (id: TerritoryId) => void;
}

export const CaseCardHero: React.FC<CaseCardHeroProps> = ({
  activeTerritoryId,
  onSelectTerritory
}) => {
  const madridCase = TERRITORY_CASES['madrid-hati'];
  const guadarramaCase = TERRITORY_CASES['guadarrama-snto'];

  return (
    <section className="border-b border-zinc-800 bg-zinc-950 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Headline & Subtitle */}
        <div className="max-w-3xl mb-7">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Decision Support Architecture · Destination Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
            From territorial signals to defensible tourism decisions.
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
            Transforming environmental, geospatial and field observations into transparent decision-support assessments with explicit evidence limits and uncertainty.
          </p>
          <div className="mt-3.5 flex flex-wrap items-center gap-2.5 text-xs text-zinc-400 font-mono">
            <span className="text-zinc-500">Evidence Modes:</span>
            <span className="bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">HATI · Reproduced Research</span>
            <span className="bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">UTCI · Model-Derived</span>
            <span className="bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">SNTO · Demonstration</span>
          </div>
        </div>

        {/* Case Studies Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: HATI Madrid */}
          <div
            onClick={() => onSelectTerritory('madrid-hati')}
            className={`group rounded-lg border p-5 transition-all cursor-pointer text-left ${
              activeTerritoryId === 'madrid-hati'
                ? 'bg-zinc-900 border-zinc-600 ring-1 ring-zinc-500'
                : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                  <span>CASE STUDY 01</span>
                  <span className="text-zinc-600">·</span>
                  <span>URBAN CORE</span>
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-zinc-100 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span>HATI Madrid</span>
                  <span className="text-xs font-normal text-zinc-400 font-mono">({madridCase.code})</span>
                </h2>
                <div className="text-xs text-zinc-300 mt-0.5">
                  Thermal-Method Sensitivity & Opportunity Screening
                </div>
              </div>
              <div className="p-2 rounded bg-zinc-800/80 border border-zinc-700 text-amber-400 shrink-0">
                <Thermometer className="w-4 h-4" />
              </div>
            </div>

            <p className="mt-3 text-xs text-zinc-400 leading-relaxed line-clamp-2">
              {madridCase.description}
            </p>

            {/* Quick Metrics Matrix */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase">{madridCase.keyIndicators[0].name}</div>
                <div className="text-sm font-semibold text-zinc-100 mt-0.5">
                  {madridCase.keyIndicators[0].value} {madridCase.keyIndicators[0].unit}
                </div>
                <div className="text-[10px] text-amber-400/90">{madridCase.keyIndicators[0].change}</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase">{madridCase.keyIndicators[1].name}</div>
                <div className="text-sm font-semibold text-zinc-100 mt-0.5">
                  {madridCase.keyIndicators[1].value} {madridCase.keyIndicators[1].unit}
                </div>
                <div className="text-[10px] text-zinc-400">{madridCase.keyIndicators[1].change}</div>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">DATA STATUS:</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 text-[10px]">
                  REPRODUCED · MODEL-DERIVED THERMAL INPUT
                </span>
              </div>
              <div className="flex items-center gap-1 font-medium text-zinc-300 group-hover:text-amber-300 transition-colors">
                <span>{activeTerritoryId === 'madrid-hati' ? 'Active Case' : 'Select Case'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: SNTO Sierra de Guadarrama */}
          <div
            onClick={() => onSelectTerritory('guadarrama-snto')}
            className={`group rounded-lg border p-5 transition-all cursor-pointer text-left ${
              activeTerritoryId === 'guadarrama-snto'
                ? 'bg-zinc-900 border-zinc-600 ring-1 ring-zinc-500'
                : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                  <span>CASE STUDY 02</span>
                  <span className="text-zinc-600">·</span>
                  <span>HIGH-MOUNTAIN PROTECTED AREA</span>
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                  <span>SNTO Sierra de Guadarrama</span>
                  <span className="text-xs font-normal text-zinc-400 font-mono">({guadarramaCase.code})</span>
                </h2>
                <div className="text-xs text-zinc-300 mt-0.5">
                  Environmental Monitoring & Earth Observation
                </div>
              </div>
              <div className="p-2 rounded bg-zinc-800/80 border border-zinc-700 text-emerald-400 shrink-0">
                <Satellite className="w-4 h-4" />
              </div>
            </div>

            <p className="mt-3 text-xs text-zinc-400 leading-relaxed line-clamp-2">
              {guadarramaCase.description}
            </p>

            {/* Quick Metrics Matrix */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase">{guadarramaCase.keyIndicators[0].name}</div>
                <div className="text-sm font-semibold text-zinc-100 mt-0.5">
                  {guadarramaCase.keyIndicators[0].value} {guadarramaCase.keyIndicators[0].unit}
                </div>
                <div className="text-[10px] text-emerald-400/90">{guadarramaCase.keyIndicators[0].change}</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase">{guadarramaCase.keyIndicators[1].name}</div>
                <div className="text-sm font-semibold text-zinc-100 mt-0.5">
                  {guadarramaCase.keyIndicators[1].value} {guadarramaCase.keyIndicators[1].unit}
                </div>
                <div className="text-[10px] text-zinc-400">{guadarramaCase.keyIndicators[1].change}</div>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">DATA STATUS:</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 text-[10px]">
                  DEMONSTRATION PROXY
                </span>
              </div>
              <div className="flex items-center gap-1 font-medium text-zinc-300 group-hover:text-emerald-300 transition-colors">
                <span>{activeTerritoryId === 'guadarrama-snto' ? 'Active Case' : 'Select Case'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
