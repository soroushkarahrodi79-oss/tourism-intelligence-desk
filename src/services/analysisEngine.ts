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
    if (normalized.includes('meaningful') || normalized.includes('environmental change') || normalized.includes('is this area')) {
      return EVIDENCE_ASSESSMENTS['madrid-hati-q1'];
    }
    if (normalized.includes('cause of urban heat') || normalized.includes('primary cause') || normalized.includes('heat island') || normalized.includes('puerta del sol')) {
      return EVIDENCE_ASSESSMENTS['madrid-hati-q2'];
    }
    if (normalized.includes('displace') || normalized.includes('avoiding') || normalized.includes('footfall') || normalized.includes('pedestrian') || normalized.includes('prove tourists are avoiding') || normalized.includes('gran vía')) {
      return EVIDENCE_ASSESSMENTS['madrid-hati-q3'];
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
    return {
      id,
      territoryId,
      question,
      isCustomQuestion: true,
      status: 'INSUFFICIENT_EVIDENCE',
      statusHeadline: 'Operational Validation Required: Current Evidence Does Not Justify Immediate Policy Alterations',
      dataStatus: 'Demonstration',
      signal: {
        observation: `Inquiry requests an immediate operational or policy decision based on the currently loaded demonstration evidence for ${territory.shortName}.`,
        spatialScope: `${territory.shortName} administrative perimeter.`,
        temporalWindow: 'Current prototype evaluation cycle.',
        summary: 'Decision-support guardrail: Active data includes demonstration datasets and uncalibrated proxies. Epistemic standards prohibit immediate policy change on this basis.'
      },
      evidence: {
        supportingDatasets: [
          'The loaded assessment contains demonstration datasets and proxy variables that require on-site validation before operational use.',
          'Scientific decision-support protocol requires multiple seasons of validated data before regulatory or policy interventions are justified.',
          'Competing environmental hypotheses have not yet been isolated via controlled experimental exclosures.'
        ],
        metrics: [
          { label: 'Data Status', value: 'DEMONSTRATION', unit: 'mode', baseline: 'Operational validation needed', delta: 'Not validated for policy', trend: 'alert', isDemonstration: true },
          { label: 'Evidence Confidence', value: 'LOW', unit: 'attribution', baseline: 'High threshold needed', delta: 'Preliminary', trend: 'alert', isDemonstration: true },
          { label: 'Policy Recommendation', value: 'DEFER', unit: 'action', baseline: 'Evidence threshold', delta: 'Maintain current protocols', trend: 'stable', isDemonstration: true }
        ],
        spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
        sampleSize: 'Demonstration data catalog.',
        dataIntegrityNotes: 'DEMONSTRATION DATA: Illustrative values used to demonstrate the analytical workflow. Not an operational project result.'
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
          'Multi-year controlled baseline data free from confounding climatic anomalies.',
          'Socio-economic impact assessment of proposed policy interventions.'
        ],
        spatialTemporalGaps: 'Requires multi-seasonal longitudinal monitoring across diverse weather conditions.'
      },
      competingExplanations: [
        {
          category: 'Data Status Limitation',
          explanation: 'Demonstration datasets and proxy variables cannot substantiate regulatory interventions.',
          evaluation: 'Contextually supported hypothesis',
          reasoning: 'Administrative and legal defensibility requires accredited sensor calibration and peer-reviewed protocols.',
          investigationNeeded: 'Deploy accredited operational monitoring arrays.'
        },
        {
          category: 'Environmental Confounding',
          explanation: 'Observed signals are heavily confounded by regional meteorological and urban morphological factors.',
          evaluation: 'Plausible competing explanation',
          reasoning: 'Regulating tourism would fail to address the underlying macro-environmental driver.',
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
          'No immediate policy alterations or visitor quota restrictions are justified on current preliminary signals alone.',
          'Targeted field monitoring and sensor calibration could be prioritized to establish an operational baseline.',
          'Reversible, low-regret operational adaptations (e.g., temporary shade sails, advisory wayfinding, trail borders) could be piloted while evidence is gathered.'
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
        'Accredited in-situ sensor networks with traceable calibration standards.',
        'Longitudinal multi-year observations capturing inter-annual climatic variability.',
        'Controlled field trials isolating specific managerial interventions.'
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
      status: 'CORRELATION_WARNING',
      statusHeadline: 'Available Evidence Does Not Establish Causation: Environmental Confounders Must Be Controlled',
      dataStatus: 'Demonstration',
      signal: {
        observation: `Spatial or temporal co-occurrence observed between tourism activity and environmental indicators in ${territory.shortName}.`,
        spatialScope: `${territory.shortName} focal study sector.`,
        temporalWindow: 'Demonstration observation window.',
        summary: 'Correlation between visitor density and environmental signals cannot be interpreted as direct causation without controlling for macro-environmental drivers.'
      },
      evidence: {
        supportingDatasets: [
          'Statistical correlation exists between visitor presence and measured environmental variance, but physical energy/water balance indicates secondary contribution.',
          'Macro-environmental confounders (regional drought, solar irradiance, ambient atmospheric dome, soil geology) account for the dominant share of observed variance.',
          'Null-hypothesis (H0: Tourism volume has no statistically significant independent causal effect on the macro baseline) cannot be rejected on available evidence.'
        ],
        metrics: [
          { label: 'Spatial Co-occurrence', value: 'High', unit: 'overlap', baseline: 'Independent factors', delta: 'Spurious correlation', trend: 'alert', isDemo: true },
          { label: 'Confounder Variance Share', value: '> 70%', unit: 'estimated', baseline: '0%', delta: 'Dominant driver', trend: 'alert', isDemo: true },
          { label: 'Direct Anthropogenic Share', value: '< 15%', unit: 'attributable', baseline: '100%', delta: 'Secondary or unverified', trend: 'down', isDemo: true }
        ],
        spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
        sampleSize: 'Demonstration sensor array and proxy series.',
        dataIntegrityNotes: 'DEMONSTRATION DATA: Illustrative values used to demonstrate the analytical workflow. Not an operational project result.'
      },
      interpretation: {
        inferences: [
          'Visitors and environmental stresses frequently cluster in space due to landscape morphology (e.g., accessible valleys, paved civic squares, landmark corridors) rather than tourism generating the environmental hazard.',
          'Interventions aimed solely at restricting visitors would fail to address the primary physical or meteorological driver.'
        ],
        plausibleMechanisms:
          'Common-cause confounding: Macro-climatological and urban structural drivers independently govern both visitor distribution and physical sensor readings.'
      },
      evidenceLimit: {
        strictlyForbiddenInferences: [
          'CRITICAL ANTI-CAUSALITY RULE: NEVER CONVERT CORRELATION INTO CAUSATION.',
          'DO NOT claim tourism is the sole or primary driver without control-group experimental validation.',
          'DO NOT design punitive destination regulations based solely on bivariate spatial co-occurrence.'
        ],
        unobservedVariables: ['Micro-scale control plots with identical solar exposure/elevation free from visitor presence.'],
        spatialTemporalGaps: 'Coarse satellite footprint aggregates multiple surface types.'
      },
      competingExplanations: [
        {
          category: 'Macro-Environmental Driver',
          explanation: 'Regional synoptic meteorology, solar radiation, or drought.',
          evaluation: 'Contextually supported hypothesis',
          reasoning: 'Explains the dominant share of variance across both visited and unvisited control areas.',
          investigationNeeded: 'Cross-reference with regional meteorological reanalysis.'
        },
        {
          category: 'Tourism Footfall Causation',
          explanation: 'Visitor footfall as an explanatory factor for observed environmental variance.',
          evaluation: 'Unlikely based on physics / data',
          reasoning: 'The environmental anomaly persists in locations or times where visitors are completely absent.',
          investigationNeeded: 'Deploy controlled fenced exclosures or night-time thermal observations.'
        }
      ],
      confidence: {
        level: 'Moderate',
        justification: [
          'High confidence in ruling out sole tourism causation based on physical constraints; Moderate overall because specific parameters are demonstration values.'
        ],
        marginOrInterval: 'Attribution confounded by macro-environmental factors'
      },
      decisionImplication: {
        managerialConsiderations: [
          'Deploying controlled sensor arrays (fenced exclosures or shaded vs unshaded control transects) could be prioritized.',
          'Destination managers should avoid implementing visitor bans that do not address underlying environmental drivers (e.g., material albedo or regional drought).'
        ],
        cautionsAndGuardrails: [
          'Ensure destination management decisions withstand scientific and legal scrutiny.',
          'Do not present correlation to stakeholders as establishing causal impact.'
        ],
        policyPerspective: [
          'Ground destination policy in multi-variate analysis that accounts for climatic confounders.'
        ]
      },
      dataNeededNext: [
        'Controlled paired exclosure plots with identical aspect, elevation, and geology.',
        'Multi-variate regression controlling for macro-meteorological covariates.'
      ],
      provenance: [
        {
          sensorOrPlatform: 'Tourism Intelligence Desk Confounder Screening Engine',
          spatialResolution: 'Territorial extent',
          temporalCoverage: 'Demonstration series',
          processingLevel: 'Confounder Screening Protocol',
          sourceAuthority: 'Tourism Intelligence Desk Analytical Prototype',
          isCalibratedProxy: true,
          dataStatus: 'Demonstration'
        }
      ]
    };
  }

  // General scientific assessment for custom analytical questions
  return {
    id,
    territoryId,
    question,
    isCustomQuestion: true,
    status: 'OBSERVED_ANOMALY',
    statusHeadline: 'Evidence-Supported Observation in Demonstration Dataset',
    dataStatus: 'Demonstration',
    signal: {
      observation: `Analysis of multi-layer indicators in ${territory.shortName} reflects localized biophysical variation responding to the parameters queried: "${question}".`,
      spatialScope: `${territory.shortName} focal study sector (${territory.focusTheme}).`,
      temporalWindow: 'Demonstration multi-temporal satellite and sensor records.',
      summary: 'Observational evidence provides moderate support for localized trends, requiring careful differentiation between background dynamics and tourism interaction.'
    },
    evidence: {
      supportingDatasets: [
        `The prototype contains ${territory.stations.length} curated demonstration station records; these fixtures are used to exercise the workflow and are not live telemetry nodes.`,
        `Satellite radiometry proxies (${territory.satelliteBands.join(', ')}) align with microclimatic indicators across modeled zones.`,
        'Observations reflect demonstration proxy modeling requiring operational validation.'
      ],
      metrics: territory.keyIndicators.map((k) => ({
        label: k.name,
        value: k.value,
        unit: k.unit,
        baseline: 'Historical average',
        delta: k.change,
        trend: 'alert' as const,
        isDemonstration: true
      })),
      spatialCoordinates: `${territory.center[0]}° N, ${territory.center[1]}° W`,
      sampleSize: `Curated demonstration dataset with ${territory.stations.length} station records; not a live monitoring network.`,
      dataIntegrityNotes: 'DEMONSTRATION DATA: Illustrative values used to demonstrate the analytical workflow. Not an operational project result.'
    },
    interpretation: {
      inferences: [
        'The evidence demonstrates an observed signal in the demonstration dataset, but the relative contribution of tourism vs natural biophysical factors must be evaluated cautiously.',
        'Immediate physical conditions are observable; long-term trajectory depends on regional climate drivers and local adaptation measures.'
      ],
      plausibleMechanisms:
        'Biophysical coupling between regional climatic baseline, local built/topographic environment, and seasonal human spatial occupancy.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'CRITICAL ANTI-CAUSALITY RULE: NEVER CONVERT CORRELATION INTO CAUSATION.',
        'DO NOT assume observed trends will continue linearly without continuous monitoring.',
        'DO NOT treat this demonstration analysis as a substitute for on-site environmental impact assessments.'
      ],
      unobservedVariables: [
        'Micro-scale sub-canopy wind flow vectors and deep groundwater table dynamics.'
      ],
      spatialTemporalGaps: 'Intermittent satellite overpass intervals require temporal interpolation between dates.'
    },
    competingExplanations: [
      {
        category: 'Macro-Climatic Baseline',
        explanation: 'Regional synoptic trends and weather variability govern broad territorial shifts.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'Macro-scale weather explains the baseline pattern across the landscape.',
        investigationNeeded: 'Compare against regional climatological averages.'
      },
      {
        category: 'Local Topography & Materials',
        explanation: 'Surface materials, albedo, and aspect govern localized energy and moisture balance.',
        evaluation: 'Plausible competing explanation',
        reasoning: 'Physical properties directly control heat absorption and water retention.',
        investigationNeeded: 'Conduct ground material spectroscopy.'
      },
      {
        category: 'Visitor Spatial Footprint',
        explanation: 'Direct impact from seasonal visitor concentration.',
        evaluation: 'Requires field validation',
        reasoning: 'Requires controlled exclosure plots to isolate human impact from environmental factors.',
        investigationNeeded: 'Deploy paired exclosure experiments.'
      }
    ],
    confidence: {
      level: 'Moderate',
      justification: [
        'The reasoning structure follows established scientific principles for uncertainty, confounding, and causal attribution; numerical values remain demonstration proxies.'
      ],
      marginOrInterval: 'Demonstration estimate: Requires operational validation'
    },
    decisionImplication: {
      managerialConsiderations: [
        'If field teams seek to reduce uncertainty, targeted monitoring transects along specific geographic sectors could be considered.',
        'Developing transparent evidence summaries with explicit uncertainty bounds could be prioritized for institutional stakeholders.'
      ],
      cautionsAndGuardrails: [
        'Do not alter policy solely on the basis of demonstration data.',
        'Ensure scientific defensibility before allocating capital improvement budgets.'
      ],
      policyPerspective: [
        'Integrate evidence-based thresholds into the territorial Tourism Management Plan once validated data is available.'
      ]
    },
    dataNeededNext: [
      'Quality-controlled field observations with documented calibration and provenance in place of demonstration proxies.',
      'Controlled field validation isolating specific management interventions.',
      'Longitudinal multi-season data capture.'
    ],
    provenance: [
      {
        sensorOrPlatform: territory.satelliteBands[0] || 'Earth Observation Satellite Proxy',
        spatialResolution: '10–30m spatial grid',
        temporalCoverage: 'Demonstration Multi-temporal',
        processingLevel: 'Demonstration proxy processing',
        sourceAuthority: 'Reference evidence source — not runtime-ingested',
        isCalibratedProxy: false,
        dataStatus: 'Demonstration'
      }
    ]
  };
}
