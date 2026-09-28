import type { Locale } from './LocaleProvider';

// ---------------------------------------------------------------------------
// Static UI copy — every non-evidence, non-data string rendered by the app.
// Grouped by component. Numbers, IDs, codes, URLs and scientific enum values
// never live here; only presentational copy does.
// ---------------------------------------------------------------------------

export interface UiStringTree {
  header: {
    methodology: string;
    createBrief: string;
    briefShort: string;
    selectTerritoryAria: string;
    madridTab: string;
    guadarramaTab: string;
    sourceRepository: string;
    switchToSpanish: string;
    switchToEnglish: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    supporting: string;
    epistemicLink: string;
    caseStudy01: string;
    caseStudy02: string;
    hatiKicker: string;
    hatiTitle: string;
    hatiSummary: string;
    hatiMetricALabel: string;
    hatiMetricBLabel: string;
    hatiFootnote: string;
    hatiCta: string;
    sntoKicker: string;
    sntoTitle: string;
    sntoSummary: string;
    sntoMetricALabel: string;
    sntoMetricBLabel: string;
    sntoFootnote: string;
    sntoCta: string;
    activeCase: string;
  };
  professionalOverview: {
    eyebrow: string;
    title: string;
    body: string;
    bullet1: string;
    bullet2Prefix: string;
    bullet2Bold: string;
    bullet2Suffix: string;
    bullet3: string;
    viewBriefBtn: string;
    inspectRulesBtn: string;
    capability1Title: string;
    capability1Body: string;
    capability2Title: string;
    capability2Body: string;
    capability3Title: string;
    capability3Body: string;
    evaluationPathTitle: string;
    evaluationPathBody: string;
    noLlmChip: string;
    guided1Kicker: string;
    guided1Title: string;
    guided1Cue: string;
    guided2Kicker: string;
    guided2Title: string;
    guided2Cue: string;
    guided3Kicker: string;
    guided3Title: string;
    guided3Cue: string;
  };
  app: {
    activeWorkspace: string;
    dataStatusPrefix: string;
    spatialContext: string;
    spatialContextHint: string;
    safeguardBold: string;
    safeguardExplain: string;
    readCharter: string;
    territorialIndicators: string;
    demonstrationValues: string;
    evidenceBoundedValues: string;
    evidenceSourcesDisclosure: string;
    reproducedSnapshotLabel: string;
    realObservationsLabel: string;
    referenceEvidenceSources: string;
    referenceSource: string;
    evidenceLayer: string;
    evidenceLayerLockedHati: string;
    evidenceLayerRealDerived: string;
    evidenceLayerDemo: string;
    auditSnapshot: string;
    immutable: string;
    evidenceRole: string;
    pinnedCommit: string;
    evidenceBoundary: string;
    openPinnedSource: string;
    openArchivalRecord: string;
    evidenceAssessment: string;
    decisionSupport: string;
    footerTagline: string;
    footerDescription: string;
    footerCharterBtn: string;
    footerSourceRepo: string;
  };
  questionInput: {
    heading: string;
    guardActive: string;
    curatedInquiries: string;
    placeholder: string; // use {shortName} token
    runQuery: string;
    assessing: string;
    footnote: string;
  };
  map: {
    dark: string;
    darkTitle: string;
    satellite: string;
    satelliteTitle: string;
    light: string;
    lightTitle: string;
    ndviBufferZone: string;
    ndviBufferZoneTitle: string;
    studyAssetsToggleHati: string;
    studyAssetsToggleSnto: string;
    studyAssetsToggleGeneric: string;
    studyAssetsLabel: string; // {n}
    samplingNodesLabel: string; // {n}
    lockedPilotAssetLocations: string;
    realCampaignAssets: string;
    demonstrationGeometry: string;
    tileConnectivityWarning: string;
    projection: string;
    cursor: string;
    hoverOverMap: string;
    legendHatiAsset: string;
    legendSntoAsset: string;
    legendTrailBuffer: string;
    legendSubalpineZone: string;
    legendSamplingNode: string;
    samplingNode: string;
    spatialZone: string;
    close: string;
    tooltipObservedLst: string;
    tooltipNdvi: string;
    tooltipEstShade: string;
    tooltipDemonstrationGeometry: string;
    tooltipLockedPilotAsset: string;
    tooltipRealCampaignAsset: string;
    popupStatus: string;
    popupDemonstrationProxy: string;
    popupMetersAsl: string;
  };
  evidencePanel: {
    hypothesis: string;
    epistemicSafeguardTitle: string;
    epistemicSafeguardBody: string;
    correlationRuleTitle: string;
    correlationRuleBody: string;
    generateBriefBtn: string;
    observedSignalHeading: string;
    observedSignalQuestion: string;
    spatialScope: string;
    temporalWindow: string;
    supportedInterpretationHeading: string;
    supportedInterpretationQuestion: string;
    physicalMechanism: string;
    evidenceLimitHeading: string;
    evidenceLimitQuestion: string;
    unobservedVariables: string;
    spatialTemporalGaps: string;
    nextEvidenceHeading: string;
    nextEvidenceQuestion: string;
    decisionImplicationHeading: string;
    considerationsLabel: string;
    cautionsLabel: string;
    supportingEvidenceDisclosure: string;
    demonstrationValueTag: string;
    competingExplanationsDisclosure: string;
    investigationNeededLabel: string;
    evidenceConfidenceDisclosure: string;
    boundQualificationLabel: string;
    provenanceDisclosure: string; // {n}
    sampleRecordsLabel: string;
    locationLabel: string;
    authorityLabel: string;
    resolutionLabel: string;
    processingLabel: string;
    referenceLink: string;
  };
  decisionBrief: {
    toolbarTitle: string;
    copyMd: string;
    copied: string;
    jsonBtn: string;
    printBtn: string;
    closeAria: string;
    demoBanner: string;
    reproducedBanner: string;
    realDerivedBanner: string;
    reproducedBannerNote: string;
    realDerivedBannerNote: string;
    headerKicker: string;
    title: string;
    territorySubtopic: string; // uses {title} {code} {subtitle}
    documentRefLabel: string;
    dateIssuedLabel: string;
    dataStatusLabel: string;
    evidenceConfidenceLabel: string;
    section1: string;
    evaluationLabel: string;
    section2: string;
    scopeLabel: string;
    windowLabel: string;
    section3: string;
    section4: string;
    physicalMechanismLabel: string;
    section5: string;
    section6: string;
    section7: string;
    managerialConsiderationsLabel: string;
    cautionsGuardrailsLabel: string;
    section8: string;
    signOffSystem: string;
    signOffAttribution: string;
    signOffVersion: string;
    signOffValidation: string;
    mdTitle: string;
    mdDemoBanner: string;
    mdReproducedBanner: string;
    mdResearchBanner: string;
    mdDocRef: string;
    mdTerritory: string;
    mdCase: string;
    mdDate: string;
    mdDataStatus: string;
    mdConfidence: string;
    mdSection1: string;
    mdStatus: string;
    mdSection2: string;
    mdSpatialScope: string;
    mdTemporalWindow: string;
    mdSection3: string;
    mdDatasetsHeading: string;
    mdSection4: string;
    mdPhysicalMechanism: string;
    mdSection5: string;
    mdSection6: string;
    mdSection7: string;
    mdConfidenceLevel: string;
    mdSection8: string;
    mdManagerialHeading: string;
    mdCautionsHeading: string;
    mdSection9: string;
    mdSection10: string;
    mdProvAuthority: string;
    mdProvRes: string;
    mdProvStatus: string;
    mdLimitations: string;
  };
  methodology: {
    headerTitle: string;
    headerSubtitle: string;
    section1Title: string;
    section1Body: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    step6: string;
    step7: string;
    step8: string;
    section2Title: string;
    dataStatusColumnTitle: string;
    demonstrationDef: string;
    proxyDef: string;
    derivedDef: string;
    modelDerivedDef: string;
    reproducedDef: string;
    observedDef: string;
    validatedDef: string;
    confidenceColumnTitle: string;
    lowDef: string;
    moderateDef: string;
    highDef: string;
    section3Title: string;
    section3Body: string;
    ndviBullet: string;
    uhiBullet: string;
    section4Title: string;
    section4Body: string;
    insufficientEvidenceQuote: string;
    section4Note: string;
    section5Title: string;
    section5Body: string;
    hatiLabel: string;
    sntoLabel: string;
    shaLabel: string;
    openSnapshotLink: string;
    deploymentLabel: string;
    repoLabel: string;
  };
}

