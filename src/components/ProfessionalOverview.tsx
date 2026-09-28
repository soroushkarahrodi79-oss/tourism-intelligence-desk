import React from 'react';
import {
  ArrowRight,
  Check,
  FileCheck2,
  GitCommitHorizontal,
  ShieldCheck,
  Target
} from 'lucide-react';
import { TerritoryId } from '../types';
import { TERRITORY_CASES } from '../data/cases';
import { useLocale } from '../i18n/LocaleProvider';
import { CURATED_QUESTIONS_ES } from '../i18n/questionRouting';

interface ProfessionalOverviewProps {
  onRunGuidedQuestion: (territoryId: TerritoryId, question: string) => void;
  onOpenMethodology: () => void;
  onOpenDecisionBrief: () => void;
}

interface GuidedPath {
  step: string;
  territory: TerritoryId;
  englishQuestion: string;
  accent: string;
}

const guidedPaths: GuidedPath[] = [
  {
    step: '01',
    territory: 'madrid-hati',
    englishQuestion: 'What did the HATI-Madrid pilot actually demonstrate?',
    accent: 'text-hati-strong'
  },
  {
    step: '02',
    territory: 'guadarrama-snto',
    englishQuestion: 'Does the Maliciosa-Porrones NDVI decline prove tourism damage?',
    accent: 'text-snto-strong'
  },
  {
    step: '03',
    territory: 'guadarrama-snto',
    englishQuestion: 'Can SNTO justify closing trails or restricting visitor quotas?',
    accent: 'text-brand'
  }
];

export const ProfessionalOverview: React.FC<ProfessionalOverviewProps> = ({
  onRunGuidedQuestion,
  onOpenMethodology,
  onOpenDecisionBrief
}) => {
  const { locale, t } = useLocale();

  const capabilities = [
    { icon: Target, title: t('professionalOverview.capability1Title'), body: t('professionalOverview.capability1Body') },
    { icon: ShieldCheck, title: t('professionalOverview.capability2Title'), body: t('professionalOverview.capability2Body') },
    { icon: GitCommitHorizontal, title: t('professionalOverview.capability3Title'), body: t('professionalOverview.capability3Body') }
  ];

  const guidedDisplay = [
    { kicker: t('professionalOverview.guided1Kicker'), title: t('professionalOverview.guided1Title'), cue: t('professionalOverview.guided1Cue') },
    { kicker: t('professionalOverview.guided2Kicker'), title: t('professionalOverview.guided2Title'), cue: t('professionalOverview.guided2Cue') },
    { kicker: t('professionalOverview.guided3Kicker'), title: t('professionalOverview.guided3Title'), cue: t('professionalOverview.guided3Cue') }
  ];

  const questionForPath = (p: GuidedPath): string => {
    if (locale !== 'es') return p.englishQuestion;
    const englishIdx = TERRITORY_CASES[p.territory].sampleQuestions.indexOf(p.englishQuestion);
    return englishIdx !== -1 ? CURATED_QUESTIONS_ES[p.territory][englishIdx] : p.englishQuestion;
  };

  return (
    <section className="border-b border-hairline bg-surface px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.7fr] gap-8 xl:gap-12 items-start">
          {/* What it is */}
          <div>
            <div className="eyebrow">{t('professionalOverview.eyebrow')}</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
              {t('professionalOverview.title')}
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              {t('professionalOverview.body')}
            </p>

            <ul className="mt-5 space-y-2.5">
              {[
                <>{t('professionalOverview.bullet1')}</>,
                <>
                  {t('professionalOverview.bullet2Prefix')}
                  <span className="font-semibold text-ink">{t('professionalOverview.bullet2Bold')}</span>
                  {t('professionalOverview.bullet2Suffix')}
                </>,
                <>{t('professionalOverview.bullet3')}</>
              ].map((node, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft leading-relaxed">
                  <Check className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span>{node}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                onClick={onOpenDecisionBrief}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3.5 py-2 text-sm font-semibold text-white hover:bg-brand-strong transition-colors"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>{t('professionalOverview.viewBriefBtn')}</span>
              </button>
              <button
                onClick={onOpenMethodology}
                className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-3.5 py-2 text-sm font-medium text-ink-soft hover:border-hairline-strong transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-brand" />
                <span>{t('professionalOverview.inspectRulesBtn')}</span>
              </button>
            </div>
          </div>

          {/* Capabilities + guided evaluation */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {capabilities.map(({ icon: Icon, title, body }) => (
                <div key={title}>
                  <div className="inline-grid place-items-center w-9 h-9 rounded-lg bg-brand-soft text-brand mb-2.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <div className="studio-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-ink">{t('professionalOverview.evaluationPathTitle')}</h3>
                  <p className="text-xs text-muted mt-0.5">
                    {t('professionalOverview.evaluationPathBody')}
                  </p>
                </div>
                <span className="meta-label rounded-full border border-hairline px-2.5 py-1">
                  {t('professionalOverview.noLlmChip')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {guidedPaths.map((p, idx) => (
                  <button
                    key={p.step}
                    onClick={() => onRunGuidedQuestion(p.territory, questionForPath(p))}
                    className="group text-left rounded-xl border border-hairline bg-surface p-3.5 hover:border-hairline-strong hover:shadow-[var(--shadow-card)] transition-all"
                  >
                    <div className={`text-[11px] font-semibold ${p.accent}`}>
                      {p.step} · {guidedDisplay[idx].kicker}
                    </div>
                    <div className="mt-1.5 text-sm font-medium text-ink leading-snug">{guidedDisplay[idx].title}</div>
                    <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] text-muted group-hover:text-ink">
                      <span>{guidedDisplay[idx].cue}</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
