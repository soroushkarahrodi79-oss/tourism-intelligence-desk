import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAnalyticalQuestion } from '../src/services/analysisEngine';
import { HATI_REFERENCE_ASSETS } from '../src/data/hatiEvidence';

function dump(value: unknown): string {
  return JSON.stringify(value);
}

test('curated SNTO causality trap refuses attribution', () => {
  const result = evaluateAnalyticalQuestion(
    'guadarrama-snto',
    'NDVI decreased 18%. Are tourists damaging the park?'
  );

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.dataStatus, 'Demonstration');
  assert.match(dump(result), /does not establish tourist damage|does not establish tourist visitation as the cause/i);
  assert.doesNotMatch(dump(result), /Plausible primary contributor/i);
});

test('unmatched causal questions never fabricate attribution statistics', () => {
  const result = evaluateAnalyticalQuestion(
    'guadarrama-snto',
    'Can visitor crowds cause erosion near an unlisted viewpoint?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.confidence.level, 'Low');
  assert.match(serialized, /Causal Attribution.*NOT ESTABLISHED/i);
  assert.doesNotMatch(serialized, /Confounder Variance Share/i);
  assert.doesNotMatch(serialized, /Direct Anthropogenic Share/i);
  assert.doesNotMatch(serialized, />\s*70%|<\s*15%/i);
  assert.doesNotMatch(serialized, /dominant share of (the )?observed variance/i);
  assert.doesNotMatch(serialized, /statistically significant independent causal effect/i);
});

test('unmatched custom questions return a scoping response, not a fabricated finding', () => {
  const result = evaluateAnalyticalQuestion(
    'madrid-hati',
    'How should we interpret thermal comfort around a new plaza not represented in the demo?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.confidence.level, 'Low');
  assert.match(result.statusHeadline, /No Curated Assessment Matches/i);
  assert.match(serialized, /Context is shown without claiming that the custom question has been empirically answered/i);
  assert.doesNotMatch(serialized, /Evidence-Supported Observation in Demonstration Dataset/i);
});

test('out-of-scope economic questions remain outside the environmental evidence boundary', () => {
  const result = evaluateAnalyticalQuestion(
    'madrid-hati',
    'Will hotel revenue increase because of this thermal pattern?'
  );

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.match(result.statusHeadline, /Outside Measured Territorial Indicators/i);
  assert.match(dump(result), /No empirical measurements exist/i);
});

test('immediate policy requests are deferred when only demonstration evidence is loaded', () => {
  const result = evaluateAnalyticalQuestion(
    'guadarrama-snto',
    'Should we change policy immediately and restrict access?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.confidence.level, 'Low');
  assert.match(serialized, /No immediate policy alteration is justified/i);
  assert.doesNotMatch(serialized, /multiple seasons of validated data/i);
  assert.doesNotMatch(serialized, /accredited operational monitoring arrays/i);
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

test('HATI map snapshot contains the 27 published study assets', () => {
  assert.equal(HATI_REFERENCE_ASSETS.length, 27);
  assert.equal(new Set(HATI_REFERENCE_ASSETS.map((asset) => asset.code)).size, 27);
});

test('immediate HATI policy requests distinguish reproduction from operational validation', () => {
  const result = evaluateAnalyticalQuestion(
    'madrid-hati',
    'Should we change policy immediately?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.dataStatus, 'Reproduced');
  assert.match(serialized, /computational reproducibility does not convert/i);
  assert.match(serialized, /single-day|2023/i);
});
