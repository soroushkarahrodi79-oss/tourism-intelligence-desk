export type TerritoryId = 'madrid-hati' | 'guadarrama-snto';

export type EvidenceConfidence = 'Low' | 'Moderate' | 'High';

export type DataStatus = 'Demonstration' | 'Proxy' | 'Validated' | 'Observed';

export interface DataProvenance {
  sensorOrPlatform: string;
  spatialResolution: string;
  temporalCoverage: string;
  processingLevel: string;
  sourceAuthority: string;
  citationUrl?: string;
  isCalibratedProxy: boolean;
  dataStatus?: DataStatus;
}

export interface MetricItem {
  label: string;
  value: string;
  unit: string;
  baseline: string;
  delta: string;
  trend: 'up' | 'down' | 'stable' | 'alert';
  isDemonstration?: boolean;
  isDemo?: boolean;
}

export interface CompetingExplanation {
  category: string;
  explanation: string;
  evaluation:
    | 'Contextually supported hypothesis'
    | 'Plausible competing explanation'
    | 'Plausible secondary factor'
    | 'Unlikely based on physics / data'
    | 'Requires field validation'
    | 'Confounded / indeterminate';
  reasoning: string;
  investigationNeeded: string;
}

export interface EvidenceAssessment {
  id: string;
  territoryId: TerritoryId;
  question: string;
  isCustomQuestion?: boolean;
  
  // Epistemic assessment status
  status: 'OBSERVED_ANOMALY' | 'INSUFFICIENT_EVIDENCE' | 'CORRELATION_WARNING' | 'ASSOCIATION_ONLY';
  statusHeadline: string;
  dataStatus: DataStatus;
  
  // 1. OBSERVED SIGNAL (What changed or was detected?)
  signal: {
    observation: string;
    spatialScope: string;
    temporalWindow: string;
    summary: string;
  };

  // 2. SUPPORTING EVIDENCE (Which datasets, sensors, observations support it?)
  evidence: {
    supportingDatasets: string[];
    metrics: MetricItem[];
    spatialCoordinates: string;
    sampleSize: string;
    dataIntegrityNotes: string;
  };

  // 3. INTERPRETATION (What can reasonably be inferred?)
  interpretation: {
    inferences: string[];
    plausibleMechanisms: string;
  };

  // 4. EVIDENCE LIMIT (What CANNOT be concluded from available evidence?)
  evidenceLimit: {
    strictlyForbiddenInferences: string[];
    unobservedVariables: string[];
    spatialTemporalGaps: string;
  };

  // 5. COMPETING EXPLANATIONS / CONFOUNDERS (Which plausible alternatives remain?)
  competingExplanations: CompetingExplanation[];

  // 6. EVIDENCE CONFIDENCE (Low / Moderate / High with short justification)
  confidence: {
    level: EvidenceConfidence;
    justification: string[];
    marginOrInterval?: string;
  };

  // 7. DECISION IMPLICATION (What should a manager/analyst consider doing?)
  decisionImplication: {
    managerialConsiderations: string[];
    cautionsAndGuardrails: string[];
    policyPerspective: string[];
  };

  // 8. DATA NEEDED NEXT (What additional evidence would materially reduce uncertainty?)
  dataNeededNext: string[];

  // PROVENANCE & AUDIT TRAIL
  provenance: DataProvenance[];
}

export interface MonitoringStation {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  elevationMeters: number;
  type: 'microclimate' | 'satellite_virtual' | 'visitor_counter' | 'phenology_camera' | 'flux_tower';
  readings: Record<string, string | number>;
  status: 'active' | 'degraded' | 'calibrating';
  isDemonstrationStation?: boolean;
}

export interface SpatialFeature {
  id: string;
  name: string;
  category: 'heat_corridor' | 'green_infrastructure' | 'trail_buffer' | 'subalpine_zone' | 'refuge_area';
  coordinates: [number, number][];
  center: [number, number];
  properties: {
    lstAnomalyC?: number;
    ndviDelta?: number;
    pedestrianDensity?: string;
    shadeIndex?: number;
    visitorVolumeHourly?: number;
    erosionRisk?: 'Low' | 'Moderate' | 'Severe' | 'Critical';
    soilCompactionIndex?: number;
  };
}

export interface TerritoryCase {
  id: TerritoryId;
  code: string;
  shortName: string;
  title: string;
  subtitle: string;
  description: string;
  focusTheme: string;
  center: [number, number];
  zoom: number;
  bounds: [[number, number], [number, number]];
  satelliteBands: string[];
  keyIndicators: { name: string; value: string; unit: string; change: string; isDemo: boolean }[];
  stations: MonitoringStation[];
  features: SpatialFeature[];
  sampleQuestions: string[];
}
