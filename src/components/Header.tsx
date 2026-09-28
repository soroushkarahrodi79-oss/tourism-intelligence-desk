import React from 'react';
import { TerritoryId } from '../types';
import { ShieldCheck, FileText, Github } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-surface/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-brand text-white font-mono font-semibold text-xs shrink-0">
            TID
          </span>
          <div className="min-w-0">
            <div className="font-bold text-ink text-sm sm:text-[15px] leading-tight truncate">
              Tourism Intelligence Desk
            </div>
            <div className="text-[11px] text-muted leading-tight">
              Evidence → Decision → Action
            </div>
          </div>
        </div>

        {/* Primary territory control */}
        <div
          role="group"
          aria-label="Select territory"
          className="hidden md:flex items-center gap-1 p-1 rounded-lg border border-hairline bg-surface-sunken"
        >
          <TerritoryTab
            active={activeTerritoryId === 'madrid-hati'}
            onClick={() => onSelectTerritory('madrid-hati')}
            dotClass="bg-hati"
            label="Madrid — HATI"
          />
          <TerritoryTab
            active={activeTerritoryId === 'guadarrama-snto'}
            onClick={() => onSelectTerritory('guadarrama-snto')}
            dotClass="bg-snto"
            label="Guadarrama — SNTO"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMethodology}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:bg-surface-sunken transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span>Methodology</span>
          </button>
          <button
            onClick={onOpenDecisionBrief}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-strong transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Create decision brief</span>
            <span className="sm:hidden">Brief</span>
          </button>
          <a
            href="https://github.com/soroushkarahrodi79-oss/tourism-intelligence-desk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-muted hover:text-ink hover:bg-surface-sunken transition-colors"
            title="Source repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Mobile territory control */}
      <div className="md:hidden border-t border-hairline px-4 py-2 flex items-center gap-1">
        <TerritoryTab
          active={activeTerritoryId === 'madrid-hati'}
          onClick={() => onSelectTerritory('madrid-hati')}
          dotClass="bg-hati"
          label="Madrid — HATI"
          full
        />
        <TerritoryTab
          active={activeTerritoryId === 'guadarrama-snto'}
          onClick={() => onSelectTerritory('guadarrama-snto')}
          dotClass="bg-snto"
          label="Guadarrama — SNTO"
          full
        />
      </div>
    </header>
  );
};

interface TerritoryTabProps {
  active: boolean;
  onClick: () => void;
  dotClass: string;
  label: string;
  full?: boolean;
}

const TerritoryTab: React.FC<TerritoryTabProps> = ({ active, onClick, dotClass, label, full }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
      full ? 'flex-1' : ''
    } ${
      active
        ? 'bg-surface text-ink shadow-[var(--shadow-card)]'
        : 'text-muted hover:text-ink'
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
    <span>{label}</span>
  </button>
);
