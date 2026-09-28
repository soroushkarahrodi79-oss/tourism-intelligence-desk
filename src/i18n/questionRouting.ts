import { EvidenceAssessment, TerritoryId } from '../types';
import { TERRITORY_CASES } from '../data/cases';
import { evaluateAnalyticalQuestion } from '../services/analysisEngine';
import { Locale } from './LocaleProvider';
import { localizeAssessment, localizeTerritory } from './localize';

// ---------------------------------------------------------------------------
// CURATED_QUESTIONS_ES — Spanish curated question text, index-aligned with
// TERRITORY_CASES[id].sampleQuestions (the canonical English order that
// analysisEngine.ts's curated-match blocks were written against).
// ---------------------------------------------------------------------------
export const CURATED_QUESTIONS_ES: Record<TerritoryId, string[]> = {
  'madrid-hati': [
    '¿Qué demostró realmente el piloto HATI-Madrid?',
    '¿Cambió la modificación del método térmico las clasificaciones de viabilidad turística?',
    '¿Cambió el cribado basado en restricciones el conjunto de candidatos frente a la línea base del más cercano abierto?',
    '¿Qué tan robustas fueron las decisiones de HATI bajo la incertidumbre probada?',
    '¿Demostró HATI que los turistas cambiaron su comportamiento debido al calor?'
  ],
  'guadarrama-snto': [
    '¿Qué muestra actualmente la evidencia real de SNTO en todo el PNSG?',
    '¿Demuestra el descenso del NDVI en Maliciosa-Porrones un impacto causado por el turismo?',
    '¿Puede SNTO justificar el cierre de senderos o la restricción de cupos de visitantes?',
    '¿Qué respalda realmente la capa OAPN de 218 senderos?',
    '¿Qué evidencia falta antes de que sea posible la atribución de presión turística?'
  ]
};

// ---------------------------------------------------------------------------
// canonicalizeSpanishGuardrailTerms — appends the English trigger words that
// analysisEngine.ts's `.includes()` checks look for, so a Spanish custom
// question still routes through the SAME deterministic engine. The original
// text is kept as a prefix; the extra English tokens are appended and used
// ONLY to steer routing (evaluateLocalizedQuestion overwrites `.question`
// with the original Spanish text afterwards).
// ---------------------------------------------------------------------------
const SPANISH_TRIGGER_MAP: [RegExp, string][] = [
  // Madrid / HATI curated-match vocabulary
  [/\bqu[eé]\s+demostr/i, 'what did actually demonstrate hati pilot'],
  [/resultado principal|titular/i, 'headline result'],
  [/piloto hati/i, 'hati pilot'],
  [/m[eé]todo t[eé]rmico/i, 'thermal method'],
  [/reclasificaci[oó]n|reclasific/i, 'reclass'],
  [/solweig/i, 'solweig'],
  [/clasificaciones de viabilidad/i, 'feasibility classifications'],
  [/conjunto de candidatos/i, 'candidate set'],
  [/basado en restricciones|primero por restricciones/i, 'constraint-first'],
  [/m[aá]s cercano abierto/i, 'nearest-open'],
  [/sin alternativa defendible/i, 'no defensible'],
  [/cribado/i, 'screening change'],
  [/robust/i, 'robust'],
  [/incertidumbre/i, 'uncertainty'],
  [/l[ií]mite|frontera/i, 'boundary'],
  [/inestable/i, 'unstable'],
  [/comportamiento de los? turistas?|comportamiento turístico|cambiaron su comportamiento/i, 'tourist behavior changed their behavior'],
  [/evitando/i, 'avoiding'],
  [/afluencia peatonal/i, 'footfall'],

  // Guadarrama / SNTO curated-match vocabulary
  [/\b218\b/i, '218'],
  [/capa oapn|capa de senderos/i, 'oapn layer trail layer'],
  [/evidencia (?:faltante|insuficiente|que falta)/i, 'what evidence is missing'],
  [/atribuci[oó]n de presi[oó]n (?:tur[ií]stica|de visitantes)/i, 'visitor pressure attribution'],
  [/validaci[oó]n de campo/i, 'field validation'],
  [/cerrar senderos|cierre de senderos/i, 'closing trails close trails closure'],
  [/cupos? de visitantes/i, 'visitor quotas quota'],
  [/restringir el acceso|restricci[oó]n de acceso/i, 'restrict access'],
  [/maliciosa/i, 'maliciosa'],
  [/da[nñ]o tur[ií]stico/i, 'tourism damage'],
  [/prueba? .* impacto causado por el turismo|demuestra .* turismo/i, 'ndvi decline prove'],
  [/pisoteo/i, 'trampling'],
  [/evidencia real de snto/i, 'real snto'],
  [/actualmente muestra|muestra actualmente/i, 'currently show'],
  [/pnsg/i, 'across the pnsg'],
  [/distribuci[oó]n de tendencia/i, 'trend distribution'],

  // Guardrail vocabulary (policy-change / causality-trap / out-of-scope)
  [/cambiar (?:la )?pol[ií]tica de inmediato|modificar (?:la )?pol[ií]tica/i, 'change policy immediately alter policy'],
  [/restringir el acceso de inmediato/i, 'restrict access immediately'],
  [/proh[ií]bi?r? (?:a )?los? turistas?|expulsar a los turistas|vetar a los visitantes/i, 'ban visitors'],
  [/intervenci[oó]n inmediata/i, 'immediate intervention'],
  [/causa|causalidad|demuestra|demostrar/i, 'cause prove'],
  [/culpa|responsable de/i, 'blame responsible'],
  [/turista|turistas|turismo/i, 'tourist'],
  [/visitante|visitantes/i, 'visitor'],
  [/multitud|aglomeraci[oó]n/i, 'crowd'],
  [/ingresos? hoteler[oa]s?/i, 'hotel revenue'],
  [/beneficio|ganancia/i, 'profit'],
  [/aerol[ií]nea/i, 'airline'],
  [/vuelo/i, 'flight'],
  [/nacionalidad/i, 'nationality'],
  [/impuesto/i, 'tax'],
  [/criptomoneda/i, 'cryptocurrency']
];

