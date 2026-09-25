import { TerritoryCase, EvidenceAssessment } from '../types';
import { HATI_EVIDENCE_SOURCE, HATI_REPRODUCED_METRICS, HATI_REFERENCE_ASSETS } from './hatiEvidence';
import { SNTO_EVIDENCE_SOURCE, SNTO_REAL_EVIDENCE_METRICS, SNTO_REFERENCE_ASSETS } from './sntoEvidence';

export const TERRITORY_CASES: Record<string, TerritoryCase> = {
  'madrid-hati': {
    id: 'madrid-hati',
    code: 'HATI-MAD',
    shortName: 'Madrid HATI Pilot',
    title: 'HATI Madrid: Heat-Aware Tourism Intelligence',
    subtitle: 'Thermal-Method Sensitivity & Constraint-First Tourism Opportunity Screening',
    description:
      'Reproduced evidence snapshot from the RELEASE_LOCKED HATI-Madrid pilot: 27 curated tourism assets in the Prado–Retiro–Atocha area, one documented extreme-heat day, two alternative thermal-method operationalisations, eight screening scenarios, and explicit uncertainty / abstention logic.',
    focusTheme: 'Eligibility Before Ranking · Thermal Representation · Evidence Sufficiency',
    center: [40.4128, -3.6875],
    zoom: 14,
    bounds: [
      [40.4025, -3.698],
      [40.4225, -3.6755]
    ],
    satelliteBands: [
      'AEMET hazard-band meteorological context',
      'OpenStreetMap tourism assets & tree-count exposure proxy',
      'SOLWEIG → Tmrt → UTCI model-derived thermal configuration',
      'IGN/CNIG LiDAR geometry + EUMETSAT solar-forcing sensitivity'
    ],
    keyIndicators: [
      {
        name: 'Thermal-Method Reclassification',
        value: `${HATI_REPRODUCED_METRICS.thermalMethodReclassified} / ${HATI_REPRODUCED_METRICS.outdoorObservations}`,
        unit: 'observations',
        change: `${HATI_REPRODUCED_METRICS.thermalMethodReclassifiedPct}% · reproduced`,
        isDemo: false
      },
      {
        name: 'Candidate Set Changed',
        value: `${HATI_REPRODUCED_METRICS.candidateSetChangedScenarios} / ${HATI_REPRODUCED_METRICS.totalScenarios}`,
        unit: 'scenarios',
        change: 'vs proximity-only nearest-open baseline',
        isDemo: false
      },
      {
        name: 'Decision Confidence',
        value: `${HATI_REPRODUCED_METRICS.decisionConfidenceRobust}/${HATI_REPRODUCED_METRICS.decisionConfidenceBoundary}/${HATI_REPRODUCED_METRICS.decisionConfidenceUnstable}`,
        unit: 'R/B/U',
        change: 'tested uncertainty dimensions only',
        isDemo: false
      },
      {
        name: 'No-Survivor State',
        value: HATI_REPRODUCED_METRICS.noSurvivorScenario,
        unit: 'scenario',
        change: '0 survivors at 500 m; constraint-contingent',
        isDemo: false
      }
    ],
    sampleQuestions: [
      'What did the HATI-Madrid pilot actually demonstrate?',
      'Did changing the thermal method change tourism-feasibility classifications?',
      'Did constraint-first screening change the candidate set versus the nearest-open baseline?',
      'How robust were the HATI decisions under the tested uncertainty?',
      'Did HATI prove that tourists changed their behavior because of heat?'
    ],
    stations: [],
    features: [],
    dataStatus: 'Reproduced',
    dataStatusNote:
      'The committed screening chain and 10 result tables were independently re-executed and matched the locked references. SOLWEIG/Tmrt/UTCI remain model-derived and are not field-validated thermal truth.',
    referencePoints: HATI_REFERENCE_ASSETS
  },
  'guadarrama-snto': {
    id: 'guadarrama-snto',
    code: 'SNTO-GUA',
    shortName: 'Sierra de Guadarrama',
    title: 'SNTO: Smart Nature Tourism Observatory',
    subtitle: 'Real Sentinel-2 Environmental Signals & Evidence-Proportionate Public-Use Planning',
    description:
      'Real Sentinel-2 environmental observations and derived multi-year NDVI/NDMI trends for 21 PNSG campaign assets, combined with official OAPN trail and PRUG management context. Visitor-use evidence and field validation remain missing, so tourism-impact attribution and restrictive management are not supported.',
    focusTheme: 'Environmental Change · Evidence Ceiling · Monitoring / Inspection',
    center: [40.8803, -3.8952],
    zoom: 10,
    bounds: [
      [40.72, -4.08],
      [41.03, -3.71]
    ],
    satelliteBands: [
      'Sentinel-2 SR Harmonized · NDVI / NDMI / EVI',
      'Mann–Kendall + Sen trend analysis · 2021–2026',
      'Official OAPN trail cartography · 218 trails',
      'PRUG management zoning'
    ],
    keyIndicators: [
      {
        name: 'Real Time-Series Assets',
        value: String(SNTO_REAL_EVIDENCE_METRICS.timeSeriesAssets),
        unit: 'assets',
        change: 'Sentinel-2 · 2021–2026',
        isDemo: false
      },
      {
        name: 'NDVI Trend Distribution',
        value: `${SNTO_REAL_EVIDENCE_METRICS.significantGreening}/${SNTO_REAL_EVIDENCE_METRICS.noSignificantTrend}/${SNTO_REAL_EVIDENCE_METRICS.significantDecline}`,
        unit: '↑ / stable / ↓',
        change: '6 greening · 14 no trend · 1 decline',
        isDemo: false
      },
      {
        name: 'Visitor-Use Evidence',
        value: 'NONE',
        unit: 'asset/trail scale',
        change: 'pressure attribution blocked',
        isDemo: false
      },
      {
        name: 'Current Decision Ceiling',
        value: 'L5a',
        unit: 'claim ladder',
        change: 'monitor / inspect; no closure or quota',
        isDemo: false
      }
    ],
    sampleQuestions: [
      'What does the real SNTO evidence currently show across the PNSG?',
      'Does the Maliciosa-Porrones NDVI decline prove tourism damage?',
      'Can SNTO justify closing trails or restricting visitor quotas?',
      'What does the 218-trail OAPN layer actually support?',
      'What evidence is missing before tourism-pressure attribution is possible?'
    ],
    stations: [],
    features: [],
    dataStatus: 'Derived',
    dataStatusNote:
      'Real Sentinel-2 observations underpin the environmental layer; NDVI/NDMI/EVI and trend statistics are derived from those observations. No asset/trail-scale visitor-use series and no completed field-validation campaign are available.',
    referencePoints: SNTO_REFERENCE_ASSETS
  }
};

