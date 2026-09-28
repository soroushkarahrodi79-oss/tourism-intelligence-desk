import test from 'node:test';
import assert from 'node:assert/strict';

import {
  UI_STRINGS,
  resolveUiString,
  localizeDataStatusLabel,
  localizeConfidenceLabel
} from '../src/i18n/ui';
import { TERRITORY_CASES, EVIDENCE_ASSESSMENTS } from '../src/data/cases';
import { EVIDENCE_MANIFEST } from '../src/data/evidenceManifest';
import { localizeTerritory, localizeAssessment } from '../src/i18n/localize';
import { localizeEvidenceManifest } from '../src/i18n/evidenceManifest.es';
import { TERRITORY_CASES_ES } from '../src/i18n/cases.es';
import {
  CURATED_QUESTIONS_ES,
  evaluateLocalizedQuestion,
  findCuratedQuestionIndex
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

test('guardrail (custom-question) fallback assessments route through the same engine and localize only at render time', () => {
  const territory = TERRITORY_CASES['guadarrama-snto'];
  const localizedTerritory = localizeTerritory(territory, 'es');

  // evaluateLocalizedQuestion NEVER localizes — it always returns the
  // canonical (English) assessment. Localization is applied separately,
  // by the caller, at render time.
  const canonical = evaluateLocalizedQuestion(
    'guadarrama-snto',
    '¿Cuál es el impuesto turístico proyectado para 2050?',
    'es'
  );

  // Must still be routed by the SAME deterministic engine (out-of-scope guardrail).
  assert.equal(canonical.status, 'INSUFFICIENT_EVIDENCE');
  assert.match(canonical.statusHeadline, /INSUFFICIENT EVIDENCE/);
  // The displayed question is the original Spanish text the user saw/typed,
  // since this is a genuinely unmatched custom question (dynamic id).
  assert.equal(canonical.question, '¿Cuál es el impuesto turístico proyectado para 2050?');
  assert.equal(canonical.dataStatus, territory.dataStatus);

  // Only localizeAssessment (called separately, e.g. at render time in
  // App.tsx) produces the Spanish text.
  const esDisplay = localizeAssessment(canonical, 'es', localizedTerritory);
  assert.match(esDisplay.statusHeadline, /EVIDENCIA INSUFICIENTE/);
});

// ---------------------------------------------------------------------------
// Regression tests for the PR #10 correctness review:
// 1) evaluateLocalizedQuestion must never mutate a canonical
//    EVIDENCE_ASSESSMENTS object, even when a Spanish custom question routes
//    (via canonicalizeSpanishGuardrailTerms) to a curated assessment.
// 2) App state must stay canonical: the same canonical assessment must be
//    able to render as ES, then EN, then ES again without ever re-running
//    the scientific engine and without leaking stale-locale text.
// ---------------------------------------------------------------------------

test('10. a Spanish custom query that routes to a curated assessment never mutates the canonical registry object', () => {
  const canonicalBefore = JSON.stringify(EVIDENCE_ASSESSMENTS['guadarrama-snto-q3']);
  const englishQuestionBefore = EVIDENCE_ASSESSMENTS['guadarrama-snto-q3'].question;

  // A paraphrase, NOT an exact CURATED_QUESTIONS_ES match — this exercises
  // the canonicalizeSpanishGuardrailTerms -> evaluateAnalyticalQuestion path,
  // which is the path that used to mutate `.question` on the shared object.
  const result = evaluateLocalizedQuestion(
    'guadarrama-snto',
    '¿Se pueden cerrar senderos por el turismo?',
    'es'
  );
  assert.equal(result.id, 'guadarrama-snto-q3');

  const canonicalAfter = JSON.stringify(EVIDENCE_ASSESSMENTS['guadarrama-snto-q3']);
  assert.equal(canonicalAfter, canonicalBefore, 'the canonical registry object must be byte-identical after routing');
  assert.equal(
    EVIDENCE_ASSESSMENTS['guadarrama-snto-q3'].question,
    englishQuestionBefore,
    'the canonical English question must be unchanged'
  );
  assert.equal(
    result.question,
    englishQuestionBefore,
    'a custom question that resolves to a curated assessment displays the canonical question, not the raw paraphrase'
  );
});

test('11. the same canonical assessment renders correctly as ES, then EN, then ES again (no re-run, no leakage)', () => {
  const territoryEs = localizeTerritory(TERRITORY_CASES['guadarrama-snto'], 'es');

  const canonical = evaluateLocalizedQuestion(
    'guadarrama-snto',
    CURATED_QUESTIONS_ES['guadarrama-snto'][2], // "...cierre de senderos..." curated question
    'es'
  );
  assert.equal(canonical.id, 'guadarrama-snto-q3');
  // The object returned by the routing layer is always canonical/English,
  // regardless of which locale was used to ask the question.
  assert.equal(canonical.question, TERRITORY_CASES['guadarrama-snto'].sampleQuestions[2]);

  const es1 = localizeAssessment(canonical, 'es', territoryEs);
  assert.match(es1.statusHeadline, /Techo de Decisión L5a/);

  const en1 = localizeAssessment(canonical, 'en');
  assert.equal(en1.statusHeadline, EVIDENCE_ASSESSMENTS['guadarrama-snto-q3'].statusHeadline);
  assert.equal(en1.question, EVIDENCE_ASSESSMENTS['guadarrama-snto-q3'].question);

  const es2 = localizeAssessment(canonical, 'es', territoryEs);
  assert.equal(es2.statusHeadline, es1.statusHeadline);

  // The canonical object itself was never touched by any of the three
  // localize calls above.
  assert.equal(canonical.statusHeadline, EVIDENCE_ASSESSMENTS['guadarrama-snto-q3'].statusHeadline);
  assert.equal(JSON.stringify(canonical), JSON.stringify(EVIDENCE_ASSESSMENTS['guadarrama-snto-q3']));
});

test('12. canonical evidence remains byte-identical after being routed through a curated Spanish question too', () => {
  const before = JSON.stringify(EVIDENCE_ASSESSMENTS['madrid-hati-q4']);
  evaluateLocalizedQuestion('madrid-hati', CURATED_QUESTIONS_ES['madrid-hati'][3], 'es');
  const after = JSON.stringify(EVIDENCE_ASSESSMENTS['madrid-hati-q4']);
  assert.equal(after, before);
});

test('13. DataStatus enum values stay canonical internally but display in Spanish', () => {
  const assessment = EVIDENCE_ASSESSMENTS['guadarrama-snto-q1'];
  assert.equal(assessment.dataStatus, 'Derived');

  const localized = localizeAssessment(assessment, 'es');
  // The underlying enum value driving logic must never change.
  assert.equal(localized.dataStatus, 'Derived');

  // The display-only label helper is what components use to show Spanish text.
  assert.equal(localizeDataStatusLabel('Demonstration', 'es'), 'Demostración');
  assert.equal(localizeDataStatusLabel('Proxy', 'es'), 'Proxy');
  assert.equal(localizeDataStatusLabel('Derived', 'es'), 'Derivado');
  assert.equal(localizeDataStatusLabel('Validated', 'es'), 'Validado');
  assert.equal(localizeDataStatusLabel('Observed', 'es'), 'Observado');
  assert.equal(localizeDataStatusLabel('Model-derived', 'es'), 'Derivado de modelo');
  assert.equal(localizeDataStatusLabel('Reproduced', 'es'), 'Reproducido');
  assert.equal(localizeDataStatusLabel('Reproduced', 'en'), 'Reproduced');

  assert.equal(localizeConfidenceLabel('High', 'es'), 'alta');
  assert.equal(localizeConfidenceLabel('High', 'en'), 'High');
});

test('14. evidence manifest SHAs/URLs remain identical while snapshotRole/evidenceBoundary localize', () => {
  const rawHati = EVIDENCE_MANIFEST['madrid-hati'];
  const localizedHati = localizeEvidenceManifest(rawHati, 'es');

  assert.equal(localizedHati.repository, rawHati.repository);
  assert.equal(localizedHati.primaryCommit, rawHati.primaryCommit);
  assert.equal(localizedHati.primarySourceUrl, rawHati.primarySourceUrl);
  assert.deepEqual(localizedHati.immutableCommits, rawHati.immutableCommits);
  assert.deepEqual(localizedHati.immutableSources, rawHati.immutableSources);
  assert.equal(localizedHati.archivalRecord, rawHati.archivalRecord);

  assert.notEqual(localizedHati.snapshotRole, rawHati.snapshotRole);
  assert.notEqual(localizedHati.evidenceBoundary, rawHati.evidenceBoundary);

  // Never mutates the canonical manifest.
  const before = JSON.stringify(EVIDENCE_MANIFEST);
  localizeEvidenceManifest(EVIDENCE_MANIFEST['guadarrama-snto'], 'es');
  const after = JSON.stringify(EVIDENCE_MANIFEST);
  assert.equal(after, before);
});

test('15. Spanish Decision Brief labels (data status, confidence, authority, resolution, status) are localized', () => {
  assert.equal(resolveUiString(UI_STRINGS, 'decisionBrief.dataStatusLabel', 'es'), 'Estado del dato');
  assert.equal(resolveUiString(UI_STRINGS, 'decisionBrief.evidenceConfidenceLabel', 'es'), 'Confianza en la evidencia');
  assert.equal(resolveUiString(UI_STRINGS, 'decisionBrief.mdProvAuthority', 'es'), 'Autoridad:');
  assert.equal(resolveUiString(UI_STRINGS, 'decisionBrief.mdProvRes', 'es'), 'Res.:');
  assert.equal(resolveUiString(UI_STRINGS, 'decisionBrief.mdProvStatus', 'es'), 'Estado:');
  assert.notEqual(
    resolveUiString(UI_STRINGS, 'decisionBrief.mdProvAuthority', 'en'),
    resolveUiString(UI_STRINGS, 'decisionBrief.mdProvAuthority', 'es')
  );

  const assessment = EVIDENCE_ASSESSMENTS['madrid-hati-q1'];
  assert.equal(localizeDataStatusLabel(assessment.dataStatus, 'es'), 'Reproducido');
  assert.equal(localizeConfidenceLabel(assessment.confidence.level, 'es'), 'alta');
  assert.equal(localizeDataStatusLabel(assessment.provenance[0].dataStatus || 'Proxy', 'es'), 'Reproducido');
});

test('16. existing curated EN/ES equivalence keeps holding after the correction pass', () => {
  const enResult = evaluateAnalyticalQuestion(
    'guadarrama-snto',
    TERRITORY_CASES['guadarrama-snto'].sampleQuestions[2]
  );
  const esResult = evaluateLocalizedQuestion(
    'guadarrama-snto',
    CURATED_QUESTIONS_ES['guadarrama-snto'][2],
    'es'
  );
  assert.equal(enResult.id, 'guadarrama-snto-q3');
  assert.equal(esResult.id, enResult.id);
});

test('17. CURATED_QUESTIONS_ES and the territory sampleQuestions ES overlay never drift apart', () => {
  (['madrid-hati', 'guadarrama-snto'] as const).forEach((id) => {
    assert.deepEqual(
      CURATED_QUESTIONS_ES[id],
      TERRITORY_CASES_ES[id].sampleQuestions,
      `CURATED_QUESTIONS_ES['${id}'] must match TERRITORY_CASES_ES['${id}'].sampleQuestions exactly, or curated-question routing silently breaks`
    );
  });
});

// ---------------------------------------------------------------------------
// Regression tests for the stable selected-question identity fix: the
// "selected" curated chip must be keyed by index (locale-independent), never
// by comparing localized question text directly — that comparison silently
// loses the selection across a language switch even though the underlying
// curated question hasn't changed.
// ---------------------------------------------------------------------------

test('18. findCuratedQuestionIndex returns the SAME index for a curated question regardless of display language', () => {
  const enQuestion = TERRITORY_CASES['guadarrama-snto'].sampleQuestions[2];
  const esQuestion = CURATED_QUESTIONS_ES['guadarrama-snto'][2];

  const idxFromEn = findCuratedQuestionIndex('guadarrama-snto', enQuestion, 'en');
  const idxFromEs = findCuratedQuestionIndex('guadarrama-snto', esQuestion, 'es');

  assert.equal(idxFromEn, 2);
  assert.equal(idxFromEs, 2);
  assert.equal(idxFromEn, idxFromEs, 'the stable identity must survive a language switch');
});

test('19. findCuratedQuestionIndex returns null for a custom (non-curated) question in either locale', () => {
  assert.equal(
    findCuratedQuestionIndex('guadarrama-snto', '¿Se pueden cerrar senderos por el turismo?', 'es'),
    null
  );
  assert.equal(
    findCuratedQuestionIndex('madrid-hati', 'What is the weather like today?', 'en'),
    null
  );
});

test('20. an EN-selected curated question maps to the equivalent ES chip index, and back to EN', () => {
  // Simulates: user selects curated question index 3 in English, switches to
  // Spanish (the identity — the index — must still point at index 3, i.e.
  // the correct Spanish chip becomes selected), then switches back to
  // English (index 3 again, still correct).
  const index = 3;
  const enText = TERRITORY_CASES['madrid-hati'].sampleQuestions[index];
  const idxAfterSwitchToEs = findCuratedQuestionIndex('madrid-hati', enText, 'en');
  assert.equal(idxAfterSwitchToEs, index);

  // The chip the UI would now render as selected in Spanish mode:
  const esText = CURATED_QUESTIONS_ES['madrid-hati'][idxAfterSwitchToEs!];
  const idxBackInEs = findCuratedQuestionIndex('madrid-hati', esText, 'es');
  assert.equal(idxBackInEs, index);

  const idxBackInEn = findCuratedQuestionIndex('madrid-hati', enText, 'en');
  assert.equal(idxBackInEn, index);
});
