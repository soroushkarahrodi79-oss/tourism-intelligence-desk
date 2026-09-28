import React from 'react';
import { TerritoryId } from '../types';
import { ShieldCheck, FileText, Github, Languages } from 'lucide-react';
import { useLocale } from '../i18n/LocaleProvider';

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
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-surface/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={`${import.meta.env.BASE_URL}brand/sk-monogram.png`}
            alt=""
            aria-hidden="true"
            className="w-10 h-10 object-contain shrink-0 brightness-0"
          />
          <div className="min-w-0">
            <div className="font-bold text-ink text-sm sm:text-[15px] leading-tight truncate">
              Tourism Intelligence Desk
            </div>
            <div className="text-[11px] text-muted leading-tight">
              {t('app.footerTagline')}
            </div>
          </div>
        </div>

        {/* Primary territory control */}
        <div
          role="group"
          aria-label={t('header.selectTerritoryAria')}
          className="hidden md:flex items-center gap-1 p-1 rounded-lg border border-hairline bg-surface-sunken"
        >
          <TerritoryTab
            active={activeTerritoryId === 'madrid-hati'}
            onClick={() => onSelectTerritory('madrid-hati')}
            dotClass="bg-hati"
            label={t('header.madridTab')}
          />
          <TerritoryTab
            active={activeTerritoryId === 'guadarrama-snto'}
            onClick={() => onSelectTerritory('guadarrama-snto')}
            dotClass="bg-snto"
            label={t('header.guadarramaTab')}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMethodology}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:bg-surface-sunken transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span>{t('header.methodology')}</span>
          </button>
          <button
            onClick={onOpenDecisionBrief}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-strong transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">{t('header.createBrief')}</span>
            <span className="sm:hidden">{t('header.briefShort')}</span>
          </button>
          <a
            href="https://github.com/soroushkarahrodi79-oss/tourism-intelligence-desk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-muted hover:text-ink hover:bg-surface-sunken transition-colors"
            title={t('header.sourceRepository')}
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
            aria-label={locale === 'en' ? t('header.switchToSpanish') : t('header.switchToEnglish')}
            title={locale === 'en' ? t('header.switchToSpanish') : t('header.switchToEnglish')}
            className="inline-flex items-center gap-1 p-2 rounded-md text-muted hover:text-ink hover:bg-surface-sunken transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          >
            <Languages className="w-4 h-4" />
            <span className="text-xs font-semibold">{locale === 'en' ? 'ES' : 'EN'}</span>
          </button>
        </div>
      </div>

      {/* Mobile territory control */}
      <div className="md:hidden border-t border-hairline px-4 py-2 flex items-center gap-1">
        <TerritoryTab
          active={activeTerritoryId === 'madrid-hati'}
          onClick={() => onSelectTerritory('madrid-hati')}
          dotClass="bg-hati"
          label={t('header.madridTab')}
          full
        />
        <TerritoryTab
          active={activeTerritoryId === 'guadarrama-snto'}
          onClick={() => onSelectTerritory('guadarrama-snto')}
          dotClass="bg-snto"
          label={t('header.guadarramaTab')}
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
