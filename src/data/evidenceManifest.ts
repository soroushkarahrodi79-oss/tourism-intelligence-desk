export interface EvidenceSnapshotManifest {
  caseId: 'madrid-hati' | 'guadarrama-snto';
  repository: string;
  snapshotRole: string;
  immutableCommits: Record<string, string>;
  immutableSources: Record<string, string>;
  archivalRecord: string;
  evidenceBoundary: string;
}

const blobUrl = (repository: string, commit: string, path: string) =>
  `https://github.com/${repository}/blob/${commit}/${path}`;

const commitUrl = (repository: string, commit: string) =>
  `https://github.com/${repository}/commit/${commit}`;

export const HATI_IMMUTABLE = {
  repository: 'soroushkarahrodi79-oss/heat-adaptive-tourism-madrid',
  scienceFreezeCommit: 'fcbb9b680217cc6ed4366250cb65c9c8ef7607d1',
  reproductionBaseCommit: 'c69688e7827f1faaf855fdb58a8e80a497d73830',
  reproductionEvidenceCommit: 'f132343a7021a38eb1ee3e6123e3b65d5a4c650a'
} as const;

export const SNTO_IMMUTABLE = {
  repository: 'soroushkarahrodi79-oss/snto-smart-tourism-observatory',
  snapshotCommit: '2c65fe2ac9a09662cddef4cfa68290e0cd6e1278'
} as const;

export const EVIDENCE_MANIFEST: Record<string, EvidenceSnapshotManifest> = {
  'madrid-hati': {
    caseId: 'madrid-hati',
    repository: HATI_IMMUTABLE.repository,
    snapshotRole: 'Locked publication evidence + reproduced screening chain',
    immutableCommits: {
      scienceFreeze: HATI_IMMUTABLE.scienceFreezeCommit,
      reproductionBase: HATI_IMMUTABLE.reproductionBaseCommit,
      reproductionEvidence: HATI_IMMUTABLE.reproductionEvidenceCommit
    },
    immutableSources: {
      scienceFreezeCommit: commitUrl(HATI_IMMUTABLE.repository, HATI_IMMUTABLE.scienceFreezeCommit),
      reproductionBaseCommit: commitUrl(HATI_IMMUTABLE.repository, HATI_IMMUTABLE.reproductionBaseCommit),
      reproductionEvidenceCommit: commitUrl(HATI_IMMUTABLE.repository, HATI_IMMUTABLE.reproductionEvidenceCommit),
      projectStatus: blobUrl(HATI_IMMUTABLE.repository, HATI_IMMUTABLE.scienceFreezeCommit, 'PROJECT_STATUS.md'),
      reproductionReport: blobUrl(
        HATI_IMMUTABLE.repository,
        HATI_IMMUTABLE.reproductionEvidenceCommit,
        'professional/REPRODUCTION_REPORT.md'
      )
    },
    archivalRecord: 'https://doi.org/10.5281/zenodo.22707470',
    evidenceBoundary:
      'Reproduced screening outputs remain bounded to the locked 21 Aug 2023 pilot; SOLWEIG/Tmrt/UTCI are model-derived and not field-validated thermal truth.'
  },
  'guadarrama-snto': {
    caseId: 'guadarrama-snto',
    repository: SNTO_IMMUTABLE.repository,
    snapshotRole: 'Real Sentinel-2 observations + derived PNSG evidence snapshot',
    immutableCommits: {
      sourceSnapshot: SNTO_IMMUTABLE.snapshotCommit
    },
    immutableSources: {
      sourceSnapshotCommit: commitUrl(SNTO_IMMUTABLE.repository, SNTO_IMMUTABLE.snapshotCommit),
      assets: blobUrl(SNTO_IMMUTABLE.repository, SNTO_IMMUTABLE.snapshotCommit, 'clean_assets/pnsg_assets.geojson'),
      trendArtifact: blobUrl(
        SNTO_IMMUTABLE.repository,
        SNTO_IMMUTABLE.snapshotCommit,
        'clean_assets/timeseries/analysis/mk_trends_pnsg.json'
      ),
      decisionEvidenceBrief: blobUrl(
        SNTO_IMMUTABLE.repository,
        SNTO_IMMUTABLE.snapshotCommit,
        'docs/PNSG_DECISION_EVIDENCE_BRIEF.md'
      ),
      scientificProductContract: blobUrl(
        SNTO_IMMUTABLE.repository,
        SNTO_IMMUTABLE.snapshotCommit,
        'docs/phase1/SCIENTIFIC_PRODUCT_CONTRACT.md'
      ),
      evidenceDecisionMatrix: blobUrl(
        SNTO_IMMUTABLE.repository,
        SNTO_IMMUTABLE.snapshotCommit,
        'docs/phase1/EVIDENCE_DECISION_MATRIX.md'
      )
    },
    archivalRecord: 'https://doi.org/10.5281/zenodo.20818269',
    evidenceBoundary:
      'Real environmental evidence supports monitoring/inspection at the documented L5a ceiling; it does not establish trail-level visitor pressure, field-validated condition, restrictive action, or tourism-impact causality.'
  }
};

export const EVIDENCE_MANIFEST_VERSION = 'v0.4-2026-09-25';
