import { ReferencePoint } from '../types';
import { SNTO_IMMUTABLE, EVIDENCE_MANIFEST } from './evidenceManifest';

export const SNTO_EVIDENCE_SOURCE = {
  repository: 'soroushkarahrodi79-oss/snto-smart-tourism-observatory',
  snapshotCommit: SNTO_IMMUTABLE.snapshotCommit,
  stableRelease: 'v2.0.0',
  doi: '10.5281/zenodo.20818269',
  observationWindow: '2021-01 to 2026-06',
  evidenceCeiling: 'L5a monitoring / inspection only; no tourism-impact causality, closure, quota, restoration or budget commitment.',
  fieldValidationGate: 'Issue #26 has not run; no satellite-to-field agreement is claimed.',
  immutableProvenance: EVIDENCE_MANIFEST['guadarrama-snto'].immutableSources
} as const;

export const SNTO_REAL_EVIDENCE_METRICS = {
  timeSeriesAssets: 21,
  significantGreening: 6,
  noSignificantTrend: 14,
  significantDecline: 1,
  officialOapnTrails: 218,
  seasonalImprovingTrails: 165,
  seasonalWorseningTrails: 46,
  visitorUseEvidenceAtAssetOrTrailScale: 0,
  publicUsePrioritiesSupported: 0,
  maliciosaNdviTau: -0.369,
  maliciosaNdviP: 0,
  maliciosaNdmiTau: 0.215,
  maliciosaNdmiP: 0.0114,
  maliciosaChangePoint: '2025-03-01'
} as const;

