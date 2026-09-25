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
    if (normalized.includes('ndvi decreased') || normalized.includes('18%') || normalized.includes('damaging the park') || normalized.includes('trampling') || normalized.includes('peñalara')) {
      return EVIDENCE_ASSESSMENTS['guadarrama-snto-q2'];
    }
    if (normalized.includes('meaningful') || normalized.includes('environmental change') || normalized.includes('is this area')) {
      return EVIDENCE_ASSESSMENTS['guadarrama-snto-q1'];
    }
    if (normalized.includes('water') || normalized.includes('turbidity') || normalized.includes('manzanares') || normalized.includes('river')) {
      return EVIDENCE_ASSESSMENTS['guadarrama-snto-q3'];
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
    const isReproducedHati = territoryId === 'madrid-hati';
    return {
      id,
      territoryId,
      question,
      isCustomQuestion: true,
      status: 'INSUFFICIENT_EVIDENCE',
      statusHeadline: 'Operational Validation Required: Current Evidence Does Not Justify Immediate Policy Alterations',
      dataStatus: isReproducedHati ? 'Reproduced' : 'Demonstration',
      signal: {
        observation: isReproducedHati
          ? `Inquiry requests an immediate operational or policy decision from the reproduced but single-day, non-operational HATI evidence for ${territory.shortName}.`
          : `Inquiry requests an immediate operational or policy decision based on the currently loaded demonstration evidence for ${territory.shortName}.`,
        spatialScope: `${territory.shortName} administrative perimeter.`,
        temporalWindow: 'Current prototype evaluation cycle.',
        summary: isReproducedHati
          ? 'Decision-support guardrail: computational reproducibility does not convert a bounded 2023 research pilot into current operational evidence.'
          : 'Decision-support guardrail: Active data includes demonstration datasets and uncalibrated proxies. Epistemic standards prohibit immediate policy change on this basis.'
      },
      evidence: {
        supportingDatasets: [
          isReproducedHati
            ? 'The HATI screening outputs were reproduced, but the thermal field is model-derived, the study is bounded to one 2023 day, and no operational deployment validation exists.'
            : 'The loaded assessment contains demonstration datasets and proxy variables that are not validated for operational policy use.',
          'No current operational dataset matched to this custom policy query is available in the current prototype.',
          'The appropriate validation design depends on the specific decision, territory, and causal claim under consideration.'
        ],
        metrics: [
          { label: 'Data Status', value: isReproducedHati ? 'REPRODUCED' : 'DEMONSTRATION', unit: 'mode', baseline: 'Operational validation needed', delta: 'Not validated for policy', trend: 'alert', isDemonstration: !isReproducedHati },
          { label: 'Evidence Confidence', value: 'LOW', unit: 'attribution', baseline: 'High threshold needed', delta: 'Preliminary', trend: 'alert', isDemonstration: true },
          { label: 'Policy Recommendation', value: 'DEFER', unit: 'action', baseline: 'Evidence threshold', delta: 'Maintain current protocols', trend: 'stable', isDemonstration: true }
        ],
        spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
        sampleSize: isReproducedHati
          ? 'Reproduced HATI locked-pilot evidence; no current operational sample.'
          : 'Demonstration data catalog.',
        dataIntegrityNotes: isReproducedHati
          ? 'REPRODUCED RESEARCH EVIDENCE: computationally reproducible, but bounded to the locked 2023 pilot and not validated for current policy action.'
          : 'DEMONSTRATION DATA: Illustrative values used to demonstrate the analytical workflow. Not an operational project result.'
      },
      interpretation: {
        inferences: [
          'Current signals provide useful diagnostic guidance on where to monitor, but do not provide the epistemic certainty required for regulatory or policy changes.',
          'Implementing immediate bans, restrictions, or capital reallocations risks misdirecting public resources against unconfirmed causal drivers.'
        ],
        plausibleMechanisms:
          'Decision calibration: Policy interventions must be proportional to evidence confidence and data status.'
      },
      evidenceLimit: {
        strictlyForbiddenInferences: [
          'DO NOT alter policy solely on the basis of this signal.',
          'DO NOT present demonstration data to public administrations as verified operational findings.',
          'DO NOT assume correlations between environmental shifts and tourism justify immediate regulatory restrictions.'
        ],
        unobservedVariables: [
          'Decision-specific validation evidence sufficient to test the causal or operational claim.',
          'Potential social, economic, environmental, and distributional effects of the proposed policy change.'
        ],
        spatialTemporalGaps: 'The current demonstration record is not designed to establish an operational policy threshold.'
      },
      competingExplanations: [
        {
          category: 'Data Status Limitation',
          explanation: 'Demonstration datasets and proxy variables cannot substantiate regulatory interventions.',
          evaluation: 'Contextually supported hypothesis',
          reasoning: 'Operational policy requires evidence whose quality, provenance, and validation are appropriate to the specific decision context.',
          investigationNeeded: 'Define and execute a decision-specific validation plan using appropriate quality-controlled observations.'
        },
        {
          category: 'Environmental Confounding',
          explanation: 'Regional meteorological, spatial, or management factors may confound the observed signal.',
          evaluation: 'Plausible competing explanation',
          reasoning: 'Without attribution analysis, it is unknown whether regulating tourism would address the relevant driver.',
          investigationNeeded: 'Conduct attribution analysis separating natural variation from anthropogenic pressure.'
        }
      ],
      confidence: {
        level: 'Low',
        justification: [
          'Evidence confidence is Low for operational decision-making because active parameters are demonstration proxies.'
        ],
        marginOrInterval: 'Evidence threshold for policy change is not satisfied'
      },
      decisionImplication: {
        managerialConsiderations: [
          'No immediate policy alteration is justified from the current demonstration evidence alone.',
          'Define the exact decision claim first, then collect the minimum validation evidence needed to test it.',
          'Any interim action should be reversible, proportionate, and justified independently of the unvalidated causal claim.'
        ],
        cautionsAndGuardrails: [
          'Maintain institutional transparency: clearly communicate that data is undergoing research validation.',
          'Avoid premature public declarations regarding tourism causality.'
        ],
        policyPerspective: [
          'Establish structured threshold-based decision criteria that require validated data before policy reviews are initiated.'
        ]
      },
      dataNeededNext: [
        'A decision-specific validation plan defining the claim, comparison, spatial unit, temporal window, and acceptance threshold.',
        'Quality-controlled observations appropriate to the variables in that decision claim.',
        'A documented analysis that tests plausible confounders before any causal or policy conclusion.'
      ],
      provenance: [
        {
          sensorOrPlatform: 'Tourism Intelligence Desk Decision Calibration Engine',
          spatialResolution: 'Administrative extent',
          temporalCoverage: 'Runtime prototype query',
          processingLevel: 'Epistemic Guardrail Assessment',
          sourceAuthority: 'Tourism Intelligence Desk Epistemic Guardrails',
          isCalibratedProxy: false,
          dataStatus: 'Demonstration'
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
    return {
      id,
      territoryId,
      question,
      isCustomQuestion: true,
      status: 'INSUFFICIENT_EVIDENCE',
      statusHeadline: 'INSUFFICIENT EVIDENCE: Question Outside Measured Territorial Indicators',
      dataStatus: 'Demonstration',
      signal: {
        observation: 'No empirical measurements exist within the active Earth Observation or sensor catalog for the queried variables.',
        spatialScope: `${territory.shortName} bounding box.`,
        temporalWindow: 'Current observation epoch.',
        summary: 'The system strictly refuses to invent figures or extrapolate when empirical data is absent.'
      },
      evidence: {
        supportingDatasets: [
          'No sensor layers, satellite bands, or ground stations record this metric in the active territorial schema.',
          'Active data catalog is restricted to physical biometeorology, surface radiometry (LST/NDVI), microclimatic indicators, and footfall proxies.',
          'Epistemic safeguard: Zero ungrounded interpolation.'
        ],
        metrics: [
          { label: 'Observed Telemetry Records', value: '0', unit: 'samples', baseline: 'N/A', delta: 'Nil', trend: 'down', isDemonstration: true },
          { label: 'Attributable Data Sources', value: '0', unit: 'sources', baseline: 'N/A', delta: 'Nil', trend: 'down', isDemonstration: true },
          { label: 'Evaluation Status', value: 'INSUFFICIENT EVIDENCE', unit: 'state', baseline: 'Epistemic Guardrail', delta: 'Halted', trend: 'alert', isDemonstration: true }
        ],
        spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
        sampleSize: 'N = 0 valid observations.',
        dataIntegrityNotes: 'Variable not present in active catalog.'
      },
      interpretation: {
        inferences: [
          'No valid scientific inference can be made without empirical data.',
          'Destination managers must not utilize biophysical monitoring systems as proxies for unmeasured economic or demographic variables.'
        ],
        plausibleMechanisms: 'Null assessment: Incompatible parameter.'
      },
      evidenceLimit: {
        strictlyForbiddenInferences: [
          'CRITICAL RULE: DO NOT INVENT A CONCLUSION.',
          'DO NOT extrapolate biophysical satellite bands to non-physical socio-economic metrics.',
          'DO NOT substitute assumptions for verifiable data.'
        ],
        unobservedVariables: ['All metrics mentioned in the query.'],
        spatialTemporalGaps: 'Total observational absence for the queried topic.'
      },
      competingExplanations: [
        {
          category: 'Observational Scope Limitation',
          explanation: 'The queried phenomenon is not captured by environmental or biometeorological sensors.',
          evaluation: 'Contextually supported hypothesis',
          reasoning: 'Physical Earth observation does not record fiscal or demographic metrics directly.',
          investigationNeeded: 'Acquire dedicated statistical datasets from relevant authorities.'
        }
      ],
      confidence: {
        level: 'Low',
        justification: ['Zero observations available. Complete epistemic uncertainty.'],
        marginOrInterval: 'Undefined (N/A)'
      },
      decisionImplication: {
        managerialConsiderations: [
          'Acquire relevant domain-specific data from designated administrative bureaus before formulating policy.',
          'Refrain from publishing speculative assertions.'
        ],
        cautionsAndGuardrails: [
          'Maintain strict institutional boundary between verified geospatial facts and exploratory hypotheses.'
        ],
        policyPerspective: [
          'Consult official statistical bodies rather than environmental sensor telemetry for economic decisions.'
        ]
      },
      dataNeededNext: [
        'Dedicated administrative census or financial register records corresponding to the inquiry.'
      ],
      provenance: [
        {
          sensorOrPlatform: 'Tourism Intelligence Desk Epistemic Boundary Filter',
          spatialResolution: 'N/A',
          temporalCoverage: 'Runtime prototype check',
          processingLevel: 'Heuristic Epistemic Filter',
          sourceAuthority: 'Tourism Intelligence Desk Boundary Guardrails',
          isCalibratedProxy: false,
          dataStatus: 'Demonstration'
        }
      ]
    };
  }

  if (isCausalityTrapQuestion) {
    return {
      id,
      territoryId,
      question,
      isCustomQuestion: true,
      status: 'INSUFFICIENT_EVIDENCE',
      statusHeadline: 'INSUFFICIENT EVIDENCE: Custom Causal Attribution Is Not Supported by the Loaded Demonstration Evidence',
      dataStatus: 'Demonstration',
      signal: {
        observation: `The query asks whether tourism or visitor activity causes an environmental outcome in ${territory.shortName}. No curated attribution assessment matching this custom causal claim is loaded.`,
        spatialScope: `${territory.shortName} focal study sector.`,
        temporalWindow: 'Current prototype evaluation cycle.',
        summary: 'The prototype refuses to infer causal attribution from a custom question when no matching validated evidence design is available.'
      },
      evidence: {
        supportingDatasets: [
          'The current prototype contains curated demonstration fixtures for selected questions, not a general causal-attribution dataset.',
          'A custom causal claim requires evidence explicitly matched to the proposed exposure, outcome, comparison, spatial unit, and temporal window.',
          'No variance decomposition, attributable fraction, causal effect estimate, or significance test is computed for this custom query.'
        ],
        metrics: [
          { label: 'Data Status', value: 'DEMONSTRATION', unit: 'mode', baseline: 'Validated evidence required', delta: 'Custom attribution unavailable', trend: 'alert', isDemo: true },
          { label: 'Causal Attribution', value: 'NOT ESTABLISHED', unit: 'status', baseline: 'Defensible causal design', delta: 'INSUFFICIENT EVIDENCE', trend: 'alert', isDemo: true },
          { label: 'Operational Recommendation', value: 'DEFER', unit: 'status', baseline: 'Validated decision threshold', delta: 'No causal basis', trend: 'stable', isDemo: true }
        ],
        spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
        sampleSize: 'No query-specific causal sample is defined for this custom question.',
        dataIntegrityNotes: 'DEMONSTRATION DATA: The system intentionally does not fabricate effect sizes, shares, p-values, confidence intervals, or causal rankings.'
      },
      interpretation: {
        inferences: [
          'The causal claim cannot be evaluated from the custom question alone.',
          'Tourism pressure may remain one candidate explanation, but it must be tested against plausible environmental and spatial confounders rather than assumed.'
        ],
        plausibleMechanisms:
          'Candidate mechanisms must be specified and tested with a design that separates visitor exposure from background environmental variation.'
      },
      evidenceLimit: {
        strictlyForbiddenInferences: [
          'CRITICAL ANTI-CAUSALITY RULE: NEVER CONVERT CORRELATION OR CO-OCCURRENCE INTO CAUSATION.',
          'DO NOT invent effect sizes, attributable shares, statistical significance, or dominant drivers for a custom query.',
          'DO NOT recommend restrictive policy on the basis of an unvalidated causal claim.'
        ],
        unobservedVariables: [
          'A query-specific control or comparison condition.',
          'Relevant environmental, spatial, temporal, and management confounders.',
          'Validated exposure and outcome measurements aligned in space and time.'
        ],
        spatialTemporalGaps: 'No query-specific attribution design has been supplied or matched to this custom question.'
      },
      competingExplanations: [
        {
          category: 'Background Environmental Variation',
          explanation: 'Meteorology, phenology, topography, land management, material properties, or other non-tourism factors may explain part or all of the observed pattern.',
          evaluation: 'Requires field validation',
          reasoning: 'The current custom query does not contain evidence that separates visitor exposure from background variation.',
          investigationNeeded: 'Define matched controls and measure the main plausible confounders for the specific claim.'
        },
        {
          category: 'Localized Visitor Pressure',
          explanation: 'Visitor activity remains a candidate factor only where a plausible exposure pathway and spatially matched outcome can be measured.',
          evaluation: 'Plausible competing explanation',
          reasoning: 'A candidate mechanism is not a causal estimate; it requires direct validation against controls.',
          investigationNeeded: 'Collect exposure, outcome, and control observations at compatible spatial and temporal scales.'
        }
      ],
      confidence: {
        level: 'Low',
        justification: [
          'Confidence in causal attribution is Low because no query-specific causal design or validated effect estimate is available.'
        ],
        marginOrInterval: 'Causal effect not estimated'
      },
      decisionImplication: {
        managerialConsiderations: [
          'Do not treat the custom causal claim as established.',
          'If the question is decision-relevant, convert it into a testable hypothesis with explicit exposure, outcome, control, spatial unit, and time window.',
          'Use the resulting validation evidence to decide whether any targeted management response is warranted.'
        ],
        cautionsAndGuardrails: [
          'Do not communicate invented percentages, causal shares, or significance levels.',
          'Keep demonstration outputs separate from operational evidence.'
        ],
        policyPerspective: [
          'Policy review should follow validated attribution evidence, not precede it.'
        ]
      },
      dataNeededNext: [
        'A clearly specified causal hypothesis and comparison design.',
        'Validated visitor-exposure measurements aligned with the environmental outcome.',
        'Matched control observations and measurements of the leading plausible confounders.'
      ],
      provenance: [
        {
          sensorOrPlatform: 'Tourism Intelligence Desk Epistemic Guardrail Engine',
          spatialResolution: 'No query-specific causal resolution defined',
          temporalCoverage: 'Runtime prototype query',
          processingLevel: 'Deterministic boundary check',
          sourceAuthority: 'Tourism Intelligence Desk Prototype',
          isCalibratedProxy: false,
          dataStatus: 'Demonstration'
        }
      ]
    };
  }

  // General fallback for custom questions: expose available context without pretending the question was answered.
  return {
    id,
    territoryId,
    question,
    isCustomQuestion: true,
    status: 'INSUFFICIENT_EVIDENCE',
    statusHeadline: 'INSUFFICIENT EVIDENCE: No Curated Assessment Matches This Custom Question',
    dataStatus: 'Demonstration',
    signal: {
      observation: `The custom question is within the broad thematic scope of ${territory.shortName}, but no curated assessment in the current prototype directly answers it.`,
      spatialScope: `${territory.shortName} focal study sector (${territory.focusTheme}).`,
      temporalWindow: 'Current prototype evaluation cycle.',
      summary: 'Available demonstration fixtures can provide context, but the system will not reinterpret them as evidence for an unmatched custom claim.'
    },
    evidence: {
      supportingDatasets: [
        `The prototype contains ${territory.stations.length} curated demonstration station records used to exercise the interface; they are not live telemetry.`,
        `Reference sources listed for this case include ${territory.satelliteBands.join(', ')}, but those sources are not automatically ingested for this custom query.`,
        'No query-specific statistical test or effect estimate is computed for unmatched custom questions.'
      ],
      metrics: [
        { label: 'Assessment Match', value: 'NONE', unit: 'curated cases', baseline: 'Direct evidence match', delta: 'Custom query unmatched', trend: 'alert', isDemo: true },
        { label: 'Data Status', value: 'DEMONSTRATION', unit: 'mode', baseline: 'Validated evidence required', delta: 'Context only', trend: 'stable', isDemo: true },
        { label: 'Decision Status', value: 'DEFER', unit: 'action', baseline: 'Evidence threshold', delta: 'Need query-specific evidence', trend: 'stable', isDemo: true }
      ],
      spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
      sampleSize: `Curated demonstration context with ${territory.stations.length} station records; no query-specific sample defined.`,
      dataIntegrityNotes: 'DEMONSTRATION DATA: Context is shown without claiming that the custom question has been empirically answered.'
    },
    interpretation: {
      inferences: [
        'The question may be scientifically relevant to the selected territory, but the current deterministic prototype does not contain a curated assessment that resolves it.',
        'A defensible answer requires evidence explicitly matched to the variables and claim in the custom question.'
      ],
      plausibleMechanisms:
        'Not assessed for this custom query. Mechanisms should be specified only after the exposure, outcome, and relevant confounders are defined.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT treat generic territorial indicators as evidence for an unmatched custom claim.',
        'DO NOT invent statistical significance, effect sizes, causal shares, or trend persistence.',
        'DO NOT convert demonstration context into an operational recommendation.'
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
        explanation: 'Potential mechanisms and confounders depend on the exact custom claim and cannot be ranked from generic demonstration context.',
        evaluation: 'Confounded / indeterminate',
        reasoning: 'The prototype has no matched assessment for this query.',
        investigationNeeded: 'Define the outcome, exposure, comparison, spatial unit, and temporal window before evaluating alternatives.'
      }
    ],
    confidence: {
      level: 'Low',
      justification: [
        'Confidence is Low because the query does not map to a curated assessment and no query-specific analysis is performed.'
      ],
      marginOrInterval: 'No effect estimate computed'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Treat the current output as a scoping response, not an evidence finding.',
        'Translate the question into a measurable hypothesis before considering a management response.'
      ],
      cautionsAndGuardrails: [
        'Do not alter policy solely on the basis of demonstration context.',
        'Do not cite the prototype as having measured a variable that is not present in the curated assessment.'
      ],
      policyPerspective: [
        'Use explicit evidence thresholds and documented provenance before moving from exploratory questions to operational decisions.'
      ]
    },
    dataNeededNext: [
      'A query-specific definition of the outcome and exposure variables.',
      'Appropriate observations or datasets with documented provenance.',
      'A comparison strategy and uncertainty analysis suitable for the decision context.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Tourism Intelligence Desk Deterministic Query Router',
        spatialResolution: 'No query-specific analytical resolution defined',
        temporalCoverage: 'Runtime prototype query',
        processingLevel: 'Curated-assessment matching and boundary guardrail',
        sourceAuthority: 'Tourism Intelligence Desk Prototype',
        isCalibratedProxy: false,
        dataStatus: 'Demonstration'
      }
    ]
  };
}
