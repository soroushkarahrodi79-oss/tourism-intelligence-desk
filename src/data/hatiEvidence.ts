import { ReferencePoint } from '../types';
import { HATI_IMMUTABLE, EVIDENCE_MANIFEST } from './evidenceManifest';

export const HATI_EVIDENCE_SOURCE = {
  repository: 'soroushkarahrodi79-oss/heat-adaptive-tourism-madrid',
  lockedLayerStatus: 'RELEASE_LOCKED',
  freezeBaseCommit: HATI_IMMUTABLE.scienceFreezeCommit,
  reproductionReportBaseCommit: HATI_IMMUTABLE.reproductionBaseCommit,
  reproductionEvidenceCommit: HATI_IMMUTABLE.reproductionEvidenceCommit,
  studyDate: '2023-08-21',
  studyArea: 'Prado–Retiro–Atocha, central Madrid',
  doi: '10.5281/zenodo.22707470',
  researchGateTitle:
    'Thermal representation as a decision variable in heat-adaptive tourism opportunity screening: evidence from a Madrid pilot',
  immutableProvenance: EVIDENCE_MANIFEST['madrid-hati'].immutableSources,
  evidenceCeiling:
    'The screening chain was independently re-executed from committed model outputs and open-data inputs. SOLWEIG/Tmrt/UTCI remain model-derived and are not field-validated thermal truth.'
} as const;

export const HATI_REPRODUCED_METRICS = {
  curatedAssets: 27,
  outdoorObservations: 42,
  thermalMethodReclassified: 14,
  thermalMethodReclassifiedPct: 33.3,
  physicalMoreRestrictive: 9,
  physicalLessRestrictive: 5,
  reclassificationPct1200: 64.3,
  reclassificationPct1500: 0.0,
  reclassificationPct1800: 35.7,
  candidateSetChangedScenarios: 7,
  totalScenarios: 8,
  nearestOpenExcludedScenarios: 3,
  removedByThermalOrEvidenceGates: 23,
  noSurvivorScenario: 'S8',
  decisionConfidenceRobust: 35,
  decisionConfidenceBoundary: 6,
  decisionConfidenceUnstable: 1,
  satelliteRealizationDecisionChanges: 1,
  irradiancePerturbationDecisionChanges: 0
} as const;

export const HATI_REFERENCE_ASSETS: ReferencePoint[] = [
  {
    id: 'a01',
    code: 'A01',
    name: "Museo del Prado",
    lat: 40.41382,
    lng: -3.69162,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a02',
    code: 'A02',
    name: "Museo Nacional Centro de Arte Reina Sofía",
    lat: 40.408045,
    lng: -3.694595,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a03',
    code: 'A03',
    name: "Museo Thyssen-Bornemisza",
    lat: 40.416223,
    lng: -3.6951,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a04',
    code: 'A04',
    name: "CaixaForum Madrid",
    lat: 40.411107,
    lng: -3.693569,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a05',
    code: 'A05',
    name: "Museo Naval de Madrid",
    lat: 40.417518,
    lng: -3.692389,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a06',
    code: 'A06',
    name: "Museo Nacional de Antropología",
    lat: 40.407765,
    lng: -3.689107,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a07',
    code: 'A07',
    name: "Museo Nacional de Artes Decorativas",
    lat: 40.417786,
    lng: -3.689727,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a08',
    code: 'A08',
    name: "Real Fábrica de Tapices",
    lat: 40.405803,
    lng: -3.682407,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a09',
    code: 'A09',
    name: "Madrid-Puerta de Atocha-Almudena Grandes",
    lat: 40.404557,
    lng: -3.688683,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a10',
    code: 'A10',
    name: "Estación del Arte",
    lat: 40.408839,
    lng: -3.691475,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a11',
    code: 'A11',
    name: "Retiro",
    lat: 40.420477,
    lng: -3.686421,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a12',
    code: 'A12',
    name: "Banco de España",
    lat: 40.419055,
    lng: -3.694926,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a13',
    code: 'A13',
    name: "Jardín Tropical",
    lat: 40.407014,
    lng: -3.691364,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'indoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a14',
    code: 'A14',
    name: "Puerta de Alcalá",
    lat: 40.419987,
    lng: -3.688724,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a15',
    code: 'A15',
    name: "Fuente de Cibeles",
    lat: 40.419334,
    lng: -3.693088,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a16',
    code: 'A16',
    name: "Fuente de Neptuno",
    lat: 40.415255,
    lng: -3.694151,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a17',
    code: 'A17',
    name: "Estatua de Goya",
    lat: 40.414983,
    lng: -3.692537,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a18',
    code: 'A18',
    name: "Palacio de Cibeles - Ayuntamiento de Madrid",
    lat: 40.418851,
    lng: -3.691903,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a19',
    code: 'A19',
    name: "Real Observatorio de Madrid",
    lat: 40.408436,
    lng: -3.687266,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a20',
    code: 'A20',
    name: "Parque del Retiro",
    lat: 40.414864,
    lng: -3.682713,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a21',
    code: 'A21',
    name: "Real Jardín Botánico de Madrid",
    lat: 40.411169,
    lng: -3.690753,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a22',
    code: 'A22',
    name: "Palacio de Cristal",
    lat: 40.413592,
    lng: -3.682057,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a23',
    code: 'A23',
    name: "Jardines de Cecilio Rodríguez",
    lat: 40.413348,
    lng: -3.677973,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a24',
    code: 'A24',
    name: "La Rosaleda",
    lat: 40.410788,
    lng: -3.680318,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a25',
    code: 'A25',
    name: "Jardín del Parterre",
    lat: 40.415295,
    lng: -3.687406,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a26',
    code: 'A26',
    name: "Monumento a Alfonso XII",
    lat: 40.417314,
    lng: -3.683067,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  },
  {
    id: 'a27',
    code: 'A27',
    name: "Jardines del Arquitecto Herrero Palacios",
    lat: 40.415613,
    lng: -3.678634,
    kind: 'tourism_asset' as const,
    metadata: {
      assetType: 'outdoor',
      source: 'HATI locked pilot asset catalogue'
    }
  }
];