export const UI_STRINGS: Record<Locale, UiStringTree> = {
  en: {
    header: {
      methodology: 'Methodology',
      createBrief: 'Create decision brief',
      briefShort: 'Brief',
      selectTerritoryAria: 'Select territory',
      madridTab: 'Madrid — HATI',
      guadarramaTab: 'Guadarrama — SNTO',
      sourceRepository: 'Source repository',
      switchToSpanish: 'Switch to Spanish',
      switchToEnglish: 'Switch to English'
    },
    hero: {
      eyebrow: 'Geospatial research · decision systems',
      title: 'From territorial signals to defensible tourism decisions.',
      supporting:
        'Environmental, geospatial and tourism evidence transformed into transparent decision support — without hiding uncertainty.',
      epistemicLink: 'Why you can trust it — the epistemic charter',
      caseStudy01: 'Case study 01',
      caseStudy02: 'Case study 02',
      hatiKicker: 'Urban thermal intelligence',
      hatiTitle: 'HATI Madrid',
      hatiSummary: 'Thermal-method sensitivity & constraint-first opportunity screening.',
      hatiMetricALabel: 'observations changed classification',
      hatiMetricBLabel: 'scenarios changed candidate set',
      hatiFootnote: 'Reproduced research · model-derived thermal data',
      hatiCta: 'Explore HATI',
      sntoKicker: 'Environmental monitoring',
      sntoTitle: 'SNTO Sierra de Guadarrama',
      sntoSummary: 'Real Sentinel-2 evidence & evidence-proportionate public-use limits.',
      sntoMetricALabel: 'monitored time-series assets',
      sntoMetricBLabel: 'NDVI trend distribution (↑ / stable / ↓)',
      sntoFootnote: 'Real observations · derived indicators',
      sntoCta: 'Explore SNTO',
      activeCase: 'Active case'
    },
    professionalOverview: {
      eyebrow: 'In 30 seconds',
      title: 'Evidence governance before recommendation.',
      body:
        'Tourism Intelligence Desk is a research-engineering prototype for analysts who need to move from geospatial and environmental evidence to a decision without hiding uncertainty or inventing causality.',
      bullet1: 'Two evidence-backed cases with different epistemic states and decision ceilings.',
      bullet2Prefix: 'Deterministic guardrails: unsupported claims return ',
      bullet2Bold: 'insufficient evidence',
      bullet2Suffix: '.',
      bullet3: 'Decision briefs expose evidence, limits, competing explanations, next data and provenance.',
      viewBriefBtn: 'View decision brief',
      inspectRulesBtn: 'Inspect evidence rules',
      capability1Title: 'Problem',
      capability1Body:
        'Tourism dashboards can turn a real environmental signal into a stronger causal or management claim than the evidence supports.',
      capability2Title: 'What this builds',
      capability2Body:
        'A deterministic evidence-governance layer that separates observation, derivation, modelling, reproduction, validation and decision authorization.',
      capability3Title: 'Why it is auditable',
      capability3Body:
        'Every represented research case is bounded by explicit claim limits and pinned to immutable source snapshots instead of mutable “latest” evidence.',
      evaluationPathTitle: '60-second evaluation path',
      evaluationPathBody:
        'The cases that reveal the system’s strongest behaviour: calibrated claims and explicit refusal.',
      noLlmChip: 'No LLM used for scientific claims',
      guided1Kicker: 'Reproduced result',
      guided1Title: 'Inspect what HATI actually demonstrated',
      guided1Cue: 'Run evidence assessment',
      guided2Kicker: 'Causal boundary',
      guided2Title: 'Try the tempting NDVI → tourism claim',
      guided2Cue: 'See why the system refuses',
      guided3Kicker: 'Decision ceiling',
      guided3Title: 'Test a high-consequence management request',
      guided3Cue: 'Inspect the L5a boundary'
    },
    app: {
      activeWorkspace: 'Active workspace',
      dataStatusPrefix: 'Data status ·',
      spatialContext: 'Spatial context',
      spatialContextHint: 'Select polygons or nodes to inspect',
      safeguardBold: 'Observed spatial or environmental association ≠ demonstrated tourism causality.',
      safeguardExplain:
        'Competing explanations — meteorology, drought, phenology, land management and sensor effects — are screened before any causal claim.',
      readCharter: 'Read the epistemic charter',
      territorialIndicators: 'Territorial indicators',
      demonstrationValues: 'Demonstration values',
      evidenceBoundedValues: 'Evidence-bounded values',
      evidenceSourcesDisclosure: 'Evidence sources, provenance & audit',
      reproducedSnapshotLabel: 'Reproduced research snapshot',
      realObservationsLabel: 'Real observations · derived indicators',
      referenceEvidenceSources: 'Reference evidence sources',
      referenceSource: 'Reference source',
      evidenceLayer: 'Evidence layer',
      evidenceLayerLockedHati: 'Locked HATI research snapshot',
      evidenceLayerRealDerived: 'Real EO + derived trend snapshot',
      evidenceLayerDemo: 'Curated demonstration dataset',
      auditSnapshot: 'Audit snapshot',
      immutable: 'Immutable',
      evidenceRole: 'Evidence role',
      pinnedCommit: 'Pinned commit',
      evidenceBoundary: 'Evidence boundary',
      openPinnedSource: 'Open pinned source',
      openArchivalRecord: 'Open archival record',
      evidenceAssessment: 'Evidence assessment',
      decisionSupport: 'Decision support',
      footerTagline: 'Evidence → Decision → Action',
      footerDescription:
        'Public research-engineering prototype for destination analysts, geospatial teams, sustainability practitioners, and researchers.',
      footerCharterBtn: 'Epistemic charter & standards',
      footerSourceRepo: 'Source repository'
    },
    questionInput: {
      heading: 'Analytical question',
      guardActive: 'Anti-causality guard active',
      curatedInquiries: 'Curated inquiries',
      placeholder: 'Ask an analytical question for {shortName}…',
      runQuery: 'Run query',
      assessing: 'Assessing…',
      footnote:
        'Anti-causality rule: correlation is never converted into causation. If evidence is lacking, the system responds “insufficient evidence”.'
    },
    map: {
      dark: 'Dark',
      darkTitle: 'CartoDB Dark Matter GIS mode',
      satellite: 'Satellite',
      satelliteTitle: 'Satellite imagery',
      light: 'Light',
      lightTitle: 'Positron neutral mode',
      ndviBufferZone: 'NDVI buffer zone',
      ndviBufferZoneTitle: 'Toggle Earth-observation zonal layers',
      studyAssetsToggleHati: 'Toggle locked pilot study assets',
      studyAssetsToggleSnto: 'Toggle real Sentinel-2 campaign assets',
      studyAssetsToggleGeneric: 'Toggle sampling locations',
      studyAssetsLabel: 'Study assets ({n})',
      samplingNodesLabel: 'Sampling nodes ({n})',
      lockedPilotAssetLocations: 'Locked pilot asset locations',
      realCampaignAssets: 'Real campaign assets · representative points',
      demonstrationGeometry: 'Demonstration geometry',
      tileConnectivityWarning:
        'Basemap tile connectivity is limited. Vector geometry and spatial boundaries remain active.',
      projection: 'Projection',
      cursor: 'Cursor',
      hoverOverMap: 'hover over map',
      legendHatiAsset: 'Published HATI study asset',
      legendSntoAsset: 'SNTO Sentinel-2 campaign asset',
      legendTrailBuffer: 'Trail buffer zone',
      legendSubalpineZone: 'Subalpine scrub zone',
      legendSamplingNode: 'Sampling node',
      samplingNode: 'Sampling node',
      spatialZone: 'Spatial zone',
      close: 'Close',
      tooltipObservedLst: 'Observed LST Δ',
      tooltipNdvi: 'NDVI Δ',
      tooltipEstShade: 'Est. Shade',
      tooltipDemonstrationGeometry: 'DEMONSTRATION GEOMETRY',
      tooltipLockedPilotAsset: 'LOCKED PILOT REFERENCE ASSET',
      tooltipRealCampaignAsset: 'REAL SENTINEL-2 CAMPAIGN ASSET · REPRESENTATIVE DISPLAY POINT',
      popupStatus: 'Status:',
      popupDemonstrationProxy: 'DEMONSTRATION PROXY',
      popupMetersAsl: 'm a.s.l.'
    },
    evidencePanel: {
      hypothesis: 'Hypothesis:',
      epistemicSafeguardTitle: 'Epistemic safeguard: insufficient evidence',
      epistemicSafeguardBody:
        'The analytical engine refuses the causal leap. Current observational evidence is inadequate or temporally confounded to attribute this phenomenon to tourism. Recommendations are limited to targeted monitoring.',
      correlationRuleTitle: 'Scientific rule: correlation does not establish causation',
      correlationRuleBody:
        'Spatial or temporal co-location between visitors and environmental conditions does not establish tourism as the causative mechanism. Physical and meteorological explanations must be evaluated first.',
      generateBriefBtn: 'Generate decision brief',
      observedSignalHeading: 'Observed signal',
      observedSignalQuestion: 'What did we actually observe?',
      spatialScope: 'Spatial scope',
      temporalWindow: 'Temporal window',
      supportedInterpretationHeading: 'Supported interpretation',
      supportedInterpretationQuestion: 'What can the evidence reasonably support?',
      physicalMechanism: 'Physical mechanism',
      evidenceLimitHeading: 'Evidence limit',
      evidenceLimitQuestion: 'What can we NOT conclude?',
      unobservedVariables: 'Unobserved variables',
      spatialTemporalGaps: 'Spatial / temporal gaps',
      nextEvidenceHeading: 'Next evidence',
      nextEvidenceQuestion: 'What would be required to go further?',
      decisionImplicationHeading: 'Decision implication',
      considerationsLabel: 'Considerations to investigate / test',
      cautionsLabel: 'Cautions & policy guardrails',
      supportingEvidenceDisclosure: 'Supporting evidence & indicators',
      demonstrationValueTag: 'Demonstration value',
      competingExplanationsDisclosure: 'Competing explanations / confounders',
      investigationNeededLabel: 'Investigation needed:',
      evidenceConfidenceDisclosure: 'Evidence confidence',
      boundQualificationLabel: 'Bound / qualification',
      provenanceDisclosure: 'Provenance & data lineage ({n})',
      sampleRecordsLabel: 'Sample / records',
      locationLabel: 'Location',
      authorityLabel: 'Authority:',
      resolutionLabel: 'Resolution:',
      processingLabel: 'Processing:',
      referenceLink: 'Reference'
    },
    decisionBrief: {
      toolbarTitle: 'Decision support brief',
      copyMd: 'Copy MD',
      copied: 'Copied',
      jsonBtn: 'JSON',
      printBtn: 'Print / PDF',
      closeAria: 'Close',
      demoBanner: 'Demonstration brief — not for operational decision-making',
      reproducedBanner: 'Reproduced research brief — not current operational evidence',
      realDerivedBanner: 'Real / derived research evidence — claim limits apply',
      reproducedBannerNote: 'Model outputs remain subject to their evidence ceiling',
      realDerivedBannerNote: 'Environmental signal ≠ tourism impact',
      headerKicker: 'Tourism Intelligence Desk · Decision support system',
      title: 'Territorial decision support brief',
      territorySubtopic: 'Territory: {title} ({code}) · Sub-topic: {subtitle}',
      documentRefLabel: 'Document ref',
      dateIssuedLabel: 'Date issued',
      dataStatusLabel: 'Data status',
      evidenceConfidenceLabel: 'Evidence confidence',
      section1: '1. Analytical inquiry & status',
      evaluationLabel: 'Evaluation:',
      section2: '2. Observed signal',
      scopeLabel: 'Scope:',
      windowLabel: 'Window:',
      section3: '3. Supporting evidence & indicators',
      section4: '4. Scientific interpretation',
      physicalMechanismLabel: 'Physical mechanism',
      section5: '5. Evidence limits (what cannot be inferred)',
      section6: '6. Competing explanations / confounder screening',
      section7: '7. Decision implications for tourism management',
      managerialConsiderationsLabel: 'Managerial considerations',
      cautionsGuardrailsLabel: 'Cautions & guardrails',
      section8: '8. Data needed next (to reduce uncertainty)',
      signOffSystem: 'System: Tourism Intelligence Desk prototype',
      signOffAttribution: 'Attribution: github.com/soroushkarahrodi79-oss',
      signOffVersion: 'Version: Prototype v0.1',
      signOffValidation: 'Operational validation required prior to implementation',
      mdTitle: '# TERRITORIAL DECISION SUPPORT BRIEF',
      mdDemoBanner: '> **DEMONSTRATION BRIEF — NOT FOR OPERATIONAL DECISION-MAKING**',
      mdReproducedBanner: '> **REPRODUCED RESEARCH BRIEF — NOT CURRENT OPERATIONAL EVIDENCE**',
      mdResearchBanner: '> **REAL / DERIVED RESEARCH EVIDENCE — CHECK CLAIM-SPECIFIC LIMITS BEFORE OPERATIONAL USE**',
      mdDocRef: '**DOCUMENT REF:**',
      mdTerritory: '**TERRITORY:**',
      mdCase: '**CASE / PROJECT:**',
      mdDate: '**DATE:**',
      mdDataStatus: '**DATA STATUS:**',
      mdConfidence: '**EVIDENCE CONFIDENCE:**',
      mdSection1: '## 1. ANALYTICAL INQUIRY',
      mdStatus: '**STATUS:**',
      mdSection2: '## 2. OBSERVED SIGNAL',
      mdSpatialScope: '**Spatial Scope:**',
      mdTemporalWindow: '**Temporal Window:**',
      mdSection3: '## 3. SUPPORTING EVIDENCE',
      mdDatasetsHeading: '### Datasets & Indicators:',
      mdSection4: '## 4. INTERPRETATION',
      mdPhysicalMechanism: '*Physical Mechanism:*',
      mdSection5: '## 5. EVIDENCE LIMIT (WHAT CANNOT BE INFERRED)',
      mdSection6: '## 6. COMPETING EXPLANATIONS / CONFOUNDERS',
      mdSection7: '## 7. EVIDENCE CONFIDENCE',
      mdConfidenceLevel: '**Confidence Level:**',
      mdSection8: '## 8. DECISION IMPLICATION',
      mdManagerialHeading: '### Managerial Considerations:',
      mdCautionsHeading: '### Cautions & Guardrails:',
      mdSection9: '## 9. DATA NEEDED NEXT',
      mdSection10: '## 10. PROVENANCE & LIMITATIONS',
      mdProvAuthority: 'Authority:',
      mdProvRes: 'Res:',
      mdProvStatus: 'Status:',
      mdLimitations:
        '**Limitations:** Generated for decision-support and research evaluation. Does not replace formal field validation, environmental assessment, or institutional decision procedures.'
    },
    methodology: {
      headerTitle: 'Scientific integrity & epistemic charter',
      headerSubtitle: 'Methodological standards for tourism decision support',
      section1Title: '1. The 8-part epistemic reasoning structure',
      section1Body:
        'The Tourism Intelligence Desk is designed for destination management organisations (DMOs), sustainability directors, tourism analysts, and researchers. It enforces a strict 8-part sequence for every analytical output:',
      step1: '1. Observed signal',
      step2: '2. Supporting evidence',
      step3: '3. Interpretation',
      step4: '4. Evidence limit',
      step5: '5. Competing explanations',
      step6: '6. Evidence confidence',
      step7: '7. Decision implication',
      step8: '8. Data needed next',
      section2Title: '2. Strict distinction: data status vs. evidence confidence',
      dataStatusColumnTitle: 'Data status (the nature of the input)',
      demonstrationDef: 'Demonstration: Illustrative values used to test the analytical pipeline.',
      proxyDef: 'Proxy: Indirect evidence that is not equivalent to direct observation.',
      derivedDef:
        'Derived: Indicator or statistic computed from observed evidence (for example NDVI or a trend test); derivation does not establish cause or field validation.',
      modelDerivedDef:
        'Model-derived: Output computed by an explicit physical or analytical model; not automatically observed or field validated.',
      reproducedDef:
        'Reproduced: A committed analysis chain was independently re-executed and matched its locked references.',
      observedDef: 'Observed: Directly observed or measured data from a documented source.',
      validatedDef: 'Validated: Evidence that has passed a stated validation threshold for the specific claim.',
      confidenceColumnTitle: 'Evidence confidence (support for this claim)',
      lowDef: 'Low: The specific claim is weakly supported or substantially confounded.',
      moderateDef:
        'Moderate: The claim has meaningful support but important uncertainty or evidence gaps remain.',
      highDef:
        'High: The specific bounded claim is strongly supported by the available evidence; this does not upgrade the underlying data to a different status.',
      section3Title: '3. Anti-causality rule: never convert correlation into causation',
      section3Body:
        'Environmental signals frequently co-occur with tourism without tourism being the causal mechanism.',
      ndviBullet:
        'NDVI vegetation depletion: Must NOT automatically be interpreted as tourist trampling. The system systematically audits competing hypotheses including meteorological drought, extreme temperatures, phenology, wildfire, forestry/grazing management, and sensor/cloud shadow effects.',
      uhiBullet:
        'Urban heat island (UHI): Co-location of pedestrian crowds in mineral plazas does not establish pedestrian body heat as the source of the anomaly. Solar irradiance and thermal inertia of granite dominate metabolic flux by orders of magnitude.',
      section4Title: '4. The “insufficient evidence” mandate',
      section4Body:
        'When empirical data is insufficient, uncalibrated, or confounded, the system explicitly returns:',
      insufficientEvidenceQuote: '“INSUFFICIENT EVIDENCE — Available evidence does not establish causation”',
      section4Note: 'The system refuses to force an unjustified recommendation or invent a conclusion.',
      section5Title: '5. Immutable evidence provenance',
      section5Body:
        'Evidence links in the decision engine are pinned to full Git commit SHAs rather than mutable main URLs. A later source-repository edit therefore cannot silently change the evidence snapshot represented by this build.',
      hatiLabel: 'HATI Madrid',
      sntoLabel: 'SNTO Guadarrama',
      shaLabel: 'SHA:',
      openSnapshotLink: 'Open immutable source snapshot',
      deploymentLabel: 'Deployment:',
      repoLabel: 'Research project repository:'
    }
  },
  es: {
    header: {
      methodology: 'Metodología',
      createBrief: 'Crear informe de decisión',
      briefShort: 'Informe',
      selectTerritoryAria: 'Seleccionar territorio',
      madridTab: 'Madrid — HATI',
      guadarramaTab: 'Guadarrama — SNTO',
      sourceRepository: 'Repositorio de código fuente',
      switchToSpanish: 'Cambiar a español',
      switchToEnglish: 'Cambiar a inglés'
    },
    hero: {
      eyebrow: 'Investigación geoespacial · sistemas de decisión',
      title: 'De las señales territoriales a decisiones turísticas defendibles.',
      supporting:
        'Evidencia ambiental, geoespacial y turística transformada en apoyo a la decisión transparente, sin ocultar la incertidumbre.',
      epistemicLink: 'Por qué puedes confiar en él — la carta epistémica',
      caseStudy01: 'Caso de estudio 01',
      caseStudy02: 'Caso de estudio 02',
      hatiKicker: 'Inteligencia térmica urbana',
      hatiTitle: 'HATI Madrid',
      hatiSummary:
        'Sensibilidad del método térmico y cribado de oportunidades basado en restricciones.',
      hatiMetricALabel: 'observaciones cambiaron de clasificación',
      hatiMetricBLabel: 'escenarios cambiaron el conjunto de candidatos',
      hatiFootnote: 'Investigación reproducida · datos térmicos derivados de modelo',
      hatiCta: 'Explorar HATI',
      sntoKicker: 'Monitoreo ambiental',
      sntoTitle: 'SNTO Sierra de Guadarrama',
      sntoSummary:
        'Evidencia real de Sentinel-2 y límites de uso público proporcionales a la evidencia.',
      sntoMetricALabel: 'activos de serie temporal monitoreados',
      sntoMetricBLabel: 'distribución de tendencia NDVI (↑ / estable / ↓)',
      sntoFootnote: 'Observaciones reales · indicadores derivados',
      sntoCta: 'Explorar SNTO',
      activeCase: 'Caso activo'
    },
    professionalOverview: {
      eyebrow: 'En 30 segundos',
      title: 'Gobernanza de la evidencia antes de la recomendación.',
      body:
        'Tourism Intelligence Desk es un prototipo de investigación e ingeniería para analistas que necesitan pasar de la evidencia geoespacial y ambiental a una decisión sin ocultar la incertidumbre ni inventar causalidad.',
      bullet1:
        'Dos casos respaldados por evidencia con distintos estados epistémicos y techos de decisión.',
      bullet2Prefix: 'Salvaguardas deterministas: las afirmaciones no respaldadas devuelven ',
      bullet2Bold: 'evidencia insuficiente',
      bullet2Suffix: '.',
      bullet3:
        'Los informes de decisión exponen la evidencia, sus límites, explicaciones alternativas, próximos datos y procedencia.',
      viewBriefBtn: 'Ver informe de decisión',
      inspectRulesBtn: 'Inspeccionar reglas de evidencia',
      capability1Title: 'Problema',
      capability1Body:
        'Los paneles turísticos pueden convertir una señal ambiental real en una afirmación causal o de gestión más fuerte de lo que la evidencia respalda.',
      capability2Title: 'Qué construye esto',
      capability2Body:
        'Una capa determinista de gobernanza de la evidencia que separa observación, derivación, modelado, reproducción, validación y autorización de decisiones.',
      capability3Title: 'Por qué es auditable',
      capability3Body:
        'Cada caso de investigación representado está acotado por límites explícitos de la afirmación y anclado a instantáneas de origen inmutables, en lugar de a evidencia “más reciente” mutable.',
      evaluationPathTitle: 'Ruta de evaluación de 60 segundos',
      evaluationPathBody:
        'Los casos que revelan el comportamiento más sólido del sistema: afirmaciones calibradas y rechazo explícito.',
      noLlmChip: 'No se usa LLM para afirmaciones científicas',
      guided1Kicker: 'Resultado reproducido',
      guided1Title: 'Inspecciona lo que HATI realmente demostró',
      guided1Cue: 'Ejecutar evaluación de evidencia',
      guided2Kicker: 'Límite causal',
      guided2Title: 'Prueba la tentadora afirmación NDVI → turismo',
      guided2Cue: 'Ver por qué el sistema se niega',
      guided3Kicker: 'Techo de decisión',
      guided3Title: 'Pon a prueba una solicitud de gestión de alta consecuencia',
      guided3Cue: 'Inspeccionar el límite L5a'
    },
    app: {
      activeWorkspace: 'Espacio de trabajo activo',
      dataStatusPrefix: 'Estado del dato ·',
      spatialContext: 'Contexto espacial',
      spatialContextHint: 'Selecciona polígonos o nodos para inspeccionar',
      safeguardBold: 'La asociación espacial o ambiental observada ≠ causalidad turística demostrada.',
      safeguardExplain:
        'Las explicaciones alternativas — meteorología, sequía, fenología, gestión del territorio y efectos del sensor — se examinan antes de cualquier afirmación causal.',
      readCharter: 'Leer la carta epistémica',
      territorialIndicators: 'Indicadores territoriales',
      demonstrationValues: 'Valores de demostración',
      evidenceBoundedValues: 'Valores acotados por evidencia',
      evidenceSourcesDisclosure: 'Fuentes de evidencia, procedencia y auditoría',
      reproducedSnapshotLabel: 'Instantánea de investigación reproducida',
      realObservationsLabel: 'Observaciones reales · indicadores derivados',
      referenceEvidenceSources: 'Fuentes de evidencia de referencia',
      referenceSource: 'Fuente de referencia',
      evidenceLayer: 'Capa de evidencia',
      evidenceLayerLockedHati: 'Instantánea de investigación HATI fijada',
      evidenceLayerRealDerived: 'Instantánea de OT real + tendencia derivada',
      evidenceLayerDemo: 'Conjunto de datos de demostración curado',
      auditSnapshot: 'Instantánea de auditoría',
      immutable: 'Inmutable',
      evidenceRole: 'Rol de la evidencia',
      pinnedCommit: 'Commit fijado',
      evidenceBoundary: 'Límite de la evidencia',
      openPinnedSource: 'Abrir fuente fijada',
      openArchivalRecord: 'Abrir registro archivístico',
      evidenceAssessment: 'Evaluación de evidencia',
      decisionSupport: 'Apoyo a la decisión',
      footerTagline: 'Evidencia → Decisión → Acción',
      footerDescription:
        'Prototipo público de investigación e ingeniería para analistas de destino, equipos geoespaciales, profesionales de la sostenibilidad e investigadores.',
      footerCharterBtn: 'Carta epistémica y estándares',
      footerSourceRepo: 'Repositorio de código fuente'
    },
    questionInput: {
      heading: 'Pregunta analítica',
      guardActive: 'Salvaguarda anticausalidad activa',
      curatedInquiries: 'Preguntas curadas',
      placeholder: 'Haz una pregunta analítica para {shortName}…',
      runQuery: 'Ejecutar consulta',
      assessing: 'Evaluando…',
      footnote:
        'Regla anticausalidad: la correlación nunca se convierte en causalidad. Si falta evidencia, el sistema responde “evidencia insuficiente”.'
    },
    map: {
      dark: 'Oscuro',
      darkTitle: 'Modo SIG CartoDB Dark Matter',
      satellite: 'Satélite',
      satelliteTitle: 'Imágenes satelitales',
      light: 'Claro',
      lightTitle: 'Modo neutro Positron',
      ndviBufferZone: 'Zona de amortiguación NDVI',
      ndviBufferZoneTitle: 'Alternar capas zonales de observación terrestre',
      studyAssetsToggleHati: 'Alternar activos de estudio del piloto fijado',
      studyAssetsToggleSnto: 'Alternar activos reales de la campaña Sentinel-2',
      studyAssetsToggleGeneric: 'Alternar ubicaciones de muestreo',
      studyAssetsLabel: 'Activos de estudio ({n})',
      samplingNodesLabel: 'Nodos de muestreo ({n})',
      lockedPilotAssetLocations: 'Ubicaciones de activos del piloto fijado',
      realCampaignAssets: 'Activos reales de campaña · puntos representativos',
      demonstrationGeometry: 'Geometría de demostración',
      tileConnectivityWarning:
        'Conectividad limitada con las teselas del mapa base. La geometría vectorial y los límites espaciales permanecen activos.',
      projection: 'Proyección',
      cursor: 'Cursor',
      hoverOverMap: 'pasa el cursor sobre el mapa',
      legendHatiAsset: 'Activo de estudio HATI publicado',
      legendSntoAsset: 'Activo de campaña Sentinel-2 de SNTO',
      legendTrailBuffer: 'Zona de amortiguación de sendero',
      legendSubalpineZone: 'Zona de matorral subalpino',
      legendSamplingNode: 'Nodo de muestreo',
      samplingNode: 'Nodo de muestreo',
      spatialZone: 'Zona espacial',
      close: 'Cerrar',
      tooltipObservedLst: 'Δ LST observada',
      tooltipNdvi: 'Δ NDVI',
      tooltipEstShade: 'Sombra est.',
      tooltipDemonstrationGeometry: 'GEOMETRÍA DE DEMOSTRACIÓN',
      tooltipLockedPilotAsset: 'ACTIVO DE REFERENCIA DEL PILOTO FIJADO',
      tooltipRealCampaignAsset: 'ACTIVO REAL DE CAMPAÑA SENTINEL-2 · PUNTO DE VISUALIZACIÓN REPRESENTATIVO',
      popupStatus: 'Estado:',
      popupDemonstrationProxy: 'PROXY DE DEMOSTRACIÓN',
      popupMetersAsl: 'm s.n.m.'
    },
    evidencePanel: {
      hypothesis: 'Hipótesis:',
      epistemicSafeguardTitle: 'Salvaguarda epistémica: evidencia insuficiente',
      epistemicSafeguardBody:
        'El motor analítico rechaza el salto causal. La evidencia observacional actual es inadecuada o está confundida temporalmente para atribuir este fenómeno al turismo. Las recomendaciones se limitan al seguimiento focalizado.',
      correlationRuleTitle: 'Regla científica: la correlación no establece causalidad',
      correlationRuleBody:
        'La coincidencia espacial o temporal entre visitantes y condiciones ambientales no establece al turismo como el mecanismo causante. Las explicaciones físicas y meteorológicas deben evaluarse primero.',
      generateBriefBtn: 'Generar informe de decisión',
      observedSignalHeading: 'Señal observada',
      observedSignalQuestion: '¿Qué observamos realmente?',
      spatialScope: 'Alcance espacial',
      temporalWindow: 'Ventana temporal',
      supportedInterpretationHeading: 'Interpretación respaldada',
      supportedInterpretationQuestion: '¿Qué puede respaldar razonablemente la evidencia?',
      physicalMechanism: 'Mecanismo físico',
      evidenceLimitHeading: 'Límite de la evidencia',
      evidenceLimitQuestion: '¿Qué NO podemos concluir?',
      unobservedVariables: 'Variables no observadas',
      spatialTemporalGaps: 'Vacíos espaciales / temporales',
      nextEvidenceHeading: 'Próxima evidencia',
      nextEvidenceQuestion: '¿Qué se necesitaría para avanzar más?',
      decisionImplicationHeading: 'Implicación para la decisión',
      considerationsLabel: 'Consideraciones a investigar / probar',
      cautionsLabel: 'Precauciones y salvaguardas de política',
      supportingEvidenceDisclosure: 'Evidencia de apoyo e indicadores',
      demonstrationValueTag: 'Valor de demostración',
      competingExplanationsDisclosure: 'Explicaciones alternativas / factores de confusión',
      investigationNeededLabel: 'Investigación necesaria:',
      evidenceConfidenceDisclosure: 'Confianza en la evidencia',
      boundQualificationLabel: 'Margen / calificación',
      provenanceDisclosure: 'Procedencia y linaje del dato ({n})',
      sampleRecordsLabel: 'Muestra / registros',
      locationLabel: 'Ubicación',
      authorityLabel: 'Autoridad:',
      resolutionLabel: 'Resolución:',
      processingLabel: 'Procesamiento:',
      referenceLink: 'Referencia'
    },
    decisionBrief: {
      toolbarTitle: 'Informe de apoyo a la decisión',
      copyMd: 'Copiar MD',
      copied: 'Copiado',
      jsonBtn: 'JSON',
      printBtn: 'Imprimir / PDF',
      closeAria: 'Cerrar',
      demoBanner: 'Informe de demostración — no apto para la toma de decisiones operativas',
      reproducedBanner: 'Informe de investigación reproducida — no es evidencia operativa actual',
      realDerivedBanner: 'Evidencia de investigación real / derivada — se aplican límites de la afirmación',
      reproducedBannerNote: 'Los resultados del modelo siguen sujetos a su techo de evidencia',
      realDerivedBannerNote: 'Señal ambiental ≠ impacto turístico',
      headerKicker: 'Tourism Intelligence Desk · Sistema de apoyo a la decisión',
      title: 'Informe territorial de apoyo a la decisión',
      territorySubtopic: 'Territorio: {title} ({code}) · Subtema: {subtitle}',
      documentRefLabel: 'Referencia del documento',
      dateIssuedLabel: 'Fecha de emisión',
      dataStatusLabel: 'Estado del dato',
      evidenceConfidenceLabel: 'Confianza en la evidencia',
      section1: '1. Consulta analítica y estado',
      evaluationLabel: 'Evaluación:',
      section2: '2. Señal observada',
      scopeLabel: 'Alcance:',
      windowLabel: 'Ventana:',
      section3: '3. Evidencia de apoyo e indicadores',
      section4: '4. Interpretación científica',
      physicalMechanismLabel: 'Mecanismo físico',
      section5: '5. Límites de la evidencia (qué no se puede inferir)',
      section6: '6. Explicaciones alternativas / cribado de factores de confusión',
      section7: '7. Implicaciones para la gestión turística',
      managerialConsiderationsLabel: 'Consideraciones de gestión',
      cautionsGuardrailsLabel: 'Precauciones y salvaguardas',
      section8: '8. Datos necesarios a continuación (para reducir la incertidumbre)',
      signOffSystem: 'Sistema: prototipo Tourism Intelligence Desk',
      signOffAttribution: 'Atribución: github.com/soroushkarahrodi79-oss',
      signOffVersion: 'Versión: Prototipo v0.1',
      signOffValidation: 'Se requiere validación operativa antes de la implementación',
      mdTitle: '# INFORME TERRITORIAL DE APOYO A LA DECISIÓN',
      mdDemoBanner: '> **INFORME DE DEMOSTRACIÓN — NO APTO PARA LA TOMA DE DECISIONES OPERATIVAS**',
      mdReproducedBanner: '> **INFORME DE INVESTIGACIÓN REPRODUCIDA — NO ES EVIDENCIA OPERATIVA ACTUAL**',
      mdResearchBanner:
        '> **EVIDENCIA DE INVESTIGACIÓN REAL / DERIVADA — VERIFICAR LOS LÍMITES ESPECÍFICOS DE LA AFIRMACIÓN ANTES DEL USO OPERATIVO**',
      mdDocRef: '**REFERENCIA DEL DOCUMENTO:**',
      mdTerritory: '**TERRITORIO:**',
      mdCase: '**CASO / PROYECTO:**',
      mdDate: '**FECHA:**',
      mdDataStatus: '**ESTADO DEL DATO:**',
      mdConfidence: '**CONFIANZA EN LA EVIDENCIA:**',
      mdSection1: '## 1. CONSULTA ANALÍTICA',
      mdStatus: '**ESTADO:**',
      mdSection2: '## 2. SEÑAL OBSERVADA',
      mdSpatialScope: '**Alcance Espacial:**',
      mdTemporalWindow: '**Ventana Temporal:**',
      mdSection3: '## 3. EVIDENCIA DE APOYO',
      mdDatasetsHeading: '### Conjuntos de Datos e Indicadores:',
      mdSection4: '## 4. INTERPRETACIÓN',
      mdPhysicalMechanism: '*Mecanismo Físico:*',
      mdSection5: '## 5. LÍMITE DE LA EVIDENCIA (QUÉ NO SE PUEDE INFERIR)',
      mdSection6: '## 6. EXPLICACIONES ALTERNATIVAS / FACTORES DE CONFUSIÓN',
      mdSection7: '## 7. CONFIANZA EN LA EVIDENCIA',
      mdConfidenceLevel: '**Nivel de Confianza:**',
      mdSection8: '## 8. IMPLICACIÓN PARA LA DECISIÓN',
      mdManagerialHeading: '### Consideraciones de Gestión:',
      mdCautionsHeading: '### Precauciones y Salvaguardas:',
      mdSection9: '## 9. DATOS NECESARIOS A CONTINUACIÓN',
      mdSection10: '## 10. PROCEDENCIA Y LIMITACIONES',
      mdProvAuthority: 'Autoridad:',
      mdProvRes: 'Res.:',
      mdProvStatus: 'Estado:',
      mdLimitations:
        '**Limitaciones:** Generado para apoyo a la decisión y evaluación de investigación. No sustituye la validación de campo formal, la evaluación ambiental ni los procedimientos institucionales de decisión.'
    },
    methodology: {
      headerTitle: 'Integridad científica y carta epistémica',
      headerSubtitle: 'Estándares metodológicos para el apoyo a la decisión turística',
      section1Title: '1. La estructura de razonamiento epistémico de 8 partes',
      section1Body:
        'Tourism Intelligence Desk está diseñado para organizaciones de gestión de destinos (DMO), directores de sostenibilidad, analistas turísticos e investigadores. Aplica una secuencia estricta de 8 partes en cada salida analítica:',
      step1: '1. Señal observada',
      step2: '2. Evidencia de apoyo',
      step3: '3. Interpretación',
      step4: '4. Límite de la evidencia',
      step5: '5. Explicaciones alternativas',
      step6: '6. Confianza en la evidencia',
      step7: '7. Implicación para la decisión',
      step8: '8. Próxima evidencia necesaria',
      section2Title: '2. Distinción estricta: estado del dato frente a confianza en la evidencia',
      dataStatusColumnTitle: 'Estado del dato (la naturaleza del insumo)',
      demonstrationDef: 'Demostración: valores ilustrativos usados para probar el flujo analítico.',
      proxyDef: 'Proxy: evidencia indirecta que no equivale a la observación directa.',
      derivedDef:
        'Derivado: indicador o estadística calculada a partir de evidencia observada (por ejemplo, NDVI o una prueba de tendencia); la derivación no establece causa ni validación de campo.',
      modelDerivedDef:
        'Derivado de modelo: resultado calculado por un modelo físico o analítico explícito; no está observado ni validado en campo automáticamente.',
      reproducedDef:
        'Reproducido: una cadena de análisis comprometida se reejecutó de forma independiente y coincidió con sus referencias fijadas.',
      observedDef: 'Observado: dato observado o medido directamente a partir de una fuente documentada.',
      validatedDef:
        'Validado: evidencia que ha superado un umbral de validación declarado para la afirmación específica.',
      confidenceColumnTitle: 'Confianza en la evidencia (respaldo para esta afirmación)',
      lowDef: 'Baja: la afirmación específica tiene un respaldo débil o está sustancialmente confundida.',
      moderateDef:
        'Moderada: la afirmación tiene un respaldo significativo, pero persisten incertidumbres o vacíos de evidencia importantes.',
      highDef:
        'Alta: la afirmación acotada específica está fuertemente respaldada por la evidencia disponible; esto no eleva el dato subyacente a un estado diferente.',
      section3Title: '3. Regla anticausalidad: nunca convertir la correlación en causalidad',
      section3Body:
        'Las señales ambientales suelen coincidir con el turismo sin que el turismo sea el mecanismo causal.',
      ndviBullet:
        'Depleción de vegetación por NDVI: NO debe interpretarse automáticamente como pisoteo turístico. El sistema audita sistemáticamente hipótesis alternativas, incluyendo sequía meteorológica, temperaturas extremas, fenología, incendios forestales, gestión forestal/ganadera y efectos del sensor o sombras de nubes.',
      uhiBullet:
        'Isla de calor urbana (UHI): la coincidencia de multitudes de peatones en plazas minerales no establece el calor corporal peatonal como la fuente de la anomalía. La irradiancia solar y la inercia térmica del granito dominan el flujo metabólico en órdenes de magnitud.',
      section4Title: '4. El mandato de “evidencia insuficiente”',
      section4Body:
        'Cuando los datos empíricos son insuficientes, no están calibrados o están confundidos, el sistema devuelve explícitamente:',
      insufficientEvidenceQuote: '“EVIDENCIA INSUFICIENTE — La evidencia disponible no establece causalidad”',
      section4Note: 'El sistema se niega a forzar una recomendación injustificada o a inventar una conclusión.',
      section5Title: '5. Procedencia inmutable de la evidencia',
      section5Body:
        'Los enlaces de evidencia en el motor de decisión están fijados a SHAs completos de commits de Git en lugar de a URLs mutables de main. Una edición posterior del repositorio de origen, por tanto, no puede cambiar silenciosamente la instantánea de evidencia representada por esta compilación.',
      hatiLabel: 'HATI Madrid',
      sntoLabel: 'SNTO Guadarrama',
      shaLabel: 'SHA:',
      openSnapshotLink: 'Abrir instantánea de origen inmutable',
      deploymentLabel: 'Despliegue:',
      repoLabel: 'Repositorio del proyecto de investigación:'
    }
  }
};

