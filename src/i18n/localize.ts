import { EvidenceAssessment, TerritoryCase } from '../types';
import { Locale } from './LocaleProvider';
import { TERRITORY_CASES_ES } from './cases.es';
import { EVIDENCE_ASSESSMENTS_ES } from './assessments.es';
import { GUARDRAIL_TEMPLATES_ES } from './guardrailTemplates.es';
import { localizeUnit } from './units.es';

// ---------------------------------------------------------------------------
// localizeTerritory — never mutates its input; returns the canonical object
// unchanged for 'en', or a new shallow-merged object for 'es'. Only the
// presentational fields listed in TerritoryEsOverlay are overridden; code,
// center, zoom, bounds, dataStatus, referencePoints, stations and features
// always come straight from the canonical territory.
// ---------------------------------------------------------------------------
export function localizeTerritory(territory: TerritoryCase, locale: Locale): TerritoryCase {
  if (locale === 'en') return territory;
  const overlay = TERRITORY_CASES_ES[territory.id];
  if (!overlay) return territory;

  return {
    ...territory,
    title: overlay.title,
    subtitle: overlay.subtitle,
    description: overlay.description,
    focusTheme: overlay.focusTheme,
    satelliteBands: overlay.satelliteBands,
    keyIndicators: territory.keyIndicators.map((item, idx) => {
      const o = overlay.keyIndicators[idx];
      if (!o) return item;
      return { ...item, name: o.name, unit: o.unit, change: o.change };
    }),
    sampleQuestions: overlay.sampleQuestions.length === territory.sampleQuestions.length
      ? overlay.sampleQuestions
      : territory.sampleQuestions,
    dataStatusNote: overlay.dataStatusNote
  };
}

function mergeStringArray(canonical: string[], overlay?: string[]): string[] {
  if (!overlay || overlay.length !== canonical.length) return canonical;
  return overlay;
}

function mergeString(canonical: string, overlay?: string): string {
  return overlay && overlay.length > 0 ? overlay : canonical;
}