export const EVIDENCE_ASSESSMENTS: Record<string, EvidenceAssessment> = {
  // MADRID QUESTION 1: reproduced headline evidence
  'madrid-hati-q1': {
    id: 'madrid-hati-q1',
    territoryId: 'madrid-hati',
    question: 'What did the HATI-Madrid pilot actually demonstrate?',
    status: 'REPRODUCED_RESULT',
    statusHeadline: 'Reproduced Result: HATI Shows Thermal-Method Sensitivity and Constraint-First Screening Consequences',
    dataStatus: 'Reproduced',
    signal: {
      observation:
        'The locked HATI-Madrid screening chain was independently re-executed from committed model outputs and open-data inputs. All 10 regenerated tables matched their locked references structurally and numerically.',
      spatialScope: HATI_EVIDENCE_SOURCE.studyArea,
      temporalWindow: 'Single documented study day: 21 August 2023 · 12:00 / 15:00 / 18:00.',
      summary:
        'The reproduced pilot demonstrates that the operational definition of heat can change tourism-feasibility classifications and that constraint-first screening can materially alter the candidate set relative to a proximity-only comparator.'
    },
    evidence: {
      supportingDatasets: [
        '27 curated tourism assets in the Prado–Retiro–Atocha pilot area.',
        '42 outdoor asset × timestamp observations compared across an operational proxy and a SOLWEIG → Tmrt → UTCI configuration.',
        'Eight pre-registered screening scenarios plus a proximity-only nearest-open baseline.',
        'Independent reproduction report: every step exited 0 and all 10 regenerated tables matched the locked references.'
      ],
      metrics: [
        { label: 'Thermal-Method Reclassification', value: '14 / 42', unit: 'observations', baseline: 'Two operationalisations compared', delta: '33.3%', trend: 'alert', isDemonstration: false },
        { label: 'Candidate Set Changed', value: '7 / 8', unit: 'scenarios', baseline: 'Nearest-open comparator', delta: 'Constraint-first consequence', trend: 'alert', isDemonstration: false },
        { label: 'Nearest-Open Pick Excluded', value: '3 / 8', unit: 'scenarios', baseline: 'Nearest-open pick', delta: 'All OUTDOOR_EXPOSURE_TOO_HIGH', trend: 'alert', isDemonstration: false },
        { label: 'No-Defensible-Alternative', value: 'S8', unit: 'scenario', baseline: '500 m reach', delta: '0 survivors', trend: 'stable', isDemonstration: false }
      ],
      spatialCoordinates: 'Prado–Retiro–Atocha bounded pilot, central Madrid.',
      sampleSize: '27 curated assets; 42 outdoor asset-time observations; 8 screening scenarios.',
      dataIntegrityNotes:
        'REPRODUCED RESEARCH SNAPSHOT: computational outputs reproduce the locked tables. This does not field-validate the modelled thermal field.'
    },
    interpretation: {
      inferences: [
        'Thermal representation is a decision variable in this bounded pilot: alternative operationalisations changed 14 of 42 outdoor classifications.',
        'Eligibility-before-ranking can change which opportunities remain admissible and can preserve an explicit no-survivor state.',
        'The result is a demonstration of decision sensitivity and traceability, not proof that one thermal method is more accurate.'
      ],
      plausibleMechanisms:
        'Different thermal operationalisations encode heat exposure differently; ordered hard constraints then propagate those differences into candidate eligibility.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT claim that SOLWEIG/UTCI is ground truth or that the physical method corrected proxy errors.',
        'DO NOT generalise the single-day, ~3.5 km² pilot to Madrid as a whole or to other seasons.',
        'DO NOT infer tourist behaviour, visitor redistribution, safety outcomes, or health outcomes: none were measured.'
      ],
      unobservedVariables: [
        'Field measurements of Tmrt / UTCI for physical validation.',
        'Observed visitor behaviour or route-choice data.',
        'Additional study days, seasons, and destination contexts.'
      ],
      spatialTemporalGaps:
        'The locked publication is one bounded central-Madrid pilot on one extreme-heat day; it is not an operational real-time system.'
    },
    competingExplanations: [
      {
        category: 'Thermal-Method Operationalisation',
        explanation: 'Classification differences can arise from how heat is represented and mapped into decision categories.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'The reproduced comparison directly changes only the thermal-method operationalisation while retaining the bounded screening architecture.',
        investigationNeeded: 'Field validation would be required to evaluate physical accuracy, which this pilot does not establish.'
      },
      {
        category: 'Scenario Constraint Set',
        explanation: 'Candidate-set outcomes depend on reach, opening, thermal, evidence, and improvement constraints.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'The S8 no-survivor state disappears when the reach constraint is relaxed, showing that the result is constraint-contingent.',
        investigationNeeded: 'Evaluate alternative constraint sets only in a new, explicitly authorised study rather than rewriting the locked pilot.'
      }
    ],
    confidence: {
      level: 'High',
      justification: [
        'Confidence is High in the computational reproduction of the published headline counts because the committed chain regenerated the locked tables and figure assertions.',
        'This confidence does not extend to physical validation of modelled UTCI/Tmrt.'
      ],
      marginOrInterval: 'Reproduction matched locked numerical outputs; physical-validation uncertainty remains outside this claim.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Use HATI as a methodological case for eligibility-first decision support rather than as a live Madrid recommendation engine.',
        'Keep thermal state, evidence sufficiency, and uncertainty separate when designing operational screening.',
        'Preserve abstention / no-defensible-alternative as a legitimate output rather than forcing a recommendation.'
      ],
      cautionsAndGuardrails: [
        'Do not deploy the locked pilot as an operational public-facing recommender without new validation and current data.',
        'Do not treat reproduced model outputs as observed pedestrian comfort.'
      ],
      policyPerspective: [
        'The transferable contribution is the auditable decision architecture, not the literal 2023 candidate list.'
      ]
    },
    dataNeededNext: [
      'Field validation of modelled thermal exposure if physical accuracy is to be claimed.',
      'Current operational inputs if the method is ever adapted to live destination management.',
      'Observed visitor behaviour only if behavioural claims are introduced in a separate study.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'HATI-Madrid locked screening tables + independent reproduction chain',
        spatialResolution: '27 assets; outdoor decisions at asset × timestamp level',
        temporalCoverage: '21 August 2023 · 12:00 / 15:00 / 18:00',
        processingLevel: 'Reproduced from committed model outputs and open-data inputs',
        sourceAuthority: 'HATI-Madrid RELEASE_LOCKED repository / reproduction report',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/heat-adaptive-tourism-madrid',
        isCalibratedProxy: false,
        dataStatus: 'Reproduced'
      },
      {
        sensorOrPlatform: 'SOLWEIG → Tmrt → UTCI thermal configuration',
        spatialResolution: 'Model field sampled to asset buffers',
        temporalCoverage: '21 August 2023',
        processingLevel: 'Model-derived; not field validated',
        sourceAuthority: 'HATI-Madrid locked publication layer',
        citationUrl: 'https://doi.org/10.5281/zenodo.22707470',
        isCalibratedProxy: true,
        dataStatus: 'Model-derived'
      }
    ]
  },

  // MADRID QUESTION 2: thermal-method sensitivity
  'madrid-hati-q2': {
    id: 'madrid-hati-q2',
    territoryId: 'madrid-hati',
    question: 'Did changing the thermal method change tourism-feasibility classifications?',
    status: 'REPRODUCED_RESULT',
    statusHeadline: 'Reproduced Result: 14 of 42 Outdoor Classifications Changed Between Thermal Operationalisations',
    dataStatus: 'Reproduced',
    signal: {
      observation:
        'Switching between the operational proxy and the SOLWEIG/UTCI configuration reclassified 14 of 42 outdoor asset-time observations: 9 with the physical configuration more restrictive and 5 less restrictive.',
      spatialScope: HATI_EVIDENCE_SOURCE.studyArea,
      temporalWindow: '21 August 2023 · 12:00 / 15:00 / 18:00.',
      summary: 'Thermal-method divergence was time-concentrated rather than uniform across the study day.'
    },
    evidence: {
      supportingDatasets: [
        'Outdoor reclassification rate: 33.3% (14/42).',
        'Direction: 9 physical-more-restrictive; 5 physical-less-restrictive.',
        'Timestamp pattern: 12:00 = 64.3%, 15:00 = 0.0%, 18:00 = 35.7%.',
        'All 42 physical-configuration outdoor observations fell into FEASIBLE WITH CONDITIONS in the locked categorical configuration.'
      ],
      metrics: [
        { label: 'Reclassified', value: '14 / 42', unit: 'observations', baseline: 'Proxy vs physical', delta: '33.3%', trend: 'alert', isDemonstration: false },
        { label: '12:00 Divergence', value: '64.3', unit: '%', baseline: '14 outdoor assets', delta: 'time-specific', trend: 'alert', isDemonstration: false },
        { label: '15:00 Divergence', value: '0.0', unit: '%', baseline: '14 outdoor assets', delta: 'full categorical agreement', trend: 'stable', isDemonstration: false },
        { label: '18:00 Divergence', value: '35.7', unit: '%', baseline: '14 outdoor assets', delta: 'time-specific', trend: 'alert', isDemonstration: false }
      ],
      spatialCoordinates: '14 outdoor assets within the Prado–Retiro–Atocha pilot.',
      sampleSize: '42 outdoor asset × timestamp observations.',
      dataIntegrityNotes:
        'Headline values were recomputed from reproduced tables and matched the locked publication values.'
    },
    interpretation: {
      inferences: [
        'The operational definition of heat changed categorical tourism-feasibility outputs in this pilot.',
        'The direction of change was mixed, so the result does not support a simple claim that the physical method is systematically stricter or better.'
      ],
      plausibleMechanisms:
        'The proxy combines ambient hazard bands with nearby tree-count exposure, whereas the physical path uses SOLWEIG-derived Tmrt and UTCI; their category mappings therefore respond differently across times and places.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT call the physical configuration more accurate or ground truth without field validation.',
        'DO NOT describe reclassification as correction of proxy errors.',
        'DO NOT claim richer categorical discrimination from the physical method in this locked configuration.'
      ],
      unobservedVariables: [
        'In-situ thermal measurements for model validation.',
        'Alternative category mappings or thresholds outside the locked design.'
      ],
      spatialTemporalGaps: 'Single pilot day and bounded central-Madrid study area.'
    },
    competingExplanations: [
      {
        category: 'Category Mapping',
        explanation: 'Part of the divergence reflects different end-to-end operationalisations, including how continuous thermal values are mapped to feasibility states.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'All physical outdoor observations occupied one feasibility category while the proxy used three-state banding.',
        investigationNeeded: 'Any alternative mapping would constitute a new study and should not be retrofitted into the locked release.'
      }
    ],
    confidence: {
      level: 'High',
      justification: [
        'The 14/42 count, direction split, and timestamp rates were independently recomputed from the reproduced tables.'
      ],
      marginOrInterval: 'Descriptive pilot result; no population inference.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Treat thermal representation as an explicit design choice in decision-support systems.',
        'Audit whether category mappings create decision changes before presenting a ranking or recommendation.'
      ],
      cautionsAndGuardrails: [
        'Method sensitivity is not method superiority.',
        'Do not generalise the timestamp pattern beyond this study day.'
      ],
      policyPerspective: [
        'Decision systems should document how environmental indicators become operational eligibility states.'
      ]
    },
    dataNeededNext: [
      'Field validation if comparing physical accuracy rather than decision sensitivity.',
      'Replication on additional days / destinations before discussing generalisation.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Reproduced phase2_asset_thermal_exposure.csv',
        spatialResolution: '14 outdoor assets × 3 timestamps',
        temporalCoverage: '21 August 2023',
        processingLevel: 'Reproduced descriptive comparison',
        sourceAuthority: 'HATI-Madrid RELEASE_LOCKED',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/heat-adaptive-tourism-madrid',
        isCalibratedProxy: false,
        dataStatus: 'Reproduced'
      }
    ]
  },

  // MADRID QUESTION 3: screening consequence
  'madrid-hati-q3': {
    id: 'madrid-hati-q3',
    territoryId: 'madrid-hati',
    question: 'Did constraint-first screening change the candidate set versus the nearest-open baseline?',
    status: 'REPRODUCED_RESULT',
    statusHeadline: 'Reproduced Result: Candidate Set Changed in 7 of 8 Scenarios',
    dataStatus: 'Reproduced',
    signal: {
      observation:
        'Relative to a proximity-only nearest-open comparator, the constraint-first candidate set changed in 7 of 8 pre-registered scenarios.',
      spatialScope: HATI_EVIDENCE_SOURCE.studyArea,
      temporalWindow: 'Eight locked scenarios on 21 August 2023.',
      summary:
        'The screening architecture excluded the nearest-open baseline pick in 3 of 8 scenarios, removed 23 open in-radius options on thermal/evidence grounds, and preserved an explicit no-survivor state in S8.'
    },
    evidence: {
      supportingDatasets: [
        '7/8 scenarios changed candidate set relative to nearest-open.',
        '3/8 nearest-open picks were excluded; all three exclusions were OUTDOOR_EXPOSURE_TOO_HIGH under the locked rule chain.',
        '23 open, in-radius candidates were removed by thermal/evidence gates across the scenarios.',
        'S8 returned NO_DEFENSIBLE_ALTERNATIVE at 500 m reach; at 800 m two alternatives existed and at 1200 m seven existed.'
      ],
      metrics: [
        { label: 'Candidate Set Changed', value: '7 / 8', unit: 'scenarios', baseline: 'Nearest-open', delta: 'Constraint-first', trend: 'alert', isDemonstration: false },
        { label: 'Baseline Pick Excluded', value: '3 / 8', unit: 'scenarios', baseline: 'Nearest-open pick', delta: 'Thermal gate', trend: 'alert', isDemonstration: false },
        { label: 'Candidates Removed', value: '23', unit: 'open in-radius options', baseline: 'Before thermal/evidence gates', delta: 'Removed', trend: 'alert', isDemonstration: false },
        { label: 'S8 Survivors @ 500 m', value: '0', unit: 'candidates', baseline: '500 m reach', delta: 'NO_DEFENSIBLE_ALTERNATIVE', trend: 'stable', isDemonstration: false }
      ],
      spatialCoordinates: 'Eight source-specific scenarios across the bounded pilot.',
      sampleSize: '8 pre-registered scenarios; 208 scenario-candidate rows in the reproduced table.',
      dataIntegrityNotes:
        'The result compares against a minimal proximity-only nearest-open baseline; it is not evidence of superiority over all heat-aware decision systems.'
    },
    interpretation: {
      inferences: [
        'Ordered eligibility constraints can materially alter the candidate set relative to a nearest-open heuristic.',
        'The architecture can abstain when no candidate satisfies the active constraints.',
        'The no-survivor result is explicitly constraint-contingent rather than a claim that no alternative existed generally.'
      ],
      plausibleMechanisms:
        'Opening, reach, thermal feasibility, evidence sufficiency, and improvement gates are evaluated before any ranking among survivors.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT claim algorithmic superiority over other heat-aware systems from the 7/8 result.',
        'DO NOT describe S8 as proof that no alternative existed in Madrid; it is conditional on the 500 m constraint set.',
        'DO NOT treat the nearest-open comparator as a state-of-the-art competing system.'
      ],
      unobservedVariables: [
        'User preferences and behavioural response.',
        'Alternative operational decision architectures not tested in the locked study.'
      ],
      spatialTemporalGaps: 'Eight designed scenarios on one study day.'
    },
    competingExplanations: [
      {
        category: 'Constraint Definition',
        explanation: 'Candidate-set differences are produced by the particular locked sequence and thresholds.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'The architecture is intentionally constraint-first; changing thresholds or reach changes admissibility.',
        investigationNeeded: 'Sensitivity to alternative operational constraints would require a new authorised analysis.'
      }
    ],
    confidence: {
      level: 'High',
      justification: [
        'Scenario outputs, baseline comparison, exclusion counts, and accessibility sensitivity were reproduced from committed inputs.'
      ],
      marginOrInterval: 'Descriptive scenario result; comparator scope is deliberately narrow.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Separate candidate eligibility from ranking in any future operational implementation.',
        'Record a machine-readable first-failing reason for each exclusion.',
        'Allow an explicit no-defensible-alternative state when constraints eliminate all candidates.'
      ],
      cautionsAndGuardrails: [
        'Do not force a least-bad recommendation simply because a ranking interface expects one.',
        'State the comparator and constraint set whenever reporting screening consequences.'
      ],
      policyPerspective: [
        'Transparent abstention is a governance feature, not a system failure.'
      ]
    },
    dataNeededNext: [
      'Operational stakeholder requirements before translating the research architecture into a live system.',
      'Current opening, access, and thermal inputs for any real-world deployment.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Reproduced phase3_scenarios.csv + phase3_hati_vs_baseline.csv + accessibility sensitivity',
        spatialResolution: 'Scenario-candidate level',
        temporalCoverage: '21 August 2023 scenario set',
        processingLevel: 'Reproduced constraint-first screening',
        sourceAuthority: 'HATI-Madrid RELEASE_LOCKED',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/heat-adaptive-tourism-madrid',
        isCalibratedProxy: false,
        dataStatus: 'Reproduced'
      }
    ]
  },

  // MADRID QUESTION 4: tested uncertainty
  'madrid-hati-q4': {
    id: 'madrid-hati-q4',
    territoryId: 'madrid-hati',
    question: 'How robust were the HATI decisions under the tested uncertainty?',
    status: 'REPRODUCED_RESULT',
    statusHeadline: 'Reproduced Result: 35 ROBUST, 6 BOUNDARY, 1 UNSTABLE Under the Tested Uncertainty Dimensions',
    dataStatus: 'Reproduced',
    signal: {
      observation:
        'Decision confidence across the 42 outdoor asset-time rows was 35 ROBUST, 6 BOUNDARY, and 1 UNSTABLE under the specific uncertainty dimensions tested in the locked pilot.',
      spatialScope: '14 outdoor assets within the HATI pilot.',
      temporalWindow: '21 August 2023 · three timestamps.',
      summary:
        'A satellite-derived irradiance realization changed 1 of 42 decisions; ±10% and ±20% irradiance perturbations changed none.'
    },
    evidence: {
      supportingDatasets: [
        'Decision-confidence table reproduced exactly at the structural/numeric level.',
        'ROBUST / BOUNDARY / UNSTABLE = 35 / 6 / 1.',
        '1/42 decision changed under the satellite-derived irradiance realization.',
        'No decisions changed under the tested ±10% and ±20% irradiance perturbations.'
      ],
      metrics: [
        { label: 'ROBUST', value: '35', unit: 'decisions', baseline: '42 outdoor rows', delta: 'tested dimensions only', trend: 'stable', isDemonstration: false },
        { label: 'BOUNDARY', value: '6', unit: 'decisions', baseline: '42 outdoor rows', delta: 'near decision boundary', trend: 'alert', isDemonstration: false },
        { label: 'UNSTABLE', value: '1', unit: 'decision', baseline: '42 outdoor rows', delta: 'A24 · 18:00', trend: 'alert', isDemonstration: false },
        { label: 'Satellite Realization Changes', value: '1 / 42', unit: 'decisions', baseline: 'baseline realization', delta: '2.4%', trend: 'alert', isDemonstration: false }
      ],
      spatialCoordinates: 'Outdoor HATI assets across the bounded pilot.',
      sampleSize: '42 outdoor asset × timestamp decisions.',
      dataIntegrityNotes:
        'ROBUST means stable under the tested uncertainty dimensions; it does not mean accurate, validated, or certain.'
    },
    interpretation: {
      inferences: [
        'Most categorical decisions were stable under the uncertainty dimensions actually tested.',
        'At least one decision crossed the safety-critical boundary, demonstrating that uncertainty labels carry decision relevance.'
      ],
      plausibleMechanisms:
        'Solar-forcing and targeted canopy-geometry perturbations shift model-derived UTCI values relative to locked decision thresholds.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT translate ROBUST into validated or physically accurate.',
        'DO NOT imply that all relevant uncertainty sources were tested.',
        'DO NOT use the stability distribution as a probability of correctness.'
      ],
      unobservedVariables: [
        'Field-measurement error because no field Tmrt/UTCI validation exists.',
        'Unmodelled uncertainty sources outside the tested solar and targeted geometry perturbations.'
      ],
      spatialTemporalGaps: 'Uncertainty analysis is bounded to the locked realizations and single-day pilot.'
    },
    competingExplanations: [
      {
        category: 'Untested Model Error',
        explanation: 'A decision can remain stable under tested perturbations while still being biased by untested model or input errors.',
        evaluation: 'Requires field validation',
        reasoning: 'Stability is not equivalent to external validity.',
        investigationNeeded: 'Compare modelled thermal fields with calibrated in-situ measurements.'
      }
    ],
    confidence: {
      level: 'High',
      justification: [
        'The stability labels and sensitivity counts were reproduced from committed tables and figure assertions.'
      ],
      marginOrInterval: 'High confidence in the reproduced stability classification; no claim of physical validation.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Expose uncertainty state alongside thermal state rather than hiding it inside a score.',
        'Treat BOUNDARY and UNSTABLE cases as candidates for additional evidence or abstention.'
      ],
      cautionsAndGuardrails: [
        'Do not market ROBUST as certified accuracy.',
        'Keep the phrase "tested uncertainty dimensions" attached to the result.'
      ],
      policyPerspective: [
        'Decision-support interfaces should distinguish stability under perturbation from empirical validation.'
      ]
    },
    dataNeededNext: [
      'Calibrated field measurements for external validation.',
      'Additional uncertainty dimensions if the method is operationalised beyond the locked pilot.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Reproduced phase2_2_decision_confidence.csv',
        spatialResolution: 'Asset × timestamp',
        temporalCoverage: '21 August 2023',
        processingLevel: 'Reproduced uncertainty envelope and decision stability',
        sourceAuthority: 'HATI-Madrid RELEASE_LOCKED',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/heat-adaptive-tourism-madrid',
        isCalibratedProxy: false,
        dataStatus: 'Reproduced'
      }
    ]
  },

  // MADRID QUESTION 5: behavioral claim ceiling
  'madrid-hati-q5': {
    id: 'madrid-hati-q5',
    territoryId: 'madrid-hati',
    question: 'Did HATI prove that tourists changed their behavior because of heat?',
    status: 'INSUFFICIENT_EVIDENCE',
    statusHeadline: 'Evidence Ceiling: HATI Did Not Measure Tourist Behaviour, Redistribution, or Outcomes',
    dataStatus: 'Reproduced',
    signal: {
      observation:
        'The reproduced HATI pilot contains thermal-method, asset, screening, scenario, and uncertainty outputs. It does not contain observed tourist behaviour or route-choice outcomes.',
      spatialScope: HATI_EVIDENCE_SOURCE.studyArea,
      temporalWindow: 'Locked 21 August 2023 pilot.',
      summary: 'Behavioural causation is outside the evidence collected by the study.'
    },
    evidence: {
      supportingDatasets: [
        'The canonical HATI status record explicitly states that no tourist behaviour, substitution, or outcome is measured or claimed.',
        'The reproduction chain regenerates thermal and screening tables, not pedestrian tracking or visitor-response data.',
        'The later pedestrian-route extension also ended in ABSTAIN / NO ROBUST DIFFERENCE and did not establish observed behavioural change.'
      ],
      metrics: [
        { label: 'Observed Behaviour Data', value: 'NONE', unit: 'dataset', baseline: 'Required for behavioural claim', delta: 'Not measured', trend: 'alert', isDemonstration: false },
        { label: 'Behavioural Causation', value: 'NOT ESTABLISHED', unit: 'status', baseline: 'Observed outcome design', delta: 'Outside claim ceiling', trend: 'alert', isDemonstration: false },
        { label: 'Thermal / Screening Reproduction', value: 'PASS', unit: 'status', baseline: 'Locked tables', delta: 'Separate evidence domain', trend: 'stable', isDemonstration: false }
      ],
      spatialCoordinates: 'HATI pilot area.',
      sampleSize: 'No behavioural sample exists in the locked pilot.',
      dataIntegrityNotes:
        'This is a verified evidence absence / claim-ceiling statement, not a claim that heat never affects tourist behaviour.'
    },
    interpretation: {
      inferences: [
        'HATI can support statements about decision sensitivity and screening outputs.',
        'HATI cannot support statements that tourists avoided, selected, or changed routes because of heat.'
      ],
      plausibleMechanisms:
        'Heat may influence behaviour in reality, but this project did not collect the observed behavioural evidence needed to test that mechanism.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT claim that HATI observed tourists avoiding hot streets.',
        'DO NOT claim that visitor flows were redistributed by the screening system.',
        'DO NOT infer safety, health, spending, or satisfaction outcomes from modelled thermal exposure.'
      ],
      unobservedVariables: [
        'Observed route choice.',
        'Tourist/resident classification.',
        'Stated motivation and thermal perception.',
        'Counterfactual behaviour under comparable non-heat conditions.'
      ],
      spatialTemporalGaps: 'Behavioural outcomes were outside the locked pilot design.'
    },
    competingExplanations: [
      {
        category: 'Behavioural Response',
        explanation: 'Heat-related avoidance is a plausible real-world mechanism but was not tested by HATI.',
        evaluation: 'Requires field validation',
        reasoning: 'Modelled thermal exposure and screened candidate eligibility are not behavioural observations.',
        investigationNeeded: 'Collect consented mobility / intercept-survey data under a dedicated behavioural study design.'
      }
    ],
    confidence: {
      level: 'High',
      justification: [
        'Confidence is High in the evidence-ceiling statement because the canonical project status and locked research design explicitly exclude behavioural claims.'
      ],
      marginOrInterval: 'No behavioural effect estimate exists.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Use HATI to demonstrate evidence-aware screening architecture, not visitor-response prediction.',
        'Commission a separate behavioural study before making claims about tourist adaptation to heat.'
      ],
      cautionsAndGuardrails: [
        'Absence of behavioural evidence is not evidence of no behavioural effect.',
        'Keep model-derived exposure, decision outputs, and observed human behaviour as separate evidence layers.'
      ],
      policyPerspective: [
        'Operational tourism adaptation should distinguish model-based risk screening from verified visitor behaviour.'
      ]
    },
    dataNeededNext: [
      'Observed pedestrian route-choice or destination-choice data collected with appropriate privacy safeguards.',
      'Matched meteorological / thermal exposure data.',
      'A causal or quasi-experimental design capable of separating heat effects from time-of-day, opening-hours, and trip-purpose confounders.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'HATI-Madrid PROJECT_STATUS.md claim ceiling + reproduced screening chain',
        spatialResolution: 'Project-level evidence audit',
        temporalCoverage: 'Locked publication layer',
        processingLevel: 'Evidence-ceiling verification',
        sourceAuthority: 'HATI-Madrid canonical status record',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/heat-adaptive-tourism-madrid/blob/main/PROJECT_STATUS.md',
        isCalibratedProxy: false,
        dataStatus: 'Reproduced'
      }
    ]
  },

  // GUADARRAMA QUESTION 1: real PNSG evidence summary
  'guadarrama-snto-q1': {
    id: 'guadarrama-snto-q1',
    territoryId: 'guadarrama-snto',
    question: 'What does the real SNTO evidence currently show across the PNSG?',
    status: 'OBSERVED_ANOMALY',
    statusHeadline: 'Real Sentinel-2 Evidence: PNSG Asset Trends Are Dominated by Stability or Greening',
    dataStatus: 'Derived',
    signal: {
      observation:
        'Across 21 real PNSG campaign assets with Sentinel-2 time series from 2021-01 to 2026-06, 6 show significant NDVI greening, 14 show no significant NDVI trend, and 1 shows a significant decline.',
      spatialScope: '21 campaign assets across the Parque Nacional de la Sierra de Guadarrama.',
      temporalWindow: SNTO_EVIDENCE_SOURCE.observationWindow,
      summary:
        'The dominant real remote-sensing signal is stability or greening, not widespread decline. The one significant declining NDVI signal occurs at Maliciosa-Porrones and is accompanied by significantly increasing NDMI.'
    },
    evidence: {
      supportingDatasets: [
        'Real monthly Sentinel-2 SR Harmonized observations for 21 PNSG assets.',
        'Derived NDVI / NDMI / EVI series with 60–66 monthly observations per asset.',
        'Deseasonalised Mann–Kendall and Sen-slope trend analysis committed in the SNTO repository.',
        'The public-use decision evidence brief records the current L5a claim ceiling and the absence of visitor-use and field-validation evidence.'
      ],
      metrics: [
        { label: 'Significant NDVI Greening', value: '6', unit: 'assets', baseline: '21 time-series assets', delta: 'real derived trend', trend: 'up', isDemonstration: false },
        { label: 'No Significant NDVI Trend', value: '14', unit: 'assets', baseline: '21 time-series assets', delta: 'dominant outcome', trend: 'stable', isDemonstration: false },
        { label: 'Significant NDVI Decline', value: '1', unit: 'asset', baseline: '21 time-series assets', delta: 'Maliciosa-Porrones', trend: 'alert', isDemonstration: false },
        { label: 'Visitor-Use Series', value: 'NONE', unit: 'asset/trail scale', baseline: 'Required for pressure attribution', delta: 'INSUFFICIENT EVIDENCE', trend: 'alert', isDemonstration: false }
      ],
      spatialCoordinates: 'PNSG campaign assets spanning approximately 40.74–41.02° N and 4.06–3.73° W.',
      sampleSize: '21 real Sentinel-2 campaign assets; monthly series through June 2026.',
      dataIntegrityNotes:
        'REAL OBSERVATIONS + DERIVED INDICATORS: environmental change is observed remotely; tourism pressure, ecological condition, and causal impact are not established.'
    },
    interpretation: {
      inferences: [
        'The real environmental signal does not support a narrative of park-wide vegetation deterioration across the monitored assets.',
        'Maliciosa-Porrones merits monitoring because it is the only asset with a significant declining NDVI trend in this 21-asset series.',
        'The evidence can prioritize investigation, but cannot identify tourism as the cause of any change.'
      ],
      plausibleMechanisms:
        'Observed vegetation-index trends can reflect climate, phenology, succession, fire, management, geometry / mixed-pixel effects, or visitor-related mechanisms; the current evidence does not resolve attribution.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT label the Sentinel-2 signal as tourism pressure or tourism impact.',
        'DO NOT claim ecological or trail-condition field validation; Issue #26 has not run.',
        'DO NOT infer visitor volume at any asset or trail: no real asset/trail-scale visitor-use series is ingested.',
        'DO NOT generalize the 21 heterogeneous campaign assets as a representative sample of every PNSG trail.'
      ],
      unobservedVariables: [
        'Real asset/trail-scale visitor counts or access records.',
        'Qualified field observations of trail and ecological condition.',
        'Causal controls capable of separating visitor activity from climate and other environmental drivers.'
      ],
      spatialTemporalGaps:
        'The 21 assets include points, polygons, lines, and conservation reserves with different spatial-fit quality; 2026 is a partial year in the time series.'
    },
    competingExplanations: [
      {
        category: 'Environmental / Phenological Drivers',
        explanation: 'Climate variability, drought, phenology, succession, disturbance, and land management can alter NDVI and NDMI.',
        evaluation: 'Plausible competing explanation',
        reasoning: 'Sentinel-2 observes surface state, not the cause of that state.',
        investigationNeeded: 'Add matched climate / disturbance context and continue the time series before making attribution claims.'
      },
      {
        category: 'Spatial-Fit Effects',
        explanation: 'Point, line, and rocky climbing footprints may mix the used surface with surrounding vegetation.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'The SNTO decision brief explicitly identifies heterogeneous footprint fit as a claim ceiling.',
        investigationNeeded: 'Use field validation and higher-resolution observations where asset-scale interpretation matters.'
      }
    ],
    confidence: {
      level: 'High',
      justification: [
        'Confidence is High in the bounded descriptive statement that 6 assets greened significantly, 14 showed no significant NDVI trend, and 1 declined significantly because these values are derived from the committed real Sentinel-2 series.',
        'Confidence in causal attribution remains Low because visitor-use and field-validation evidence are absent.'
      ],
      marginOrInterval: 'Claim-specific confidence: high for trend distribution; no causal effect estimate.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Use the environmental signal to focus monitoring attention, not to prescribe restrictive intervention.',
        'Keep Maliciosa-Porrones on a monitoring / field-inspection shortlist.',
        'Treat stability / greening as evidence against manufacturing a degradation priority where no adverse signal exists.'
      ],
      cautionsAndGuardrails: [
        'No closure, quota, restoration, or budget commitment follows from the current Sentinel-2 evidence alone.',
        'Environmental change must remain separate from visitor-pressure attribution.'
      ],
      policyPerspective: [
        'The current product ceiling is L5a: monitoring / inspection recommendation with explicit uncertainty.'
      ]
    },
    dataNeededNext: [
      'Real visitor-use evidence at a spatial unit appropriate to the decision.',
      'Execution of the field-validation protocol (#26) by qualified personnel.',
      'Continued Sentinel-2 observations to test persistence of the Maliciosa-Porrones signal.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Sentinel-2 SR Harmonized campaign series',
        spatialResolution: 'Per-asset footprint; mixed geometry',
        temporalCoverage: '2021-01 to 2026-06',
        processingLevel: 'Observed surface reflectance source',
        sourceAuthority: 'SNTO public repository / Google Earth Engine campaign export',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/snto-smart-tourism-observatory',
        isCalibratedProxy: false,
        dataStatus: 'Observed'
      },
      {
        sensorOrPlatform: 'NDVI / NDMI + deseasonalised Mann–Kendall / Sen slope',
        spatialResolution: 'Per campaign asset',
        temporalCoverage: '2021-01 to 2026-06',
        processingLevel: 'Derived environmental trend',
        sourceAuthority: 'SNTO committed trend-analysis artifact',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/snto-smart-tourism-observatory/blob/main/clean_assets/timeseries/analysis/mk_trends_pnsg.json',
        isCalibratedProxy: false,
        dataStatus: 'Derived'
      }
    ]
  },

  // GUADARRAMA QUESTION 2: Maliciosa-Porrones causal boundary
  'guadarrama-snto-q2': {
    id: 'guadarrama-snto-q2',
    territoryId: 'guadarrama-snto',
    question: 'Does the Maliciosa-Porrones NDVI decline prove tourism damage?',
    status: 'INSUFFICIENT_EVIDENCE',
    statusHeadline: 'INSUFFICIENT EVIDENCE: A Real Declining NDVI Trend Does Not Establish Tourism Damage',
    dataStatus: 'Derived',
    signal: {
      observation:
        'Maliciosa-Porrones is the only one of the 21 campaign assets with a significant declining NDVI trend (τ = -0.369, p ≈ 0; n = 65), with a significant change point around March 2025.',
      spatialScope: 'Escuela de escalada Maliciosa-Porrones asset footprint.',
      temporalWindow: 'Monthly Sentinel-2 series, 2021-01 to 2026-06.',
      summary:
        'The environmental change signal is real and statistically significant within the committed analysis, but attribution to climbing, tourism, or visitor trampling is not supported.'
    },
    evidence: {
      supportingDatasets: [
        'NDVI: significant decreasing trend, τ = -0.369, p ≈ 0, n = 65.',
        'NDMI: significant increasing trend, τ = +0.215, p = 0.0114, creating an internally contradictory simple desiccation / trampling story.',
        'Annual mean NDVI in the committed trend artifact decreases from approximately 0.234 in 2021 to 0.213 in partial-year 2026.',
        'No real visitor-use series and no completed field-condition campaign exist for this asset.'
      ],
      metrics: [
        { label: 'NDVI Trend', value: '-0.369', unit: 'Kendall τ', baseline: 'No monotonic trend', delta: 'significant decrease', trend: 'alert', isDemonstration: false },
        { label: 'NDVI p-value', value: '<0.001', unit: 'approx.', baseline: '0.05', delta: 'significant', trend: 'alert', isDemonstration: false },
        { label: 'NDMI Trend', value: '+0.215', unit: 'Kendall τ', baseline: 'No monotonic trend', delta: 'significant increase', trend: 'up', isDemonstration: false },
        { label: 'Visitor-Use Evidence', value: 'NONE', unit: 'asset scale', baseline: 'Needed for tourism attribution', delta: 'missing', trend: 'alert', isDemonstration: false }
      ],
      spatialCoordinates: 'Maliciosa-Porrones representative display point derived from the committed polygon geometry.',
      sampleSize: '65 monthly observations in the committed trend analysis.',
      dataIntegrityNotes:
        'REAL SATELLITE SIGNAL; DERIVED TREND. The polygon covers rocky terrain, NDVI baseline is low, and no field observation verifies degradation or visitor impact.'
    },
    interpretation: {
      inferences: [
        'A persistent remote-sensing vegetation-change signal is present and merits monitoring / a targeted field look.',
        'The combination of declining NDVI and increasing NDMI argues against a simplistic single-mechanism story.',
        'No evidence currently identifies tourism as the causal driver.'
      ],
      plausibleMechanisms:
        'Possible explanations include vegetation composition / phenology, climate variability, surface geometry / mixed-pixel effects, land management, disturbance, or localized visitor effects; none is established as the cause.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT state that climbers or tourists caused the NDVI decline.',
        'DO NOT label the area ecologically degraded without qualified field evidence.',
        'DO NOT infer a closure, quota, restoration project, or budget from this signal.',
        'DO NOT treat statistical significance of a trend as causal significance.'
      ],
      unobservedVariables: [
        'Asset-scale visitor counts and temporal use pattern.',
        'Ground observations of vegetation cover, erosion, trail widening, or compaction.',
        'Matched environmental controls and disturbance history.'
      ],
      spatialTemporalGaps:
        'The climbing polygon is a coarse vegetation proxy over rocky terrain; 2026 is partial and no satellite-to-field validation has been completed.'
    },
    competingExplanations: [
      {
        category: 'Mixed-Pixel / Rocky-Surface Sensitivity',
        explanation: 'Low baseline vegetation cover can make the footprint sensitive to small compositional or scene-level changes.',
        evaluation: 'Plausible competing explanation',
        reasoning: 'The SNTO evidence brief explicitly notes low baseline NDVI and coarse spatial fit at this climbing polygon.',
        investigationNeeded: 'Compare higher-resolution imagery and repeat observations over the same footprint.'
      },
      {
        category: 'Environmental Change Unrelated to Tourism',
        explanation: 'Climate, phenology, succession, management, or disturbance may generate the observed NDVI trend.',
        evaluation: 'Plausible competing explanation',
        reasoning: 'No visitor-use denominator or attribution design exists.',
        investigationNeeded: 'Add environmental covariates and matched controls before testing any visitor-impact hypothesis.'
      },
      {
        category: 'Localized Visitor Effect',
        explanation: 'Climbing or access activity is a candidate mechanism only if spatially and temporally matched exposure can be demonstrated.',
        evaluation: 'Requires field validation',
        reasoning: 'The current repository contains no asset-scale visitor series and no field-condition validation.',
        investigationNeeded: 'Run the #26 field protocol and obtain a traceable visitor-use series appropriate to the asset.'
      }
    ],
    confidence: {
      level: 'High',
      justification: [
        'Confidence is High that a declining NDVI trend exists in the committed series.',
        'Confidence is Low for any tourism-impact attribution because the relevant exposure and field evidence do not exist.'
      ],
      marginOrInterval: 'Trend estimate exists; causal effect estimate does not.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Maintain Maliciosa-Porrones as MONITOR / DATA GAP rather than an intervention priority.',
        'Continue the Sentinel-2 series and include the asset in a qualified field-validation campaign.',
        'Acquire visitor-use evidence only if a tourism-pressure decision is actually required.'
      ],
      cautionsAndGuardrails: [
        'No restrictive action is justified from this signal alone.',
        'Do not collapse “significant trend” into “significant tourism impact”.'
      ],
      policyPerspective: [
        'A defensible monitoring flag is the highest current action supported for this asset.'
      ]
    },
    dataNeededNext: [
      'Qualified field-condition observations under the #26 protocol.',
      'Traceable asset-scale visitor-use data or an appropriately scoped proxy.',
      'Repeated remote-sensing observations and environmental covariates for attribution testing.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Sentinel-2 SR Harmonized → NDVI / NDMI trend artifact',
        spatialResolution: 'Maliciosa-Porrones polygon footprint',
        temporalCoverage: '2021-01 to 2026-06',
        processingLevel: 'Derived trend from real observations',
        sourceAuthority: 'SNTO committed mk_trends_pnsg.json',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/snto-smart-tourism-observatory/blob/main/clean_assets/timeseries/analysis/mk_trends_pnsg.json',
        isCalibratedProxy: false,
        dataStatus: 'Derived'
      }
    ]
  },

  // GUADARRAMA QUESTION 3: restrictive management ceiling
  'guadarrama-snto-q3': {
    id: 'guadarrama-snto-q3',
    territoryId: 'guadarrama-snto',
    question: 'Can SNTO justify closing trails or restricting visitor quotas?',
    status: 'INSUFFICIENT_EVIDENCE',
    statusHeadline: 'Decision Ceiling L5a: Current Evidence Does Not Authorize Closure, Quota, Restoration, or Budget Commitment',
    dataStatus: 'Derived',
    signal: {
      observation:
        'SNTO currently has real environmental observations and management context, but effectively no visitor-use evidence at asset or trail scale and no completed field-validation campaign.',
      spatialScope: 'PNSG public-use planning.',
      temporalWindow: 'Current repository evidence state.',
      summary:
        'The scientific product contract authorizes monitoring / inspection recommendations at the current evidence ceiling, not restrictive or resource-committing action.'
    },
    evidence: {
      supportingDatasets: [
        'Real Sentinel-2 ecosystem-state evidence reaches the monitoring / investigation layer.',
        'PRUG protection zoning is available as real management context.',
        'Visitor-pressure target variable remains INSUFFICIENT_EVIDENCE: no real asset/trail count series is ingested.',
        'Field validation #26 has not run.'
      ],
      metrics: [
        { label: 'Evidence Ceiling', value: 'L5a', unit: 'claim ladder', baseline: 'L5b/L6 required for stronger action', delta: 'monitor / inspect only', trend: 'stable', isDemonstration: false },
        { label: 'Trail-Level Visitor Counts', value: 'NONE', unit: 'real series', baseline: 'Required for pressure target', delta: 'missing', trend: 'alert', isDemonstration: false },
        { label: 'Field Validation', value: 'PENDING', unit: '#26', baseline: 'Required for validated condition claims', delta: 'not executed', trend: 'alert', isDemonstration: false },
        { label: 'Public-Use Intervention Priorities', value: '0', unit: 'supported cases', baseline: 'Evidence-proportionate review', delta: 'none supported', trend: 'stable', isDemonstration: false }
      ],
      spatialCoordinates: 'PNSG management territory.',
      sampleSize: 'Current SNTO evidence inventory and decision contract.',
      dataIntegrityNotes:
        'The absence of authorization is a scientific boundary, not a recommendation that management should never act using other institutional evidence.'
    },
    interpretation: {
      inferences: [
        'SNTO can flag environmental signals for monitoring / inspection.',
        'SNTO cannot currently justify closures, quotas, restoration budgets, or claims of intervention effectiveness.',
        'A real environmental signal does not fill the missing visitor-pressure and field-validation links.'
      ],
      plausibleMechanisms:
        'Restrictive public-use decisions require a stronger evidence chain than ecosystem-state observation alone.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT recommend closure or quota from Sentinel-2 evidence alone.',
        'DO NOT convert municipal mobility context into trail-level footfall.',
        'DO NOT present legacy per-trail budget / priority fields as decision recommendations.',
        'DO NOT claim effectiveness or regenerative outcome.'
      ],
      unobservedVariables: [
        'Real target visitor-pressure series.',
        'Complete management-response records.',
        'Field validation and comparator evidence required for higher claim levels.'
      ],
      spatialTemporalGaps:
        'The strongest local environmental evidence and the missing visitor-use evidence exist at different decision scales.'
    },
    competingExplanations: [
      {
        category: 'Management Evidence Outside SNTO',
        explanation: 'Park authorities may possess other operational evidence not represented in this repository.',
        evaluation: 'Confounded / indeterminate',
        reasoning: 'The prototype can only authorize claims from the evidence it actually contains.',
        investigationNeeded: 'Integrate authoritative management evidence explicitly before changing the decision ceiling.'
      }
    ],
    confidence: {
      level: 'High',
      justification: [
        'Confidence is High in the current claim ceiling because it is explicitly codified in the SNTO scientific product contract and decision-evidence matrix.'
      ],
      marginOrInterval: 'Authorization boundary, not a probabilistic estimate.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Use SNTO to prioritize monitoring / inspection where environmental evidence warrants attention.',
        'Require additional evidence before any restrictive or resource-committing recommendation.',
        'Preserve “insufficient evidence to prioritise” as a legitimate decision outcome.'
      ],
      cautionsAndGuardrails: [
        'Do not use product UI pressure to force a ranked intervention list.',
        'Do not silently upgrade REAL satellite evidence into validated ecological impact.'
      ],
      policyPerspective: [
        'Restrictive action remains outside the current SNTO evidence ceiling.'
      ]
    },
    dataNeededNext: [
      'Traceable public-use evidence at the relevant spatial scale.',
      'Field validation #26.',
      'If effectiveness claims are desired: complete intervention records, pre/post evidence, and a comparator / counterfactual.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'SNTO Scientific Product Contract + Evidence→Decision Matrix',
        spatialResolution: 'Product-level claim governance',
        temporalCoverage: 'Current main evidence state',
        processingLevel: 'Decision-use authorization',
        sourceAuthority: 'SNTO canonical scientific contract',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/snto-smart-tourism-observatory/blob/main/docs/phase1/SCIENTIFIC_PRODUCT_CONTRACT.md',
        isCalibratedProxy: false,
        dataStatus: 'Derived'
      }
    ]
  },

  // GUADARRAMA QUESTION 4: 218-trail layer
  'guadarrama-snto-q4': {
    id: 'guadarrama-snto-q4',
    territoryId: 'guadarrama-snto',
    question: 'What does the 218-trail OAPN layer actually support?',
    status: 'MODEL_DERIVED_RESULT',
    statusHeadline: 'Real Cartography × Real Sentinel-2: Useful Seasonal Early Warning, Not a Tourism-Pressure Ranking',
    dataStatus: 'Derived',
    signal: {
      observation:
        'The PNSG Pipeline-A layer combines official OAPN geometry for 218 trails with a two-scene Sentinel-2 environmental signal and PRUG zoning.',
      spatialScope: '218 official PNSG trail geometries.',
      temporalWindow: 'Two-scene seasonal comparison, not a multi-year per-trail time series.',
      summary:
        'At aggregate level, 165 trails are classified as improving and 46 as worsening in the seasonal environmental signal. The layer does not contain trail-level visitor-use evidence.'
    },
    evidence: {
      supportingDatasets: [
        'Official OAPN trail cartography for 218 trails.',
        'Real Sentinel-2 seasonal environmental signal (EHS / ΔEHS).',
        'Official PRUG management zoning per trail.',
        'The decision evidence brief explicitly separates this layer from the 21-asset multi-year time series.'
      ],
      metrics: [
        { label: 'Official OAPN Trails', value: '218', unit: 'trails', baseline: 'Full mapped layer', delta: 'official geometry', trend: 'stable', isDemonstration: false },
        { label: 'Seasonal Signal Improving', value: '165', unit: 'trails', baseline: 'Two-scene ΔEHS', delta: 'environmental signal', trend: 'up', isDemonstration: false },
        { label: 'Seasonal Signal Worsening', value: '46', unit: 'trails', baseline: 'Two-scene ΔEHS', delta: 'environmental signal', trend: 'alert', isDemonstration: false },
        { label: 'Trail-Level Visitor Pressure', value: 'NOT AVAILABLE', unit: 'target evidence', baseline: 'Required for pressure ranking', delta: 'unsupported', trend: 'alert', isDemonstration: false }
      ],
      spatialCoordinates: 'Official PNSG OAPN trail network.',
      sampleSize: '218 trail geometries.',
      dataIntegrityNotes:
        'REAL CARTOGRAPHY × REAL SATELLITE SIGNAL. Seasonal early-warning only; derived legacy budget / priority fields are not authorized as management recommendations.'
    },
    interpretation: {
      inferences: [
        'The trail layer can support environmental monitoring and PRUG-aware inspection planning.',
        'It cannot support a trail-by-trail tourism-pressure ranking because visitor use is not measured at trail scale.',
        'A two-scene seasonal change is not equivalent to a multi-year trend.'
      ],
      plausibleMechanisms:
        'Environmental signal changes may reflect seasonal vegetation dynamics and other non-tourism drivers.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT call worsening ΔEHS “tourism degradation”.',
        'DO NOT present the layer as a visitor-footfall map.',
        'DO NOT surface legacy per-trail budget_eur or priority_index as recommendations.',
        'DO NOT treat the two-scene signal as a long-term trend.'
      ],
      unobservedVariables: [
        'Trail-level visitor counts.',
        'Field trail-condition measurements.',
        'Multi-year per-trail trend series for all 218 trails.'
      ],
      spatialTemporalGaps: 'Environmental state is localized per trail, but public-use exposure is not.'
    },
    competingExplanations: [
      {
        category: 'Seasonal Environmental Variability',
        explanation: 'Two-scene differences can reflect seasonal or scene-specific environmental conditions.',
        evaluation: 'Plausible competing explanation',
        reasoning: 'The 218-trail layer is explicitly a seasonal early-warning layer rather than a long time series.',
        investigationNeeded: 'Extend temporal coverage before interpreting persistence.'
      }
    ],
    confidence: {
      level: 'High',
      justification: [
        'Confidence is High in the existence and scope of the 218-trail environmental layer and its aggregate counts; confidence is not transferred to tourism-pressure attribution.'
      ],
      marginOrInterval: 'Descriptive layer summary; no visitor-pressure effect estimate.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Use the layer to organize environmental follow-up by trail and PRUG zone.',
        'Combine it with real public-use evidence only when such evidence exists at a compatible scale.'
      ],
      cautionsAndGuardrails: [
        'Do not rank trails by tourism impact from environmental signal alone.',
        'Keep seasonal and multi-year evidence surfaces distinct.'
      ],
      policyPerspective: [
        'The layer is an early-warning and monitoring aid, not an automated intervention allocator.'
      ]
    },
    dataNeededNext: [
      'Trail/access-level visitor evidence where operationally feasible.',
      'Repeated environmental observations to establish persistence.',
      'Field-condition evidence for any ground-impact claim.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'OAPN trail cartography × Sentinel-2 Pipeline A',
        spatialResolution: 'Per official trail geometry',
        temporalCoverage: 'Two-scene seasonal comparison',
        processingLevel: 'Derived environmental early-warning layer',
        sourceAuthority: 'SNTO PNSG Pipeline A',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/snto-smart-tourism-observatory',
        isCalibratedProxy: false,
        dataStatus: 'Derived'
      }
    ]
  },

  // GUADARRAMA QUESTION 5: evidence gap
  'guadarrama-snto-q5': {
    id: 'guadarrama-snto-q5',
    territoryId: 'guadarrama-snto',
    question: 'What evidence is missing before tourism-pressure attribution is possible?',
    status: 'INSUFFICIENT_EVIDENCE',
    statusHeadline: 'Evidence Gap: Real Environmental State Exists, but the Tourism-Pressure Target Is Still Missing',
    dataStatus: 'Derived',
    signal: {
      observation:
        'SNTO has real environmental observations but no traceable asset/trail-scale visitor-pressure target series and no completed field-validation campaign.',
      spatialScope: 'PNSG evidence architecture.',
      temporalWindow: 'Current evidence inventory.',
      summary:
        'The missing link is not more satellite imagery alone; it is evidence that measures public use at the decision scale and validates physical condition on the ground.'
    },
    evidence: {
      supportingDatasets: [
        'No counters, access-control records, parking occupancy series, surveys, or ingested mobility exist at asset/trail scale.',
        'The MITMA crosswalk exists only as municipal context and its snapshot is not generated; even if ingested it would not become trail footfall.',
        'Field validation #26 has not run.',
        'Management-response evidence is incomplete for effectiveness reasoning.'
      ],
      metrics: [
        { label: 'Visitor Pressure Target', value: 'MISSING', unit: 'readiness', baseline: 'Real asset/park series', delta: 'INSUFFICIENT EVIDENCE', trend: 'alert', isDemonstration: false },
        { label: 'Field Validation', value: 'NOT RUN', unit: '#26', baseline: 'Required for field-confirmed condition', delta: 'hard gate', trend: 'alert', isDemonstration: false },
        { label: 'Management Response Record', value: 'INCOMPLETE', unit: 'evidence pillar', baseline: 'Needed for effectiveness', delta: 'L6 blocked', trend: 'alert', isDemonstration: false },
        { label: 'Current Ceiling', value: 'L5a', unit: 'claim ladder', baseline: 'monitor / inspect', delta: 'causality blocked', trend: 'stable', isDemonstration: false }
      ],
      spatialCoordinates: 'Product-level evidence architecture.',
      sampleSize: 'Evidence inventory, not a statistical sample.',
      dataIntegrityNotes:
        'MISSING ≠ ZERO and MISSING ≠ SAFE. The product explicitly represents absent evidence rather than substituting a proxy as if it were the target.'
    },
    interpretation: {
      inferences: [
        'The priority gap is a measurement problem, not an AI-generation problem.',
        'Municipal mobility can provide macro context but cannot satisfy the trail-level visitor-pressure target.',
        'Satellite-to-field validation is necessary before field-confirmed condition or causal impact claims.'
      ],
      plausibleMechanisms:
        'A future attribution design would need temporally aligned visitor exposure, environmental state, field condition, and confounder treatment.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT use digital route traces as direct visitor counts without a validated calibration relationship.',
        'DO NOT substitute municipal mobility for trail footfall.',
        'DO NOT treat missing pressure data as low pressure.',
        'DO NOT bypass the #26 field gate using model confidence.'
      ],
      unobservedVariables: [
        'Direct or instrumented public-use counts at an appropriate decision unit.',
        'Qualified ground-condition observations.',
        'Complete management-response evidence if effectiveness is later studied.'
      ],
      spatialTemporalGaps: 'Evidence layers currently resolve different spatial units and cannot be fused into a causal trail-level claim.'
    },
    competingExplanations: [
      {
        category: 'Proxy Substitution Risk',
        explanation: 'Convenient mobility or digital-activity proxies may be mistaken for the target visitor-use variable.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'The SNTO scientific contract explicitly ranks pressure proxies and blocks unsuitable sources from upgrading readiness.',
        investigationNeeded: 'Predefine the target variable and acceptable measurement instrument before acquisition.'
      }
    ],
    confidence: {
      level: 'High',
      justification: [
        'Confidence is High in the evidence-gap statement because the absence of the visitor-pressure target and field campaign is explicitly documented and enforced by the product contract.'
      ],
      marginOrInterval: 'Evidence inventory statement; no effect estimate.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Prioritize data acquisition only where it answers a concrete management question.',
        'Prefer direct counts or instrumented proxies for a visitor-pressure target.',
        'Run field validation before escalating environmental signals into physical-impact claims.'
      ],
      cautionsAndGuardrails: [
        'Do not create synthetic precision to fill a missing evidence pillar.',
        'Do not convert availability of data into scientific suitability.'
      ],
      policyPerspective: [
        'The next maturity step is better evidence alignment, not a stronger model.'
      ]
    },
    dataNeededNext: [
      'Direct counts, access records, or a documented instrumented proxy at the relevant public-use unit.',
      'Field-validation observations from qualified personnel under #26.',
      'A pre-specified attribution design if causal tourism-impact claims are eventually sought.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'SNTO PNSG Decision Evidence Brief + Scientific Product Contract',
        spatialResolution: 'Evidence architecture',
        temporalCoverage: 'Current project state',
        processingLevel: 'Evidence-gap audit',
        sourceAuthority: 'SNTO canonical documentation',
        citationUrl: 'https://github.com/soroushkarahrodi79-oss/snto-smart-tourism-observatory/blob/main/docs/PNSG_DECISION_EVIDENCE_BRIEF.md',
        isCalibratedProxy: false,
        dataStatus: 'Derived'
      }
    ]
  }
};
