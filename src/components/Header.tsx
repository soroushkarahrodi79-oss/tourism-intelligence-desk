import React from 'react';
import { TerritoryId } from '../types';
import { TERRITORY_CASES } from '../data/cases';
import { ShieldCheck, FileText, MapPin, Activity, Github } from 'lucide-react';

interface HeaderProps {
  activeTerritoryId: TerritoryId;
  onSelectTerritory: (id: TerritoryId) => void;
  onOpenDecisionBrief: () => void;
  onOpenMethodology: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTerritoryId,
  onSelectTerritory,
  onOpenDecisionBrief,
  onOpenMethodology
}) => {
  const currentCase = TERRITORY_CASES[activeTerritoryId];

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-emerald-400 font-mono font-semibold text-xs tracking-wider">
              TID
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-100 tracking-tight text-xs sm:text-sm uppercase">
                  Tourism Intelligence Desk
                </span>
                <span className="text-zinc-600 text-xs hidden sm:inline">|</span>
                <span className="text-xs text-zinc-400 font-normal hidden sm:inline">
                  Evidence → Decision → Action
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 font-mono flex items-center gap-2">
                <span className="text-zinc-400">{currentCase.code}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-300 truncate max-w-[200px] sm:max-w-none">{currentCase.shortName}</span>
                <span className="text-zinc-600 hidden md:inline">·</span>
                <span className="text-zinc-400 hidden md:inline">{currentCase.focusTheme}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Territory Switcher & Actions */}
        <div className="flex items-center gap-3">
          {/* Territory Segmented Toggle */}
          <div className="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded-md text-xs">
            <button
              onClick={() => onSelectTerritory('madrid-hati')}
              className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center gap-1.5 ${
                activeTerritoryId === 'madrid-hati'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="HATI Madrid: Thermal-Method Sensitivity & Opportunity Screening"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Madrid (HATI)</span>
            </button>
            <button
              onClick={() => onSelectTerritory('guadarrama-snto')}
              className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center gap-1.5 ${
                activeTerritoryId === 'guadarrama-snto'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="SNTO: Real Sentinel-2 Evidence & Decision Limits"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Guadarrama (SNTO)</span>
            </button>
          </div>

          {/* Scientific Integrity Rule Info */}
          <button
            onClick={onOpenMethodology}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800/80 transition-colors"
            title="Scientific Integrity Protocol & Epistemic Standards"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Epistemic Charter</span>
          </button>

          {/* Generate Decision Brief Button */}
          <button
            onClick={onOpenDecisionBrief}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="font-medium">Generate Decision Brief</span>
          </button>

          {/* Subtle Project Attribution Link */}
          <a
            href="https://github.com/soroushkarahrodi79-oss"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded border border-zinc-800 transition-colors"
            title="Research Project Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
