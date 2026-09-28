import React from 'react';
import { TerritoryId } from '../types';
import { TERRITORY_CASES } from '../data/cases';
import { Thermometer, Satellite, ArrowRight, ShieldCheck } from 'lucide-react';

interface CaseCardHeroProps {
  activeTerritoryId: TerritoryId;
  onSelectTerritory: (id: TerritoryId) => void;
  onOpenMethodology: () => void;
}

export const CaseCardHero: React.FC<CaseCardHeroProps> = ({
  activeTerritoryId,
  onSelectTerritory,
  onOpenMethodology
}) => {
  const madridCase = TERRITORY_CASES['madrid-hati'];
  const guadarramaCase = TERRITORY_CASES['guadarrama-snto'];

  return (
    <section className="relative border-b border-hairline bg-canvas studio-grid-motif">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Headline */}
        <div className="max-w-2xl">
          <div className="eyebrow flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span>Geospatial research · decision systems</span>
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.08] text-ink">
            From territorial signals to defensible tourism decisions.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
            Environmental, geospatial and tourism evidence transformed into transparent decision
            support — without hiding uncertainty.
          </p>
          <button
            onClick={onOpenMethodology}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-strong"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Why you can trust it — the epistemic charter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Research case cards */}
        <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* HATI — thermal (amber) */}
          <CaseCard
            active={activeTerritoryId === 'madrid-hati'}
            onSelect={() => onSelectTerritory('madrid-hati')}
            theme="hati"
            icon={<Thermometer className="w-5 h-5" />}
            index="Case study 01"
            kicker="Urban thermal intelligence"
            title="HATI Madrid"
            code={madridCase.code}
            summary="Thermal-method sensitivity & constraint-first opportunity screening."
            metricA={{
              value: madridCase.keyIndicators[0].value,
              label: 'observations changed classification'
            }}
            metricB={{
              value: madridCase.keyIndicators[1].value,
              label: 'scenarios changed candidate set'
            }}
            footnote="Reproduced research · model-derived thermal data"
            cta="Explore HATI"
          />

          {/* SNTO — environmental (forest) */}
          <CaseCard
            active={activeTerritoryId === 'guadarrama-snto'}
            onSelect={() => onSelectTerritory('guadarrama-snto')}
            theme="snto"
            icon={<Satellite className="w-5 h-5" />}
            index="Case study 02"
            kicker="Environmental monitoring"
            title="SNTO Sierra de Guadarrama"
            code={guadarramaCase.code}
            summary="Real Sentinel-2 evidence & evidence-proportionate public-use limits."
            metricA={{
              value: guadarramaCase.keyIndicators[0].value,
              label: 'monitored time-series assets'
            }}
            metricB={{
              value: guadarramaCase.keyIndicators[1].value,
              label: 'NDVI trend distribution (↑ / stable / ↓)'
            }}
            footnote="Real observations · derived indicators"
            cta="Explore SNTO"
          />
        </div>
      </div>
    </section>
  );
};

type Theme = 'hati' | 'snto';

interface CaseCardProps {
  active: boolean;
  onSelect: () => void;
  theme: Theme;
  icon: React.ReactNode;
  index: string;
  kicker: string;
  title: string;
  code: string;
  summary: string;
  metricA: { value: string; label: string };
  metricB: { value: string; label: string };
  footnote: string;
  cta: string;
}

// Complete literal class strings per theme so the Tailwind JIT resolves them.
const THEME: Record<Theme, {
  rail: string;
  iconWrap: string;
  kicker: string;
  ring: string;
  cta: string;
}> = {
  hati: {
    rail: 'before:bg-hati',
    iconWrap: 'bg-hati-soft text-hati-strong',
    kicker: 'text-hati-strong',
    ring: 'ring-hati/40 border-hati/30',
    cta: 'text-hati-strong'
  },
  snto: {
    rail: 'before:bg-snto',
    iconWrap: 'bg-snto-soft text-snto-strong',
    kicker: 'text-snto-strong',
    ring: 'ring-snto/40 border-snto/30',
    cta: 'text-snto-strong'
  }
};

const CaseCard: React.FC<CaseCardProps> = ({
  active,
  onSelect,
  theme,
  icon,
  index,
  kicker,
  title,
  code,
  summary,
  metricA,
  metricB,
  footnote,
  cta
}) => {
  const t = THEME[theme];
  return (
    <button
      onClick={onSelect}
      aria-pressed={active}
      className={`group relative w-full text-left studio-card p-5 sm:p-6 transition-all overflow-hidden
        before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:content-[''] ${t.rail}
        hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5
        ${active ? `ring-2 ${t.ring}` : 'hover:border-hairline-strong'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className={`text-xs font-semibold ${t.kicker}`}>
            {index} · {kicker}
          </div>
          <h2 className="mt-1.5 text-xl font-bold text-ink flex items-baseline gap-2">
            {title}
            <span className="text-xs font-medium font-mono text-faint">{code}</span>
          </h2>
          <p className="mt-1.5 text-sm text-muted leading-relaxed max-w-md">{summary}</p>
        </div>
        <span className={`shrink-0 grid place-items-center w-11 h-11 rounded-xl ${t.iconWrap}`}>
          {icon}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-extrabold text-ink font-mono tracking-tight">
            {metricA.value}
          </div>
          <div className="mt-0.5 text-xs text-muted leading-snug">{metricA.label}</div>
        </div>
        <div>
          <div className="text-2xl font-extrabold text-ink font-mono tracking-tight">
            {metricB.value}
          </div>
          <div className="mt-0.5 text-xs text-muted leading-snug">{metricB.label}</div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-hairline flex items-center justify-between gap-3">
        <span className="text-[11px] text-faint">{footnote}</span>
        <span className={`inline-flex items-center gap-1 text-sm font-semibold ${t.cta}`}>
          <span>{active ? 'Active case' : cta}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
};