// ---------------------------------------------------------------------------
// localizeAssessment — never mutates its input.
//  - Curated assessments (stable ids like 'madrid-hati-q1') look up a
//    per-field text overlay from assessments.es.ts and deep-merge just the
//    presentational strings, preserving every number, id, enum, dataStatus,
//    citationUrl and coordinate from the canonical object.
//  - Dynamically generated fallback assessments (runtime ids such as
//    `eval-<territoryId>-<timestamp>`) are matched by their fixed English
//    statusHeadline against the 4 guardrail templates and localized that way.
// ---------------------------------------------------------------------------
export function localizeAssessment(
  assessment: EvidenceAssessment,
  locale: Locale,
  localizedTerritory?: TerritoryCase
): EvidenceAssessment {
  if (locale === 'en') return assessment;

  const curated = EVIDENCE_ASSESSMENTS_ES[assessment.id];
  if (curated) {
    return {
      ...assessment,
      question: mergeString(assessment.question, curated.question),
      statusHeadline: mergeString(assessment.statusHeadline, curated.statusHeadline),
      signal: {
        ...assessment.signal,
        observation: mergeString(assessment.signal.observation, curated.signal.observation),
        spatialScope: mergeString(assessment.signal.spatialScope, curated.signal.spatialScope),
        temporalWindow: mergeString(assessment.signal.temporalWindow, curated.signal.temporalWindow),
        summary: mergeString(assessment.signal.summary, curated.signal.summary)
      },
      evidence: {
        ...assessment.evidence,
        supportingDatasets: mergeStringArray(assessment.evidence.supportingDatasets, curated.evidence.supportingDatasets),
        metrics: assessment.evidence.metrics.map((m, idx) => {
          const o = curated.evidence.metrics[idx];
          if (!o) return { ...m, unit: localizeUnit(m.unit, locale) };
          return {
            ...m,
            label: mergeString(m.label, o.label),
            unit: localizeUnit(m.unit, locale),
            baseline: mergeString(m.baseline, o.baseline),
            delta: mergeString(m.delta, o.delta)
          };
        }),
        dataIntegrityNotes: mergeString(assessment.evidence.dataIntegrityNotes, curated.evidence.dataIntegrityNotes)
      },
      interpretation: {
        inferences: mergeStringArray(assessment.interpretation.inferences, curated.interpretation.inferences),
        plausibleMechanisms: mergeString(assessment.interpretation.plausibleMechanisms, curated.interpretation.plausibleMechanisms)
      },
      evidenceLimit: {
        strictlyForbiddenInferences: mergeStringArray(
          assessment.evidenceLimit.strictlyForbiddenInferences,
          curated.evidenceLimit.strictlyForbiddenInferences
        ),
        unobservedVariables: mergeStringArray(assessment.evidenceLimit.unobservedVariables, curated.evidenceLimit.unobservedVariables),
        spatialTemporalGaps: mergeString(assessment.evidenceLimit.spatialTemporalGaps, curated.evidenceLimit.spatialTemporalGaps)
      },
      competingExplanations: assessment.competingExplanations.map((exp, idx) => {
        const o = curated.competingExplanations[idx];
        if (!o) return exp;
        return {
          ...exp,
          category: mergeString(exp.category, o.category),
          explanation: mergeString(exp.explanation, o.explanation),
          reasoning: mergeString(exp.reasoning, o.reasoning),
          investigationNeeded: mergeString(exp.investigationNeeded, o.investigationNeeded)
          // evaluation stays the canonical English union value; display uses EVALUATION_LABELS_ES.
        };
      }),
      confidence: {
        ...assessment.confidence,
        justification: mergeStringArray(assessment.confidence.justification, curated.confidence.justification),
        marginOrInterval: mergeString(assessment.confidence.marginOrInterval || '', curated.confidence.marginOrInterval) || assessment.confidence.marginOrInterval
      },
      decisionImplication: {
        managerialConsiderations: mergeStringArray(
          assessment.decisionImplication.managerialConsiderations,
          curated.decisionImplication.managerialConsiderations
        ),
        cautionsAndGuardrails: mergeStringArray(
          assessment.decisionImplication.cautionsAndGuardrails,
          curated.decisionImplication.cautionsAndGuardrails
        ),
        policyPerspective: mergeStringArray(assessment.decisionImplication.policyPerspective, curated.decisionImplication.policyPerspective)
      },
      dataNeededNext: mergeStringArray(assessment.dataNeededNext, curated.dataNeededNext),
      provenance: assessment.provenance.map((p, idx) => {
        const o = curated.provenance[idx];
        if (!o) return p;
        return {
          ...p,
          sensorOrPlatform: mergeString(p.sensorOrPlatform, o.sensorOrPlatform),
          spatialResolution: mergeString(p.spatialResolution, o.spatialResolution),
          processingLevel: mergeString(p.processingLevel, o.processingLevel),
          sourceAuthority: mergeString(p.sourceAuthority, o.sourceAuthority)
          // citationUrl, temporalCoverage, dataStatus, isCalibratedProxy stay canonical.
        };
      })
    };
  }

  if (localizedTerritory) {
    return localizeGuardrailAssessment(assessment, localizedTerritory, locale);
  }

  return assessment;
}

// ---------------------------------------------------------------------------
// localizeGuardrailAssessment — for a dynamically generated fallback
// assessment (no static overlay by id), looks up its template by the
// canonical English statusHeadline and merges the Spanish template output
// on top. `localizedTerritory` must already be the Spanish-localized
// territory (so interpolated fragments like shortName/dataStatusNote read
// in Spanish too).
// ---------------------------------------------------------------------------
export function localizeGuardrailAssessment(
  assessment: EvidenceAssessment,
  localizedTerritory: TerritoryCase,
  locale: Locale
): EvidenceAssessment {
  if (locale === 'en') return assessment;
  const builder = GUARDRAIL_TEMPLATES_ES[assessment.statusHeadline];
  if (!builder) return assessment;

  const override = builder(localizedTerritory, assessment);
  return {
    ...assessment,
    ...override,
    signal: { ...assessment.signal, ...override.signal },
    evidence: { ...assessment.evidence, ...override.evidence },
    interpretation: { ...assessment.interpretation, ...override.interpretation },
    evidenceLimit: { ...assessment.evidenceLimit, ...override.evidenceLimit },
    confidence: { ...assessment.confidence, ...override.confidence },
    decisionImplication: { ...assessment.decisionImplication, ...override.decisionImplication }
  };
}