export function canonicalizeSpanishGuardrailTerms(question: string, locale: Locale): string {
  if (locale !== 'es') return question;
  const lower = question.toLowerCase();
  const extraTokens: string[] = [];
  for (const [pattern, englishTokens] of SPANISH_TRIGGER_MAP) {
    if (pattern.test(lower)) {
      extraTokens.push(englishTokens);
    }
  }
  if (extraTokens.length === 0) return question;
  return `${question} ${extraTokens.join(' ')}`;
}

// ---------------------------------------------------------------------------
// evaluateLocalizedQuestion — the single entry point App.tsx should call
// instead of evaluateAnalyticalQuestion directly. It never duplicates the
// scientific routing/guardrail logic; it only canonicalises the input text
// and localizes the output.
// ---------------------------------------------------------------------------
export function evaluateLocalizedQuestion(
  territoryId: TerritoryId,
  displayedQuestion: string,
  locale: Locale
): EvidenceAssessment {
  const territory = TERRITORY_CASES[territoryId];
  const localizedTerritory = localizeTerritory(territory, locale);

  if (locale === 'es') {
    const curatedIdx = CURATED_QUESTIONS_ES[territoryId].findIndex(
      (q) => q.trim().toLowerCase() === displayedQuestion.trim().toLowerCase()
    );
    if (curatedIdx !== -1) {
      const canonicalEnglish = territory.sampleQuestions[curatedIdx];
      const result = evaluateAnalyticalQuestion(territoryId, canonicalEnglish);
      return localizeAssessment(result, locale, localizedTerritory);
    }
  }

  const augmented = canonicalizeSpanishGuardrailTerms(displayedQuestion, locale);
  const result = evaluateAnalyticalQuestion(territoryId, augmented);
  // `question` is presentational only — restore exactly what the user saw/typed.
  result.question = displayedQuestion;
  return localizeAssessment(result, locale, localizedTerritory);
}
