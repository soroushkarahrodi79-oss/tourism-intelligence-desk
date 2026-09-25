import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAnalyticalQuestion } from '../src/services/analysisEngine';
import { HATI_REFERENCE_ASSETS } from '../src/data/hatiEvidence';
import { SNTO_REFERENCE_ASSETS, SNTO_REAL_EVIDENCE_METRICS } from '../src/data/sntoEvidence';

function dump(value: unknown): string {
  return JSON.stringify(value);
}

test('SNTO real evidence summary exposes the committed 6/14/1 trend distribution', () => {
  const result = evaluateAnalyticalQuestion(
    'guadarrama-snto',
    'What does the real SNTO evidence currently show across the PNSG?'
  );
  const serialized = dump(result);

  assert.equal(result.dataStatus, 'Derived');
  assert.match(result.statusHeadline, /Real Sentinel-2 Evidence/i);
  assert.match(serialized, /6.*significant NDVI greening/i);
  assert.match(serialized, /14.*no significant NDVI trend/i);
  assert.match(serialized, /1.*significant decline/i);
  assert.match(serialized, /tourism pressure.*not established|cannot identify tourism as the cause/i);
});

test('SNTO Maliciosa-Porrones assessment preserves the real signal but refuses tourism attribution', () => {
  const result = evaluateAnalyticalQuestion(
    'guadarrama-snto',
    'Does the Maliciosa-Porrones NDVI decline prove tourism damage?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.dataStatus, 'Derived');
  assert.match(serialized, /-0\.369/);
  assert.match(serialized, /\+0\.215/);
  assert.match(serialized, /No evidence currently identifies tourism as the causal driver/i);
  assert.match(serialized, /causal driver/i);
});

test('SNTO restrictive-management question remains below closure and quota threshold', () => {
  const result = evaluateAnalyticalQuestion(
    'guadarrama-snto',
    'Can SNTO justify closing trails or restricting visitor quotas?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.dataStatus, 'Derived');
  assert.match(serialized, /Decision Ceiling L5a/i);
  assert.match(serialized, /Trail-Level Visitor Counts.*NONE/i);
  assert.match(serialized, /Field Validation.*PENDING/i);
  assert.doesNotMatch(serialized, /closure is recommended|quota is recommended/i);
});

test('SNTO 218-trail layer is framed as seasonal environmental early warning, not pressure ranking', () => {
  const result = evaluateAnalyticalQuestion(
    'guadarrama-snto',
    'What does the 218-trail OAPN layer actually support?'
  );
  const serialized = dump(result);

  assert.equal(result.dataStatus, 'Derived');
  assert.match(serialized, /218/);
  assert.match(serialized, /165/);
  assert.match(serialized, /46/);
  assert.match(serialized, /not a multi-year per-trail time series/i);
  assert.match(serialized, /cannot support a trail-by-trail tourism-pressure ranking/i);
});

test('SNTO missing-evidence assessment identifies visitor pressure and field validation as hard gaps', () => {
  const result = evaluateAnalyticalQuestion(
    'guadarrama-snto',
    'What evidence is missing before tourism-pressure attribution is possible?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.match(serialized, /Visitor Pressure Target.*MISSING/i);
  assert.match(serialized, /Field Validation.*NOT RUN/i);
  assert.match(serialized, /MISSING.*ZERO|MISSING ≠ ZERO/i);
});

test('unmatched causal questions never fabricate attribution statistics', () => {
  const result = evaluateAnalyticalQuestion(
    'guadarrama-snto',
    'Can visitor crowds cause erosion near an unlisted viewpoint?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.dataStatus, 'Derived');
  assert.equal(result.confidence.level, 'Low');
  assert.match(serialized, /Causal Attribution.*NOT ESTABLISHED/i);
  assert.doesNotMatch(serialized, /Confounder Variance Share/i);
  assert.doesNotMatch(serialized, /Direct Anthropogenic Share/i);
  assert.doesNotMatch(serialized, />\s*70%|<\s*15%/i);
  assert.doesNotMatch(serialized, /statistically significant independent causal effect/i);
});

test('unmatched custom questions retain the case evidence status without pretending they were answered', () => {
  const result = evaluateAnalyticalQuestion(
    'madrid-hati',
    'How should we interpret thermal comfort around a new plaza not represented in the locked pilot?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.dataStatus, 'Reproduced');
  assert.equal(result.confidence.level, 'Low');
  assert.match(result.statusHeadline, /No Curated Assessment Matches/i);
  assert.match(serialized, /not reinterpreted as proof for an unmatched claim/i);
});

test('out-of-scope economic questions remain outside the evidence boundary', () => {
  const result = evaluateAnalyticalQuestion(
    'madrid-hati',
    'Will hotel revenue increase because of this thermal pattern?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.match(result.statusHeadline, /Outside the Variables Represented by This Case/i);
  assert.match(serialized, /Matched Evidence Sources.*0/i);
});

test('HATI headline assessment exposes reproduced locked-pilot evidence', () => {
  const result = evaluateAnalyticalQuestion(
    'madrid-hati',
    'What did the HATI-Madrid pilot actually demonstrate?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'REPRODUCED_RESULT');
  assert.equal(result.dataStatus, 'Reproduced');
  assert.match(serialized, /14 \/ 42/);
  assert.match(serialized, /7 \/ 8/);
  assert.match(serialized, /all 10 regenerated tables matched/i);
  assert.match(serialized, /not field-validate/i);
});

test('HATI thermal-method sensitivity is reported without superiority claims', () => {
  const result = evaluateAnalyticalQuestion(
    'madrid-hati',
    'Did changing the thermal method change tourism-feasibility classifications?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'REPRODUCED_RESULT');
  assert.match(serialized, /14 of 42|14 \/ 42/i);
  assert.match(serialized, /9.*more restrictive/i);
  assert.match(serialized, /5.*less restrictive/i);
  assert.doesNotMatch(serialized, /physical method is more accurate/i);
  assert.doesNotMatch(serialized, /corrected proxy errors/i);
});

test('HATI behavior question respects the published claim ceiling', () => {
  const result = evaluateAnalyticalQuestion(
    'madrid-hati',
    'Did HATI prove that tourists changed their behavior because of heat?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.dataStatus, 'Reproduced');
  assert.match(serialized, /Did Not Measure Tourist Behaviour|does not contain observed tourist behaviour/i);
  assert.match(serialized, /Observed Behaviour Data.*NONE/i);
  assert.doesNotMatch(serialized, /tourists avoided hot streets/i);
});

test('reference maps contain the expected published HATI and real SNTO assets', () => {
  assert.equal(HATI_REFERENCE_ASSETS.length, 27);
  assert.equal(new Set(HATI_REFERENCE_ASSETS.map((asset) => asset.code)).size, 27);

  assert.equal(SNTO_REFERENCE_ASSETS.length, 21);
  assert.equal(SNTO_REAL_EVIDENCE_METRICS.significantGreening, 6);
  assert.equal(SNTO_REAL_EVIDENCE_METRICS.noSignificantTrend, 14);
  assert.equal(SNTO_REAL_EVIDENCE_METRICS.significantDecline, 1);
});

test('immediate policy requests stay evidence-state aware', () => {
  const hati = evaluateAnalyticalQuestion('madrid-hati', 'Should we change policy immediately?');
  const snto = evaluateAnalyticalQuestion('guadarrama-snto', 'Should we change policy immediately?');

  assert.equal(hati.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(hati.dataStatus, 'Reproduced');
  assert.equal(snto.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(snto.dataStatus, 'Derived');

  assert.match(dump(hati), /research evidence is not automatically validated for current operational policy|Operational Decision Threshold Not Met/i);
  assert.match(dump(snto), /research evidence is not automatically validated for current operational policy|Operational Decision Threshold Not Met/i);
});
