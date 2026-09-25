import { TerritoryCase, EvidenceAssessment } from '../types';
import { HATI_EVIDENCE_SOURCE, HATI_REPRODUCED_METRICS, HATI_REFERENCE_ASSETS } from './hatiEvidence';

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
    subtitle: 'High-Mountain Protected Area Environmental Monitoring & Satellite Indicators',
    description:
      'Copernicus Sentinel-2 10-meter Normalized Difference Vegetation Index (NDVI) multi-year time series, high-elevation meteorological observations, and automated trail counters across sensitive subalpine habitats in the Sierra de Guadarrama National Park (Peñalara, Cotos, and La Pedriza).',
    focusTheme: 'Subalpine Vegetation Dynamics & Trail Buffer Monitoring',
    center: [40.8172, -3.9564],
    zoom: 12,
    bounds: [
      [40.75, -4.05],
      [40.88, -3.85]
    ],
    satelliteBands: ['Sentinel-2 Band 4 (Red)', 'Sentinel-2 Band 8 (NIR)', 'Sentinel-2 Band 11 (SWIR)'],
    keyIndicators: [
      { name: 'Laguna Peñalara NDVI Delta', value: '-0.142', unit: 'Index', change: '-18.5% YoY in demo period', isDemo: true },
      { name: 'Root-Zone Soil Moisture Proxy', value: '11.8', unit: '% vol', change: 'Deficit condition in demo proxy', isDemo: true },
      { name: 'Trailhead Peak Footfall (Cotos)', value: '3,840', unit: 'visitors/day', change: 'Illustrative weekend spike', isDemo: true },
      { name: 'Snowpack Persistence Anomaly', value: '-22', unit: 'days', change: 'Earlier snow depletion anomaly', isDemo: true }
    ],
    sampleQuestions: [
      'NDVI decreased 18%. Are tourists damaging the park?',
      'Is this area experiencing a meaningful environmental change?',
      'Can subalpine vegetation degradation along Laguna de Peñalara be attributed to tourist trampling?',
      'Can elevated weekend visitor spikes be linked to water quality fluctuations in the upper Manzanares basin?',
      'What additional evidence is required before restricting visitor quotas based on vegetation decline?'
    ],
    stations: [
      {
        id: 'gua-st-01',
        name: 'Puerto de Cotos Gateway Node (1,830m)',
        code: 'SNTO-COT-01',
        lat: 40.8285,
        lng: -3.9602,
        elevationMeters: 1830,
        type: 'visitor_counter',
        readings: { airTempC: 22.4, dailyVisitors: 3840, soilMoisturePct: 14.1, snowDepthCm: 0, windSpeedMs: 4.8 },
        status: 'active',
        isDemonstrationStation: true
      },
      {
        id: 'gua-st-02',
        name: 'Laguna Grande de Peñalara Observation Node (2,019m)',
        code: 'SNTO-PEN-02',
        lat: 40.8351,
        lng: -3.9525,
        elevationMeters: 2019,
        type: 'phenology_camera',
        readings: { airTempC: 19.8, dailyVisitors: 1120, soilMoisturePct: 9.8, ndviMean: 0.41, soilCompactionMpa: 2.8 },
        status: 'active',
        isDemonstrationStation: true
      },
      {
        id: 'gua-st-03',
        name: 'La Pedriza — Canto Cochino Monitoring Base (1,025m)',
        code: 'SNTO-PED-03',
        lat: 40.7512,
        lng: -3.8968,
        elevationMeters: 1025,
        type: 'visitor_counter',
        readings: { airTempC: 31.6, dailyVisitors: 2950, soilMoisturePct: 10.4, waterTurbidityNtu: 3.8, parkingCapacityPct: 96 },
        status: 'active',
        isDemonstrationStation: true
      },
      {
        id: 'gua-st-04',
        name: 'Puerto de Navacerrada Meteorological Reference (1,858m)',
        code: 'SNTO-NAV-04',
        lat: 40.7895,
        lng: -4.0041,
        elevationMeters: 1858,
        type: 'microclimate',
        readings: { airTempC: 21.2, dailyVisitors: 2180, soilMoisturePct: 16.5, solarRadiationWm2: 890, relativeHumidity: 38 },
        status: 'active',
        isDemonstrationStation: true
      },
      {
        id: 'gua-st-05',
        name: 'Pico de Peñalara High Alpine Tower (2,428m)',
        code: 'SNTO-SUM-05',
        lat: 40.8503,
        lng: -3.9554,
        elevationMeters: 2428,
        type: 'flux_tower',
        readings: { airTempC: 16.1, dailyVisitors: 640, windSpeedMs: 11.2, uvIndex: 9.6, atmosphericPressureHpa: 760 },
        status: 'active',
        isDemonstrationStation: true
      }
    ],
    features: [
      {
        id: 'feat-penalara-laguna',
        name: 'Peñalara Glacial Cirque & Subalpine Sector',
        category: 'subalpine_zone',
        coordinates: [
          [40.842, -3.962],
          [40.842, -3.945],
          [40.828, -3.945],
          [40.828, -3.962]
        ],
        center: [40.835, -3.9535],
        properties: {
          ndviDelta: -0.142,
          erosionRisk: 'Severe',
          soilCompactionIndex: 2.8,
          visitorVolumeHourly: 240
        }
      },
      {
        id: 'feat-cotos-trail-buffer',
        name: 'Puerto de Cotos to Laguna Trail Buffer Zone',
        category: 'trail_buffer',
        coordinates: [
          [40.829, -3.961],
          [40.831, -3.958],
          [40.833, -3.955],
          [40.836, -3.953],
          [40.835, -3.951],
          [40.832, -3.954],
          [40.83, -3.958],
          [40.828, -3.96]
        ],
        center: [40.832, -3.956],
        properties: {
          ndviDelta: -0.21,
          erosionRisk: 'Critical',
          soilCompactionIndex: 3.4,
          visitorVolumeHourly: 380
        }
      },
      {
        id: 'feat-pedriza-granite',
        name: 'La Pedriza Granite Sector & Riparian Buffer',
        category: 'trail_buffer',
        coordinates: [
          [40.765, -3.91],
          [40.765, -3.88],
          [40.74, -3.88],
          [40.74, -3.91]
        ],
    dataStatus: 'Demonstration',
    dataStatusNote:
      'Curated demonstration/proxy values illustrate the analytical workflow. They are not operational SNTO field measurements or live satellite ingestion.',
        center: [40.7525, -3.895],
        properties: {
          ndviDelta: -0.045,
          erosionRisk: 'Moderate',
          soilCompactionIndex: 1.6,
          visitorVolumeHourly: 420
        }
      }
    ]
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

  // GUADARRAMA QUESTION 1: Meaningful environmental change
  'guadarrama-snto-q1': {
    id: 'guadarrama-snto-q1',
    territoryId: 'guadarrama-snto',
    question: 'Is this area experiencing a meaningful environmental change?',
    status: 'OBSERVED_ANOMALY',
    statusHeadline: 'Observed Vegetation & Hydrological Signal in Demonstration Dataset',
    dataStatus: 'Demonstration',
    signal: {
      observation:
        'A reduction in Normalized Difference Vegetation Index (NDVI) of approximately -0.142 (-18.5% YoY in demonstration processing) is detected across subalpine scrub (Cytisus oromediterraneus) and wet pasture zones above 1,900m in the Peñalara glacial cirque.',
      spatialScope: 'Parque Nacional de la Sierra de Guadarrama, Peñalara sector (high-mountain protected area).',
      temporalWindow: 'Demonstration Sentinel-2 multi-year composite (August peak greenness window).',
      summary: 'Satellite optical indices and high-mountain meteorological records indicate widespread subalpine moisture stress.'
    },
    evidence: {
      supportingDatasets: [
        'Copernicus Sentinel-2 MSI 10m surface reflectance shows reduced August NDVI relative to multi-year historical medians.',
        'Meteorological records at Puerto de Navacerrada document a substantial precipitation deficit during the preceding spring months.',
        'High-elevation soil moisture sensors at Laguna Grande indicate depressed root-zone moisture during the summer window.',
        'Snowpack persistence records show earlier snow depletion compared to the long-term climatological median.'
      ],
      metrics: [
        { label: 'Subalpine NDVI Delta', value: '-0.142', unit: 'Index', baseline: 'Historical average', delta: '-18.5% in demo window', trend: 'alert', isDemo: true },
        { label: 'Spring Precipitation Deficit', value: '-62.0', unit: '%', baseline: 'Seasonal median', delta: 'Deficit condition (demo)', trend: 'down', isDemo: true },
        { label: 'Root Soil Moisture Proxy', value: '9.8', unit: '% vol', baseline: 'Normal range', delta: 'Moisture deficit (demo)', trend: 'alert', isDemo: true },
        { label: 'Data Status', value: 'DEMONSTRATION', unit: 'mode', baseline: 'Demonstration data', delta: 'Operational validation required', trend: 'stable', isDemo: true }
      ],
      spatialCoordinates: '40.8351° N, 3.9525° W, Elevation 2,019m a.s.l.',
      sampleSize: 'Demonstration Sentinel-2 composite series and automated sensor telemetry.',
      dataIntegrityNotes: 'DEMONSTRATION DATA: Illustrative values used to demonstrate the analytical workflow. Not an operational national park finding.'
    },
    interpretation: {
      inferences: [
        'Subalpine plant communities are experiencing physiological vegetative and moisture stress.',
        'Earlier snowmelt combined with spring precipitation deficit has reduced moisture availability in high-elevation granite soils.'
      ],
      plausibleMechanisms:
        'Accelerated spring snowpack melt exposes high-mountain scrub to early radiation drying, followed by extended summer moisture deficit.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT conclude that tourism is the primary cause of this regional NDVI decline (the signal occurs across both visited trail corridors and inaccessible rock faces).',
        'DO NOT infer permanent scrub mortality without observing subsequent spring phenological recovery.',
        'DO NOT extrapolate high-elevation subalpine scrub trends to deep-rooted lower-elevation Scots pine forests.'
      ],
      unobservedVariables: [
        'Wild ungulate (Spanish ibex / Capra pyrenaica) grazing pressure distribution.',
        'Prevalence of seasonal fungal pathogens or insect defoliation in Cytisus stands.'
      ],
      spatialTemporalGaps: 'Winter cloud and snow cover limit continuous optical satellite monitoring between November and April.'
    },
    competingExplanations: [
      {
        category: 'Meteorological Drought',
        explanation: 'Regional precipitation deficit and high vapor pressure deficit during spring and early summer.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'Precipitation deficit affects the entire mountain range and correlates with regional drought indices.',
        investigationNeeded: 'Correlate with Standardized Precipitation Evapotranspiration Index (SPEI) at catchment scale.'
      },
      {
        category: 'Snowpack Depletion & Thermal Stress',
        explanation: 'Earlier snowmelt leading to prolonged summer soil moisture desiccation.',
        evaluation: 'Plausible competing explanation',
        reasoning: 'Snow cover ended weeks earlier than climatological median, eliminating summer snowmelt recharge.',
        investigationNeeded: 'Analyze satellite MODIS/Sentinel-2 fractional snow cover duration records.'
      },
      {
        category: 'Tourist Off-Trail Trampling',
        explanation: 'Localized visitor trampling as a candidate factor.',
        evaluation: 'Plausible secondary factor',
        reasoning: 'Localized mechanical trampling can occur within meters of trail edges, but cannot account for widespread decline observed on remote cliff faces.',
        investigationNeeded: 'Conduct high-resolution spatial buffer analysis separating trail corridors from remote controls.'
      }
    ],
    confidence: {
      level: 'Moderate',
      justification: [
        'The broad biophysical signal (drought-induced NDVI decline) is consistent across satellite and meteorological observations; marked Moderate because specific numerical values are demonstration proxies.'
      ],
      marginOrInterval: 'Regional vegetation stress observed; numerical attribution requires operational validation'
    },
    decisionImplication: {
      managerialConsiderations: [
        'If seasonal dry conditions continue, field inspection of fragile wet meadow habitats along primary trail approaches could be prioritized.',
        'If field verification confirms localized trampling or path widening, trail delineation (low-profile timber and stone borders) could be considered.',
        'High-mountain wildfire prevention protocols could be maintained as a precautionary safeguard during periods of observed vegetation desiccation.'
      ],
      cautionsAndGuardrails: [
        'Do not attribute park-wide vegetation decline to tourist trampling without presenting meteorological drought and phenology context.',
        'Do not enact sweeping administrative closures without operational ground verification.'
      ],
      policyPerspective: [
        'Integrate climate drought indicators alongside visitor volume when evaluating seasonal trail management.'
      ]
    },
    dataNeededNext: [
      'High-resolution drone (UAV) multispectral imagery (<5cm resolution) to separate immediate trailside trampling from background slope drought response.',
      'Permanent fenced control exclosure plots to isolate grazing and trampling from meteorological drought effects.',
      'Field soil moisture transects across varying soil depths.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Copernicus Sentinel-2 MSI Multi-Spectral Instrument (Illustrative Proxy)',
        spatialResolution: '10m (Bands 4, 8)',
        temporalCoverage: 'Demonstration summer comparison',
        processingLevel: 'Level 2A Surface Reflectance Proxy',
        sourceAuthority: 'Earth Observation Data Reference',
        isCalibratedProxy: true,
        dataStatus: 'Demonstration'
      },
      {
        sensorOrPlatform: 'AEMET High-Mountain Meteorological Observatory (Navacerrada #2462 Reference)',
        spatialResolution: 'Point observatory (1,858m)',
        temporalCoverage: 'Climatological baseline reference',
        processingLevel: 'Quality Controlled Observation Reference',
        sourceAuthority: 'Agencia Estatal de Meteorología (Reference)',
        isCalibratedProxy: false,
        dataStatus: 'Proxy'
      }
    ]
  },

  // GUADARRAMA QUESTION 2: CAUSALITY TRAP TEST - Does trampling cause Peñalara degradation?
  'guadarrama-snto-q2': {
    id: 'guadarrama-snto-q2',
    territoryId: 'guadarrama-snto',
    question: 'NDVI decreased 18%. Are tourists damaging the park?',
    status: 'INSUFFICIENT_EVIDENCE',
    statusHeadline: 'Available Evidence Does Not Establish Causation: Environmental Confounders Prevent Attributing NDVI Decline to Tourism',
    dataStatus: 'Demonstration',
    signal: {
      observation:
        'In the demonstration dataset, Normalized Difference Vegetation Index (NDVI) within the 10m buffer of the Laguna de Peñalara hiking path decreased by -0.21 (-18.5%), while background vegetation across remote control slopes decreased by -0.14.',
      spatialScope: 'Laguna de Peñalara trail corridor and surrounding subalpine basin (1,830m to 2,020m).',
      temporalWindow: 'Demonstration summer comparison.',
      summary: 'Vegetation decline is observed in the demonstration dataset. However, this does not establish tourist damage, as regional environmental factors also explain the background landscape signal.'
    },
    evidence: {
      supportingDatasets: [
        'Trail buffer (0–5m) shows bare soil patches and elevated soil compaction in demonstration field surveys.',
        'However, remote control areas more than 150m from any trail also experienced significant NDVI decline during the same period due to spring precipitation deficits.',
        'High visitor counts coincide with the summer season, creating strong temporal overlap with the period of peak annual drought and solar radiation.',
        'No fenced exclosure control plots currently exist to isolate human mechanical footfall from ambient climatic drying.'
      ],
      metrics: [
        { label: 'Trail Buffer (0-5m) NDVI Delta', value: '-0.210', unit: 'Index', baseline: 'Historical average', delta: '-0.210 (demo)', trend: 'alert', isDemo: true },
        { label: 'Remote Control (>150m) NDVI Delta', value: '-0.142', unit: 'Index', baseline: 'Historical average', delta: '-0.142 (drought)', trend: 'alert', isDemo: true },
        { label: 'Attributable Difference', value: '-0.068', unit: 'Index', baseline: '0.000', delta: 'Confounded by soil & topography', trend: 'alert', isDemo: true },
        { label: 'Evidence Confidence', value: 'LOW', unit: 'attribution', baseline: 'Defensible threshold', delta: 'INSUFFICIENT EVIDENCE', trend: 'alert', isDemo: true }
      ],
      spatialCoordinates: '40.8320° N, 3.9560° W, Elevation 1,940m',
      sampleSize: 'Demonstration transect model and field proxy data.',
      dataIntegrityNotes: 'DEMONSTRATION DATA: Illustrative values used to demonstrate the analytical workflow. Not an operational project result.'
    },
    interpretation: {
      inferences: [
        'Vegetation decline is observed in the demonstration dataset; this does not establish tourist damage.',
        'Localized visitor pressure remains one candidate explanation along immediate 2–3m path margins, but regional environmental factors may also explain the signal across the broader landscape.',
        'Attribution requires additional spatial and temporal evidence; for demonstration data, no competing explanation should be promoted to the established cause.'
      ],
      plausibleMechanisms:
        'Possible compound interaction: ambient meteorological moisture deficit weakens turf resilience, with localized visitor trampling acting as a candidate secondary factor along immediate trail edges.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'CRITICAL ANTI-CAUSALITY RULE: Available evidence does not establish tourist visitation as the cause of the 18% NDVI reduction.',
        'DO NOT conclude that eliminating visitors would restore vegetation levels during an ongoing meteorological drought.',
        'DO NOT promote any candidate explanation to an established cause without controlled exclosure experiments.',
        'DO NOT implement park-wide management interventions based solely on this demonstration signal.'
      ],
      unobservedVariables: [
        'Fenced control exclosures (preventing human and ungulate access) to measure natural baseline recovery.',
        'Soil depth variation (trails often follow naturally thin-soil rocky ridgelines with higher drought vulnerability).'
      ],
      spatialTemporalGaps: 'Sentinel-2 10m pixels aggregate both the 1.5m trail and adjacent untouched vegetation, creating mixed-pixel averaging.'
    },
    competingExplanations: [
      {
        category: 'Macro-Climatic Drought',
        explanation: 'Regional precipitation deficit and high vapor pressure deficit across the Iberian Central System.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'Remote, inaccessible cliff faces experienced ~68% of the equivalent NDVI decline without any human visitation, indicating regional environmental factors may explain the signal.',
        investigationNeeded: 'Model regional vegetation-drought sensitivity curves and catchment SPEI.'
      },
      {
        category: 'Localized Visitor Trampling',
        explanation: 'Localized visitor trampling as a candidate factor.',
        evaluation: 'Plausible competing explanation',
        reasoning: 'Localized visitor pressure remains one candidate explanation for trailside buffer differentials, but cannot account for park-wide background declines.',
        investigationNeeded: 'Deploy paired UAV flights and sub-meter soil compaction transects.'
      },
      {
        category: 'Wild Ungulate Grazing',
        explanation: 'Herbivory and trampling by Spanish ibex (Capra pyrenaica) concentrated near water sources.',
        evaluation: 'Requires field validation',
        reasoning: 'Ibex populations frequent high-elevation alpine springs during dry summer months.',
        investigationNeeded: 'Conduct camera trap censuses and ungulate exclosure trials.'
      }
    ],
    confidence: {
      level: 'Low',
      justification: [
        'Evidence confidence for attributing the decline to tourism is Low due to severe confounding with regional meteorological drought and coarse satellite spatial resolution.'
      ],
      marginOrInterval: 'Causal attribution cannot be established with available data'
    },
    decisionImplication: {
      managerialConsiderations: [
        'No park-wide management intervention or visitor quota restriction is justified from this signal alone.',
        'Vegetation decline observed in the demonstration dataset does not establish tourist damage; attribution requires additional spatial and temporal evidence.',
        'If field verification confirms localized trampling or path widening, targeted trail delineation (timber borders, stone cairns) could be considered.',
        'Paired scientific exclosure plots could be commissioned to isolate human mechanical pressure from ambient meteorological drying.'
      ],
      cautionsAndGuardrails: [
        'Do not announce tourist trampling as the established cause of park-wide vegetation decline without presenting drought and phenology context.',
        'Avoid making definitive public claims without controlled experimental data.'
      ],
      policyPerspective: [
        'Incorporate compound drought indicators into trail management frameworks rather than using visitor numbers in isolation.'
      ]
    },
    dataNeededNext: [
      'Establishment of permanent fenced scientific exclosure plots (10m x 10m) to monitor vegetation with and without footfall.',
      'High-resolution UAV multispectral imagery (<3cm ground sampling distance) before and after peak hiking seasons.',
      'Soil depth and compaction mapping across both trail and control transects.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Sentinel-2 MSI + Illustrative Field Penetrometer Survey Proxy',
        spatialResolution: '10m satellite / point mechanical sampling proxy',
        temporalCoverage: 'Demonstration observation',
        processingLevel: 'Differential Buffer Anomaly Model',
        sourceAuthority: 'Tourism Intelligence Desk Analytical Prototype',
        isCalibratedProxy: true,
        dataStatus: 'Demonstration'
      }
    ]
  },

  // GUADARRAMA QUESTION 3: Water quality vs weekend visitor spikes
  'guadarrama-snto-q3': {
    id: 'guadarrama-snto-q3',
    territoryId: 'guadarrama-snto',
    question: 'Can elevated weekend visitor spikes be linked to water quality fluctuations in the upper Manzanares basin?',
    status: 'INSUFFICIENT_EVIDENCE',
    statusHeadline: 'INSUFFICIENT EVIDENCE: Discrete Sampling Aliasing & Confounding Storm Runoff Prevent Attribution',
    dataStatus: 'Demonstration',
    signal: {
      observation:
        'Occasional spikes in river water turbidity and sporadic biological indicator detections downstream of recreational areas are recorded in demonstration grab sampling during summer weekend afternoons.',
      spatialScope: 'Upper Río Manzanares basin within La Pedriza (18.6 km² sub-catchment).',
      temporalWindow: 'Demonstration bi-weekly grab sampling series.',
      summary: 'Sampling frequency and meteorological confounding prevent establishing an evidence-based link between visitor volume and water quality.'
    },
    evidence: {
      supportingDatasets: [
        'Discrete grab sample records show elevated turbidity on 3 out of 6 sampled summer Saturdays in demonstration data.',
        'However, 2 of those 3 elevated readings coincided with localized convective alpine summer thunderstorm events recorded in radar telemetry.',
        'Water sampling was performed only twice per month, representing severe temporal under-sampling (temporal aliasing).',
        'Wildlife populations and natural organic debris breakdown during low baseflow periods also introduce background organic loading.'
      ],
      metrics: [
        { label: 'Weekend Turbidity Mean', value: '6.2', unit: 'NTU', baseline: '1.8 NTU (weekday)', delta: '+4.4 NTU in demo data', trend: 'alert', isDemo: true },
        { label: 'Storm Confounding Events', value: '2 / 3', unit: 'episodes', baseline: '0 storm events', delta: 'Convective storm overlap', trend: 'alert', isDemo: true },
        { label: 'Sampling Frequency', value: '2', unit: 'samples/mo', baseline: 'Continuous needed', delta: 'Severe temporal aliasing', trend: 'down', isDemo: true },
        { label: 'Attribution Status', value: 'INSUFFICIENT', unit: 'status', baseline: 'Defensible threshold', delta: 'INSUFFICIENT EVIDENCE', trend: 'alert', isDemo: true }
      ],
      spatialCoordinates: '40.7512° N, 3.8968° W, Elevation 1,025m',
      sampleSize: 'Demonstration discrete grab sample logs (N = 12 samples).',
      dataIntegrityNotes: 'DEMONSTRATION DATA: Illustrative values used to demonstrate the analytical workflow. Not an operational project result.'
    },
    interpretation: {
      inferences: [
        'Local wading and riverbank disturbance by visitors plausibly cause localized resuspension of fine granitic sediments near specific pools.',
        'However, with discrete bi-weekly samples and convective storm overlap, attributing systemic basin-wide water degradation to tourism is scientifically unfounded.'
      ],
      plausibleMechanisms:
        'Local physical sediment agitation by recreational bathers combined with stormwater surface runoff carrying mineral dust into shallow stream reaches.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT conclude that tourism is contaminating or degrading the municipal water supply based on this evidence.',
        'DO NOT perform statistical correlation between bi-weekly grab samples and daily visitor counts (violates sampling theory).',
        'DO NOT ignore natural thunderstorm runoff as a dominant contributor to episodic turbidity.'
      ],
      unobservedVariables: [
        'Continuous high-frequency (10-minute) turbidity, dissolved oxygen, and conductivity sensor telemetry.',
        'Microbial source tracking (MST) to distinguish human-specific genetic markers from wildlife feces.'
      ],
      spatialTemporalGaps: 'A 14-day gap between grab samples leaves hundreds of transient discharge and contamination events completely unrecorded.'
    },
    competingExplanations: [
      {
        category: 'Convective Alpine Thunderstorms',
        explanation: 'Localized convective rain cells flushing natural mineral sediment into the stream channel.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'Turbidity spikes coincided with recorded radar precipitation pulses in 2 of 3 elevated episodes.',
        investigationNeeded: 'Deploy rainfall-triggered autosamplers.'
      },
      {
        category: 'Localized Recreational Disturbance',
        explanation: 'Bathing and foot traffic physically resuspending fine riverbed sediments.',
        evaluation: 'Plausible secondary factor',
        reasoning: 'Observed locally in popular bathing pools, but downstream spatial persistence is unverified.',
        investigationNeeded: 'Deploy paired turbidity probes upstream and downstream of recreational pools.'
      },
      {
        category: 'Wildlife & Low-Flow Biological Loading',
        explanation: 'Natural organic loading from wildlife during periods of reduced summer baseflow.',
        evaluation: 'Requires field validation',
        reasoning: 'Low stream discharge concentrates natural background organic matter.',
        investigationNeeded: 'Analyze seasonal baseflow hydrographs.'
      }
    ],
    confidence: {
      level: 'Low',
      justification: [
        'Evidence confidence is Low due to severe temporal under-sampling (12 discrete samples) and overlapping storm events.'
      ],
      marginOrInterval: 'Sampling frequency inadequate to test causal hypothesis'
    },
    decisionImplication: {
      managerialConsiderations: [
        'No regulatory bans or recreational access restrictions are justified on the basis of preliminary grab samples alone.',
        'If ongoing water quality screening is required, deploying continuous multi-parameter water quality sondes (turbidity, temperature, conductivity) upstream and downstream of high-visitation areas could be considered.',
        'If public health advisories are contemplated, microbial source tracking could be commissioned to differentiate human and wildlife inputs.'
      ],
      cautionsAndGuardrails: [
        'Do not present preliminary grab samples to the media as establishing tourism impact.',
        'Ensure park communications classify current water data as preliminary and undergoing validation.'
      ],
      policyPerspective: [
        'Base water resource management on continuous automated telemetry rather than episodic grab sampling.'
      ]
    },
    dataNeededNext: [
      'Automated continuous water quality telemetry logging turbidity and conductivity at 10-minute intervals.',
      'Stormwater hydrograph separation to decouple rainfall runoff from dry-weather recreation.',
      'PCR microbial source tracking (Bacteroides human-specific vs animal markers).'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Manual Water Quality Grab Sampling (Illustrative Proxy)',
        spatialResolution: 'Point sampling location (Canto Cochino Bridge)',
        temporalCoverage: 'Demonstration bi-weekly sampling',
        processingLevel: 'Discrete Laboratory Measurement Proxy',
        sourceAuthority: 'Water Monitoring Reference Archive',
        isCalibratedProxy: true,
        dataStatus: 'Demonstration'
      }
    ]
  }
};