// ---------------------------------------------------------------------------
// Dot-path lookup with compile-time key checking.
// ---------------------------------------------------------------------------

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

type Leaves<T> = {
  [K in keyof T]: T[K] extends string ? K : Join<K, Leaves<T[K]>>;
}[keyof T];

export type UiStringPath = Leaves<UiStringTree>;

export function resolveUiString(tree: Record<Locale, UiStringTree>, path: UiStringPath, locale: Locale): string {
  const parts = (path as string).split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = tree[locale];
  for (const part of parts) {
    node = node?.[part];
  }
  if (typeof node === 'string') return node;
  // Fall back to English if a key is somehow missing for the active locale.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fallback: any = tree.en;
  for (const part of parts) {
    fallback = fallback?.[part];
  }
  return typeof fallback === 'string' ? fallback : path;
}

// ---------------------------------------------------------------------------
// Small enum-display lookups (union values stay in English for logic).
// ---------------------------------------------------------------------------

export const EVALUATION_LABELS_ES: Record<string, string> = {
  'Contextually supported hypothesis': 'Hipótesis respaldada por el contexto',
  'Plausible competing explanation': 'Explicación alternativa plausible',
  'Plausible secondary factor': 'Factor secundario plausible',
  'Unlikely based on physics / data': 'Improbable según la física / los datos',
  'Requires field validation': 'Requiere validación de campo',
  'Confounded / indeterminate': 'Confundido / indeterminado'
};

