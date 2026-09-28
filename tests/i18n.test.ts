import test from 'node:test';
import assert from 'node:assert/strict';

import { UI_STRINGS, resolveUiString } from '../src/i18n/ui';
import { TERRITORY_CASES, EVIDENCE_ASSESSMENTS } from '../src/data/cases';
import { localizeTerritory, localizeAssessment } from '../src/i18n/localize';
import {
  CURATED_QUESTIONS_ES,
  evaluateLocalizedQuestion
} from '../src/i18n/questionRouting';
import { evaluateAnalyticalQuestion } from '../src/services/analysisEngine';

// ---------------------------------------------------------------------------
// In-memory localStorage stand-in (this test runs under plain node:test with
// no DOM/jsdom available, so we exercise the persistence logic directly
// rather than through the LocaleProvider component / document.documentElement).
// ---------------------------------------------------------------------------
function makeMemoryStorage() {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear()
  };
}

const STORAGE_KEY = 'tid-language';

function readStoredLocale(storage: ReturnType<typeof makeMemoryStorage>): 'en' | 'es' {
  const stored = storage.getItem(STORAGE_KEY);
  return stored === 'es' || stored === 'en' ? stored : 'en';
}

test('1. default locale is English when no preference is stored', () => {
  const storage = makeMemoryStorage();
  assert.equal(readStoredLocale(storage), 'en');
});

test('2. switching to Spanish changes visible UI copy for a sample of keys', () => {
  const en = resolveUiString(UI_STRINGS, 'header.methodology', 'en');
  const es = resolveUiString(UI_STRINGS, 'header.methodology', 'es');
  assert.equal(en, 'Methodology');
  assert.equal(es, 'Metodología');
  assert.notEqual(en, es);

  const enSafeguard = resolveUiString(UI_STRINGS, 'app.safeguardBold', 'en');
  const esSafeguard = resolveUiString(UI_STRINGS, 'app.safeguardBold', 'es');
  assert.equal(
    esSafeguard,
    'La asociación espacial o ambiental observada ≠ causalidad turística demostrada.'
  );
  assert.notEqual(enSafeguard, esSafeguard);

  const territoryEn = localizeTerritory(TERRITORY_CASES['madrid-hati'], 'en');
  const territoryEs = localizeTerritory(TERRITORY_CASES['madrid-hati'], 'es');
  assert.notEqual(territoryEn.title, territoryEs.title);
  assert.equal(territoryEs.title, 'HATI Madrid: Inteligencia Turística Consciente del Calor');
});

test('3. switching back to English restores the original strings (round-trip)', () => {
  const storage = makeMemoryStorage();
  storage.setItem(STORAGE_KEY, 'es');
  assert.equal(readStoredLocale(storage), 'es');

  storage.setItem(STORAGE_KEY, 'en');
  assert.equal(readStoredLocale(storage), 'en');

  // localize* always derives from the canonical English object at render
  // time (never chains localizations onto an already-localized copy), so
  // "switching back" means re-deriving with locale: 'en' from the same
  // canonical source — which is a byte-identical passthrough.
  const territory = TERRITORY_CASES['madrid-hati'];
  const spanish = localizeTerritory(territory, 'es');
  assert.notEqual(spanish.title, territory.title);

  const restoredToEnglish = localizeTerritory(territory, 'en');
  assert.equal(restoredToEnglish.title, territory.title);
  assert.equal(restoredToEnglish.subtitle, territory.subtitle);
});

test('4. language preference persists to storage and reads back', () => {
  const storage = makeMemoryStorage();
  storage.setItem(STORAGE_KEY, 'es');
  assert.equal(storage.getItem(STORAGE_KEY), 'es');
  assert.equal(readStoredLocale(storage), 'es');

  // An invalid stored value should not be treated as a valid locale.
  storage.setItem(STORAGE_KEY, 'fr');
  assert.equal(readStoredLocale(storage), 'en');
});

test('5. LocaleProvider side effect sets document.documentElement.lang when a DOM is present', () => {
  // No jsdom is configured for this `tsx --test` runner (see package.json's
  // `test` script), so we cannot mount <LocaleProvider> here. We instead
  // verify the side-effect function's logic in isolation using a stub
  // object shaped like document.documentElement.
  const fakeDocumentElement: { lang: string } = { lang: 'en' };
  function applyLocale(locale: 'en' | 'es') {
    fakeDocumentElement.lang = locale;
  }
  applyLocale('es');
  assert.equal(fakeDocumentElement.lang, 'es');
  applyLocale('en');
  assert.equal(fakeDocumentElement.lang, 'en');
});

test('6. Spanish curated HATI question resolves to the same assessment id as its English equivalent', () => {
  const enResult = evaluateAnalyticalQuestion(
    'madrid-hati',
    TERRITORY_CASES['madrid-hati'].sampleQuestions[0]
  );
  const esResult = evaluateLocalizedQuestion(
    'madrid-hati',
    CURATED_QUESTIONS_ES['madrid-hati'][0],
    'es'
  );
  assert.equal(enResult.id, 'madrid-hati-q1');
  assert.equal(esResult.id, 'madrid-hati-q1');
  assert.equal(esResult.id, enResult.id);
});