export const SNTO_REFERENCE_ASSETS: ReferencePoint[] = [
  {
    "id": "pnsg_vuelo_libre_el_nevero",
    "code": "SNTO-01",
    "name": "El Nevero",
    "lat": 40.983965,
    "lng": -3.836133,
    "kind": "reference_site",
    "metadata": {
      "category": "vuelo_libre",
      "sourceGeometry": "POINT",
      "ndviTrend": "increasing",
      "ndviTau": 0.225,
      "ndviP": 0.0113
    }
  },
  {
    "id": "pnsg_vuelo_libre_la_nevera",
    "code": "SNTO-02",
    "name": "La Nevera",
    "lat": 40.999756,
    "lng": -3.781435,
    "kind": "reference_site",
    "metadata": {
      "category": "vuelo_libre",
      "sourceGeometry": "POINT",
      "ndviTrend": "increasing",
      "ndviTau": 0.176,
      "ndviP": 0.0425
    }
  },
  {
    "id": "pnsg_vuelo_libre_el_espartal",
    "code": "SNTO-03",
    "name": "El Espartal",
    "lat": 40.873043,
    "lng": -3.849381,
    "kind": "reference_site",
    "metadata": {
      "category": "vuelo_libre",
      "sourceGeometry": "POINT",
      "ndviTrend": "no trend",
      "ndviTau": 0.001,
      "ndviP": 1
    }
  },
  {
    "id": "pnsg_escalada_el_chorro",
    "code": "SNTO-04",
    "name": "Escuela de escalada EL CHORRO",
    "lat": 40.9169,
    "lng": -3.966279,
    "kind": "reference_site",
    "metadata": {
      "category": "escalada",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "no trend",
      "ndviTau": -0.021,
      "ndviP": 0.8076
    }
  },
  {
    "id": "pnsg_escalada_la_barranca_y_maliciosa",
    "code": "SNTO-05",
    "name": "Escuela de escalada LA BARRANCA Y MALICIOSA",
    "lat": 40.771416,
    "lng": -3.974055,
    "kind": "reference_site",
    "metadata": {
      "category": "escalada",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "no trend",
      "ndviTau": -0.015,
      "ndviP": 0.8594
    }
  },
  {
    "id": "pnsg_escalada_la_pedriza",
    "code": "SNTO-06",
    "name": "Escuela de escalada LA PEDRIZA",
    "lat": 40.767612,
    "lng": -3.888891,
    "kind": "reference_site",
    "metadata": {
      "category": "escalada",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "no trend",
      "ndviTau": 0.036,
      "ndviP": 0.6741
    }
  },
  {
    "id": "pnsg_escalada_maliciosa_porrones",
    "code": "SNTO-07",
    "name": "Escuela de escalada MALICIOSA-PORRONES",
    "lat": 40.74046,
    "lng": -3.925004,
    "kind": "reference_site",
    "metadata": {
      "category": "escalada",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "decreasing",
      "ndviTau": -0.369,
      "ndviP": 0
    }
  },
  {
    "id": "pnsg_escalada_penalara",
    "code": "SNTO-08",
    "name": "Escuela de escalada PEÑALARA",
    "lat": 40.838754,
    "lng": -3.959424,
    "kind": "reference_site",
    "metadata": {
      "category": "escalada",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "increasing",
      "ndviTau": 0.193,
      "ndviP": 0.0232
    }
  },
  {
    "id": "pnsg_escalada_puerto_de_navacerrada",
    "code": "SNTO-09",
    "name": "Escuela de escalada PUERTO DE NAVACERRADA",
    "lat": 40.772068,
    "lng": -4.010595,
    "kind": "reference_site",
    "metadata": {
      "category": "escalada",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "no trend",
      "ndviTau": 0.046,
      "ndviP": 0.5876
    }
  },
  {
    "id": "pnsg_escalada_valsain",
    "code": "SNTO-10",
    "name": "Escuela de escalada VALSAIN",
    "lat": 40.831339,
    "lng": -4.017193,
    "kind": "reference_site",
    "metadata": {
      "category": "escalada",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "increasing",
      "ndviTau": 0.256,
      "ndviP": 0.0024
    }
  },
  {
    "id": "pnsg_ciclismo_las_zetas_de_la_pedriza",
    "code": "SNTO-11",
    "name": "Las Zetas de La Pedriza",
    "lat": 40.769291,
    "lng": -3.925075,
    "kind": "reference_site",
    "metadata": {
      "category": "ciclismo",
      "sourceGeometry": "LINESTRING",
      "ndviTrend": "no trend",
      "ndviTau": 0.029,
      "ndviP": 0.7315
    }
  },
  {
    "id": "pnsg_ciclismo_la_morcuera_gr_10_4_pr_m_12",
    "code": "SNTO-12",
    "name": "La Morcuera GR 10.4 PR-M 12",
    "lat": 40.843406,
    "lng": -3.847172,
    "kind": "reference_site",
    "metadata": {
      "category": "ciclismo",
      "sourceGeometry": "LINESTRING",
      "ndviTrend": "no trend",
      "ndviTau": 0.079,
      "ndviP": 0.3525
    }
  },
  {
    "id": "pnsg_ciclismo_calderuelas_carro_del_diablo",
    "code": "SNTO-13",
    "name": "Calderuelas - Carro del Diablo",
    "lat": 40.892992,
    "lng": -3.913532,
    "kind": "reference_site",
    "metadata": {
      "category": "ciclismo",
      "sourceGeometry": "LINESTRING",
      "ndviTrend": "no trend",
      "ndviTau": 0.081,
      "ndviP": 0.3412
    }
  },
  {
    "id": "pnsg_ciclismo_la_horizontal_san_mames_10_000",
    "code": "SNTO-14",
    "name": "La Horizontal - San Mames 10.000",
    "lat": 41.005962,
    "lng": -3.752647,
    "kind": "reference_site",
    "metadata": {
      "category": "ciclismo",
      "sourceGeometry": "LINESTRING",
      "ndviTrend": "no trend",
      "ndviTau": 0.082,
      "ndviP": 0.3356
    }
  },
  {
    "id": "pnsg_ciclismo_calderuelas_collado_vihuelas_ramal_circular",
    "code": "SNTO-15",
    "name": "Calderuelas - Collado Vihuelas Ramal Circular",
    "lat": 40.925376,
    "lng": -3.911412,
    "kind": "reference_site",
    "metadata": {
      "category": "ciclismo",
      "sourceGeometry": "LINESTRING",
      "ndviTrend": "increasing",
      "ndviTau": 0.191,
      "ndviP": 0.024
    }
  },
  {
    "id": "pnsg_ciclismo_vivero_prado_redondillo",
    "code": "SNTO-16",
    "name": "Vivero - Prado Redondillo",
    "lat": 40.83739,
    "lng": -4.003666,
    "kind": "reference_site",
    "metadata": {
      "category": "ciclismo",
      "sourceGeometry": "LINESTRING",
      "ndviTrend": "no trend",
      "ndviTau": 0.106,
      "ndviP": 0.211
    }
  },
  {
    "id": "pnsg_reserva_umbria_de_siete_picos",
    "code": "SNTO-17",
    "name": "Umbría de Siete Picos",
    "lat": 40.785552,
    "lng": -4.032542,
    "kind": "reference_site",
    "metadata": {
      "category": "reserva",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "increasing",
      "ndviTau": 0.207,
      "ndviP": 0.014
    }
  },
  {
    "id": "pnsg_reserva_afloramientos_metamorficos_del_collado_de_la_flecha_y_cabecera_del_artinuelo",
    "code": "SNTO-18",
    "name": "Afloramientos metamórficos del Collado de la Flecha y cabecera del Artiñuelo",
    "lat": 40.922715,
    "lng": -3.928106,
    "kind": "reference_site",
    "metadata": {
      "category": "reserva",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "no trend",
      "ndviTau": 0.029,
      "ndviP": 0.7315
    }
  },
  {
    "id": "pnsg_reserva_umbria_de_cerro_ventoso",
    "code": "SNTO-19",
    "name": "Umbría de Cerro Ventoso",
    "lat": 40.792279,
    "lng": -4.050638,
    "kind": "reference_site",
    "metadata": {
      "category": "reserva",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "no trend",
      "ndviTau": 0.028,
      "ndviP": 0.7399
    }
  },
  {
    "id": "pnsg_reserva_turberas_de_el_reventon",
    "code": "SNTO-20",
    "name": "Turberas de El Reventón",
    "lat": 40.898333,
    "lng": -3.941608,
    "kind": "reference_site",
    "metadata": {
      "category": "reserva",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "no trend",
      "ndviTau": 0.155,
      "ndviP": 0.0716
    }
  },
  {
    "id": "pnsg_reserva_charcas_de_los_llanos_de_penalara",
    "code": "SNTO-21",
    "name": "Charcas de los Llanos de Peñalara",
    "lat": 40.849096,
    "lng": -3.948503,
    "kind": "reference_site",
    "metadata": {
      "category": "reserva",
      "sourceGeometry": "POLYGON",
      "ndviTrend": "no trend",
      "ndviTau": 0.154,
      "ndviP": 0.0884
    }
  }
] as ReferencePoint[];