export const CONFIDENCE_LABELS_ES: Record<string, string> = {
  High: 'alta',
  Moderate: 'moderada',
  Low: 'baja'
};

export function localizeEvaluationLabel(value: string, locale: Locale): string {
  if (locale === 'en') return value;
  return EVALUATION_LABELS_ES[value] ?? value;
}

export function localizeConfidenceLabel(level: string, locale: Locale): string {
  if (locale === 'en') return level;
  return CONFIDENCE_LABELS_ES[level] ?? level;
}

// DataStatus enum values (src/types/index.ts) must never change — they drive
// logic (isDemo/isReproduced checks, etc.) throughout the app. This lookup is
// display-only: it translates the label shown to the user without touching
// the underlying `.dataStatus` field anywhere it is read for logic.
export const DATA_STATUS_LABELS_ES: Record<string, string> = {
  Demonstration: 'Demostración',
  Proxy: 'Proxy',
  Derived: 'Derivado',
  Validated: 'Validado',
  Observed: 'Observado',
  'Model-derived': 'Derivado de modelo',
  Reproduced: 'Reproducido'
};

export function localizeDataStatusLabel(status: string, locale: Locale): string {
  if (locale === 'en') return status;
  return DATA_STATUS_LABELS_ES[status] ?? status;
}
