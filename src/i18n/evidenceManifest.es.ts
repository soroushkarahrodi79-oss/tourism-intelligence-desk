import { EvidenceSnapshotManifest } from '../data/evidenceManifest';
import { Locale } from './LocaleProvider';

// Spanish presentation overlay for EVIDENCE_MANIFEST (src/data/evidenceManifest.ts).
// Only the descriptive prose fields are translated. repository, primaryCommit,
// primarySourceUrl, immutableCommits, immutableSources, archivalRecord and
// caseId are never overridden — they stay byte-identical across locales.
export interface EvidenceManifestTextOverlay {
  snapshotRole: string;
  evidenceBoundary: string;
}

export const EVIDENCE_MANIFEST_ES: Record<string, EvidenceManifestTextOverlay> = {
  'madrid-hati': {
    snapshotRole: 'Evidencia de publicación fijada + cadena de cribado reproducida',
    evidenceBoundary:
      'Los resultados de cribado reproducidos permanecen acotados al piloto fijado del 21 de agosto de 2023; SOLWEIG/Tmrt/UTCI son derivados de modelo y no constituyen verdad térmica validada en campo.'
  },
  'guadarrama-snto': {
    snapshotRole: 'Observaciones reales de Sentinel-2 + instantánea de evidencia PNSG derivada',
    evidenceBoundary:
      'La evidencia ambiental real respalda el seguimiento/inspección en el techo documentado L5a; no establece presión de visitantes a escala de sendero, condición validada en campo, acción restrictiva ni causalidad de impacto turístico.'
  }
};

export function localizeEvidenceManifest(
  manifest: EvidenceSnapshotManifest,
  locale: Locale
): EvidenceSnapshotManifest {
  if (locale === 'en') return manifest;
  const overlay = EVIDENCE_MANIFEST_ES[manifest.caseId];
  if (!overlay) return manifest;
  return {
    ...manifest,
    snapshotRole: overlay.snapshotRole,
    evidenceBoundary: overlay.evidenceBoundary
  };
}
