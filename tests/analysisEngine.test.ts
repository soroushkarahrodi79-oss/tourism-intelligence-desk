import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAnalyticalQuestion } from '../src/services/analysisEngine';

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


test('Madrid heat causality fixture does not invent attributable heat shares', () => {
  const result = evaluateAnalyticalQuestion(
    'madrid-hati',
    'Can high tourist density in Puerta del Sol be identified as the cause of urban heat island intensity?'
  );
  const serialized = dump(result);

  assert.equal(result.status, 'INSUFFICIENT_EVIDENCE');
  assert.match(serialized, /Causal Attribution.*NOT ESTABLISHED/i);
  assert.match(serialized, /Energy Flux Partition.*NOT ESTIMATED/i);
  assert.doesNotMatch(serialized, /less than 6%|over 90%|<60|>900/i);
  assert.doesNotMatch(serialized, /rules out human body warmth/i);
});
