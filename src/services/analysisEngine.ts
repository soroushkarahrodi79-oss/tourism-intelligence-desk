import { EvidenceAssessment, TerritoryId, TerritoryCase } from '../types';
import { EVIDENCE_ASSESSMENTS, TERRITORY_CASES } from '../data/cases';

export function evaluateAnalyticalQuestion(
  territoryId: TerritoryId,
  question: string
): EvidenceAssessment {
  const normalized = question.trim().toLowerCase();
  const territory = TERRITORY_CASES[territoryId];

  // Check if it matches existing curated assessments directly
  if (territoryId === 'madrid-hati') {
    if (
      normalized.includes('what did') ||
      normalized.includes('actually demonstrate') ||
      normalized.includes('headline result') ||
      normalized.includes('hati pilot')
    ) {
      return EVIDENCE_ASSESSMENTS['madrid-hati-q1'];
    }
    if (
      normalized.includes('thermal method') ||
      normalized.includes('reclass') ||
      normalized.includes('proxy') ||
      normalized.includes('solweig') ||
      normalized.includes('feasibility classifications')
    ) {
      return EVIDENCE_ASSESSMENTS['madrid-hati-q2'];
    }
    if (
      normalized.includes('candidate set') ||
      normalized.includes('constraint-first') ||
      normalized.includes('nearest-open') ||
      normalized.includes('no defensible') ||
      normalized.includes('screening change')
    ) {
      return EVIDENCE_ASSESSMENTS['madrid-hati-q3'];
    }
    if (
      normalized.includes('robust') ||
      normalized.includes('uncertainty') ||
      normalized.includes('boundary') ||
      normalized.includes('unstable')
    ) {
      return EVIDENCE_ASSESSMENTS['madrid-hati-q4'];
    }
    if (
      normalized.includes('tourist behavior') ||
      normalized.includes('tourist behaviour') ||
      normalized.includes('avoiding') ||
      normalized.includes('footfall') ||
      normalized.includes('pedestrian behavior') ||
      normalized.includes('pedestrian behaviour') ||
      normalized.includes('changed their behavior') ||
      normalized.includes('changed their behaviour')
    ) {
      return EVIDENCE_ASSESSMENTS['madrid-hati-q5'];
    }
  } else if (territoryId === 'guadarrama-snto') {
    // Route narrow / high-consequence questions before broad summary language.
    if (
      normalized.includes('218') ||
      normalized.includes('oapn layer') ||
      normalized.includes('trail layer') ||
      normalized.includes('oapn trail')
    ) {
      return EVIDENCE_ASSESSMENTS['guadarrama-snto-q4'];
    }
    if (
      normalized.includes('what evidence is missing') ||
      normalized.includes('visitor-pressure attribution') ||
      normalized.includes('visitor pressure attribution') ||
      normalized.includes('missing before') ||
      normalized.includes('field validation') ||
      normalized.includes('visitor-use evidence')
    ) {
      return EVIDENCE_ASSESSMENTS['guadarrama-snto-q5'];
    }
    if (
      normalized.includes('closing trails') ||
      normalized.includes('close trails') ||
      normalized.includes('visitor quotas') ||
      normalized.includes('restricting visitor') ||
      normalized.includes('restrict access') ||
      normalized.includes('closure') ||
      normalized.includes('quota')
    ) {
      return EVIDENCE_ASSESSMENTS['guadarrama-snto-q3'];
    }
    if (
      normalized.includes('maliciosa') ||
      normalized.includes('tourism damage') ||
      normalized.includes('tourist damage') ||
      normalized.includes('ndvi decline prove') ||
      normalized.includes('trampling')
    ) {
      return EVIDENCE_ASSESSMENTS['guadarrama-snto-q2'];
    }
    if (
      normalized.includes('real snto') ||
      normalized.includes('currently show') ||
      normalized.includes('across the pnsg') ||
      normalized.includes('trend distribution') ||
      normalized.includes('what does the real')
    ) {
      return EVIDENCE_ASSESSMENTS['guadarrama-snto-q1'];
    }
  }

  // Fallback for custom questions: Apply Scientific Rigor Engine
  const id = `eval-${territoryId}-${Date.now()}`;

  // Check for immediate policy change requests (TEST 3)
  const isPolicyChangeQuestion =
    normalized.includes('change policy immediately') ||
    normalized.includes('alter policy') ||
    normalized.includes('restrict access immediately') ||
    normalized.includes('ban visitors') ||
    normalized.includes('immediate intervention');

  if (isPolicyChangeQuestion) {
    const contextIsDemo = territory.dataStatus === 'Demonstration' || territory.dataStatus === 'Proxy';
    return {
      id,
      territoryId,
      question,
      isCustomQuestion: true,
      status: 'INSUFFICIENT_EVIDENCE',
      statusHeadline: 'Operational Decision Threshold Not Met: Current Evidence Does Not Justify Immediate Policy Alteration',
      dataStatus: territory.dataStatus,
      signal: {
        observation: `The query requests an immediate policy action from the evidence currently loaded for ${territory.shortName}.`,
        spatialScope: `${territory.shortName} case scope.`,
        temporalWindow: 'Current prototype evidence snapshot.',
        summary:
          'The system separates evidence existence from operational authorization. Research evidence can support diagnosis or monitoring while remaining insufficient for a specific policy intervention.'
      },
      evidence: {
        supportingDatasets: [
          territory.dataStatusNote,
          'No query-specific operational validation package or approved intervention threshold is loaded for this custom policy request.',
          'A policy action must be justified by evidence appropriate to the decision, not merely by the strongest evidence available somewhere in the case.'
        ],
        metrics: [
          { label: 'Case Data Status', value: territory.dataStatus.toUpperCase(), unit: 'evidence state', baseline: 'Claim-specific threshold', delta: 'Not sufficient by itself', trend: 'alert', isDemonstration: contextIsDemo },
          { label: 'Policy Recommendation', value: 'DEFER', unit: 'action', baseline: 'Decision-specific authorization', delta: 'Threshold not met', trend: 'stable', isDemonstration: contextIsDemo },
          { label: 'Causal Attribution', value: 'NOT ESTABLISHED', unit: 'status', baseline: 'Required where policy depends on cause', delta: 'Guardrail active', trend: 'alert', isDemonstration: contextIsDemo }
        ],
        spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
        sampleSize: 'No query-specific operational decision sample is defined.',
        dataIntegrityNotes:
          'Evidence-status-aware guardrail: reproduced, observed, or derived research evidence is not automatically validated for current operational policy.'
      },
      interpretation: {
        inferences: [
          'The current evidence may support monitoring, scoping, or investigation within its documented ceiling.',
          'Immediate policy alteration is not justified unless the requested action has a specific evidence and authorization chain.'
        ],
        plausibleMechanisms:
          'Decision calibration requires matching the spatial unit, temporal window, target variable, validation state, and consequence of the proposed action.'
      },
      evidenceLimit: {
        strictlyForbiddenInferences: [
          'DO NOT equate reproduced, observed, or derived evidence with operational validation.',
          'DO NOT use an environmental signal alone to justify a tourism restriction.',
          'DO NOT invent a policy threshold that is not defined by the evidence contract or relevant authority.'
        ],
        unobservedVariables: [
          'Decision-specific operational evidence and threshold.',
          'Relevant social, environmental, legal, and distributional consequences of the proposed action.'
        ],
        spatialTemporalGaps: 'The current case evidence was not assembled as a generic authorization package for arbitrary policy changes.'
      },
      competingExplanations: [
        {
          category: 'Decision-Scope Mismatch',
          explanation: 'The available evidence may describe a phenomenon without supporting the specific intervention requested.',
          evaluation: 'Contextually supported hypothesis',
          reasoning: 'Evidence strength is claim-specific and cannot be transferred automatically between decision types.',
          investigationNeeded: 'Define the intervention claim and the minimum evidence needed to authorize it.'
        }
      ],
      confidence: {
        level: 'High',
        justification: [
          'Confidence is High in the refusal to authorize an unmatched immediate policy action; confidence in any substantive causal explanation remains claim-dependent.'
        ],
        marginOrInterval: 'Authorization boundary, not an effect estimate.'
      },
      decisionImplication: {
        managerialConsiderations: [
          'Define the exact policy decision and its evidence threshold before acting.',
          'Use the current case only within its documented decision ceiling.',
          'Acquire missing evidence rather than filling the gap with model-generated certainty.'
        ],
        cautionsAndGuardrails: [
          'Do not present research evidence as current operational validation.',
          'Keep environmental state, visitor pressure, causal attribution, and management authorization as separate layers.'
        ],
        policyPerspective: [
          'Proportionate decisions require claim-specific evidence and explicit authorization.'
        ]
      },
      dataNeededNext: [
        'A decision-specific evidence threshold and responsible decision owner.',
        'Observations matched to the target variable and spatial/temporal unit.',
        'Validation and attribution evidence where the intervention depends on a causal claim.'
      ],
      provenance: [
        {
          sensorOrPlatform: 'Tourism Intelligence Desk Evidence-Status Guardrail',
          spatialResolution: 'Case-level decision boundary',
          temporalCoverage: 'Runtime query against current evidence snapshot',
          processingLevel: 'Deterministic decision-authorization check',
          sourceAuthority: 'Tourism Intelligence Desk epistemic contract',
          isCalibratedProxy: false,
          dataStatus: territory.dataStatus
        }
      ]
    };
  }

  // Check for causality traps (e.g., assuming tourism caused an environmental phenomenon)
  const isCausalityTrapQuestion =
    (normalized.includes('cause') || normalized.includes('prove') || normalized.includes('blame') || normalized.includes('responsible')) &&
    (normalized.includes('tourist') || normalized.includes('visitor') || normalized.includes('crowd'));

  // Check if data is completely outside observed scope
  const isOutOfScope =
    normalized.includes('hotel revenue') ||
    normalized.includes('profit') ||
    normalized.includes('airline') ||
    normalized.includes('flight') ||
    normalized.includes('nationality') ||
    normalized.includes('2050') ||
    normalized.includes('2040') ||
    normalized.includes('tax') ||
    normalized.includes('cryptocurrency');

  if (isOutOfScope) {
    const contextIsDemo = territory.dataStatus === 'Demonstration' || territory.dataStatus === 'Proxy';
    return {
      id,
      territoryId,
      question,
      isCustomQuestion: true,
      status: 'INSUFFICIENT_EVIDENCE',
      statusHeadline: 'INSUFFICIENT EVIDENCE: Question Outside the Variables Represented by This Case',
      dataStatus: territory.dataStatus,
      signal: {
        observation: 'The active case contains no evidence matched to the queried economic, demographic, aviation, fiscal, or long-range forecast variable.',
        spatialScope: `${territory.shortName} case scope.`,
        temporalWindow: 'Current evidence snapshot.',
        summary: 'The system refuses to repurpose environmental or geospatial evidence as a substitute for an unmeasured variable.'
      },
      evidence: {
        supportingDatasets: [
          territory.dataStatusNote,
          'No curated assessment or provenance record maps the requested variable to the active case evidence.',
          'No effect estimate is computed for an out-of-scope variable.'
        ],
        metrics: [
          { label: 'Matched Evidence Sources', value: '0', unit: 'sources', baseline: 'At least one required', delta: 'No match', trend: 'alert', isDemonstration: contextIsDemo },
          { label: 'Evaluation Status', value: 'INSUFFICIENT EVIDENCE', unit: 'state', baseline: 'Epistemic guardrail', delta: 'Halted', trend: 'alert', isDemonstration: contextIsDemo }
        ],
        spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
        sampleSize: 'N = 0 matched observations for the queried variable.',
        dataIntegrityNotes: 'Variable is outside the evidence schema of the active case.'
      },
      interpretation: {
        inferences: [
          'No valid inference can be made from the active case about the requested variable.',
          'Domain-specific evidence must be acquired rather than inferred from unrelated environmental indicators.'
        ],
        plausibleMechanisms: 'Not assessed: queried variable is outside the case evidence boundary.'
      },
      evidenceLimit: {
        strictlyForbiddenInferences: [
          'DO NOT invent a conclusion.',
          'DO NOT extrapolate environmental indicators to unrelated economic or demographic outcomes.',
          'DO NOT substitute model plausibility for a missing measurement.'
        ],
        unobservedVariables: ['The variables explicitly requested by the query.'],
        spatialTemporalGaps: 'No matched evidence exists for the requested topic.'
      },
      competingExplanations: [
        {
          category: 'Evidence-Scope Mismatch',
          explanation: 'The queried phenomenon is not represented by the active case evidence.',
          evaluation: 'Confounded / indeterminate',
          reasoning: 'A claim cannot be supported by a dataset that does not measure its target variable.',
          investigationNeeded: 'Acquire data from the appropriate domain and authority.'
        }
      ],
      confidence: {
        level: 'High',
        justification: ['Confidence is High that the requested variable is outside the active evidence boundary.'],
        marginOrInterval: 'No effect estimate.'
      },
      decisionImplication: {
        managerialConsiderations: ['Acquire relevant domain-specific evidence before making a decision.'],
        cautionsAndGuardrails: ['Do not cite the active environmental case as evidence for an unmeasured outcome.'],
        policyPerspective: ['Use the right evidence domain for the decision being made.']
      },
      dataNeededNext: ['A traceable dataset that directly measures the queried variable at the relevant scale.'],
      provenance: [
        {
          sensorOrPlatform: 'Tourism Intelligence Desk Evidence-Scope Filter',
          spatialResolution: 'N/A',
          temporalCoverage: 'Runtime query',
          processingLevel: 'Deterministic boundary check',
          sourceAuthority: 'Tourism Intelligence Desk',
          isCalibratedProxy: false,
          dataStatus: territory.dataStatus
        }
      ]
    };
  }


  if (isCausalityTrapQuestion) {
    const contextIsDemo = territory.dataStatus === 'Demonstration' || territory.dataStatus === 'Proxy';
    return {
      id,
      territoryId,
      question,
      isCustomQuestion: true,
      status: 'INSUFFICIENT_EVIDENCE',
      statusHeadline: 'INSUFFICIENT EVIDENCE: Custom Tourism-Causality Claim Is Not Established',
      dataStatus: territory.dataStatus,
      signal: {
        observation: `The query asks whether tourism or visitor activity causes an outcome in ${territory.shortName}, but no curated causal assessment matching this exact claim is loaded.`,
        spatialScope: `${territory.shortName} case scope.`,
        temporalWindow: 'Current evidence snapshot.',
        summary: 'The prototype preserves the available evidence state while refusing to manufacture a causal effect.'
      },
      evidence: {
        supportingDatasets: [
          territory.dataStatusNote,
          'A causal claim requires evidence matched to exposure, outcome, comparison, spatial unit, temporal window, and plausible confounders.',
          'No attributable fraction, causal effect estimate, or query-specific significance test is generated by the custom-question router.'
        ],
        metrics: [
          { label: 'Case Data Status', value: territory.dataStatus.toUpperCase(), unit: 'evidence state', baseline: 'Claim-specific evidence needed', delta: 'Context available', trend: 'stable', isDemonstration: contextIsDemo },
          { label: 'Causal Attribution', value: 'NOT ESTABLISHED', unit: 'status', baseline: 'Defensible causal design', delta: 'INSUFFICIENT EVIDENCE', trend: 'alert', isDemonstration: contextIsDemo },
          { label: 'Operational Recommendation', value: 'DEFER', unit: 'status', baseline: 'Validated decision threshold', delta: 'No causal basis', trend: 'stable', isDemonstration: contextIsDemo }
        ],
        spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
        sampleSize: 'No query-specific causal sample is defined for this custom question.',
        dataIntegrityNotes: 'The system intentionally does not fabricate effect sizes, attributable shares, p-values, confidence intervals, or causal rankings.'
      },
      interpretation: {
        inferences: [
          'The exact causal claim cannot be resolved from the custom question alone.',
          'Available environmental or screening evidence may provide context without identifying tourism as the cause.'
        ],
        plausibleMechanisms:
          'Candidate mechanisms must be specified and tested with a design that separates visitor exposure from background environmental variation.'
      },
      evidenceLimit: {
        strictlyForbiddenInferences: [
          'NEVER CONVERT CORRELATION OR CO-OCCURRENCE INTO CAUSATION.',
          'DO NOT invent effect sizes, attributable shares, statistical significance, or dominant drivers for a custom query.',
          'DO NOT recommend restrictive policy on the basis of an unvalidated causal claim.'
        ],
        unobservedVariables: [
          'A query-specific exposure and control/comparison condition.',
          'Relevant environmental, spatial, temporal, and management confounders.',
          'Outcome measurements aligned with the exposure in space and time.'
        ],
        spatialTemporalGaps: 'No query-specific attribution design has been supplied or matched to this custom question.'
      },
      competingExplanations: [
        {
          category: 'Background Environmental / Contextual Variation',
          explanation: 'Meteorology, phenology, topography, management, infrastructure, or other non-tourism factors may explain part or all of the observed pattern.',
          evaluation: 'Plausible competing explanation',
          reasoning: 'The custom query does not contain evidence that separates visitor exposure from background variation.',
          investigationNeeded: 'Define matched controls and measure the main plausible confounders for the specific claim.'
        },
        {
          category: 'Visitor-Related Mechanism',
          explanation: 'Visitor activity remains a candidate factor only where a plausible exposure pathway and spatially matched outcome can be measured.',
          evaluation: 'Requires field validation',
          reasoning: 'A candidate mechanism is not a causal estimate.',
          investigationNeeded: 'Collect appropriate exposure, outcome, and control observations at compatible scales.'
        }
      ],
      confidence: {
        level: 'Low',
        justification: ['Confidence in causal attribution is Low because no query-specific causal design or validated effect estimate is available.'],
        marginOrInterval: 'Causal effect not estimated'
      },
      decisionImplication: {
        managerialConsiderations: [
          'Do not treat the custom causal claim as established.',
          'Convert the question into a testable hypothesis before considering a targeted management response.'
        ],
        cautionsAndGuardrails: [
          'Do not communicate invented percentages, causal shares, or significance levels.',
          'Respect the source case evidence ceiling.'
        ],
        policyPerspective: ['Policy review should follow validated attribution evidence, not precede it.']
      },
      dataNeededNext: [
        'A clearly specified causal hypothesis and comparison design.',
        'Visitor-exposure measurements appropriate to the claimed mechanism.',
        'Matched outcome observations and measurements of leading plausible confounders.'
      ],
      provenance: [
        {
          sensorOrPlatform: 'Tourism Intelligence Desk Epistemic Guardrail Engine',
          spatialResolution: 'No query-specific causal resolution defined',
          temporalCoverage: 'Runtime query',
          processingLevel: 'Deterministic boundary check',
          sourceAuthority: 'Tourism Intelligence Desk',
          isCalibratedProxy: false,
          dataStatus: territory.dataStatus
        }
      ]
    };
  }


  // General fallback for custom questions: expose case context without pretending the question was answered.
  const contextIsDemo = territory.dataStatus === 'Demonstration' || territory.dataStatus === 'Proxy';
  return {
    id,
    territoryId,
    question,
    isCustomQuestion: true,
    status: 'INSUFFICIENT_EVIDENCE',
    statusHeadline: 'INSUFFICIENT EVIDENCE: No Curated Assessment Matches This Custom Question',
    dataStatus: territory.dataStatus,
    signal: {
      observation: `The question is within the broad scope of ${territory.shortName}, but no curated assessment directly answers this specific claim.`,
      spatialScope: `${territory.shortName} case scope (${territory.focusTheme}).`,
      temporalWindow: 'Current evidence snapshot.',
      summary: 'Existing case evidence is retained as context; it is not reinterpreted as proof for an unmatched claim.'
    },
    evidence: {
      supportingDatasets: [
        territory.dataStatusNote,
        `Reference evidence represented by this case includes: ${territory.satelliteBands.join(', ')}.`,
        'No query-specific statistical test or effect estimate is computed for unmatched custom questions.'
      ],
      metrics: [
        { label: 'Assessment Match', value: 'NONE', unit: 'curated cases', baseline: 'Direct evidence match', delta: 'Custom query unmatched', trend: 'alert', isDemonstration: contextIsDemo },
        { label: 'Case Data Status', value: territory.dataStatus.toUpperCase(), unit: 'evidence state', baseline: 'Claim-specific evidence needed', delta: 'Context only', trend: 'stable', isDemonstration: contextIsDemo },
        { label: 'Decision Status', value: 'DEFER', unit: 'action', baseline: 'Evidence threshold', delta: 'Need query-specific evidence', trend: 'stable', isDemonstration: contextIsDemo }
      ],
      spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
      sampleSize: territory.referencePoints?.length
        ? `${territory.referencePoints.length} mapped reference assets; no query-specific sample defined.`
        : 'No query-specific sample defined.',
      dataIntegrityNotes: 'Context is shown without claiming that the custom question has been empirically answered.'
    },
    interpretation: {
      inferences: [
        'The question may be relevant, but the deterministic prototype does not contain a curated assessment that resolves it.',
        'A defensible answer requires evidence explicitly matched to the variables and claim in the custom question.'
      ],
      plausibleMechanisms: 'Not assessed for this unmatched custom query.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT treat generic case indicators as evidence for an unmatched claim.',
        'DO NOT invent statistical significance, effect sizes, causal shares, or trend persistence.',
        'DO NOT convert contextual evidence into an operational recommendation.'
      ],
      unobservedVariables: [
        'The variables explicitly required to answer the custom question.',
        'A query-specific comparison or baseline where relevant.'
      ],
      spatialTemporalGaps: 'No query-specific evidence design is loaded for this custom question.'
    },
    competingExplanations: [
      {
        category: 'Unspecified Alternative Explanations',
        explanation: 'Potential mechanisms and confounders depend on the exact claim and cannot be ranked from generic case context.',
        evaluation: 'Confounded / indeterminate',
        reasoning: 'The prototype has no matched assessment for this query.',
        investigationNeeded: 'Define the outcome, exposure, comparison, spatial unit, and temporal window before evaluating alternatives.'
      }
    ],
    confidence: {
      level: 'Low',
      justification: ['Confidence is Low because the query does not map to a curated assessment and no query-specific analysis is performed.'],
      marginOrInterval: 'No effect estimate computed'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Treat the output as a scoping response, not an evidence finding.',
        'Translate the question into a measurable claim before considering a management response.'
      ],
      cautionsAndGuardrails: [
        'Do not alter policy solely on the basis of unmatched context.',
        'Do not cite the prototype as having measured a variable absent from the curated evidence.'
      ],
      policyPerspective: ['Use explicit evidence thresholds and documented provenance before moving from exploration to decision.']
    },
    dataNeededNext: [
      'A query-specific definition of the target variables.',
      'Appropriate observations or datasets with documented provenance.',
      'A comparison strategy and uncertainty analysis suitable for the decision context.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Tourism Intelligence Desk Deterministic Query Router',
        spatialResolution: 'No query-specific analytical resolution defined',
        temporalCoverage: 'Runtime query',
        processingLevel: 'Curated-assessment matching and boundary guardrail',
        sourceAuthority: 'Tourism Intelligence Desk',
        isCalibratedProxy: false,
        dataStatus: territory.dataStatus
      }
    ]
  };
}
