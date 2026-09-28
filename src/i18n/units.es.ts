// Spanish display translations for the word-based `unit` strings used in
// EvidenceAssessment.evidence.metrics[].unit (src/data/cases.ts) and
// TerritoryCase.keyIndicators[].unit. Purely symbolic units (%, °C, m) or
// glossary/technical tokens (Kendall τ, #26, R/B/U, ↑ / stable / ↓) are left
// untranslated since they are not linguistic. This never changes the
// underlying numeric value the unit qualifies — display text only.
export const UNIT_LABELS_ES: Record<string, string> = {
  observations: 'observaciones',
  scenarios: 'escenarios',
  scenario: 'escenario',
  decisions: 'decisiones',
  decision: 'decisión',
  assets: 'activos',
  asset: 'activo',
  'asset scale': 'escala de activo',
  'asset/trail scale': 'escala de activo/sendero',
  trails: 'senderos',
  candidates: 'candidatos',
  'open in-radius options': 'opciones abiertas dentro del radio',
  dataset: 'conjunto de datos',
  sources: 'fuentes',
  state: 'estado',
  status: 'estado',
  action: 'acción',
  readiness: 'preparación',
  'real series': 'serie real',
  'target evidence': 'evidencia objetivo',
  'evidence pillar': 'pilar de evidencia',
  'evidence state': 'estado de evidencia',
  'claim ladder': 'escalera de afirmación',
  'curated cases': 'casos curados',
  'supported cases': 'casos respaldados',
  approx: 'aprox.',
  'approx.': 'aprox.'
};

export function localizeUnit(unit: string, locale: 'en' | 'es'): string {
  if (locale === 'en') return unit;
  return UNIT_LABELS_ES[unit] ?? unit;
}