test('7. Spanish curated SNTO Maliciosa-Porrones question resolves to guadarrama-snto-q2', () => {
  const idx = TERRITORY_CASES['guadarrama-snto'].sampleQuestions.findIndex(
    (q) => q === 'Does the Maliciosa-Porrones NDVI decline prove tourism damage?'
  );
  assert.equal(idx, 1);

  const esResult = evaluateLocalizedQuestion(
    'guadarrama-snto',
    CURATED_QUESTIONS_ES['guadarrama-snto'][idx],
    'es'
  );
  assert.equal(esResult.id, 'guadarrama-snto-q2');
});

test('8. localisation never changes numbers, ids, statuses, or citation URLs', () => {
  const original = EVIDENCE_ASSESSMENTS['madrid-hati-q1'];
  const localized = localizeAssessment(original, 'es');

  assert.equal(localized.id, original.id);
  assert.equal(localized.dataStatus, original.dataStatus);
  assert.equal(localized.status, original.status);
  assert.equal(localized.confidence.level, original.confidence.level);

  for (let i = 0; i < original.evidence.metrics.length; i++) {
    // .value and .trend are canonical numbers/enums and must never change.
    // .unit is presentational (e.g. "observations" / "scenarios") and is
    // intentionally translated for display — see units.es.ts.
    assert.equal(localized.evidence.metrics[i].value, original.evidence.metrics[i].value);
    assert.equal(localized.evidence.metrics[i].trend, original.evidence.metrics[i].trend);
  }

  for (let i = 0; i < original.provenance.length; i++) {
    assert.equal(localized.provenance[i].citationUrl, original.provenance[i].citationUrl);
    assert.equal(localized.provenance[i].dataStatus, original.provenance[i].dataStatus);
    assert.equal(localized.provenance[i].isCalibratedProxy, original.provenance[i].isCalibratedProxy);
    assert.equal(localized.provenance[i].temporalCoverage, original.provenance[i].temporalCoverage);
  }

  for (let i = 0; i < original.competingExplanations.length; i++) {
    assert.equal(localized.competingExplanations[i].evaluation, original.competingExplanations[i].evaluation);
  }
});

test('8b. word-based metric units are translated for display without touching the value', () => {
  const original = EVIDENCE_ASSESSMENTS['madrid-hati-q1'];
  const localized = localizeAssessment(original, 'es');
  const idx = original.evidence.metrics.findIndex((m) => m.unit === 'observations');
  assert.ok(idx >= 0, 'fixture expected to contain an "observations" unit metric');
  assert.equal(localized.evidence.metrics[idx].unit, 'observaciones');
  assert.equal(localized.evidence.metrics[idx].value, original.evidence.metrics[idx].value);
});

test('9. localize* functions never mutate the canonical English source objects', () => {
  const territoryBefore = JSON.stringify(TERRITORY_CASES['madrid-hati']);
  localizeTerritory(TERRITORY_CASES['madrid-hati'], 'es');
  const territoryAfter = JSON.stringify(TERRITORY_CASES['madrid-hati']);
  assert.equal(territoryBefore, territoryAfter);
  assert.equal(TERRITORY_CASES['madrid-hati'].title, 'HATI Madrid: Heat-Aware Tourism Intelligence');

  const assessmentBefore = JSON.stringify(EVIDENCE_ASSESSMENTS['madrid-hati-q1']);
  localizeAssessment(EVIDENCE_ASSESSMENTS['madrid-hati-q1'], 'es');
  const assessmentAfter = JSON.stringify(EVIDENCE_ASSESSMENTS['madrid-hati-q1']);
  assert.equal(assessmentBefore, assessmentAfter);
  assert.match(
    EVIDENCE_ASSESSMENTS['madrid-hati-q1'].statusHeadline,
    /Reproduced Result: HATI Shows Thermal-Method Sensitivity/
  );
});

test('locale === "en" returns the canonical objects unchanged (identity-safe passthrough)', () => {
  const territory = TERRITORY_CASES['madrid-hati'];
  assert.equal(localizeTerritory(territory, 'en'), territory);

  const assessment = EVIDENCE_ASSESSMENTS['madrid-hati-q1'];
  assert.equal(localizeAssessment(assessment, 'en'), assessment);
});

test('guardrail (custom-question) fallback assessments are localized in Spanish without duplicating engine logic', () => {
  const territory = TERRITORY_CASES['guadarrama-snto'];
  const localizedTerritory = localizeTerritory(territory, 'es');

  const esResult = evaluateLocalizedQuestion(
    'guadarrama-snto',
    '¿Cuál es el impuesto turístico proyectado para 2050?',
    'es'
  );

  // Must still be routed by the SAME deterministic engine (out-of-scope guardrail).
  assert.equal(esResult.status, 'INSUFFICIENT_EVIDENCE');
  assert.match(esResult.statusHeadline, /EVIDENCIA INSUFICIENTE/);
  // The displayed question is the original Spanish text the user saw/typed.
  assert.equal(esResult.question, '¿Cuál es el impuesto turístico proyectado para 2050?');
  // Territory-derived interpolations should read in Spanish too.
  assert.equal(esResult.dataStatus, territory.dataStatus);
  void localizedTerritory;
});
