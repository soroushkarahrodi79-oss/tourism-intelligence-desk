import { TerritoryCase, EvidenceAssessment } from '../types';

export const TERRITORY_CASES: Record<string, TerritoryCase> = {
  'madrid-hati': {
    id: 'madrid-hati',
    code: 'HATI-MAD',
    shortName: 'Madrid Urban Core',
    title: 'HATI Madrid: Heat-Aware Tourism Intelligence',
    subtitle: 'Urban Heat Island, Pedestrian Thermal Exposure & Microclimate Refuges',
    description:
      'Thermal radiometry mapping (Landsat 9 TIRS-2 & Sentinel-3 SLSTR) combined with illustrative in-situ urban microclimate nodes and pedestrian distribution proxies across central Madrid tourist axes (Gran Vía, Sol, Plaza Mayor, and Retiro corridor).',
    focusTheme: 'Urban Thermal Exposure & Pedestrian Biometeorology',
    center: [40.4168, -3.7038],
    zoom: 14,
    bounds: [
      [40.405, -3.725],
      [40.435, -3.68]
    ],
    satelliteBands: ['Landsat-9 Band 10 (TIRS-2)', 'Sentinel-3 SLSTR LST', 'Sentinel-2 MSI Red/NIR'],
    keyIndicators: [
      { name: 'Max Land Surface Temp (LST)', value: '47.8', unit: '°C', change: '+4.2°C vs baseline (demo)', isDemo: true },
      { name: 'Estimated Shade Deficit (Gran Vía)', value: '72.4', unit: '%', change: 'Solar noon model proxy', isDemo: true },
      { name: 'UTCI Thermal Stress Index', value: '41.5', unit: '°C', change: 'Strong Heat Stress threshold', isDemo: true },
      { name: 'Pedestrian Flow Shift', value: '-34.2', unit: '%', change: 'Observed association (demo)', isDemo: true }
    ],
    sampleQuestions: [
      'Is this area experiencing a meaningful environmental change?',
      'Does high surface temperature prove tourists are avoiding this street?',
      'Can high tourist density in Puerta del Sol be identified as the cause of urban heat island intensity?',
      'Are urban canopy cooling corridors (Paseo del Prado / Retiro) offering measurable thermal relief compared to unshaded retail axes?',
      'Should the destination authority alter summer tourism campaigns immediately on the basis of this signal?'
    ],
    stations: [
      {
        id: 'mad-st-01',
        name: 'Puerta del Sol Central Microclimate Node',
        code: 'HATI-SOL-01',
        lat: 40.4168,
        lng: -3.7038,
        elevationMeters: 650,
        type: 'microclimate',
        readings: { airTempC: 38.6, surfaceTempC: 46.2, relativeHumidity: 19.4, solarRadiationWm2: 940, pedestrianFlowPerHour: 4820 },
        status: 'active',
        isDemonstrationStation: true
      },
      {
        id: 'mad-st-02',
        name: 'Gran Vía / Calle Alcalá Junction',
        code: 'HATI-GV-02',
        lat: 40.4192,
        lng: -3.6991,
        elevationMeters: 662,
        type: 'microclimate',
        readings: { airTempC: 39.1, surfaceTempC: 48.4, relativeHumidity: 18.2, solarRadiationWm2: 980, pedestrianFlowPerHour: 6150 },
        status: 'active',
        isDemonstrationStation: true
      },
      {
        id: 'mad-st-03',
        name: 'Plaza Mayor Colonnade Station',
        code: 'HATI-PM-03',
        lat: 40.4154,
        lng: -3.7074,
        elevationMeters: 645,
        type: 'microclimate',
        readings: { airTempC: 36.8, surfaceTempC: 39.5, relativeHumidity: 22.1, solarRadiationWm2: 410, pedestrianFlowPerHour: 3410 },
        status: 'active',
        isDemonstrationStation: true
      },
      {
        id: 'mad-st-04',
        name: 'Paseo del Prado Canopy Refuge (Botanical)',
        code: 'HATI-PRD-04',
        lat: 40.4138,
        lng: -3.6922,
        elevationMeters: 635,
        type: 'microclimate',
        readings: { airTempC: 33.2, surfaceTempC: 31.8, relativeHumidity: 32.5, solarRadiationWm2: 260, pedestrianFlowPerHour: 1890 },
        status: 'active',
        isDemonstrationStation: true
      },
      {
        id: 'mad-st-05',
        name: 'Parque de El Retiro (Estanque Grande)',
        code: 'HATI-RET-05',
        lat: 40.4172,
        lng: -3.6834,
        elevationMeters: 668,
        type: 'microclimate',
        readings: { airTempC: 32.7, surfaceTempC: 29.4, relativeHumidity: 35.8, solarRadiationWm2: 240, pedestrianFlowPerHour: 2240 },
        status: 'active',
        isDemonstrationStation: true
      },
      {
        id: 'mad-st-06',
        name: 'Madrid Río Pedestrian Footbridge',
        code: 'HATI-RIO-06',
        lat: 40.4075,
        lng: -3.7225,
        elevationMeters: 590,
        type: 'microclimate',
        readings: { airTempC: 34.5, surfaceTempC: 36.2, relativeHumidity: 28.0, solarRadiationWm2: 780, pedestrianFlowPerHour: 1420 },
        status: 'active',
        isDemonstrationStation: true
      }
    ],
    features: [
      {
        id: 'feat-gv-canyon',
        name: 'Gran Vía Urban Canyon Thermal Zone',
        category: 'heat_corridor',
        coordinates: [
          [40.4205, -3.708],
          [40.4201, -3.702],
          [40.4188, -3.696],
          [40.4182, -3.697],
          [40.4195, -3.703],
          [40.4199, -3.708]
        ],
        center: [40.4196, -3.702],
        properties: {
          lstAnomalyC: 4.8,
          shadeIndex: 22,
          pedestrianDensity: 'High (illustrative)',
          visitorVolumeHourly: 5900
        }
      },
      {
        id: 'feat-sol-hotspot',
        name: 'Puerta del Sol Open Plaza Mineral Zone',
        category: 'heat_corridor',
        coordinates: [
          [40.4175, -3.705],
          [40.4174, -3.702],
          [40.4162, -3.702],
          [40.4163, -3.705]
        ],
        center: [40.4168, -3.7035],
        properties: {
          lstAnomalyC: 5.4,
          shadeIndex: 8,
          pedestrianDensity: 'High density (illustrative)',
          visitorVolumeHourly: 6800
        }
      },
      {
        id: 'feat-prado-corridor',
        name: 'Paseo del Prado Dense Canopy Micro-Refuge',
        category: 'green_infrastructure',
        coordinates: [
          [40.4185, -3.6915],
          [40.411, -3.6935],
          [40.4108, -3.695],
          [40.4182, -3.693]
        ],
        center: [40.4145, -3.693],
        properties: {
          lstAnomalyC: -3.8,
          shadeIndex: 78,
          pedestrianDensity: 'Moderate (illustrative)',
          visitorVolumeHourly: 2100
        }
      },
      {
        id: 'feat-retiro-oasis',
        name: 'El Retiro Historical Urban Oasis',
        category: 'refuge_area',
        coordinates: [
          [40.421, -3.687],
          [40.411, -3.684],
          [40.411, -3.676],
          [40.421, -3.678]
        ],
        center: [40.416, -3.681],
        properties: {
          lstAnomalyC: -4.5,
          shadeIndex: 84,
          pedestrianDensity: 'Dispersed (illustrative)',
          visitorVolumeHourly: 3500
        }
      }
    ]
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
  // MADRID QUESTION 1: Meaningful environmental change
  'madrid-hati-q1': {
    id: 'madrid-hati-q1',
    territoryId: 'madrid-hati',
    question: 'Is this area experiencing a meaningful environmental change?',
    status: 'OBSERVED_ANOMALY',
    statusHeadline: 'Observed Surface Thermal Anomaly in Demonstration Dataset',
    dataStatus: 'Demonstration',
    signal: {
      observation:
        'A positive Land Surface Temperature (LST) anomaly of approximately +4.2°C relative to historical baseline averages is recorded across the historic core in demonstration satellite radiometry, with elevated surface temperatures concentrated over unshaded mineral paving.',
      spatialScope: 'Distrito Centro (Madrid), focal boundary bounded by Gran Vía, Sol, and Atocha corridor.',
      temporalWindow: 'Demonstration summer composite window (illustrative daytime acquisitions).',
      summary: 'Observational data indicates microclimatic heat elevation across paved open public spaces compared to tree-shaded corridors.'
    },
    evidence: {
      supportingDatasets: [
        'Landsat 9 TIRS-2 Band 10 surface radiometry indicates LST median of 46.1°C across unshaded granite plazas in demonstration processing.',
        'AEMET meteorological station records (Madrid Retiro) provide synoptic temperature context indicating elevated regional summer temperatures.',
        'In-situ microclimate proxy nodes record elevated daytime Universal Thermal Climate Index (UTCI) stress levels during peak solar azimuth.',
        'Calculated canopy shade availability across primary shopping axes averages under 20% between 13:00 and 16:00 CET.'
      ],
      metrics: [
        { label: 'Observed LST Anomaly', value: '+4.2', unit: '°C', baseline: 'Historical mean', delta: '+4.2°C anomaly', trend: 'alert', isDemonstration: true },
        { label: 'UTCI Peak Condition', value: '41.5', unit: '°C', baseline: 'Moderate comfort (<32°C)', delta: 'Strong thermal stress', trend: 'alert', isDemonstration: true },
        { label: 'Canopy Shade Proportion', value: '18.4', unit: '%', baseline: '40.0% target', delta: '-21.6% deficit', trend: 'down', isDemonstration: true },
        { label: 'Data Status', value: 'DEMONSTRATION', unit: 'mode', baseline: 'Demonstration data', delta: 'Requires operational validation', trend: 'stable', isDemonstration: true }
      ],
      spatialCoordinates: '40.4168° N, 3.7038° W, Elevation ~650m a.s.l.',
      sampleSize: 'Demonstration satellite composite series and sensor telemetry proxies.',
      dataIntegrityNotes: 'DEMONSTRATION DATA: Values are illustrative to demonstrate the analytical decision-support workflow. Not an operational municipal finding.'
    },
    interpretation: {
      inferences: [
        'The historic center exhibits microclimatic thermal elevation consistent with high thermal inertia of dark granite paving, low vegetative fraction, and solar exposure.',
        'Thermal conditions during midday hours present physiological heat exposure for pedestrians and tourists navigating unshaded corridors.'
      ],
      plausibleMechanisms:
        'High solar irradiance absorption by dense paving materials during peak solar elevation, compounded by urban canyon geometry with limited wind dispersion.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT conclude that tourist presence produces or amplifies the thermal anomaly (surface heating associates primarily with urban material properties and solar meteorology, rather than human metabolic warmth).',
        'DO NOT extrapolate long-term multi-decadal climate trends from this demonstration seasonal sample.',
        'DO NOT assume indoor business temperatures match outdoor surface radiometry.'
      ],
      unobservedVariables: [
        'Continuous building interior cooling rejection thermal plumes across narrow streets.',
        'High-resolution micro-wind turbulence vectors at pedestrian height.'
      ],
      spatialTemporalGaps: 'Satellite revisit cycle provides discrete snapshot observations; continuous temporal dynamics require dense ground station coverage.'
    },
    competingExplanations: [
      {
        category: 'Synoptic Meteorology',
        explanation: 'Regional synoptic atmospheric heat dome affecting central Spain.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'Macro-scale atmospheric conditions govern the broad baseline temperature across the entire Madrid basin.',
        investigationNeeded: 'Cross-reference with ECMWF regional 850 hPa temperature reanalysis.'
      },
      {
        category: 'Urban Morphology & Materials',
        explanation: 'Low-albedo paving and lack of vegetative transpiration.',
        evaluation: 'Plausible competing explanation',
        reasoning: 'Mineral plazas absorb and store solar energy, elevating surface temperature regardless of human presence.',
        investigationNeeded: 'Conduct on-site albedo spectrometry and thermal camera ground transects.'
      },
      {
        category: 'Tourism Visitation Footfall',
        explanation: 'Pedestrian metabolic heat emission as a candidate factor.',
        evaluation: 'Requires field validation',
        reasoning: 'Human metabolic heat is physically possible, but its local contribution has not been quantified with validated pedestrian-density and energy-balance observations in this prototype.',
        investigationNeeded: 'Measure pedestrian density and construct a validated local energy balance before estimating any attributable contribution.'
      }
    ],
    confidence: {
      level: 'Moderate',
      justification: [
        'Physical relationship between solar radiation and paved surface heating is grounded in established thermodynamics.',
        'Confidence is marked Moderate because specific numerical indicators are currently derived from demonstration datasets requiring field validation.'
      ],
      marginOrInterval: 'Demonstration estimate: Anomaly magnitude subject to operational sensor calibration'
    },
    decisionImplication: {
      managerialConsiderations: [
        'If on-site microclimate monitoring corroborates high thermal stress along unshaded corridors, temporary demountable shade interventions could be evaluated.',
        'If elevated thermal stress forecasts persist, destination managers could prioritise pedestrian welfare advisory information (hydration, shaded transit corridors through Paseo del Prado and Retiro).',
        'Scheduled shifts for guided outdoor walking tours toward early morning or twilight hours could be piloted as an exploratory adaptation.'
      ],
      cautionsAndGuardrails: [
        'Do not alter long-term capital investment policy solely on the basis of demonstration data.',
        'Do not confuse visitor density management with urban microclimate mitigation.'
      ],
      policyPerspective: [
        'Integrate microclimatic shade requirements into urban public realm renovation guidelines.',
        'Maintain clear institutional distinction between climate risk adaptation and tourism promotion.'
      ]
    },
    dataNeededNext: [
      'Calibrated ground-truth black globe temperature and wet-bulb globe temperature (WBGT) measurements.',
      'Continuous pedestrian tracking calibrated against local meteorological parameters over multiple seasons.',
      'High-resolution airborne or UAV thermal radiometry during heatwave episodes.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Landsat-9 OLI-2 / TIRS-2 Surface Temperature (Illustrative Proxy)',
        spatialResolution: '100m native thermal (resampled to 30m)',
        temporalCoverage: 'Demonstration summer epoch',
        processingLevel: 'Level 2 Surface Radiometry Proxy',
        sourceAuthority: 'Earth Observation Data Reference',
        isCalibratedProxy: true,
        dataStatus: 'Demonstration'
      },
      {
        sensorOrPlatform: 'AEMET Station Telemetry (Madrid Retiro #3195 Reference)',
        spatialResolution: 'Point surface meteorological node',
        temporalCoverage: 'Climatological baseline reference',
        processingLevel: 'Quality Controlled Observation Reference',
        sourceAuthority: 'Agencia Estatal de Meteorología (Reference)',
        isCalibratedProxy: false,
        dataStatus: 'Proxy'
      }
    ]
  },

  // MADRID QUESTION 2: CAUSALITY TRAP TEST - Does footfall cause UHI?
  'madrid-hati-q2': {
    id: 'madrid-hati-q2',
    territoryId: 'madrid-hati',
    question: 'Can high tourist density in Puerta del Sol be identified as the cause of urban heat island intensity?',
    status: 'INSUFFICIENT_EVIDENCE',
    statusHeadline: 'INSUFFICIENT EVIDENCE: Co-location Does Not Establish Direct Tourism Causality',
    dataStatus: 'Demonstration',
    signal: {
      observation:
        'The demonstration fixture places high pedestrian activity and elevated surface temperature in the same central plaza during summer afternoons.',
      spatialScope: 'Puerta del Sol pedestrian plaza area.',
      temporalWindow: 'Demonstration afternoon sampling interval (13:00 – 17:00 CET).',
      summary: 'The co-location is compatible with several shared spatial drivers. The current prototype does not estimate a causal contribution from visitor density.'
    },
    evidence: {
      supportingDatasets: [
        'Demonstration footfall and surface-temperature fixtures are co-located in the same central civic plaza.',
        'Urban material properties, solar exposure, sky-view geometry, and anthropogenic heat are plausible components of an urban energy balance.',
        'No validated plaza-scale flux partition, matched low-footfall control period, or intervention study is loaded for this question.'
      ],
      metrics: [
        { label: 'Spatial Association', value: 'CO-LOCATED', unit: 'status', baseline: 'Independent evidence needed', delta: 'Association only', trend: 'alert', isDemonstration: true },
        { label: 'Causal Attribution', value: 'NOT ESTABLISHED', unit: 'status', baseline: 'Validated attribution design', delta: 'INSUFFICIENT EVIDENCE', trend: 'alert', isDemonstration: true },
        { label: 'Energy Flux Partition', value: 'NOT ESTIMATED', unit: 'status', baseline: 'Measured flux components', delta: 'Validation required', trend: 'stable', isDemonstration: true },
        { label: 'Data Status', value: 'DEMONSTRATION', unit: 'mode', baseline: 'Operational observations', delta: 'Illustrative fixture', trend: 'stable', isDemonstration: true }
      ],
      spatialCoordinates: '40.4168° N, 3.7038° W, Elevation 650m',
      sampleSize: 'Demonstration microclimate and footfall fixtures; no query-specific causal sample.',
      dataIntegrityNotes: 'DEMONSTRATION DATA: No attributable fraction, causal effect size, or significance test is computed for tourist density.'
    },
    interpretation: {
      inferences: [
        'High visitor volume and high surface temperature can co-occur because central plazas concentrate both people and solar-exposed mineral surfaces.',
        'The current demonstration evidence is sufficient to flag a causal-attribution trap, not to quantify the contribution of tourism to urban heat.'
      ],
      plausibleMechanisms:
        'Solar exposure, surface material properties, urban geometry, building heat rejection, and human activity are candidate components whose relative contributions require measurement.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'CRITICAL ANTI-CAUSALITY RULE: DO NOT INFER THAT TOURIST PEDESTRIANS ARE THE CAUSE OF THE URBAN HEAT SIGNAL FROM CO-LOCATION ALONE.',
        'DO NOT invent a percentage contribution for pedestrian metabolic heat.',
        'DO NOT recommend visitor restrictions as an urban-cooling measure without validated attribution evidence.'
      ],
      unobservedVariables: [
        'Validated radiative, sensible, latent, storage, and anthropogenic heat-flux components at plaza scale.',
        'Matched low-footfall control periods under comparable meteorological conditions.',
        'Building HVAC heat rejection and material thermal properties.'
      ],
      spatialTemporalGaps: 'The demonstration fixture is not a controlled causal design and does not resolve relative heat-flux contributions.'
    },
    competingExplanations: [
      {
        category: 'Solar Radiation & Surface Materials',
        explanation: 'Solar exposure and thermal properties of mineral paving may contribute to elevated surface temperature.',
        evaluation: 'Plausible competing explanation',
        reasoning: 'This mechanism is physically plausible but is not quantitatively partitioned in the current demonstration fixture.',
        investigationNeeded: 'Measure shortwave radiation, albedo, surface temperature, and storage heat flux under controlled conditions.'
      },
      {
        category: 'Urban Geometry',
        explanation: 'Sky-view factor and shade availability may shape local radiative loading.',
        evaluation: 'Plausible competing explanation',
        reasoning: 'Open plaza geometry can alter exposure, but its contribution has not been isolated in this prototype.',
        investigationNeeded: 'Combine 3D urban geometry with measured radiative conditions.'
      },
      {
        category: 'Building & Human Anthropogenic Heat',
        explanation: 'HVAC rejection and pedestrian metabolic heat are candidate anthropogenic components.',
        evaluation: 'Requires field validation',
        reasoning: 'The current prototype does not contain validated flux measurements capable of separating these components.',
        investigationNeeded: 'Measure building heat rejection, pedestrian density, and local flux components over matched periods.'
      }
    ],
    confidence: {
      level: 'Moderate',
      justification: [
        'Confidence is Moderate that co-location alone is insufficient for causal attribution; confidence in the relative contribution of specific heat sources remains Low without validated flux measurements.'
      ],
      marginOrInterval: 'No causal effect or attributable heat share estimated'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Do not use this demonstration association to justify visitor restrictions as an urban-cooling intervention.',
        'If urban heat mitigation is being considered, validate the relevant physical drivers before selecting a management response.',
        'Tourism-facing actions may focus on heat-risk communication and comfort only when supported by operational heat observations.'
      ],
      cautionsAndGuardrails: [
        'Keep crowd-management objectives separate from urban-heat attribution unless evidence explicitly links them.',
        'Do not communicate demonstration co-location as a quantified tourism contribution to urban heat.'
      ],
      policyPerspective: [
        'Use measured urban energy-balance evidence to distinguish climate adaptation, public-realm design, and visitor-management decisions.'
      ]
    },
    dataNeededNext: [
      'Validated plaza-scale energy-balance observations covering radiative, storage, turbulent, and anthropogenic heat components.',
      'Matched high- and low-footfall observation periods under comparable meteorological conditions.',
      'Material albedo, surface temperature, shade, HVAC heat-rejection, and pedestrian-density measurements with documented provenance.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Tourism Intelligence Desk Causal-Guardrail Demonstration Fixture',
        spatialResolution: 'Puerta del Sol plaza context',
        temporalCoverage: 'Demonstration observation window',
        processingLevel: 'Deterministic causal-boundary assessment',
        sourceAuthority: 'Tourism Intelligence Desk Prototype',
        isCalibratedProxy: false,
        dataStatus: 'Demonstration'
      }
    ]
  },

  // MADRID QUESTION 3: Does heat cause displacement?
  'madrid-hati-q3': {
    id: 'madrid-hati-q3',
    territoryId: 'madrid-hati',
    question: 'Does high surface temperature prove tourists are avoiding this street?',
    status: 'ASSOCIATION_ONLY',
    statusHeadline: 'Observed Association: Thermal Exposure Coincides with Footfall Shifts, but Behavioral Causation Requires Validation',
    dataStatus: 'Demonstration',
    signal: {
      observation:
        'In demonstration footfall monitoring, a drop in pedestrian counts along unshaded south-facing segments of Gran Vía coincides with afternoon peak surface temperatures, while counts in shaded arcades remain stable or increase.',
      spatialScope: 'Gran Vía corridor transect (Plaza de España to Alcalá).',
      temporalWindow: 'Demonstration high-temperature afternoon hours (>38°C ambient).',
      summary: 'Observational data shows an association between high surface temperatures and reduced pedestrian presence on unshaded sidewalks.'
    },
    evidence: {
      supportingDatasets: [
        'Demonstration optical footfall counts show lower volume on sunlit sidewalks during peak solar angles compared to morning baseline.',
        'Pedestrian counts in shaded colonnades along Calle Mayor exhibit higher relative stability during the same time window.',
        'Thermal camera transects confirm substantial surface temperature differentials between sun-exposed pavement and building shade.',
        'Mobility proxies indicate simultaneous increases in indoor shopping and transit hub dwell time.'
      ],
      metrics: [
        { label: 'Unshaded Sidewalk Count Shift', value: '-34.2', unit: '%', baseline: 'Morning baseline', delta: 'Observed drop in demo data', trend: 'down', isDemonstration: true },
        { label: 'Shaded Arcade Stability', value: '+14.5', unit: '%', baseline: 'Morning baseline', delta: 'Relative shift in demo data', trend: 'up', isDemonstration: true },
        { label: 'Sun vs Shade Surface Delta', value: '~14', unit: '°C', baseline: 'Uniform target', delta: 'Microclimatic gradient', trend: 'alert', isDemonstration: true },
        { label: 'Data Status', value: 'DEMONSTRATION', unit: 'mode', baseline: 'Demonstration data', delta: 'Illustrative proxy analysis', trend: 'stable', isDemonstration: true }
      ],
      spatialCoordinates: '40.4201° N, 3.7025° W, Elevation 662m',
      sampleSize: 'Demonstration optical gate samples and simulated mobility logs.',
      dataIntegrityNotes: 'DEMONSTRATION DATA: Illustrative values used to demonstrate the analytical workflow. Not an operational project result.'
    },
    interpretation: {
      inferences: [
        'Pedestrian movement patterns correlate with microclimatic shade availability during extreme thermal conditions.',
        'However, observing fewer pedestrians on an unshaded sidewalk does not establish that thermal stress alone explains the observed shift without controlling for daily commercial and dining schedules.'
      ],
      plausibleMechanisms:
        'Pedestrians likely seek cooler routes (isothermal navigation) to avoid direct solar irradiance and radiant surface heat.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'DO NOT conclude that total tourist spend or visitation has dropped based solely on sidewalk counts (activity may shift indoors or to evening hours).',
        'DO NOT infer that all observed midday decreases are heat-induced without accounting for cultural lunch and retail operating schedules.',
        'DO NOT assume tourists and residents exhibit identical thermal threshold responses.'
      ],
      unobservedVariables: [
        'Pedestrian demographic composition (age, acclimatization, tourist vs resident status).',
        'Store receipt velocities and indoor retail footfall logs.'
      ],
      spatialTemporalGaps: 'Pedestrian sensor locations are concentrated on primary avenues; secondary alleyways lack continuous counting.'
    },
    competingExplanations: [
      {
        category: 'Microclimatic Thermal Avoidance',
        explanation: 'Pedestrians actively avoid extreme solar irradiance and radiant heat.',
        evaluation: 'Contextually supported hypothesis',
        reasoning: 'Movement patterns align with the moving shadow edge created by building geometry.',
        investigationNeeded: 'Conduct intercepted pedestrian surveys verifying route selection motives.'
      },
      {
        category: 'Cultural & Commercial Schedules',
        explanation: 'Traditional Spanish midday lunch, siesta, and store closing hours reduce pedestrian traffic.',
        evaluation: 'Plausible secondary factor',
        reasoning: 'Midday footfall drops occur even on temperate spring days, though the magnitude is more pronounced during extreme heat.',
        investigationNeeded: 'Compare footfall curves between mild spring days and extreme summer days.'
      },
      {
        category: 'Indoor Commercial Migration',
        explanation: 'Visitors migrate inside air-conditioned museums, cafes, and shopping galleries.',
        evaluation: 'Plausible secondary factor',
        reasoning: 'Indoor mobility telemetry suggests dwell times increase in climate-controlled spaces during peak heat.',
        investigationNeeded: 'Cross-reference with museum entry gate logs.'
      }
    ],
    confidence: {
      level: 'Moderate',
      justification: [
        'The physical and behavioral plausibility of thermal avoidance is high, but distinguishing thermal avoidance from cultural activity schedules requires operational field verification.'
      ],
      marginOrInterval: 'Association supported; causal proportion remains uncalibrated'
    },
    decisionImplication: {
      managerialConsiderations: [
        'If mobility surveys corroborate systematic thermal avoidance, "Cool Route" pedestrian wayfinding through shaded corridors could be piloted.',
        'If extreme heatwave episodes are declared, extending evening operating hours for cultural attractions could be explored in consultation with venues.',
        'If pedestrian thermal comfort along shopping axes is verified as a concern, destination teams could collaborate with merchant associations to evaluate exterior awning maintenance.'
      ],
      cautionsAndGuardrails: [
        'Do not assume retail failure based solely on midday street counts without reviewing evening and indoor sales data.',
        'Do not implement drastic urban circulation changes without multi-season validation.'
      ],
      policyPerspective: [
        'Incorporate pedestrian shade continuity into urban mobility planning guidelines.'
      ]
    },
    dataNeededNext: [
      'Paired indoor/outdoor pedestrian sensors to track migration between street corridors and air-conditioned venues.',
      'Representative pedestrian intercept surveys to isolate thermal motivation from cultural scheduling.',
      'Comparison against non-heatwave summer control days with identical commercial schedules.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Pedestrian Gate Telemetry Proxy & Microclimate Overlay',
        spatialResolution: 'Gran Vía transect gates',
        temporalCoverage: 'Demonstration summer observation',
        processingLevel: 'Associational Flow Estimation',
        sourceAuthority: 'Tourism Intelligence Desk Analytical Prototype',
        isCalibratedProxy: true,
        dataStatus: 'Demonstration'
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
